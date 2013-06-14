Paperless.Views = {
	Main: {
		init: function(){
						
		},
		navBar : function(){
			var navBar = $nE('div', {"class":"navbar navbar-fixed-top"},[
				$nE('div', {"class":"navbar-inner"},[
					$nE('a',{'class':"brand"}, $cTN('Paperless')),
					$nE('ul',{'class':'nav','id':'headerNavLinks'},[
						//TODO these should be generated
						$nE('li', {},[
							$nE('a',{"id":"clientsHeaderLink", "href":''}, $cTN('Clients'))
						]),
						$nE('li', {},[
							$nE('a',{"id":"actionsHeaderLink", "href":""}, $cTN('Actions'))
						])
					])
				])
			]);
			return navBar;
		}
	}
}
