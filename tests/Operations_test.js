TestCase("OperationsActionsTesters", {
	setUp: function(){
		MCOR.appName = 'paperless';
	},
	"test will show that the create_new_form will create and add the modal to the dom": function(){
		Paperless.Operations.Actions.create_new_form(); 
		assertClassName('modal', $g('ActionModal')); 	  	
	}	
});