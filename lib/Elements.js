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
						$nE('h4', {},$cTN(obj.title))
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
	}
}