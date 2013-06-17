Paperless.Views = {
	Main: {
		init: function(){

			var navItem = Paperless.Elements.Navigation.navbar();
			var content = $nE('div', {"id":"content", "class":"container"},[
				/* Each of these will have their own view */
				//Paperless.Elements.General.panel({"id":"ActionsPanel", "title":"Actions"}),
				Paperless.Views.Actions.panel(),
				Paperless.Elements.General.panel({"id":"ImportantPanel", "title":"Important"}),
				Paperless.Elements.General.panel({"id":"BlotterPanel", "title":"Blotter"})
			]);	
			
			return $nE('div', {},[navItem,content])
		}
		
	},
	Actions : {
		//TODO Make this tie in with the models somehow		
		panel: function(){
			var actionsPanel = Paperless.Elements.General.panel();
			$aC(actionsPanel.childNodes[1], [
				//need a random id tagged on
				MCOR.Tables.createFromModel('actionsPanel',MCOR.Models.Actions)
			]);
			//add some data
			var values = [{date:"fake date",agent:"Clint Fleetwood"},{date:"fake date 2", agent:"Anna Fleetwood"}];	
			MCOR.Tables.addRowsToTable(values,actionsPanel.childNodes[1].childNodes[0]);

			return actionsPanel; 
		},
		
	}
}
