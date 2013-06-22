TestCase('CreateModelTest', {
	setup: function(){  
	},
	tearDown: function(){
		localStorage.clear();
	},
	"test will show new Model is instance of Model": function(){ 
		var myModel = new MCOR.Model('MyModel');
		assert(myModel instanceof MCOR.Model); 
	},
	"test will show that the model's name will be the what it is assigned": function(){
		var rString = Math.random().toString(36).substring(7);
		var myModel1 = new MCOR.Model(rString);
		assertSame(myModel1.modelName, rString);
	},
	"test will show that the Model will have default parameters": function(){
		var myModel2 = new MCOR.Model();
		assertTrue(myModel2.hasOwnProperty('pk'));
		assertTrue(myModel2.hasOwnProperty('dbTable'));
		assertTrue(myModel2.hasOwnProperty('structure'));
	},
	"test will show that the new model accepts the initilize parameters": function(){
		var pk = Math.random().toString(36).substring(7);
		var dbTable = Math.random().toString(36).substring(7);
		
		var myModel3 = new MCOR.Model('myModelName', dbTable, pk);
		assertSame(myModel3.dbTable, dbTable);
		assertSame(myModel3.pk,pk);
	},
	"test will show that the new model will accept the structure": function(){
		var structure = {
			param1:true
		}
		var myModel4 = new MCOR.Model('myModelName', 'someTable','pkField', structure);
		assertSame(structure.param1,myModel4.structure.param1);
	},
	"test will show that the new model's structure will contain the fields and order parameters": function(){
		var structure = {
			param1:true
		}
		var myModel4 = new MCOR.Model('myModelName', 'someTable','pkField', structure);
		assertTrue(myModel4.structure.hasOwnProperty('fields'));
		assertTrue(myModel4.structure.hasOwnProperty('order'));		
	},
	"test will show that the new Model will be added to the Models Namespace": function(){
		var modeName = Math.random().toString(36).substring(7);
		var myModel5 = new MCOR.Model(modeName);
		assertTrue(MCOR.Models.hasOwnProperty(modeName)); 
	},
	"test will show that the new Model will have a store created and then added to the Model": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel6 = new MCOR.Model(modelName);
		assertTrue(MCOR.Stores.hasOwnProperty(modelName));
		assertTrue(myModel6.hasOwnProperty('store'));
	},
	"test will show that the 'new' way of making a model can be used": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myInit = {
			pk:'myPk',
			dbTable:'myDBTable',
			structure: {param1:true},
			conType: 'RAPI'
		}
		var myModel = new MCOR.Model(modelName, myInit);
		assertSame(myInit.pk, myModel.pk);
		assertSame(myInit.dbTable, myModel.dbTable);
		assertSame(myInit.conType, myModel.conType);
	},
	"test will show that if the conType 'LocS' is set then the storage will be created": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myInit = {
			pk:'uid',
			conType: 'LocS'
		}
		var myModel = new MCOR.Model(modelName, myInit);
		assertString(localStorage["myApp.MCOR."+modelName]);
	}		
});

