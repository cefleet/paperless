TestCase("ViewTest", {
	setUp: function(){
		MCOR.appName = 'paperless';		
	},
	
	"test will show that elements for for the main Init view have been created": function(){
		var mainView = Paperless.Views.Main.init();

		assertElementId('content', mainView)		
		assertElementId('navbar',mainView.childNodes[0]);
		assertElementId('contentBody', mainView.childNodes[1]);

	},
	"test will show that the navbar elements are created": function(){
		var navBar = Paperless.Views.Main.navBar();
		
		assertElementId('navbar', navBar);
		assertClassName('navbar-inner', navBar.childNodes[0]);
		
	}
});