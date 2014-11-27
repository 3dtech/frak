/** Scene-node class that keeps only subnodes and components. Transform component is omitted */
var EmptyNode=Serializable.extend({
	/** Constructs new node */
	init: function(name) {
		this._super();
		this.name=name?name:"Empty Node";
		this.subnodes=[];
		this.components=[];
		this.scene=false;
		this.parent=false;
		this.layer=1;
		this.tags=[];
		// this._super(); // FIXME: remove this or implement init() in Serializable
	},

	excluded: function() {
		return ["parent", "scene"];
	},

	type: function() {
		return "EmptyNode";
	},

	// --------- Methods ---------
	/** Add new node */
	addNode: function(node) {
		if (!(node instanceof EmptyNode))
			throw "addNode: The given node is not a subclass of EmptyNode";

		this.subnodes.push(node);
		var me=this;
		node.parent=this;
		node.onEachChild(function(n) { n.scene=me.scene; });
		if(node.scene) {
			node.onEachChildComponent(function(c) { c.onAddScene(me); c.node.onAddComponent(c); });
		}
		node.onAdd(this);
		if(me.scene.engine) {
			node.onEachChildComponent(function(c) {
				if(!c.started) {
					if(me.scene.starting || me.scene.started===false) {
						me.scene.startingQueue.push(c);
					}
					else {
						c.onLoad(me.scene.engine.assetsManager, me.scene.engine);
						c.start(me.scene.engine.context, me.scene.engine);
						c.started=true;
					}
				}
			});
		}
		return node;
	},

	/** Removes given node */
	removeNode: function(node) {
		var me=this;
		if(me.scene.engine) node.onEachChildComponent(function(c) { if(c.started) c.onEnd(me.scene.engine.context, me.scene.engine); c.started=false; });
		node.onRemove(this);
		if(node.scene) node.onEachChildComponent(function(c) { c.onRemoveScene(me); c.node.onRemoveComponent(c); });
		node.onEachChild(function(n) { n.scene=false; });
		node.parent=false;
		for(var i in this.subnodes) {
			if(this.subnodes[i]==node) {
				this.subnodes.splice(i, 1);
				break;
			}
		}
		return node;
	},

	/** Removes all subnodes of this node */
	removeSubnodes: function() {
		var nodes=this.subnodes.slice(0);	// Create a temporary copy of nodes list
		for(var n in nodes) {
			this.removeNode(nodes[n]);
		}
	},

	/** Adds component to this node */
	addComponent: function(component) {
		if(!component.type()) throw "Unable to add a component that doesn't define it's type by returning it from type() method";
		this.components.push(component);
		component.node=this;
		component.onAdd(this);
		if(this.scene) {
			component.onAddScene(this);
			this.onAddComponent(component);
		}
		if(this.scene.engine && !component.started) {
			component.start(this.scene.engine.context, this.scene.engine);
			component.started=true;
		}
		return component;
	},

	/** Removes component from this node */
	removeComponent: function(component) {
		for (var c in this.components) {
			if (this.components[c]===component) {
				this.components.splice(c, 1);
				break;
			}
		}
		if(this.scene.engine && component.started) {
			component.onEnd(this.scene.engine.context, this.scene.engine);
			component.started=false;
		}
		if(this.scene) {
			component.onRemoveScene(this);
			this.onRemoveComponent(component);
		}
		component.onRemove(this);
		component.node=false;
		return component;
	},

	/** Removes all components of the given type */
	removeComponentsByType: function(componentType) {
		var removed=[];
		for (var i=0; i<this.components.length; i++) {
			if (this.components[i] instanceof componentType) {
				removed.push(this.components[i]);
				this.components.splice(i, 1);
				i--;
			}
		}
		for (var i in removed) {
			if(this.scene.engine && removed[i].started) {
				removed[i].onEnd(this.scene.engine.context, this.scene.engine);
				removed[i].started=false;
			}
			if(this.scene) {
				removed[i].onRemoveScene(this);
				this.onRemoveComponent(removed[i]);
			}
			removed[i].onRemove(this);
			removed[i].node=false;
		}
		return removed;
	},

	/** Returns the first component of the given type */
	getComponent: function(componentType) {
		for (var c in this.components) {
			if (this.components[c] instanceof componentType)
				return this.components[c];
		}
		return false;
	},

	/** Returns all components of the given type */
	getComponents: function(componentType) {
		var a=[];
		for (var c in this.components) {
			if (this.components[c] instanceof componentType)
				a.push(this.components[c]);
		}
		if (a.length==0)
			return false;
		return a;
	},

	/** Calculates relative transform of the node from it's own absolute transform
		and the absolute transform of its parent */
	calculateRelativeFromAbsolute: function() {
		if(!this.parent.transform) return;
		this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute);
	},

	/** Creates a clone from the semi-deep clone from the node.
		All child nodes and all components are also instantiated and can decide which parts of
		them are copied and which parts will reference original data. In general
		geometrical data is referenced and materials are instantiated such that
		shader and textures are referenced, but uniforms are cloned. */
	instantiate: function() {
		var instance=new EmptyNode(this.name+' (instance)');
		instance.layer=this.layer;
		instance.tags=this.tags.slice(0);
		for(var n in this.subnodes) {
			instance.addNode(this.subnodes[n].instantiate());
		}
		for(var c in this.components) {
			instance.addComponent(this.components[c].instantiate());
		}
		return instance;
	},

	/** Enables this node and all its subnodes
		@param onlyThisNode If true, then this function is not recursive [optional] */
	enable: function(onlyThisNode) {
		if(onlyThisNode) this.onEachComponent(function(c) { c.enable(); } );
		else this.onEachChildComponent(function(c) { c.enable(); } );
	},

	/** Disable this node and all its subnodes
		@param onlyThisNode If true, then this function is not recursive [optional] */
	disable: function(onlyThisNode) {
		if(onlyThisNode) this.onEachComponent(function(c) { c.disable(); } );
		else this.onEachChildComponent(function(c) { c.disable(); } );
	},

	// --------- Events ---------
	/** Called when this node is added to parent node */
	onAdd: function(parent) {},

	/** Called when this node is removed from parent node */
	onRemove: function(parent) {},

	/** Called when component is added and this node is under a scene */
	onAddComponent: function(component) {
		this.scene.components.push(component);

		if(component.onUpdate!=Component.prototype.onUpdate) this.scene.updatedComponents.push(component);
		if(component.onPreRender!=Component.prototype.onPreRender) this.scene.preRenderedComponents.push(component);
		if(component.onPostRender!=Component.prototype.onPostRender) this.scene.postRenderedComponents.push(component);
	},

	/** Called when component is removed and this node was under a scene */
	onRemoveComponent: function(component) {
		function removeIfExists(list, component) {
			var index=list.indexOf(component);
			if(index!=-1) {
				list.splice(index, 1);
				return;
			}
		};

		removeIfExists(this.scene.components, component);

		if(component.onUpdate!=Component.prototype.onUpdate) removeIfExists(this.scene.updatedComponents, component);
		if(component.onPreRender!=Component.prototype.onPreRender) removeIfExists(this.scene.preRenderedComponents, component);
		if(component.onPostRender!=Component.prototype.onPostRender) removeIfExists(this.scene.postRenderedComponents, component);
	},

	// --------- Iterators ---------
	/** Calls callback method on this node and all child nodes */
	onEachChild: function(callback) {
		callback(this);
		for(var node in this.subnodes) this.subnodes[node].onEachChild(callback);
	},

	/** Calls callback method on all child nodes, but not on this node */
	onEachChildExclusive: function(callback) {
		for(var node in this.subnodes) {
			this.subnodes[node].onEachChild(callback);
		}
	},

	/** Calls callback method on all components of this node */
	onEachComponent: function(callback) {
		for(var c in this.components) {
			callback(this.components[c]);
		}
	},

	/** Calls callback method on all components of this node and its child nodes */
	onEachChildComponent: function(callback) {
		this.onEachChild(function(child) {
			child.onEachComponent(callback);
		});
	},

	/** Calls callback method on all components of child nodes, but not on this node */
	onEachChildComponentExclusive: function(callback) {
		this.onEachChildExclusive(function(child) {
			child.onEachComponent(callback);
		});
	},

	/** Gets all components in this node or child nodes
		@param type Type of component to be searched for
		@return An array of components */
	getChildComponentsOfType: function(type) {
		var result=[];
		this.onEachChildComponent(function(c) {
			if(c instanceof type) result.push(c);
		});
		return result;
	},

	/** Finds Nodes by slash-delimited ('/') path.
		If the path starts with a '/' the search begins at the root node of the scene.
		Otherwise the subtree of the current node is searched.
		@param path A path to a Node
		@return {Node} at the given path or false if the target was not found */
	find: function(path) {
		var parts = path.split("/");
		if (parts.length==0) return false;
		var node = this;
		if (parts[0]==="") {
			if (!this.scene)
				return false;
			node = this.scene.root;
			parts.shift();
		}
		for (var i in parts) {
			node = node.findChildWithName(parts[i]);
			if (node===false)
				return false;
		}
		return node;
	},

	/** Returns the first immediate subnode to this node that has the given name.
		@param name The name of the subnode
		@return Instance of {Node} or false if the target was not found */
	findChildWithName: function(name) {
		for (var i in this.subnodes) {
			if (this.subnodes[i].name===name)
				return this.subnodes[i];
		}
		return false;
	}
});