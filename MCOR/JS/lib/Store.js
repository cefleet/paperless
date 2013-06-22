//TODO comment this
MCOR.Store = MCOR.Class({
	storeName: null,
	content: null,
	initialize : function(storeName,options){
		this.storeName = storeName;
		MCOR.Util.extend(this, options);
		MCOR.Stores[storeName] = this;
		if(!this.hasOwnProperty('content')){
			this.content = [];
		}		
	}
});
