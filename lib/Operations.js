Paperless.Operations = {
	Actions : {
		create_new_form : function(){
			//checks to see if it needs to create a modal
			if($g('newActionModal') == null){
				$aC(document.body,[Paperless.Elements.Actions.new_action_modal()]);
			}
			$('#ActionModal').modal('show');
		}
	}  
}
 