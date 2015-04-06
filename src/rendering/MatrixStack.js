/**
 * Matrix stack for managing relative transformation trees.
 */
var MatrixStack=Class.extend({
	/** Constructor */
	init: function() {
		this.stack=[mat4.identity(mat4.create())];	///< Matrix stack
		this.allocated=[];
		for(var i=0; i<64; i++) this.allocated.push(mat4.create());
	},

	/** @return Matrix on top of the stack */
	top: function() {
		return this.stack[this.stack.length-1];
	},

	/** Pushes matrix on top of the stack that is duplicate of
		the matrix currently on top of the stack */
	push: function() {
		if(this.allocated.length==0) this.allocated.push(mat4.create());
		this.stack.push(mat4.copy(this.allocated.pop(), this.stack[this.stack.length-1]));
	},

	/** Pops topmost matrix from stack */
	pop: function() {
		this.allocated.push(this.stack.pop());
	},

	/** Multiplies matrix on top of the stack with the given matrix.
		The size of the stack will not change.
		@param matrix Instance of mat4 */
	multiply: function(matrix) {
		mat4.multiply(this.stack[this.stack.length-1], this.stack[this.stack.length-1], matrix);
	},

	/** Loads matrix as the new top matrix on the stack.
		@param matrix Instance of {mat4} */
	load: function(matrix) {
		mat4.copy(this.stack[this.stack.length-1], matrix);
	},

	/** @return Count of matrices in stack */
	size: function() {
		return this.stack.length;
	}
});