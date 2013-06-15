Paperless.Views = {
	Main: {
		init: function(){
			var content = $nE('div', {"id":"content", "class":"container"},[
				Paperless.Views.Main.navBar(),
				Paperless.Views.Main.contentBody()
			]);	
			var contentBody = content.childNodes[1];
			
			$aC(contentBody,[
				
			]);
			return content;		
		},
		
		navBar : function(){
			var navBar = $nE('div', {"class":"navbar navbar-fixed-top", "id":"navbar"},[
				$nE('div', {"class":"navbar-inner"},[
					$nE('a',{'class':"brand"}, $cTN('Paperless')),
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
			]);
			return navBar;
		},
		contentBody: function(){
			var contentBody = $nE('div', {'id':'contentBody'});
			return contentBody;
		}
	},
	Alerts : {
		container: function(){
			
		}
	}
}
