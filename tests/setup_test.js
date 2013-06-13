TestCase("SetupApp", {
	setUp: function(){
		MCOR.appName = 'paperless';		
	},
	
	"test will show that the models have been created": function(){
		Paperless.Setup.create_models();
		
		assertObject(Paperless.Models.Clients);
		assertObject(Paperless.Models.Accounts);
		assertObject(Paperless.Models.Actions);	
		assertObject(Paperless.Models.Files);
		assertObject(Paperless.Models.Steps);
	}
});