TestCase("ModelApplySingle", {
	"test show the create ModelItem works" : function(){
		var modelName = Math.random().toString(36).substring(7);
		new MCOR.Model(modelName);
		var resp = {"param1":"value1","param2":"value1","pkParam":"pkValue"};
		MCOR.Models[modelName].apply_single(resp);
		assertObject(MCOR.Models[modelName].store.content[0].content);		
	},	
	"test shows that the Pk is applied to the newly created modelItem's id field": function(){
		var modelName = Math.random().toString(36).substring(7);
		var pkValue = Math.random().toString(36).substring(7);
		new MCOR.Model(modelName,null,'pkParam');
		var resp = {"param1":"value1","param2":"value1","pkParam":pkValue};
		MCOR.Models[modelName].apply_single(resp);
		assertEquals(pkValue, MCOR.Models[modelName].store.content[0].id);
	},
	"test shows that the callback function is exicuted": function(){
		var modelName = Math.random().toString(36).substring(7);
		var pkValue = Math.random().toString(36).substring(7);
		new MCOR.Model(modelName,null,'pkParam');
		var resp = {"param1":"value1","param2":"value1","pkParam":pkValue};
		var testFunc = function(values){
			MCOR.Models[modelName].returnAttribute = 'returned';
		}
		MCOR.Models[modelName].apply_single(resp, {
			callback:testFunc
		});
		assertEquals('returned', MCOR.Models[modelName].returnAttribute);
	},
	"test shows that the callBack Options are added to the callback": function(){
		var modelName = Math.random().toString(36).substring(7);
		var pkValue = Math.random().toString(36).substring(7);
		new MCOR.Model(modelName,null,'pkParam');
		var resp = {"param1":"value1","param2":"value1","pkParam":pkValue};
		
		var testFunc = function(values, options){
			MCOR.Models[modelName].returnOptions = options;
		}
		MCOR.Models[modelName].apply_single(resp, {
			callback:testFunc,
			callBackOptions: {param1:"Parameter1"}
		});
		assertEquals("Parameter1", MCOR.Models[modelName].returnOptions.param1);
	},
	"test shows that the callBack Options are an extended object, not the same object": function(){
		var modelName = Math.random().toString(36).substring(7);
		var pkValue = Math.random().toString(36).substring(7);
		new MCOR.Model(modelName,null,'pkParam');
		var resp = {"param1":"value1","param2":"value1","pkParam":pkValue};
		
		var testFunc = function(values, options){
			MCOR.Models[modelName].returnOptions = options;
		}
		var cBO = {param1:"Parameter1"};
		MCOR.Models[modelName].apply_single(resp, {
			callback:testFunc,
			callBackOptions: cBO 
		});
		cBO.param1 = 'Parameter2';
		assertEquals('Parameter2', cBO.param1);
		assertEquals("Parameter1", MCOR.Models[modelName].returnOptions.param1);
	},
	"test shows that a modelItem is returned":function(){
		var modelName = Math.random().toString(36).substring(7);
		new MCOR.Model(modelName);
		var resp = {"param1":"value1","param2":"value1","pkParam":"pkValue"};
		var modelItem = MCOR.Models[modelName].apply_single(resp);
		assertInstanceOf(MCOR.ModelItem, modelItem);
	}
});

TestCase("AddModelItem", {
	"test to show that an array of model Items has been added to the model": function(){
		var modelItems = [];
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var resp1 = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};
		var resp2 = {"param1":"value3","param2":"value4","pkParam":"pkValue2"};
		modelItems.push(MCOR.Models[modelName].apply_single(resp1));
		modelItems.push(MCOR.Models[modelName].apply_single(resp2));
						
		assertTrue(myModel.store.content.length == modelItems.length);	
		assertEquals(resp1.pkParam, myModel.store.content[0].id);
		assertEquals(resp2.pkParam, myModel.store.content[1].id); 
	},
	
	"test shows that if an item with the same id is given the new item replaces the old item": function(){
		var modelItems = [];
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var resp1 = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};
		var resp2 = {"param1":"value3","param2":"value4","pkParam":"pkValue2"};
		var resp3 = {"param1":"value5","param2":"value6","pkParam":"pkValue1"};

		modelItems.push(new MCOR.ModelItem(resp1, {pk:'pkParam'}));
		modelItems.push(new MCOR.ModelItem(resp2, {pk:'pkParam'}));	
		modelItems.push(new MCOR.ModelItem(resp3, {pk:'pkParam'}));
		
		myModel.add_model_items(modelItems);
		assertTrue(resp2.pkParam == myModel.store.content[1].id); 
		assertEquals(resp3.param1,myModel.store.content[0].content.param1);	
		assertEquals(2,myModel.store.content.length);
	},
	"test shows that if an item with the same id is given the new item replaces the old item": function(){
		var modelItems = [];
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var resp1 = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};
		var resp2 = {"param1":"value3","param2":"value4","pkParam":"pkValue2"};
		var resp3 = {"param1":"value5","param2":"value6","pkParam":"pkValue1"};

		modelItem = new MCOR.ModelItem(resp1);
		modelItem1 = new MCOR.ModelItem(resp2);	
		modelItem2 = new MCOR.ModelItem(resp3);
		
		myModel.add_model_items([modelItem]);
		myModel.add_model_items([modelItem1]);
		myModel.add_model_items([modelItem2]);
		assertEquals(2,myModel.store.content.length);
	}
});

