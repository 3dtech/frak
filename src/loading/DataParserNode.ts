class DataParserNode {
	id;
	length;
	position;
	HEADER_LENGTH;

	constructor(id, length, position) {
		this.id = id;
		this.length = length;
		this.position = position;
		this.HEADER_LENGTH = 8;
	}

	end() {
		return this.position + this.HEADER_LENGTH + this.length;
	}
}

globalThis.DataParserNode = DataParserNode;
export default DataParserNode;
