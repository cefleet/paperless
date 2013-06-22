<?php

/*
 * Class: Auth
 * The Authentication Class 
 */

class Auth {
	/*
     * Constructor:
	 * The constructor creates a new connection and assigns the salt to the class
	 */
	function __construct(){
		GLOBAL $dbConfig;
		GLOBAL $salt;
		$this->db = new Connect($dbConfig);	
		$this->salt = $salt;
	}
	
	/*
	 * Function: check_auth
	 * Checks to see if the user is authenticated. It uses cookieCheck to check the date, time, and secret token against
	 * what it is able to find in the database.
	 * If everything checks out it returns true and continues with execution otherwise it stops the script and Returns 550 - permission denied.
	 *
	 */
	
	function check_auth(){
		//needs to see if the request is "login"
		if($this->cookieCheck() != 'accepted'){
			if($_GET['token'] == 'thisisatestofthesystemthisisonlyatest'){
				//give this man a cookie
				//This will of course need to have a real user attached and a pre-built string or something of the sort
				$this->setCookie('TokenUser');
				return true;
			} else {
				header('HTTP/1.0 550 550 - Permission denied', true, 550);
				header('Warning: Not Authicated');			
				exit;	
			}
		} else {
			return true;
		}	
	}
	
	/*
	 * Function:cookieCheck
	 * Runs a cleanup to delete expired cookies then checks to see if the user presents a valid cookie.
	 * If it is a valid cookie it will re-issue a new cookie if the cookie is older than 15 min
	 * This should not need to be used when creating an application. The developer should allow check_auth to call it
	 */
	
	function cookieCheck(){
		//Just deletes any expired cookies
		$sql = "DELETE FROM cookiecheck WHERE expires < '".date('Y-m-d G:i:s')."'";
			$result = $this->db->connection->query($sql);
		if(isset($_COOKIE['MCOR'])) {
			$cookie = json_decode($_COOKIE['MCOR']);
		} else {
			return 'denied:no cookie';
		}
		if(!isset($cookie->username)){
			setcookie('MCOR', "expired", time()-3600, '/');	
			return 'denied:bad cookie';
		}
		if(!isset($cookie->usrstr)){
			setcookie('MCOR', "expired", time()-3600, '/');	
			return 'denied:bad cookie';
		}
	
		//get db entry
		$sql = "SELECT * FROM cookiecheck WHERE username = '".$cookie->username."' AND usrstr = '".$cookie->usrstr."'";
		$result = $this->db->connection->query($sql);
		$result->setFetchMode(PDO::FETCH_ASSOC); 
		$cookieCheck = $result->fetch();
	
		
		//n db entry
		if($cookieCheck == null){
			setcookie('MCOR', "expired", time()-3600, '/');	
			return 'denied:no db entry';
		}
		
		//re issues cookie if it is older than 15 min
		//TODO set this time as an option somewhere
		if(time() - (strtotime($cookieCheck['created'])) > 900) {
			//needs to delete the old cookie
			$sql = "DELETE FROM cookiecheck WHERE usrstr='".$cookieCheck['usrstr']."' AND username='".$cookieCheck['username']."'";
			$result = $this->db->connection->query($sql);
			//sets the cookie back some			
			$this->setCookie($cookie->username);
		}						
		//matching cookie and matching string.. JUST RIGHT!
		return 'accepted';
	}
	
	/*
	 *Function: login
	 * Auth Login function. The login request can be sent via post or put
	 * Parameters: 
	 *   username - {STRING} The client entered username attempt
	 *   password - {STRING} The client entered password attempt 
	 *   
	 */
	
	
	//This is not a standard action
	function login(){
		//needs
		if(!in_array($_SERVER['REQUEST_METHOD'], array('PUT','POST'))){
			return array('error'=>array('type'=>'This Action can only be access via a PUT or POST request. It was requested via '.$_SERVER['REQUEST_METHOD']));	
		}
			
		$attempt = json_decode(file_get_contents('php://input'),true);
				
		$sql = "SELECT username, password FROM users WHERE username='".$attempt['username']."'";
		//$result = pg_query($this->db->connection, $sql);
		//$value = pg_fetch_all($result);
		$result = $this->db->connection->query($sql);
		$result->setFetchMode(PDO::FETCH_ASSOC); 
		$value = $result->fetch();
		if($value['password'] ==  crypt($attempt['password'], $this->salt) && $value['username'] == $attempt['username']){
			//from here you need to set the cookie and then save the item into the database
			$this->setCookie($value['username']);
			$data = 'success';
		} else {
			$data = 'fail';
		}	
		return json_encode($data);
	}
	
	/*
	 *Function: logout
	 * Auth Logout Function. Logs the user out and deletes the cookie 
	 *   
	 */
	
	function logout(){
			
		if(!in_array($_SERVER['REQUEST_METHOD'], array('POST'))){
			return array('error'=>array('type'=>'This Action can only be access via a PUT or POST request. It was requested via '.$_SERVER['REQUEST_METHOD']));	
		}
		//grabes the cookie and parses it
		if(isset($_COOKIE['MCOR'])) {
			$cookie = json_decode($_COOKIE['MCOR']);
		}
		//deletes from the database
		$sql = "DELETE FROM cookiecheck WHERE usrstr='".$cookie->usrstr."' AND username='".$cookie->username."'";
		$result = $this->db->connection->query($sql);
		//sets the cookie back some
		setcookie('MCOR', "expired", time()-3600, '/');
		
		return 'logged out';
	}
	
	/*
	 * setCookie assigned the cookie to the user as well as creating a database entry in cookie check
	 */
	
	private function setCookie($username){
		GLOBAL $dbConfig;
		GLOBAL $salt;
		$db = new Connect($dbConfig);
		$usrstr = crypt(time());		
		$created = date("Y-m-d H:i:s", time());
		$expires = date("Y-m-d H:i:s", time()+(60*60*3));
		
		//TODO Check to see if there is one already with the same ip address
		$sql = "INSERT INTO cookiecheck (usrstr,ip,username,created,expires) VALUES ('$usrstr','".$_SERVER['REMOTE_ADDR']."','$username', '$created', '$expires')";
		$result = $this->db->connection->query($sql);
		//$result->setFetchMode(PDO::FETCH_ASSOC); 
		//$value = $result->fetch();
		
		//$result = pg_query($this->db->connection, $sql);
		$cookieSTR = array('username'=>$username,'usrstr'=>$usrstr);
		setcookie('MCOR', json_encode($cookieSTR), strtotime($expires), '/', $_SERVER['SERVER_NAME']);
		
		//TODO log who logs in somewhere		
	}
	
	//temp here just to add a user
	//TODO make this for real soon
	
	function addUser(){
		$sql = "INSERT INTO users (username,password) VALUES ('user', '".crypt('password',$this->salt)."')";
		$result = $this->db->connection->query($sql);
	}
	
}
?>
