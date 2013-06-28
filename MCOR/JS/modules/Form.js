	/*
 * Class: MCOR.Forms
 * A class that creates form elements
 */
MCOR.Forms  = {
	
	/*
	 * Function: hidden
	 * A hidden form. Normally used for storing data that the User does not need to see but the Database needs it to preform tasks
	 * 
	 * Parameters: 
	 * 	fieldObject - {OBJECT} 
	 * 			{ 
	 * 				fieldName: {STRING} //The column name of the field 
	 * 			}
	 * 	fieldValue - The value for this input
	 */
	
	hidden : function(fieldObject,fieldValue){
		//This keeps it from putting the the word "null" in the value	
		if(typeof fieldValue == 'undefined' || fieldValue == 'null' || fieldValue == null){
			fieldValue = '';
		}
		var elem = $nE('div', {id:'field_'.concat(fieldObject.fieldName), 'class':'hidden'});
		var input = $nE('input',{type:'hidden',id:fieldObject.fieldName, name:fieldObject.fieldName, value:fieldValue});
		elem.appendChild(input);
		return elem;
	},
	
	/*
	 * Function: text
	 * The standard text input form.
	 * 
	 * Parameters:
	 * 	fieldObject - {OBJECT}
	 * 		{
	 * 			fieldName: {STRING} //The column name of the field
	 * 			fieldLabel: {STRING} //The Label for the field
	 * 		}
	 * 	fieldValue - {STRING} The value for this input
	 *  disabled - {BOOL} Set true to have the disabled attribute set to disabled
	 */
	
	text : function(fieldObject,fieldValue,disabled){
		//The word null apperently confuses users		
		if(typeof fieldValue == 'undefined' || fieldValue == 'null' || fieldValue == null){
			fieldValue = '';
		}				
		var elem = $nE('div',{id:'field_'.concat(fieldObject.fieldName), 'class':'text control-group'},[
			$nE('label', {'for':'field_'.concat(fieldObject.fieldName), "class":"control-label"}, $cTN(fieldObject.fieldLabel)),
			$nE('div', {"class":"controls"},[
				$nE('input', {id:fieldObject.fieldName, name:fieldObject.fieldName,value:fieldValue, "type":"text"})
			]) 
		]);
		if(disabled == true){
			elem.childNodes[1].childNodes[0].setAttribute('disabled','disabled');
		}
		return elem;
	},
	/*
	 * Function: button
	 * A simple Button
	 * 
	 * Parameters:
	 * 	fieldObject - {OBJECT}
	 * 		{
	 * 			fieldName: {STRING} //The column name of the field
	 * 		}
	 * 	fieldValue - {STRING} The value for this input
	 *  disabled - {BOOL} Set true to have the disabled attribute set to disabled
	 */
	
	button : function(fieldObject,fieldValue,disabled){
		//The word null apperently confuses users		
		if(typeof fieldValue == 'undefined' || fieldValue == 'null' || fieldValue == null){
			fieldValue = '';
		}				
		var elem = $nE('div',{id:'field_'.concat(fieldObject.fieldName), 'class':'text'});
		var button = $nE('input', {id:fieldObject.fieldName, name:fieldObject.fieldName,value:fieldValue,'type':'button'});
		if(disabled == true){
			button.setAttribute('disabled','disabled');
		}
		elem.appendChild(button);
		return elem;
	},
	/*
	 * Function: textarea
	 * A Textarea Form
	 * 
	 * Parameters:
	 * 	fieldObject - {OBJECT}
	 * 		{
	 * 			fieldName: {STRING} //The column name of the field
	 * 			fieldLabel: {STRING} //The Label for the field
	 * 		}
	 * 	fieldValue - {STRING} The value for this input
	 *  disabled - {BOOL} Set true to have the disabled attribute set to disabled
	 * 
	 */
	
	textarea : function(fieldObject,fieldValue,disabled){			
		var elem = $nE('div',{id:'field_'.concat(fieldObject.fieldName), 'class':'textarea control-group'},[
			$nE('label', {'for':'field_'.concat(fieldObject.fieldName), "class":"control-label"}, $cTN(fieldObject.fieldLabel)),
			$nE('div', {"class":"controls"},[
				$nE('textarea', {id:fieldObject.fieldName, name:fieldObject.fieldName,value:fieldValue})
			]) 
		]);
		if(disabled == true){
			elem.childNodes[1].childNodes[0].setAttribute('disabled','disabled');
		}
		return elem;
	},
	
	/*
	 * Function: dropdown
	 * A Dropdown Form Element
	 * 
	 * Parameters:
	 * 	fieldObject - {OBJECT}
	 * 		{
	 * 			fieldName: {STRING} //The column name of the field
	 * 			fieldLabel: {STRING} //The Label for the field
	 * 			fieldOptions : {JSON OBJECT} (dropdownList needs to be one of the attributes)
	 * 		}
	 * 	fieldValue - {STRING} The value for this input
	 *  disabled - {BOOL} Set true to have the disabled attribute set to disabled
	 * 
	 */
	dropdown: function(fieldObject,fieldValue,disabled){
		//NO NULL FOR US!!!
		/*if(typeof fieldValue == 'undefined' || fieldValue == 'null' || fieldValue == null){
			fieldValue = '';
		}
		var elem = $nE('div',{id:'field_'.concat(fieldObject.fieldName), 'class':'dropdown'});
		var label = $nE('label',{'for':'field_'.concat(fieldObject.fieldName)});
		label.appendChild(document.createTextNode(fieldObject.fieldLabel));	
		*/
		if(typeof fieldValue == 'undefined' || fieldValue == 'null' || fieldValue == null){
			fieldValue = '';
		}
		var dropdown = $nE('select', {id:fieldObject.fieldName,name:fieldObject.fieldName});
				
		var elem = $nE('div',{id:'field_'.concat(fieldObject.fieldName), 'class':'text control-group'},[
			$nE('label', {'for':'field_'.concat(fieldObject.fieldName), "class":"control-label"}, $cTN(fieldObject.fieldLabel)),
			$nE('div', {"class":"controls"},[
				//$nE('input', {id:fieldObject.fieldName, name:fieldObject.fieldName,value:fieldValue, "type":"text"})
				dropdown
			]) 
		]);		
	
		if(disabled == true){
			dropdown.setAttribute('disabled','disabled');
		}
		//if it is JSON it's fine and it is null it is fine
		if(typeof fieldObject.dropdownList != 'object'){
			try{
			fieldObject.dropdownList = JSON.parse(fieldObject.dropdownList);
			}catch(err){
				fieldObject.dropdownList = {};
			}	
		}
		for(var option in fieldObject.dropdownList){
			var inGroup = false;
			//if it is an object ..
			if(typeof fieldObject.dropdownList[option] == 'object'){
				if(fieldObject.dropdownList[option].hasOwnProperty('group')){
					inGroup = true;
					//check to see if group is created
					var found = false;
					for(var i = 0; i<dropdown.children.length; i++){
						if(dropdown.children[i].id == fieldObject.dropdownList[option].group){
							found = true;
						}
					}
					if(found == false){
						var optionGroup = $nE('optgroup', {label:fieldObject.dropdownList[option].group, id:fieldObject.dropdownList[option].group});
						dropdown.appendChild(optionGroup);
					}					
				}
			}	
			
			if(inGroup){
				var optionElem = $nE('option', {value:option});
				optionElem.appendChild(document.createTextNode(fieldObject.dropdownList[option].label));
				if(fieldValue == option){
					optionElem.setAttribute('selected','selected');
				}
				optionGroup.appendChild(optionElem);
			} else {
				var optionElem = $nE('option', {value:option});
				optionElem.appendChild(document.createTextNode(fieldObject.dropdownList[option]));
				if(fieldValue == option){
					optionElem.setAttribute('selected','selected');
				}
				dropdown.appendChild(optionElem);
			}
		}
		//$aC(elem,[label,dropdown]);		
		return elem;
	},
	/*
	 * Function: dropdown
	 * A Dropdown Form Element
	 * 
	 * Parameters:
	 * 	fieldObject - {OBJECT}
	 * 		{
	 * 			fieldName: {STRING} //The column name of the field
	 * 			fieldLabel: {STRING} //The Label for the field
	 * 			fieldOptions : {JSON OBJECT} (dropdownList needs to be one of the attributes)
	 * 		}
	 * 	fieldValue - {STRING} The value for this input
	 *  disabled - {BOOL} Set true to have the disabled attribute set to disabled
	 * 
	 */
	
	dropdown_from_table: function(fieldObject,fieldValue,disabled){
		if(typeof fieldValue == 'undefined' || fieldValue == 'null' || fieldValue == null){
			fieldValue = '';
		}
		var dropdown = $nE('select', {id:fieldObject.fieldName,name:fieldObject.fieldName});
				
		var elem = $nE('div',{id:'field_'.concat(fieldObject.fieldName), 'class':'text control-group'},[
			$nE('label', {'for':'field_'.concat(fieldObject.fieldName), "class":"control-label"}, $cTN(fieldObject.fieldLabel)),
			$nE('div', {"class":"controls"},[
				dropdown
			]) 
		]);		
	
		if(disabled == true){
			dropdown.setAttribute('disabled','disabled');
		}
		//if it is JSON it's fine and it is null it is fine
		if(typeof fieldObject.queryInfo != 'object'){
			try{
			fieldObject.queryInfo = JSON.parse(fieldObject.queryInfo);
			}catch(err){
				fieldObject.queryInfo = {};
			}	
		}
		
		var updateList = function(resp){
			//TODO add this to the item
			console.log(dropdown);
			console.log(resp);
		}
		
		//TODO get the list of items as JSON array
		if(MCOR.Models.hasOwnProperty(fieldObject.queryInfo.model)){
			MCOR.Models[fieldObject.queryInfo.model].get_list(
				{'conditions':{
					field:fieldObject.queryInfo.field, 
					value:fieldObject.queryInfo.value}
				}, updateList);
		}
		return elem;
	},
	/*
	 * Function: checkbox
	 * A checkbox form element
	 * 
	 * Parameters:
	 * 	fieldObject - {OBJECT}
	 * 		{
	 * 			fieldName: {STRING} //The column name of the field
	 * 			fieldLabel: {STRING} //The Label for the field
	 * 			fieldOptions : {JSON OBJECT} (valueMap needs to be one of the attributes)
	 * 		}
	 * 	fieldValue - {STRING} The value for this input
	 *  disabled - {BOOL} Set true to have the disabled attribute set to disabled
	 *  
	 */
	
	checkbox : function(fieldObject,fieldValue,disabled){
		var pValues = {
			t : "true",
			f : "false"
		}
		//Checks to see if there is a valuemap set
		if(fieldObject.hasOwnProperty('fieldOptions')){
		if(fieldObject.fieldOptions.hasOwnProperty('valueMap')){
			if(typeof fieldObject.fieldOptions.valueMap != 'object'){
				fieldObject.fieldOptions.valueMap = JSON.parse(fieldObject.fieldOptions.valueMap);	
			}
			if(fieldObject.fieldOptions.valueMap.hasOwnProperty('checkbox')){
				pValues = {
					t : fieldObject.fieldOptions.valueMap.checkbox.t,
					f : fieldObject.fieldOptions.valueMap.checkbox.f
				}
			}	
		} 
		}
		//This makes sure it is true or false even if valueMap has changed.
		if(typeof fieldValue == 'undefined' || fieldValue == 'null' || fieldValue == null){
			fieldValue = pValues.f;
		} else if(fieldValue == '1' || fieldValue == 't' || fieldValue == 'true' || fieldValue == 'l' || fieldValue == 'I' || fieldValue == 'y' || fieldValue == 'yes' || fieldValue == 'YES' || fieldValue == 'Yes' || fieldValue == 'True' || fieldValue == 'T'){
			fieldValue = pValues.t;
		}
		
		var elem = $nE('div', {id:'field_'.concat(fieldObject.fieldName), 'class':'checkbox'});
		var label = $nE('label', {'for':fieldObject.fieldName}, document.createTextNode(fieldObject.fieldLabel));
		var falseBox = $nE('input',{type:'hidden',id:'false_'.concat(fieldObject.fieldName), value:pValues.f,name:fieldObject.fieldName});
		var checkbox = $nE('input',{type:'checkbox',id:fieldObject.fieldName,value:pValues.t,name:fieldObject.fieldName});
				
		if(disabled == true){
			checkbox.setAttribute('disabled','disabled');
		}
		if(fieldValue == pValues.t){
			checkbox.setAttribute('checked','checked');
		}
		if(fieldObject.bootstrap){
			$aC(label, [checkbox]);
			$aC(elem,[falseBox,label]);
		} else {
			$aC(elem,[label,falseBox,checkbox]);
		}
		return elem;
	},
	
	/*
	 * Function: date
	 * The standard text input form with the default being todays date.
	 * 
	 * Parameters:
	 * 	fieldObject - {OBJECT}
	 * 		{
	 * 			fieldName: {STRING} //The column name of the field
	 * 			fieldLabel: {STRING} //The Label for the field
	 * 			fieldDateType: {STRING} // ['date','datetime']
	 * 		}
	 * 	fieldValue - {STRING} The value for this input should be a date
	 *  disabled - {BOOL} Set true to have the disabled attribute set to disabled
	 */
	
	date : function(fieldObject,fieldValue,disabled){		
		//The word null apperently confuses users		
		if(typeof fieldValue == 'undefined' || fieldValue == 'null' || fieldValue == null){
			fieldValue = '';
		}				
		var elem = $nE('div',{id:'field_'.concat(fieldObject.fieldName), 'class':'date control-group', 'disabled':'disabled'},[
			$nE('label', {'for':'field_'.concat(fieldObject.fieldName), "class":"control-label"}, $cTN(fieldObject.fieldLabel)),
			$nE('div', {"class":"controls input-append", "id":fieldObject.fieldName+"_datePicker"},[
				$nE('input', {
					"class":"uneditable-input",
					"id":"fieldObject.fieldName", 
					"name":"fieldObject.fieldName",
					"value":fieldValue, 
					"data-format":"MM/dd/yyyy HH:mm:ss PP", 
					"type":"text"
				}),
				$nE('span', {"class":"add-on"},$nE('i', {"data-time-icon":"icon-time", "data-date-icon":"icon-calendar"}))
			]) 
		]);
		if(disabled == true){
			elem.childNodes[1].setAttribute('disabled','disabled');
		}		
		//TODO this is not html5 but I do like it 
		//just need to have a way to disable this if it is not going to be rendered soon
		var id = 'field_'+fieldObject.fieldName;
		var checkingToAdd = setInterval(function(){
			if(document.body.contains($g(id))) {
				$('#'+id).datetimepicker({
      				language: 'en',
      				pick12HourFormat: true
    			});
    			clearInterval(checkingToAdd);
    		}    	
		}, 300);
    	
		return elem;
	},
	
 	backup : {}
}