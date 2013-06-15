TestCase("SetupApp", {
	setUp: function(){
		MCOR.appName = 'paperless';		
	},
	
	"test will show that the models have been created": function(){
		Paperless.Setup.create_models();
		
		assertInstanceOf(MCOR.Model, Paperless.Models.Clients);
		assertInstanceOf(MCOR.Model, Paperless.Models.Accounts);
		assertInstanceOf(MCOR.Model, Paperless.Models.Actions);	
		assertInstanceOf(MCOR.Model, Paperless.Models.Files);
		assertInstanceOf(MCOR.Model, Paperless.Models.Blotters);
		assertInstanceOf(MCOR.Model, Paperless.Models.Agents);
		
	} 
});