<?php
	//in production get rid of theses
	ini_set('display_errors', 'On');
	error_reporting(E_ALL | E_STRICT);
	
	$dbConfig  = array(
		'host'=>'10.0.0.12',
		'port'=>'5432',
		'user'=>'postgres',
		'database'=>'ga87',
		'password'=>''
	);		
	//to here
	
	//in production this salt of course will be different
	$salt = 'asdfwerewr341542v245b6bgh56yh4h5tvh5gf4;jklth4rth34vgn54fvh34th3pgv4hg035t';
	
	//Include these files
	require_once('lib/Util.php');
	require_once('lib/Connect.php');
	require_once('lib/Auth.php');	

	
	//TODO make a lsit of things you can get before being logged in	
	//TODO make Auth optional
	$Auth = new Auth();
	$params = get_params();
	//This sends it to AUTH instead of Actions
	if(in_array($params[0], array('login','logout'))){
		$data = $Auth->$params[0]();
	} elseif($Auth->check_auth() == true){
		$data = exicute($params);					
	} 
	
	if($data != 'null'){
		//This is a pure JSON api as of this moment	
		header('Content-type: application/json');
		echo $data;
	}
	return;
?>
