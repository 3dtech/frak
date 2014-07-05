/**
 * Threaded 3DTech DATA format parser
 **/
var ThreadedDataParser=DataParser.extend({
	/**
	 * Constructor
	 * @param data - The binary data of the model file
	 * @param cbOnComplete - Callback that will be called when parsing has finished successfully
	 * @param cbOnError - Callback that will be called if the parser encounters an error and aborts the parsing process
	 * @param cbOnProgress - Callback that will be called periodically to notify the external application of the parsing progress
	 * @param userdata - Userdata that will be passed to all callbacks in the last argument
	 */
	init: function(data, cbOnComplete, cbOnError, cbOnProgress, userdata) {
		this._super(data, cbOnComplete, cbOnError, cbOnProgress, userdata);
		this.timer=false;
		this.inverval=10;
	},
	
	parse: function() {
		this.push(false, this.parseHeader);
		this.timer=setTimeout(ClassCallback(this, this.threadStep), this.inverval);
		return true;
	},
	
	threadStep: function() {
		if (this.completed()) {
			if (this.linkReferences)
				this.result.linkReferences();
			if ($.isFunction(this.onComplete))
				this.onComplete(this.result.getData(), this.userdata);
			return;
		}
		if (!this.step()) {
			if (this.onError && typeof this.onError === "function")
				this.onError(this.errors, this.userdata);
			return;
		}
		this.timer=setTimeout(ClassCallback(this, this.threadStep), this.inverval);
	}
});