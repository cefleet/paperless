MCOR.Auth = {

checkAuth : function(){
	//get the token parameter

	var checkLogin = new XMLHttpRequest();
	checkLogin.onreadystatechange = function() {
		if (checkLogin.readyState == 4 && checkLogin.status == 550) {		
			login();
		} else if (checkLogin.readyState == 4 && checkLogin.status == 200) {
			WO.init();
		}
	}
	if(getParameterByName('token') != null){
		checkLogin.open('get', 'api/checkStatus/?token='+getParameterByName('token'), false);
		if(getParameterByName('inmap') == 'true'){
			sessionStorage.inmap = true;
		} else {
			sessionStorage.inmap = false;
		}
		if(getParameterByName('parentDomain')) {
			sessionStorage.parentDomain = getParameterByName('parentDomain');
		}
	} else {
		checkLogin.open('get', 'api/checkStatus/', false);
	}	
	checkLogin.send();
},

//settign the async to false should pause the loading
login:function() {
	
	var gray = document.createElement('div');
	gray.setAttribute('id', 'grayOut');
	document.body.appendChild(gray);

	var loginForm = document.createElement('form');
	loginForm.id = 'loginForm';
	loginForm.setAttribute('name', 'loginForm');
	loginForm.setAttribute('onkeypress','keyPressed(event)');

	var unCont = document.createElement('div');
	unCont.id = 'unCont';
	var unLabel = document.createElement('label');
	unLabel.setAttribute('for', 'username');
	unLabel.appendChild(document.createTextNode('Username'));
	var unInput = document.createElement('input');
	unInput.setAttribute('name', 'username');
	unInput.setAttribute('id', 'username');
	unCont.appendChild(unLabel);
	unCont.appendChild(unInput);

	var pCont = document.createElement('div');
	pCont.id = 'unCont';
	var pLabel = document.createElement('label');
	pLabel.setAttribute('for', 'password');
	pLabel.appendChild(document.createTextNode('Password'));
	var pInput = document.createElement('input');
	pInput.setAttribute('name', 'password');
	pInput.setAttribute('id', 'password');
	pInput.setAttribute('type','password');
	pCont.appendChild(pLabel);
	pCont.appendChild(pInput);

	var sButton = document.createElement('input');
	sButton.setAttribute('type','button');
	sButton.value = 'submit';
	sButton.addEventListener('click',tryLogin);
	
	var errorText = document.createElement('p');
	errorText.setAttribute('id','errorText');
	
	loginForm.appendChild(unCont);
	loginForm.appendChild(pCont);
	loginForm.appendChild(sButton);
	loginForm.appendChild(errorText);
	
	document.body.appendChild(loginForm);	
},

logout:function(){

	var logoutReq = new XMLHttpRequest();
	logoutReq.onreadystatechange = function() {
		if (logoutReq.readyState == 4 && logoutReq.status == 200) {
			checkLogin();
		}
	}
	logoutReq.open('post', 'api/logout', false);
	logoutReq.send();
	 if(sessionStorage.inmap == 'true'){
		var parent = window.parent;
		if (parent && parent.postMessage) {
  			parent.postMessage("loggedout",'https://'+sessionStorage.parentDomain);
		}			
        }

},

keyPressed:function(evt){
	if(evt.keyCode == 13){
   		tryLogin();
	}	
},

tryLogin:function(){
	var form = document.getElementById('loginForm');
	inputs = form.getElementsByTagName('input');
	var params = {};
	for(var i = 0; i < inputs.length; i++){
		if(inputs[i].type != 'button'){
			params[inputs[i].id] = inputs[i].value;
		}
	}
	//This could be the ajaxy thing...
	var loginReq = new XMLHttpRequest();
	loginReq.onreadystatechange = function() {
		if (loginReq.readyState == 4 && loginReq.status == 200) {
			if(JSON.parse(loginReq.responseText) == 'success'){
				document.body.removeChild($g('loginForm'));
				document.body.removeChild($g('grayOut'));
				if($g('contentHead') == null){
					WO.init();
				}
			} else {
				$g('password').value = '';
				$g('errorText').innerHTML = 'Incorrect Username or Password';
			}
		}
	}
	loginReq.open('put', 'api/login', false);
	loginReq.send(JSON.stringify(params));
}
