Paperless.Operations = {
	Actions: {
		create_new_form: function(){
			//checks to see if it needs to create a modal
			if($g('newActionModal') == null){
			
				
					//this is just for testing
					$aC(document.body, [myModal]);
				}
				$('#newActionModal').modal('show');
			return myModal;
		}
	}
}
