<?php
function get_params(){
	$keys = array_keys($_GET);	
	$params = explode("/",reset($keys));
	
	if(in_array($params[0], array(null,''))){	
		unset($params[0]);
		$params = array_values($params);
	}
	return $params;
}

function exicute($params){
	if(!isset($params[1])){
		$params[1] = '';
	}
	if(isset($_GET['plugin'])){
		require_once('plugins/'.$_GET['plugin'].'.php');
		$PluginAction = new $_GET['plugin']();
		$data = $PluginAction->$params[0]($params[1]);
	} else {
		require_once('lib/Actions.php');
		$Action = new Action();		
		//preforms the action with the table
		$data = $Action->$params[0]($params[1]);
	}	

	//May want to consider doing this inside of the actions
	$data = json_encode($data);
	return $data;
}
?>