TestCase('CreateModelItemTest', {
	"test will show new ModelItem is instance of ModelItem": function(){
		var myModelItem = new MCOR.ModelItem();
		assertInstanceOf(MCOR.ModelItem, myModelItem);
	},
	"test shows that a modelItem returned has the correct values":function(){
		var values = {"param1":"value1","param2":"value2","pkParam":"pkValue"};
		var myModelItem = new MCOR.ModelItem(values);
		assertEquals(values.param1, myModelItem.content.param1);
	},
	"test shows that a modelItem will generate an id if a model is not provided": function(){
		var values = {"param1":"value1","param2":"value2","pkParam":"pkValue"};
		var myModelItem = new MCOR.ModelItem(values);
		assertString(myModelItem.id);
	},
	"test will show that the pk will be assinged to the id from the content if it is the model's pk" : function(){
		var modelName = Math.random().toString(36).substring(7);
		var pkValue = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName,null,'pkParam');
		var values = {"param1":"value1","param2":"value1","pkParam":pkValue};
		var myModelItem = new MCOR.ModelItem(values, {model:myModel});
		assertEquals(pkValue, myModelItem.id);
	},
	"test will show that the pk will be generated if the content does not match the models structure" : function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName);
		var myModelItem = new MCOR.ModelItem(null, {model:myModel});
		assertNotNull(myModelItem);
		assertNotUndefined(myModelItem);
	},
	"test will show that the the id will be assigend the value of the pk parameter" : function(){
		var pkValue = Math.random().toString(36).substring(7);
		var values = {"param1":"value1","param2":"value1","pkParam":pkValue};
		var myModelItem = new MCOR.ModelItem(values, {pk:"pkParam"});
		assertEquals(pkValue, myModelItem.id);
	},
	"test will show that the pk parameter will overide the model's pk" : function(){
		var modelName = Math.random().toString(36).substring(7);
		var pkValue = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName,null,'pkParam');
		var values = {"param1":"value1","param2":"value2","pkParam":pkValue};
		var myModelItem = new MCOR.ModelItem(values, {model:myModel, pk:"param2"});
		assertEquals(values.param2, myModelItem.id); 
	}
});