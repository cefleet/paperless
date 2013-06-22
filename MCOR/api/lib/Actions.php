<?php
	/*
	 * Class: Action
	 * The Actions for the Application
	 */

	class Action {
		
		/*
		 * Constructor:
		 * The constructor adds the database connection object to the Action
		 */
		
		function __construct(){
			GLOBAL $dbConfig;
			$this->db = new Connect($dbConfig);	
		}
				
		function checkStatus(){
			return array('status'=>'LoggedIn');
		}
		
		//GET Actions
		/*
		 *  Function: get_list
		 *  Returns a list of the items. Requires to be requested via GET
		 * 
		 * 	Parameters:
		 * 		$table - (required) {STRING} The table from where data is being retrieved. 
		 * 		$limit - (optional) {INTEGER} The amount of items to retreive. Deault = 40 (QUERYSTRING)
		 * 		$page - (optional) {INTEGER} The page number of the items to return. This plus $limit is what sets the starting point. Default = 0 (QUERYSTRING)
		 * 		$fields - (optional) {COMA SEPERATED LIST} The fields to return. default is '*' (QUERYSTRING)
		 * 		$search - (optional) {STRING} Searches all of the field in the "fields" parameter for the value. (QUERYSTRING)
		 * 		$order - (optional) {STRING} The field to order the request ASC or DESC can be added (QUERYSTRING)
		 * 		$conditions - (optional) {COMA SEPERATED KEY COLON VALUE PAIRS} Filters the data that is selected, if a there is a list of items for a single field use a simicolon to seperate them (QUERYSTRING)
		 */
		
		function get_list($table){
			if($_SERVER['REQUEST_METHOD'] != 'GET'){return array('error'=>array('type'=>'This Action can only be access via a GET request. It was requested via '.$_SERVER['REQUEST_METHOD']));};
			//TODO varify some of the information in order to send better errors
			$this->limit = 40;
			$this->offset = 0;
			$this->fields = '*';
			$this->order = $this->get_primary_key($table);
			if(isset($_GET['limit'])) {
				$this->limit = $_GET['limit'];
			}
			if(isset($_GET['page'])){
				$this->offset = $this->limit*$_GET['page'];	
			}
			if(isset($_GET['fields'])){
				$this->fields = $_GET['fields'];
			}	
			if(isset($_GET['order'])){
				$this->order = $_GET['order'];
			}
			$search = '';
			if(isset($_GET['search'])){
				$this->search = $_GET['search'];
				if($this->fields != '*'){
					$cols = explode(',',$this->fields);
					foreach($cols as $col){
						$search .= " LOWER(".$col."::TEXT) LIKE LOWER('%".$this->search."%') OR";
					}					
				} else {
					$cols = $this->get_columns($table);
					foreach($cols as $col){
						$search .= " LOWER(".$col['column_name']."::TEXT) LIKE LOWER('%".$this->search."%') OR";
					}	
				}
				$search = 'AND ('.str_replace('OR]','',$search."]").')';
			}
			$conditions = '';
			if(isset($_GET['conditions'])){
				$this->conditions = $_GET['conditions'];
				$colConds = explode(',',$this->conditions);
				foreach($colConds as $aCond){
					$keyVal = explode(':',$aCond);
					$keyVal[1] = explode(';',$keyVal[1]);
					foreach($keyVal[1] as $key=>$item){
						$keyVal[1][$key] = "'".$item."'";
					}
					$keyVal[1] = implode(',',$keyVal[1]);
					
					$conditions .= " ".$keyVal[0]." IN (".$keyVal[1].") AND";
				}
				$conditions = 'AND ('.str_replace('AND]', '', $conditions."]").')';				
			}
			
			$sql = "SELECT ".$this->fields." FROM ".$table." WHERE 1=1 $search $conditions ORDER BY ".$this->order."  OFFSET ".$this->offset." LIMIT ".$this->limit;
			$result = $this->db->connection->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC); 
			$this->data = $result->fetchAll();	
			
			return $this->data;
		}
		
		//GET Actions
		/*
		 *  Function: get_list
		 *  Returns a count of the total requested items. Requires to be requested via GET
		 * 
		 * 	Parameters:
		 * 		$table - (required) {STRING} The table from where data is being retrieved. 
		 * 		$fields - (optional) {COMA SEPERATED LIST} The fields to return. default is '*' (QUERYSTRING)
		 * 		$search - (optional) {STRING} Searches all of the field in the "fields" parameter for the value. (QUERYSTRING)
		 * 		$conditions - (optional) {COMA SEPERATED KEY COLON VALUE PAIRS} Filters the data that is selected  (QUERYSTRING)
		 */
		
		function get_count($table){
			if($_SERVER['REQUEST_METHOD'] != 'GET'){return array('error'=>array('type'=>'This Action can only be access via a GET request. It was requested via '.$_SERVER['REQUEST_METHOD']));};
			//TODO varify some of the information in order to send better errors
			$this->fields = '*';
			if(isset($_GET['fields'])){
				$this->fields = $_GET['fields'];
			}	
			$search = '';
			if(isset($_GET['search'])){
				$this->search = $_GET['search'];
				if($this->fields != '*'){
					$cols = explode(',',$this->fields);
					foreach($cols as $col){
						$search .= " ".$col."::TEXT LIKE '%".$this->search."%' OR";
					}					
				} else {
					$cols = $this->get_columns($table);
					foreach($cols as $col){
						$search .= " ".$col['column_name']."::TEXT LIKE '%".$this->search."%' OR";
					}	
				}
				$search = 'AND ('.str_replace('OR]','',$search."]").')';
			}
			$conditions = '';
			if(isset($_GET['conditions'])){
				$this->conditions = $_GET['conditions'];
				$colConds = explode(',',$this->conditions);
				foreach($colConds as $aCond){
					$keyVal = explode(':',$aCond);
					$conditions .= " ".$keyVal[0]." = '".$keyVal[1]."' AND";
				}
				$conditions = 'AND ('.str_replace('AND]', '', $conditions."]").')';				
			}
			
			$sql = "SELECT count(*) FROM ".$table." WHERE 1=1 $search $conditions";
			$result = $this->db->connection->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC); 
			$this->data = $result->fetch();
			return $this->data;
		}
		
		/*
		 * Function: get_single
		 * Returns a single item with the given id. Requires to be requested via GET
		 * 
		 * Parameters:
		 * 		$table - (required) {STRING} The table from where data is being retrieved
		 * 		$id - (required) {VARCHAR} This value for the primary key. (QUERYSTRING)
		 * 		$fields - (optional) {COMA SEPERATED LIST} The fields to return. default is * (QUERYSTRING)
		 */
		
		function get_single($table){
			if($_SERVER['REQUEST_METHOD'] != 'GET'){return array('error'=>array('type'=>'This Action can only be access via a GET request. It was requested via '.$_SERVER['REQUEST_METHOD']));};
			
			$this->fields = '*';
			$pk = $this->get_primary_key($table);
			
			if(!isset($_GET['id'])){
				return array('error'=>array('type'=>'No id given.'));
			} else {
				$this->id = $_GET['id'];
			}
			if(isset($_GET['fields'])){
				$this->fields = $_GET['fields'];
			}
			$sql = "SELECT ".$this->fields." FROM ".$table." WHERE $pk = '".$this->id."'";
			$result = $this->db->connection->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC); 
			$this->data = $result->fetch();
			
			return $this->data;
		}
		
		/*
		 * Function: add_item
		 * Add a database record. Requires to be requested via POST.
		 * Parameters:
		 * 		$table - (required) {STRING} The table that the data will be saved too
		 * 		$data - (required) {JSON OBJECT} The key:value pairs that represent the columns to save (POST)
		 * Returns:
		 *   Returns nothing in the body. However it does give the location in the header. 201 status is given
		 */
		
		function add_item($table){
			if($_SERVER['REQUEST_METHOD'] != 'POST'){return array('error'=>array('type'=>'This Action can only be access via a POST request. It was requested via '.$_SERVER['REQUEST_METHOD']));};
			$this->fields = json_decode(file_get_contents('php://input'),true);
			
			//Checks to see if there is a depth. If there is depth then it should have been a JSON or there was something odd... either way its safer to make it a string
			foreach($this->fields as $jsonField=>$json){
				if(is_array($this->fields[$jsonField])){
					$this->fields[$jsonField] = json_encode($json);	
				}
			}		
			$pk = $this->get_primary_key($table);
			//Becuse this is create it does not need to have an id
			if(isset($this->fields[$pk])) {
				unset($this->fields[$pk]);
			}
			$fields = "(";
			$values = "(";
			foreach($this->fields as $field=>$value){
				$fields .= "$field,";
				$values .= "'$value',"; 
			}
			$fields .= ")";
			$values .= ")";
			$fields = str_replace(",)", ")", $fields);
			$values = str_replace(",)", ")", $values);
					
			$sql = "INSERT INTO $table $fields VALUES $values RETURNING $pk;";
			$result = $this->db->connection->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC); 
			$this->data = $result->fetch();
			header('HTTP/1.0 201 201 - Created', true, 201);
			header('Location: api/get_single/'.$table.'/?id='.$this->data[$pk]);			
			return;
		}
		
		/*
		 * Function: update_item
		 * Updates a database record. Requires to be requested via PUT.
		 * Parameters:
		 * 		$table - (required) {STRING} The table that the data will be saved too
		 * 		$data - (required) {JSON OBJECT} The key:value pairs that represent the columns to save (POST)
		 * 		$id - (required) {VARCHAR} This value for the primary key. (QUERYSTRING)
		 *  
		 * Returns:
		 *   Returns nothing in the body. However it does give the Content-Location in the header and a 204 status
		 */
		
		function update_item($table){
			if($_SERVER['REQUEST_METHOD'] != 'PUT'){return array('error'=>array('type'=>'This Action can only be access via a PUT request. It was requested via '.$_SERVER['REQUEST_METHOD']));};
			$this->fields = json_decode(file_get_contents('php://input'),true);
			
			if(!isset($_GET['id'])){
				return array('error'=>array('type'=>'No id given.'));
			} else {
				$this->id = $_GET['id'];
			}		
			
			foreach($this->fields as $jsonField=>$json){
				if(is_array($this->fields[$jsonField])){
					$this->fields[$jsonField] = json_encode($json);	
				}
			}
			
			$values = '';	
			foreach($this->fields as $field=>$value){
				$values .= "$field = '$value',"; 
			}
			$values = str_replace(',]','', ($values.']'));
			$pk = $this->get_primary_key($table);
			$sql = "UPDATE $table SET $values WHERE $pk = '".$this->id."' RETURNING $pk;";
			$result = $this->db->connection->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC);
			$this->data = $result->fetch();
			
			header('HTTP/1.0 204 204 - No Content', true, 204);
			header('Content-Location: api/get_single/'.$table.'/?id='.$this->id);
			return;
		}
		
		/*
		 * Function: delete_item
		 * Deletes a database record. Requires to be requested via DELETE.
		 * Parameters:
		 * 		$table - (required) {STRING} The table that the data will be deleted from
		 * 		$id - (required) {VARCHAR} This value for the primary key. (QUERYSTRING)
		 *  
		 * Returns:
		 *   Returns nothing in the body. 202 status on success
		 */
		
		function delete_item($table){
			if($_SERVER['REQUEST_METHOD'] != 'DELETE'){return array('error'=>array('type'=>'This Action can only be access via a DELETE request. It was requested via '.$_SERVER['REQUEST_METHOD']));};
			
			if(!isset($_GET['id'])){
				return array('error'=>array('type'=>'No id given.'));
			} else {
				$this->id = $_GET['id'];
			}
						
			$pk = $this->get_primary_key($table);
			
			$sql = "DELETE FROM $table WHERE $pk = ".$this->id.";";
		
			
			//TODO need an if statment here	
			$result = $this->db->connection->query($sql);
			
			header('HTTP/1.0 202 202 - Accepted', true, 202);
			return;
		}
		
		/*
		 * Function: get_structure
		 * Retreives the PK (Primary Key) and columns list for a database tabe
		 * 
		 * Parameters:
		 * 	$table - required {STRING} The name of the table to retreive the columns for
		 *
		 * Returns:
		 *  returns the columns and PK of the requested table in an associtive array. 
		 */
		function get_structure($table){
			$columns = $this->get_columns($table);
			$pk = $this->get_primary_key($table);
			return array('columns'=>$columns, 'pk'=>$pk);		
		}
		
		/*
		 * get_columns returns the columns of a given $table. This is a private function and cannot be called from outside this Object
		 * 
		 * TODO For now this only works for Postgresql.
		 */
		
		private function get_columns($table){
			$sql = 'select column_name,data_type from information_schema.columns as "columns" where table_name=\''.$table.'\'';
			
			$result = $this->db->connection->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC);
			$data = $result->fetchAll();
			//TODO instead of returning maybe just attche it to the model
			return $data;
		}
		
		/*
		 * get_primary_key returns the primary of a given $table. This is a private function and cannot be called from outside this Object
		 * TODO this can only be used from within the object
		 * 
		 */
		
		private function get_primary_key($table){
			GLOBAL $dbConfig;
			$sql  = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS , INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
		     	 WHERE  INFORMATION_SCHEMA.TABLE_CONSTRAINTS.CONSTRAINT_TYPE = 'PRIMARY KEY'
				 AND INFORMATION_SCHEMA.KEY_COLUMN_USAGE.CONSTRAINT_NAME = INFORMATION_SCHEMA.TABLE_CONSTRAINTS.CONSTRAINT_NAME 
				 AND INFORMATION_SCHEMA.KEY_COLUMN_USAGE.TABLE_NAME = INFORMATION_SCHEMA.TABLE_CONSTRAINTS.TABLE_NAME 
				 AND INFORMATION_SCHEMA.TABLE_CONSTRAINTS.TABLE_SCHEMA = INFORMATION_SCHEMA.KEY_COLUMN_USAGE.TABLE_SCHEMA  
				 AND INFORMATION_SCHEMA.TABLE_CONSTRAINTS.TABLE_NAME = '$table' 
				 AND INFORMATION_SCHEMA.KEY_COLUMN_USAGE.TABLE_CATALOG = '".$dbConfig['database']."';";
				 
			$result = $this->db->connection->query($sql);
			$result->setFetchMode(PDO::FETCH_ASSOC);
			$data = $result->fetch();
			//same here insteand of returning attach it to the model
			return $data['column_name'];
		}
	}
?>