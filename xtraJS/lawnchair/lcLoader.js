var libFiles = [
	"lawnchair.js",
	"indexed-db.js",
	"webkit-sqlite.js",
	"pagination.js",
	"query.js",
	"callbacks.js",
	"aggregation.js"
];

for (var i=0, len=libFiles.length; i<len; i++) {
	document.write("<script src='xtraJS/lawnchair/" + libFiles[i] + "'></script>");
}