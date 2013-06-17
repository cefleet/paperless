TestCase("ViewsTestInit", {
	setUp: function(){
		MCOR.appName = 'paperless';		
	},
	
	"test will show that elements for for the main Init view have been created": function(){
		var mainView = Paperless.Views.Main.init();

		assertElementId('content', mainView.childNodes[1])		
		assertElementId('navbar',mainView.childNodes[0]);

	},
	"test will show that the navbar elements are created": function(){
		var navBar = Paperless.Elements.Navigation.navbar();
		
		assertElementId('navbar', navBar);
		assertClassName('navbar-inner', navBar.childNodes[0]);
		assertClassName('brand pointer', navBar.childNodes[0].childNodes[0]);
		assertClassName('nav', navBar.childNodes[0].childNodes[1]);
		assertTagName('ul', navBar.childNodes[0].childNodes[1]);
				
	}
});

TestCase("ViewsTestActions", {
	setup: function(){
		MCOR.appName = 'paperless';

	},
	
	"test will show that the Action panel has been created": function(){
		var panel = Paperless.Views.Actions.panel();
		
		//This means that the panel function works so we don't need to worry about it anymore
		assertTagName('div', panel);
		assertClassName('well', panel);
	},
	"test will show that the Actions panel contains the table": function(){
		var panel = Paperless.Views.Actions.panel();

		assertTagName('table', panel.childNodes[1].childNodes[0]);
		var thead = panel.childNodes[1].childNodes[0].childNodes[0];
		assertEquals('Action Date',thead.childNodes[0].childNodes[0].innerHTML)
	},
	"test will show that the current items in the model will be added to the table": function(){
		//adds some data 
		var panel = Paperless.Views.Actions.panel();
		
		assertNotUndefined(panel.childNodes[1].childNodes[0].childNodes[2].childNodes[0]);
		assertEquals('fake date',panel.childNodes[1].childNodes[0].childNodes[2].childNodes[0].childNodes[0].innerHTML)		
	}
});
