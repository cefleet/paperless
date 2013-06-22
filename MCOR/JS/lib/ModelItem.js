MCOR.ModelItem = MCOR.Class({
	initialize : function(content,options){
		if(typeof options == 'undefined') options = {}
		this.content = {};
		MCOR.Util.extend(this.content, content);
		MCOR.Util.extend(this, options);
		this.id = (Math.random().toString(36).substring(5))+(new Date().getTime().toString(36));
		if(this.model != null){
			if(typeof this.content[this.model.pk] != 'undefined'){
				this.id = this.content[this.model.pk];
			} 
			this.model.add_model_items([this]);

		}
		if(options.hasOwnProperty('pk')){
			if(this.content.hasOwnProperty(options.pk)){
				this.id = this.content[options.pk];
			}
		}
	}
});

MCOR.ModelItem.prototype = {
		
}