//These are just for the General Class
TestCase("ElementsTestGeneral", {
	//This yest just check out the general elements
	setUp: function(){
		MCOR.appName = 'paperless';		
	},
	"test will show that the navbar element creates the corret itmes": function(){
		var navBar = Paperless.Elements.General.navbar();
		
		assertClassName('navbar', navBar);
		assertClassName('navbar-inner',navBar.childNodes[0])
	},
	"test will show that the panel element will be created": function(){
		var panel = Paperless.Elements.General.panel();
		
		assertClassName('well', panel);
	}	
});
TestCase("ElementsTestActions", {
	//This yest just check out the general elements
	setUp: function(){
		MCOR.appName = 'paperless';
		Paperless.init();
	},
	 
	"test will show that the Action panel has been created": function(){
		var panel = Paperless.Elements.Actions.panel();
		
		//This means that the panel function works so we don't need to worry about it anymore
		assertTagName('div', panel);
		assertClassName('well', panel);
	},
	"test will show that the Actions panel contains the table": function(){
		var panel = Paperless.Elements.Actions.panel();
		assertTagName('table', panel.childNodes[1].childNodes[0]);
		var thead = panel.childNodes[1].childNodes[0].childNodes[0];
		assertEquals('Action Date',thead.childNodes[0].childNodes[0].innerHTML)
	},
	"test will show that the 'New' Action button is added": function(){
		var panel = Paperless.Elements.Actions.panel();
		
		assertTagName('button', panel.childNodes[0].childNodes[0].childNodes[1]);
	},
	
	"test will show that the 'New Action' button will react correctly": function(){
		Paperless.Operations.Actions.create_new_form = function(){
			returnValue = 'It was created';
		}
		var panel = Paperless.Elements.Actions.panel();
		var returnValue = null;	
		
		var button = panel.childNodes[0].childNodes[0].childNodes[1];
		button.click();
		//simulateClick(button);
		assertNotNull(returnValue);
	}

});
