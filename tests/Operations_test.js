//These are just for the General Class
TestCase("OperationsActionsTest", {
	//This yest just check out the general elements
	setUp: function(){
		MCOR.appName = 'paperless';		
	},
	"test will show that the create_new_form will fire create the form in a modal": function(){
		var newActionForm = Paperless.Operations.Actions.create_new_form(); 
		
		assertClassName('modal', newActionForm);		
	}
	
});