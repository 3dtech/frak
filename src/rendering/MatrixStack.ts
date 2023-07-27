

/**
 * Matrix stack for managing relative transformation trees.
 */

class MatrixStack {
	stack: any;
	allocated: any;
	
	/** Constructor */
	constructor() {
		this.stack=[mat4.identity(mat4.create())];	///< Matrix stack
		this.allocated=[];
		for(var i=0; i<64; i++) this.allocated.push(mat4.create());
	}

	/** @return Matrix on top of the stack */
	top(): any {
		return this.stack[this.stack.length-1];
	}

	/** Pushes matrix on top of the stack that is duplicate of
		the matrix currently on top of the stack */
	push(): any {
		if(this.allocated.length == 0) {
			this.allocated.push(mat4.create());
		}
		this.stack.push(mat4.copy(this.allocated.pop(), this.stack[this.stack.length-1]));
	}

	/** Pops topmost matrix from stack */
	pop(): any {
		this.allocated.push(this.stack.pop());
	}

	/** Multiplies matrix on top of the stack with the given matrix.
		The size of the stack will not change.
		@param matrix Instance of mat4 */
	multiply(matrix): any {
		mat4.multiply(this.stack[this.stack.length-1], this.stack[this.stack.length-1], matrix);
	}

	/** Loads matrix as the new top matrix on the stack.
		@param matrix Instance of {mat4} */
	load(matrix): any {
		mat4.copy(this.stack[this.stack.length-1], matrix);
	}

	/** @return Count of matrices in stack */
	size() {
		return this.stack.length;
	}

}

globalThis.MatrixStack = MatrixStack;

export default MatrixStack;