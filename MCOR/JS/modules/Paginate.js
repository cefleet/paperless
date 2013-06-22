/*
 * Class: MCOR.Paginate
 * A Class to present Pagination
 */
MCOR.Paginate = {
	start_pageing: function(model, location){
		//this hooks into the model.
		model.paginate.page = 1;
		
		//i could just set these but this is for me to see what is going on.
		this.set_next(model);
		this.set_previous(model);
		model.paginate.pages = Math.ceil(model.paginate.count/model.paginate.limit); 
		this.create_pager(model);
	},
	
	set_next: function(model){
		var next = model.paginate.page+1;
		if(next > model.paginate.pages){
			next = null;
		}
		model.paginate.next = next;
	},
	
	set_previous: function(model){
		var previous = model.paginate.page-1;
		if(previous <= 0){
			previous = null;
		}
		model.paginate.previous = previous;
	},
	
	create_pager: function(model, type){
		//for now type is just going to be a "standard"
		if(type == null){
			type = 'standard';
		}
		model.paginate.domId = 'pagingId_'+(new Date().getMilliseconds());
		model.paginate.dom = createElementWithAttributes('div', {id:model.paginate.domId, 'class':'pager'});
		
		var previous = createElementWithAttributes('a', {id:model.paginate.domId+'_previous', 'class':'pager_previous'});
		previous.appendChild(document.createTextNode('<'));		
		model.paginate.dom.appendChild(previous);
		
		var current = createElementWithAttributes('span', {id:model.paginate.domId+'_current', 'class':'pager_current'});
		current.appendChild(document.createTextNode(model.paginate.page));
		model.paginate.dom.appendChild(current);
		
		var next = createElementWithAttributes('a', {id:model.paginate.domId+'_next', 'class':'pager_next'});
		next.appendChild(document.createTextNode('>'));		
		model.paginate.dom.appendChild(next);
		
		this.update_pager(model);
	},
	
	previous: function(){
		this.paginate.page = this.paginate.previous;
		MCOR.Paginate.set_next(this);
		MCOR.Paginate.set_previous(this);
		this.get_list(this.paginate.queryString+'&limit='+this.paginate.limit+'&page='+this.paginate.page, function(resp){
			this.paginate.returnFunction(resp);
			MCOR.Paginate.update_pager(this);
			this.paginate.placeFunction();
		}.bind(this));
	},
	next: function() {
		this.paginate.page = this.paginate.next;
		MCOR.Paginate.set_next(this);
		MCOR.Paginate.set_previous(this);
		this.get_list(this.paginate.queryString+'&limit='+this.paginate.limit+'&page='+this.paginate.page, function(resp){
			this.paginate.returnFunction(resp);
			MCOR.Paginate.update_pager(this);
			this.paginate.placeFunction();
		}.bind(this));
	},
	
	update_pager: function(model){
		if(!model.hasOwnProperty('next')) {
			model.next = '';
			model.previous = '';
		}
		model.paginate.dom.children[1].innerHTML = model.paginate.page;
		
		if(model.paginate.previous == null){
			model.paginate.dom.children[0].setAttribute('class','disabled');				
		} else {
			model.paginate.dom.children[0].className = model.paginate.dom.children[0].className.replace('disabled','pager_previous');
			model.paginate.dom.children[0].removeEventListener('click', model.previous, false);
			model.paginate.dom.children[0].addEventListener('click', model.previous = this.previous.bind(model), false);
		}

		if(model.paginate.next == null){
			model.paginate.dom.children[2].setAttribute('class','disabled');
		} else {
			model.paginate.dom.children[2].className = model.paginate.dom.children[2].className.replace('disabled','pager_next');
			model.paginate.dom.children[2].removeEventListener('click', model.next, false);
			model.paginate.dom.children[2].addEventListener('click', model.next = this.next.bind(model), false);
		}
	}
}