TestCase('RemoveModelItemById', {
	"test removes an item from the model's store based on id": function(){
		var modelItems = [];
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var resp1 = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};
		var resp2 = {"param1":"value3","param2":"value4","pkParam":"pkValue2"};
		
		modelItems.push(new MCOR.ModelItem(resp1, {pk:'pkParam'}));
		modelItems.push(new MCOR.ModelItem(resp2, {pk:'pkParam'}));	
		myModel.add_model_items(modelItems);

		myModel.remove_model_item("pkValue1");
		assertEquals(1,myModel.store.content.length);
		assertSame(resp2.pkParam,myModel.store.content[0].id);
	},
	"test will return true if an item was removed": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var resp1 = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};		
		myModel.add_model_items([new MCOR.ModelItem(resp1, {pk:'pkParam'})]);

		var returned = myModel.remove_model_item("pkValue1");
		assertTrue(returned);
	},
	"test will return false if an item was not removed": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var resp1 = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};		
		myModel.add_model_items([new MCOR.ModelItem(resp1, {pk:'pkParam'})]);

		var returned = myModel.remove_model_item("noValue");
		assertFalse(returned);
	}
});

TestCase('GetItemById', {
	"test returns a ModelItem from the Model's store": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var resp1 = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};
		var myModelItem = new MCOR.ModelItem(resp1, {pk:'pkParam', model:myModel});		
		
		var foundModelItem = myModel.get_item_by_id("pkValue1");
		assertSame(myModelItem, foundModelItem);		
	},
	"test returns null if no item was found": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		
		var foundModelItem = myModel.get_item_by_id("pkValue1");
		assertNull(foundModelItem);
	}
});

TestCase('ApplyList', {
	"test will apply a list of data sets to the model": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		
		var values = [
			{"param1":"value1","param2":"value2","pkParam":"pkValue1"},
			{"param1":"value3","param2":"value4","pkParam":"pkValue2"},
			{"param1":"value5","param2":"value6","pkParam":"pkValue3"}
		]
		myModel.apply_list(values);		
		assertSame(values[0].pkParam, myModel.store.content[0].id);
	},
	"test will show that an aray of the items are returned": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		
		var values = [
			{"param1":"value1","param2":"value2","pkParam":"pkValue1"},
			{"param1":"value3","param2":"value4","pkParam":"pkValue2"},
			{"param1":"value5","param2":"value6","pkParam":"pkValue3"}
		]
		var returnedItems = myModel.apply_list(values);
		assertArray(returnedItems);		
		assertSame(values[0].pkParam,returnedItems[0].id);
		assertSame(values[1].pkParam,returnedItems[1].id);
		assertSame(values[2].pkParam,returnedItems[2].id);
	}
});

TestCase('SetSingle',{
	"test will show that the callback is exicuted" : function(){
		var modelName = Math.random().toString(36).substring(7);
		var randVal = Math.random().toString(36).substring(7);

		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var values = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};
		var myFuncRe;
		
		var myFunc = function(modelItem){
			myFuncRe = randVal; 
		}
		
		myModel.set_single(values,myFunc);		
		assertEquals(randVal, myFuncRe);
	},
	"test will show that it will not fail if there is no callback": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var values = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};
						
		assertNoException(function(){
			myModel.set_single(values)
		});
	},
	"test will show that the item will be added to the model's store": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var values = {"param1":"value1","param2":"value2","pkParam":"pkValue1"};
		myModel.set_single(values);			
		assertSame(values.pkParam,myModel.store.content[0].id);	
	}
});
TestCase('SetList',{
	"test will show that the callback is exicuted" : function(){
		var modelName = Math.random().toString(36).substring(7);
		var randVal = Math.random().toString(36).substring(7);

		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var values = [
			{"param1":"value1","param2":"value2","pkParam":"pkValue1"},
			{"param1":"value1","param2":"value2","pkParam":"pkValue2"},
			{"param1":"value1","param2":"value2","pkParam":"pkValue3"}
		]
		var myFuncRe;
		
		var myFunc = function(modelItem){
			myFuncRe = randVal; 
		}
		
		myModel.set_list(values,myFunc);		
		assertEquals(randVal, myFuncRe);
	},
	"test will show that an error will not be thrown if there is no callback" : function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var values = [
			{"param1":"value1","param2":"value2","pkParam":"pkValue1"},
			{"param1":"value1","param2":"value2","pkParam":"pkValue2"},
			{"param1":"value1","param2":"value2","pkParam":"pkValue3"}
		]						
		assertNoException(function(){
			myModel.set_list(values)
		});
	},
	"test will show that the callback returns the correct value": function(){
		var modelName = Math.random().toString(36).substring(7);
		var myModel = new MCOR.Model(modelName, null, 'pkParam');
		var values = [
			{"param1":"value1","param2":"value2","pkParam":"pkValue1"},
			{"param1":"value1","param2":"value2","pkParam":"pkValue2"},
			{"param1":"value1","param2":"value2","pkParam":"pkValue3"}
		]
		var myFuncRe;
		var myFunc = function(modelItem){
			myFuncRe = modelItem; 
		}		
		myModel.set_list(values,myFunc)
		assertSame(myFuncRe[0].id, myModel.store.content[0].id);
	}
});

