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