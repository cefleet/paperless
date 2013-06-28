Paperless.Elements = {
	General : { 
		/*
		 * Function: navbar
		 * Creates an Element navbar that can be the top of any item
		 */
		navbar : function(obj){
			var navBar = $nE('div', {"class":"navbar navbar-fixed-top"},[
				$nE('div', {"class":"navbar-inner"})
			]);	
			return navBar;
		},
		//needs a title too
		panel: function(obj){
			obj = obj || {id:'',title:''}
			var panel = $nE('div', {"id":obj.id, "class":"well well-small"},[
				$nE('div', {"class":"navbar"},[
					$nE('div', {"class":"navbar-inner"},[
						$nE('h4', {"class":"pull-left"},$cTN(obj.title))
					])
				]),
				$nE('div', {"class":"panelContent"})
			]);
			return panel;	
		},
		modal : function(obj){
			obj = obj || {id:'',title:''}
			var modal = $nE('div', {
				"id":obj.id+"Modal", 
				"class":"modal hide fade", 
				"tabindex":"-1", 
				"role":"dialog",
				"aria-labelledby":obj.id+"Label",
				"aria-hidden":"true"
			}, [
				$nE('div', {"class":"modal-header"}, [
					$nE('button',{"class":"close", "data-dismiss":"modal", "aria-hidden":"true"},$cTN('x')),
					$nE('h3', {"id":obj.id+"Label"}, $cTN(obj.title))
				]),
				$nE('div', {"class":"modal-body"}),
				$nE('div', {"class":"modal-footer"}, [
					$nE('button', {"class":"btn", "data-dismiss":"modal", "aria-hidden":"true"}, $cTN('close'))
				])					
			]);
			return modal;
		}
	},
	
	Navigation: {
		navbar: function(){
			var navBar = Paperless.Elements.General.navbar();
			$sA(navBar, {"id":"navbar"});
			$aC(navBar.childNodes[0], [
				$nE('a', {"class":"brand pointer"},$cTN('Paperless')),
				$nE('ul',{'class':'nav','id':'headerNavLinks'},[
					//TODO these should be generated
					$nE('li', {},[
						$nE('a',{"id":"clientsHeaderLink", "class":"pointer"}, $cTN('Clients'))
					]),
					$nE('li', {},[
						$nE('a',{"id":"actionsHeaderLink", "class":"pointer"}, $cTN('Actions'))
					]),
					$nE('li', {},[
						$nE('a',{"id":"actionsHeaderLink", "class":"pointer"}, $cTN('Blotters'))
					])
				])
			])
			return navBar;
		}
	},
	
	Actions : {
		//TODO Make this tie in with the models somehow		
		panel: function(){
			var actionsPanel = Paperless.Elements.General.panel({"id":"ActionsPanel","title":"Actions"});
			//adds the new button
			var newButton = $nE('button',{"class":"btn btn-primary pull-right", "id":"newActionButton"}, $cTN('New Action'));	
			$aC(actionsPanel.childNodes[0].childNodes[0], [
				newButton
			]);
			newButton.addEventListener('click', Paperless.Operations.Actions.create_new_form);
			//adds the table
			$aC(actionsPanel.childNodes[1], [
				//need a random id tagged on
				MCOR.Tables.createFromModel('actionsPanel',MCOR.Models.Actions)
			]);
			//TODO function to return the data that it needs
			return actionsPanel; 
		},
		new_action_modal: function(){
			var actionModal = Paperless.Elements.General.modal({id:"Action",title:"New Action"});
			//TODO add a form
			$aC(actionModal.childNodes[1], [
				$nE('form', {"class":"form-horizontal"},[
					$nE('div', {"class":"control-group"}, [
						MCOR.Forms.date({"fieldName":"action_date","fieldLabel":"Date / Time"}),
						MCOR.Forms.dropdown_from_table({"fieldName":"agent_id","fieldLabel":"Agent"}),	
						MCOR.Forms.dropdown({"fieldName":"action_type","fieldLabel":"Action Type", "dropdownList":{"contact":"Contact", "review":"Review","confirm":"Confirm","update":"Update"}}),
						MCOR.Forms.text({"fieldName":"client_id","fieldLabel":"Client"}),
						MCOR.Forms.dropdown({"fieldName":"account_id","fieldLabel":"Acount"}, null, true),
						MCOR.Forms.textarea({"fieldName":"notes","fieldLabel":"Action Notes"})				
						
					])
				])
			])
			return actionModal; 
		}	
	}
}