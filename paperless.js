//TODO Minify

var daFiles = [
	"Views.js",
	"Operations.js",
	"Elements.js"
];

for (var i=0, len=daFiles.length; i<len; i++) {
	document.write("<script src='lib/" + daFiles[i] + "'></script>");
}