//TODO test all of the callbacks
TestCase('ModelCreateItemLocalStorage',{
	setUp:function(){
		this.data = {
			"name":"John Doe",
			"address":"The address",
			"occupation":"where I work",
			"id":"myId"
		},
		this.data1 = {
			"name":"John Doe",
			"address":"The address",
			"occupation":"where I work",
			"id":"myId2"
		},
		this.modelName = Math.random().toString(36).substring(7); 
	},
	"test will save an item in Local Storage": function(){
		var myModel = new MCOR.Model(this.modelName,{conType:"LocS"});
		myModel.create_item(this.data);
		assertEquals(this.data,JSON.parse(localStorage["myApp.MCOR."+this.modelName])[0]);
		assertEquals(this.data, myModel.store.content[0].content);
		
	},
	"test will show that several items can be added in order":function(){
		var myModel = new MCOR.Model(this.modelName,{conType:"LocS"});
		myModel.create_item(this.data);
		myModel.create_item(this.data);
		myModel.create_item(this.data);

		assertEquals(3,JSON.parse(localStorage["myApp.MCOR."+this.modelName]).length);
	},
	"test will show that an item with the same id will overwrite the older one in LocalStorage":function(){
		var myModel = new MCOR.Model(this.modelName,{conType:"LocS",pk:'id'});
		myModel.create_item(this.data);
		myModel.create_item(this.data1);
		newVals = MCOR.Util.extend({},this.data);
		newVals.name = 'new John Doe';
		newVals.occupation = 'not employed';
		myModel.create_item(newVals); 
		assertEquals(2,JSON.parse(localStorage["myApp.MCOR."+this.modelName]).length);
	},
	"test will show that an item with the same id will overwrite the older one in the Model's store":function(){
		var myModel = new MCOR.Model(this.modelName,{conType:"LocS",pk:'id'});
		myModel.create_item(this.data);
		myModel.create_item(this.data1);
		newVals = MCOR.Util.extend({},this.data);
		newVals.name = 'new John Doe';
		newVals.occupation = 'not employed';
		myModel.create_item(newVals); 
		assertEquals(2,myModel.store.content.length);  
	}
});
TestCase('ModelUpdateItemLocalStorage',{
	setUp:function(){
		this.data1 = {
			"name":"John Doe",
			"address":"The address",
			"occupation":"where I work",
			"id":"myId2"
		},
		this.modelName = Math.random().toString(36).substring(7); 
		this.myModel = new MCOR.Model(this.modelName,{conType:"LocS", "pk":"id"});
		this.myModel.create_item(this.data1);
	},
	"test will update an item in LocalStorage":function(){
		var myUpdateData = {
			"name":"John Doe #2",
			"address":"A new Address",
			"occupation":"zoo keeper",
			"id":"myId2"
		}
		this.myModel.update_item('myId2',myUpdateData);
		assertSame('A new Address',JSON.parse(localStorage["myApp.MCOR."+this.modelName])[0].address);
	}
});
TestCase('ModelGetSingleLocalStorage',{
	setUp:function(){
		this.data0 = {
			"name":"John Doe",
			"address":"The address",
			"occupation":"where I work",
			"id":"myId1"
		},
		this.data1 = {
			"name":"Number 2 id",
			"address":"The address of number 2",
			"occupation":"where I work number 2",
			"id":"myId2"
		},
		this.modelName = Math.random().toString(36).substring(7); 
		this.myModel = new MCOR.Model(this.modelName,{conType:"LocS", "pk":"id"});
		localStorage["myApp.MCOR."+this.modelName] = JSON.stringify([this.data0,this.data1]);
	},
	"test will grab an item from LocalStorage and place it in the model's store":function(){
		var myFunc = function(modelItem){
			this.theItem = modelItem;
		}
		this.myModel.get_single('myId2',myFunc);
		this.myModel.get_single('myId1',myFunc);

		assertEquals(2,this.myModel.store.content.length);
		assertEquals("myId2",this.myModel.store.content[0].id);	  
	}
});
TestCase('ModelDeleteItemFromLocalStorage',{
	setUp:function(){
		this.data0 = {
			"name":"Number 2 id",
			"address":"The address of number 2",
			"occupation":"where I work number 2",
			"id":"myId2"
		},
		this.modelName = Math.random().toString(36).substring(7); 
		this.myModel = new MCOR.Model(this.modelName,{conType:"LocS", "pk":"id"});
		this.myModel.create_item(this.data0);
	},
	"test will delete an item from local storage":function(){
		assertEquals(1,JSON.parse(localStorage["myApp.MCOR."+this.modelName]).length);
		assertEquals(this.data0.name,JSON.parse(localStorage["myApp.MCOR."+this.modelName])[0].name);

		this.myModel.delete_item(this.data0[this.myModel.pk]);
		assertEquals(0,JSON.parse(localStorage["myApp.MCOR."+this.modelName]).length);
	},
	"test will delete an item from the Model's store when deleted from LocalStorage" : function(){
		assertEquals(1,JSON.parse(localStorage["myApp.MCOR."+this.modelName]).length);
		assertEquals(this.data0.name,JSON.parse(localStorage["myApp.MCOR."+this.modelName])[0].name);
		
		this.myModel.delete_item(this.data0[this.myModel.pk]);
		assertEquals(0, this.myModel.store.content.length);		
	}
});
TestCase("GetListItemsFromLocalStorage", {
	setUp:function(){
		this.data0 = {
			"name":"John Doe",
			"address":"The address",
			"occupation":"where I work",
			"id":"myId1"
		},
		this.data1 = {
			"name":"Number 2 id",
			"address":"The address of number 2",
			"occupation":"where I work number 2",
			"id":"myId2"
		},
		this.data2 = {
			"name":"Number 3 name",
			"address":"Number 3's address",
			"occupation":"unemployed",
			"id":"3"
		},
		this.data3 = {
			"name":"Number 4 name",
			"address":"Number 4's address",
			"occupation":"programmer",
			"id":"4thId"
		},
		this.modelName = Math.random().toString(36).substring(7); 
		this.myModel = new MCOR.Model(this.modelName,{conType:"LocS", "pk":"id"});
		localStorage["myApp.MCOR."+this.modelName] = JSON.stringify([this.data0,this.data1,this.data2,this.data3]);
	},
	"test will retreive all items in LocalStorage for that model and apply them correctly": function(){
		this.myModel.get_list();		
		assertEquals(4,this.myModel.store.content.length);
		assertEquals("myId2", this.myModel.store.content[1].id);
		assertEquals("myId1", this.myModel.store.content[0].id);
		assertEquals("The address of number 2",this.myModel.store.content[1].content.address);
	},
	"test will limit the search to a set amount of items in LocalStorage": function(){
		this.myModel.get_list({limit:2});
		assertEquals(2,this.myModel.store.content.length); 
	},
	"test will retreive items in the described order": function(){
		this.myModel.get_list({order:{orderByField:'occupation'}});
		assertEquals(this.myModel.store.content[0].id,'4thId');
	}, 
	"test will retreive items in order and limit the amount": function(){
		this.myModel.get_list({order:{orderByField:'occupation'},limit:2});
		console.log(this.myModel);
		assertEquals(2,this.myModel.store.content.length);
		assertEquals('4thId',this.myModel.store.content[0].id); 
	}
});