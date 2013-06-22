/*
 * Class: MCOR.Tables
 * A simple class to eaisly create tables
 */
MCOR.Tables = {
	
	/*
	 * Function: create
	 * Creates the table 
	 * 
	 * Parameters:
	 * 	id - {STRING} The id of the table
	 *  columns - {OBJECT} Object of column name and label 
	 * 			{
	 * 				column : {
	 * 					label : 'Label'
	 * 				}
	 * 			}
	 * 
	 * Returns: DOM table Object
	 */
	
	create : function(id,columns,tClass){
		var table = $nE('table', {id:id, 'class':tClass});
		table.createTHead();
		table.createTFoot();
		for(var column in columns){
			var newTH = $nE('th',{id:'col_'.concat(column), name:column},[
				$cTN(columns[column].label)
			]);
			table.tHead.appendChild(newTH);	
		}
		return table;
	},
	
	//TODO objectify it
	createFromModel : function(id,model,tClass){
		if(typeof tClass == 'undefined') tClass = 'table table-bordered table-striped';
		var table = $nE('table', {id:id, 'class':tClass},[
			$nE('thead',{}, $nE('tr')),
			$nE('tfoot',{}, $nE('tr')),
			$nE('tbody',{})
		]);
		
		for(var i = 0; i<model.structure.order.length; i++){
			var column = model.structure.order[i];
			if(model.structure.fields[column].formType != 'hidden'){
				var newTH = $nE('th',{id:'col_'.concat(column), name:column},[
					$cTN(model.structure.fields[column].label)
				]);
				table.tHead.childNodes[0].appendChild(newTH);			
			} 
		}
		return table; 
	},
	
	/*
	 * Function: addRowsToTable
	 * Adds multipe rows to a table
	 * 
	 * values - {ARRAY} the ordered values 
	 * table - {STRING} The DOM id of the table
	 * pk - {STRING} The primary key of the database table associated with the DOM table
	 * rowEvent - {FUNCTION} - The function to execute when a row is clicked
	 */
	//TODO the pk field needs to have several options like pk, class, etc this is too a simplistic to be very useful
	addRowsToTable : function(values, table){
		var rows = [];
		var colArray = [];
		for(var i = 0; i < table.tHead.childNodes[0].children.length; i++){
			var column = table.tHead.childNodes[0].children[i].getAttribute('name');
			colArray.push(column);
		}

		for(var i = 0; i<values.length; i++){
			var rowCells = [];					
			for(var c = 0; c<colArray.length; c++){
				var inside = '';
				if(values[i].hasOwnProperty(colArray[c])){
					inside = values[i][colArray[c]];
				}
				rowCells.push($nE('td',{"name":colArray[c]}, $cTN(inside)));
			}
			rows.push($nE('tr', {}, rowCells));	
		}
		$aC(table.childNodes[2], rows); 
	},
	 
	addRowToTableFromModel: function(model,table,classes,rowEvent, options){
		//this knows the structure already so it can skip quite a bit
		for(var i = 0; i<model.store.content.length; i++){
			var go = true;
			if(options != null && model.store.content[i].content[options.condition.column] != options.condition.value){
				go = false;
			}
			if(go == true){
				var item = model.store.content[i];
				var newRow = table.insertRow(-1);
				for(var j = 0; j < classes.length; j++){
					newRow.className += ' '+item.content[classes[j]];	
				}
				newRow.addEventListener('click', rowEvent.bind(model.store.content[i]));
				for(var j = 0; j < model.structure.order.length; j++){
					if(model.structure.fields[model.structure.order[j]].formType != 'hidden'){
						var newCell = document.createElement('td');
						if(item.content.hasOwnProperty(model.structure.order[j])){	
							newCell.appendChild(document.createTextNode(item.content[model.structure.order[j]]));
						}
						newCell.setAttribute('name', model.structure.order[j]);
						newRow.appendChild(newCell);
					}
				}
			}
		}
	},
	
	/*
	 * Function: getParentTableLayout
	 * determines the layout of a table based on a child in the table.
	 * The table needs to be created by MCOR create in order for this to work.
	 * 
	 * Parameters: 
	 *  element - {DOM OBJECT} The object inside a table.
	 * 
	 * Returns: 
	 *   Array of DOM names of the table
	 */
	
	getParentTableLayout : function(element){
		var parenting = function(element){
			if(element.tagName == 'BODY' || element.tagName == 'TABLE'){
				MCOR.Tables.temp = element;
				parentTable = element;
				return;
			}
			element = parenting(element.parentElement);
		}
		//this just set a variable (parentTable)
		parenting(element);
		var colArray = [];
		for(var i = 0; i < parentTable.tHead.children.length; i++){
			var column = parentTable.tHead.children[i].getAttribute('name');
			colArray.push(column);
		}
		return colArray;
	}
}