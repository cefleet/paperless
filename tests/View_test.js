TestCase("ViewTest", {
	setUp: function(){
		MCOR.appName = 'paperless';		
	},
	
	"test will show that the main view has been created": function(){
		var mainView = Paperless.Views.Main.init();
		
		assertNotUndefined(mainView.childNodes[0]);
		
	}
});