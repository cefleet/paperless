MCOR = {
	version : '.01a',
	Stores: {},
	Models: {}
}

//When it is minified from here Down will be the mini version of this
var libFiles = [
	"Util.js",
	"Class.js",
	"Model.js",
	"ModelItem.js",
	"Store.js"
];

for (var i=0, len=libFiles.length; i<len; i++) {
	document.write("<script src='MCOR/JS/lib/" + libFiles[i] + "'></script>");
} 
//add these individually
//Form
document.write("<script src='MCOR/JS/modules/Ajax.js'></script>");
document.write("<script src='MCOR/JS/modules/Table.js'></script>");
document.write("<script src='MCOR/JS/modules/Form.js'></script>");


