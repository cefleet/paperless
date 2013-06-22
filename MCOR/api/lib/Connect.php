<?php
/*
 *Class: Connect
 *Creates the Connection Object for the application (currently only postgres is supported).. REALLY REALLY need to switch to PDO.
 */
class Connect {
	/*
	 * Constructor:
	 * Creates the connection object when a new one is called. 
	 * 
	 * Parameters:
	 * dbConfig - {Array} The needed connection information to connect to the database
	 *
	 */
	
	function __construct($dbConfig) {
		//$this->connection = pg_connect("host=".$dbConfig['host']." port=".$dbConfig['port']." dbname=".$dbConfig['database']." user=".$dbConfig['user']);
		
		// for MySQL
		//$this->connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
		// for SQLite
		//$this->connection = new PDO("sqlite:$db");

		// for postgreSQL
		$this->connection = new PDO("pgsql:host=".$dbConfig['host']." dbname=".$dbConfig['database'], $dbConfig['user']);
		
		/* For later use if needed
		// configuration
$dbtype		= "sqlite";
$dbhost 	= "localhost";
$dbname		= "test";
$dbuser		= "root";
$dbpass		= "admin";
$dbpath		= "c:/test.db";

// switching
switch($dbtype){
  case "mysql":
    $dbconn = "mysql:host=$dbhost;dbname=$dbname";
    break;
  
  case "sqlite":
    $dbconn = "sqlite:$dbpath";
	break;
  
  case "postgresql":
    $dbconn = "pgsql:host=$host dbname=$db";
	break;
}

// database connection
$conn = new PDO($dbconn,$user,$pass);
*/
   }
}
?>
