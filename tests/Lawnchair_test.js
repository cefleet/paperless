TestCase("LawnchairTest", {
	setUp: function(){
		MCOR.appName = 'paperless';
	},
	"test will show that lawnchair works": function(){
		var store = new Lawnchair({adapter:['indexed-db','webkit-sqlite'], table:'test'});
		store.save({key:'someItems', cats:{breeds:['kalico', 'tabby']}});
		
		store.all(function(r){ console.log(r) });
	}	
});