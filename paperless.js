//TODO Minify di be gone

var daFiles = [
	"Views.js",
	"Operations.js",
	"Elements.js"
];

for (var i=0, len=daFiles.length; i<len; i++) {
	document.write("<script src='lib/" + daFiles[i] + "'></script>");
}

var Paperless = {
	//create some setup stuff here
	Setup : {
		create_models : function(){
			Paperless.Models = MCOR.Models;
			//TODO all of these can be config files or DB entries						
			new MCOR.Model('Clients', {
				pk:'id',
				structure:{
					fields:{
						id:{label:'Id', formType:'hidden'},
						first_name:{label:'First Name', formType:'text'},
						last_name:{label:'Last Name', formType:'text'},
						notes:{label:'Notes', formType:'textarea'},
						folders:{label:'Folders', formType:'textarea'}						
					}
				 }	
			});			 
			new MCOR.Model('Accounts', {
				pk:'id',
				structure:{
					fields:{
						id:{label:'Id', formType:'hidden'},
						//different formtype and have some way of linking them (MCOR change)
						client_id:{label:'Client', formType:'text'},
						//TODO this needs to be dropdown
						account_type_id:{label:'Account Type', formType:'text'},
						notes:{label:'Notes', formType:'textarea'},
						steps:{label:'Steps', formType:'textarea'}						
					}
				 }	
			});
			new MCOR.Model('Actions', {
				pk:'id',
				structure:{
					fields:{
						id:{label:'Id', formType:'hidden'},
						//different formtype and have some way of linking them (MCOR change)
						client_id:{label:'Client', formType:'text'},
						account_id:{label:'Acount', formType:'textarea'},
						action_type:{label:'Action Type', formType:'text'},
						date:{label:'Action Date', formType:'text'},
						notes: {label:'Notes', formType:'textarea'},
						agent:{label:'Agent', formType:'text'}						
					},
					order:['date','agent','action_type','notes','client_id', 'account_id']
				 }	
			});
			new MCOR.Model('Files', {
				pk:'id',
				structure:{
					fields:{
						id:{label:'Id', formType:'hidden'},
						//different formtype and have some way of linking them (MCOR change)
						client_id:{label:'Client', formType:'text'},
						account_id:{label:'Account', formType:'text'},
						location:{label:'Location', formType:'text'},
						folder:{label:'Folder', formType:'text'},
						notes:{label:'Notes', formType:'textarea'}						
					}
				 }	
			});
			new MCOR.Model('Blotters', {
				pk:'id',
				structure:{
					fields:{
						id:{label:'Id', formType:'hidden'},
						account_type_id:{label:'Account Type', formType:'text'},
						account_id:{label:'Account Type', formType:'text'},
						step:{label:'Steps', formType:'text'}
					}
				 }	
			});
			new MCOR.Model('Agents', {
				pk:'id',
				structure:{
					fields:{
						id:{label:'Id', formType:'hidden'},
						name:{label:'Agent Name', formType:'text'},
						step:{label:'Steps', formType:'text'}
					}
				 }	
			});						
		}
	},
	
	init: function(){
		Paperless.Setup.create_models();
		$aC(document.body, [Paperless.Views.Main.init()]);
	}	
}
