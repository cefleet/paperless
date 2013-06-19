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
			var myModal = $nE('div', {
				"id":"newActionModal", 
				"class":"modal hide fade", 
				"tabindex":"-1", 
				"role":"dialog",
				"aria-labelledby":"myModalLabel",
				"aria-hidden":"true"
			}, [
				$nE('div', {"class":"modal-header"}, [
					$nE('button',{"class":"close", "data-dismiss":"modal", "aria-hidden":"true"},$cTN('x')),
					$nE('h3', {"id":"myModalLabel"}, $cTN('New Action'))
				]),
				$nE('div', {"class":"modal-body"}, [
					$cTN('Test Modal')
				]),
				$nE('div', {"class":"modal-footer"}, [
					$nE('button', {"class":"btn", "data-dismiss":"modal", "aria-hidden":"true"}, $cTN('close')),
					$nE('button',{"class":"btn btn-primary"}, $cTN('Save Changes'))
				])					
			]);
			
			return myModel;
		}	
	}
}