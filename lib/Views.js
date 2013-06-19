Paperless.Views = {
	Main: {
		init: function(){

			var navItem = Paperless.Elements.Navigation.navbar();
			var content = $nE('div', {"id":"content", "class":"container"},[
				/* Each of these will have their own view */
				//Paperless.Elements.General.panel({"id":"ActionsPanel", "title":"Actions"}),
				Paperless.Elements.Actions.panel(),
				Paperless.Elements.General.panel({"id":"ImportantPanel", "title":"Important"}),
				Paperless.Elements.General.panel({"id":"BlotterPanel", "title":"Blotter"})
			]);	
			
			return $nE('div', {},[navItem,content])
		}
		
	}
}
