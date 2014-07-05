var DataParserNode = function(id, length, position) {
	this.id=id;
	this.length=length;
	this.position=position;
	this.HEADER_LENGTH = 8;
	
	this.end = function() {
		return this.position+this.HEADER_LENGTH+this.length;
	}
};