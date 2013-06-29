TestCase("LawnchairTest", {
	setUp: function(){
		MCOR.appName = 'paperless';
	},
	"test will show that lawnchair works": function(){
		var store = new Lawnchair({adapter:['indexed-db', 'webkit-sqlite'], table:'test'});
		store.save({key:'someItems', cats:{breeds:['kalico', 'tabby']}});
		
		store.all(function(r){ console.log(r) });     
	},
	"test will show that the model works properly": function(){
		var lawnTest = new MCOR.Model('LawnTest', {
			pk:'id',
			structure: {
				fields: {
					id:{label:"id",formType:"hidden"},
					fake:{label:"Fake", formType:"text"},
					good:{label:"Good",formType:"text"}
				}
			}
		});
		//This is not using the model
		lawnTest.localDB.save({key:"123456", lawnTestItem:{"fake":"It is fake", "good":"it is not good"}})
		
		lawnTest.localDB.all(function(r){console.log(r)});
		//lawnTest.localDB.
		lawnTest.get_single("123456", function(r){
			console.log(r);
		});
	}
});