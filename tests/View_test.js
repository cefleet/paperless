TestCase("ViewsTestInit", {
	setUp: function(){
		MCOR.appName = 'paperless';
		simulateClick = function(elem) {
			var evt = document.createEvent("MouseEvents");
  			evt.initMouseEvent("click", true, true, window,
   			0, 0, 0, 0, 0, false, false, false, false, 0, null);
			elem.dispatchEvent(evt);
		}	
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