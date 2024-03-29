import Serializable from 'scene/Serializable';
import Transform from './components/Transform';
import Component from './components/Component';
import MeshRendererComponent from './components/MeshRendererComponent';
import BoundingBox from './geometry/BoundingBox';
import BoundingSphere from './geometry/BoundingSphere';

/** Scene-node class that keeps only subnodes and components. Transform component is omitted */

class Node extends Serializable {
	name: any;
	subnodes: any;
	components: Component[];
	scene: any;
	parent: any;
	layer: any;
	tags: any;
	transform: Transform;
	isInstanced: boolean;
	localCollisionID: any;

	/** Constructs new node */
	constructor(name?) {
		super();
		this.name=name?name:"Node";
		this.subnodes=[];
		this.components=[];
		this.scene=false;
		this.parent=false;
		this.layer=1;
		this.tags=[];
		this.transform=this.addComponent(new Transform());
		this.localCollisionID = -1; // This is used to map nodes in the model sub-graph
	}

	excluded(): any {
		return ["parent", "scene", "transform"];
	}

	type(): any {
		return "EmptyNode";
	}

	// --------- Methods ---------
	/** Add new node */
	addNode(node): any {
		if (!(node instanceof Node))
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
	}

	/** Removes given node */
	removeNode(node): any {
		var scope = this;
		if (this.scene.engine) {
			node.onEachChildComponent(function (c) {
				if (c.started)
					c.onEnd(scope.scene.engine.context, scope.scene.engine);
				c.started = false;
			});
		}
		node.onRemove(this);
		if (node.scene) {
			node.onEachChildComponent(function (c) {
				c.onRemoveScene(scope);
				c.node.onRemoveComponent(c);
			});
		}
		node.onEachChild(function (n) {
			n.scene = false;
		});
		node.parent = false;
		for (var i=0; i<this.subnodes.length; i++) {
			if (this.subnodes[i] == node) {
				this.subnodes.splice(i, 1);
				break;
			}
		}
		return node;
	}

	/** Removes all subnodes of this node */
	removeSubnodes(): any {
		var nodes = this.subnodes.slice(0);	// Create a temporary copy of nodes list
		for (var i=0; i<nodes.length; i++) {
			this.removeNode(nodes[i]);
		}
	}

	/** Adds component to this node */
	addComponent<T extends Component>(component: T): T {
		if (!component.type())
			throw "Unable to add a component that doesn't define it's type by returning it from type() method";

		this.components.push(component);
		component.node = this;
		component.onAdd(this);

		if (this.scene) {
			component.onAddScene(this);
			this.onAddComponent(component);
		}
		if (!component.started && this.scene && this.scene.engine && (this.scene.started || this.scene.starting)) {
			component.start(this.scene.engine.context, this.scene.engine);
			component.started = true;
		}
		return component;
	}

	/** Removes component from this node */
	removeComponent(component: Component): Component {
		for (var c=0; c<this.components.length; c++) {
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
		component.node=undefined;
		return component;
	}

	/** Removes all components of the given type */
	removeComponentsByType(componentType): any {
		var removed=[];
		for (var i=0; i<this.components.length; i++) {
			if (this.components[i] instanceof componentType) {
				removed.push(this.components[i]);
				this.components.splice(i, 1);
				i--;
			}
		}
		for (var i=0; i<removed.length; i++) {
			if(this.scene.engine && removed[i].started) {
				removed[i].onEnd(this.scene.engine.context, this.scene.engine);
				removed[i].started=false;
			}
			if(this.scene) {
				removed[i].onRemoveScene(this);
				this.onRemoveComponent(removed[i]);
			}
			removed[i].onRemove(this);
			removed[i].node=undefined;
		}
		return removed;
	}

	/** Returns the first component of the given type */
	getComponent<A extends Component>(componentType: new(...args: any[]) => A): A {
		for (var c=0; c<this.components.length; c++) {
			if (this.components[c] instanceof componentType)
				return this.components[c] as A;
		}
		return null;
	}

	/** Returns all components of the given type */
	getComponents(componentType): any {
		var a=[];
		for (var c=0; c<this.components.length; c++) {
			if (this.components[c] instanceof componentType)
				a.push(this.components[c]);
		}
		if (a.length==0)
			return false;
		return a;
	}

	/** Calculates relative transform of the node from it's own absolute transform
		and the absolute transform of its parent */
	calculateRelativeFromAbsolute(): any {
		if(!this.parent.transform) return;
		this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute);
	}

	/** Creates a clone from the semi-deep clone from the node.
		All child nodes and all components are also instantiated and can decide which parts of
		them are copied and which parts will reference original data. In general
		geometrical data is referenced and materials are instantiated such that
		shader and textures are referenced, but uniforms are cloned. */
	instantiate(): any {
		var instance = new Node(this.name);
		instance.isInstanced = true;
		instance.localCollisionID = this.localCollisionID;
		instance.removeComponentsByType(Transform);
		instance.layer = this.layer;
		instance.tags = this.tags.slice(0);
		for (var i=0; i<this.subnodes.length; i++) {
			instance.addNode(this.subnodes[i].instantiate());
		}
		for (var c=0; c<this.components.length; c++) {
			instance.addComponent(this.components[c].instantiate());
		}
		instance.transform = instance.getComponent(Transform);
		return instance;
	}

	/** Enables this node and all its subnodes
		@param onlyThisNode If true, then this function is not recursive [optional] */
	enable(onlyThisNode): any {
		if(onlyThisNode) this.onEachComponent(function(c) { c.enable(); } );
		else this.onEachChildComponent(function(c) { c.enable(); } );
	}

	/** Disable this node and all its subnodes
		@param onlyThisNode If true, then this function is not recursive [optional] */
	disable(onlyThisNode): any {
		if(onlyThisNode) this.onEachComponent(function(c) { c.disable(); } );
		else this.onEachChildComponent(function(c) { c.disable(); } );
	}

	// --------- Events ---------
	/** Called when this node is added to parent node */
	onAdd(parent): any {}

	/** Called when this node is removed from parent node */
	onRemove(parent): any {}

	/** Called when component is added and this node is under a scene */
	onAddComponent(component): any {
		this.scene.components.push(component);

		if(component.onUpdate!=Component.prototype.onUpdate) this.scene.updatedComponents.push(component);
		if(component.onPreRender!=Component.prototype.onPreRender) this.scene.preRenderedComponents.push(component);
		if(component.onPostRender!=Component.prototype.onPostRender) this.scene.postRenderedComponents.push(component);
	}

	/** Called when component is removed and this node was under a scene */
	onRemoveComponent(component): any {
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
	}

	// --------- Iterators ---------
	/** Calls callback method on this node and all child nodes */
	onEachChild(callback): any {
		if (callback(this) === true)
			return true;
		for (var i=0; i<this.subnodes.length; i++) {
			if (this.subnodes[i].onEachChild(callback) === true)
				return true;
		}
	}

	/** Calls callback method on all child nodes, but not on this node */
	onEachChildExclusive(callback): any {
		for (var i=0; i<this.subnodes.length; i++) {
			if (this.subnodes[i].onEachChild(callback) === true)
				return true;
		}
	}

	/** Calls callback method on all child nodes, but not their children */
	onEachDirectChild(callback): any {
		for (var i=0; i<this.subnodes.length; i++) {
			if (callback(this.subnodes[i]) === true)
				return true;
		}
	}

	/** Calls callback method on all components of this node */
	onEachComponent(callback): any {
		for (var c=0; c<this.components.length; c++) {
			if (callback(this.components[c]) === true)
				return true;
		}
	}

	/** Calls callback method on all components of this node and its child nodes */
	onEachChildComponent(callback): any {
		this.onEachChild(function(child) {
			if (child.onEachComponent(callback) === true)
				return true;
		});
	}

	/** Calls callback method on all components of child nodes, but not on this node */
	onEachChildComponentExclusive(callback): any {
		this.onEachChildExclusive(function(child) {
			if (child.onEachComponent(callback) === true)
				return true;
		});
	}

	/** Gets all components in this node or child nodes
		@param type Type of component to be searched for
		@return An array of components */
	getChildComponentsOfType(type): any {
		var result=[];
		this.onEachChildComponent(function(c) {
			if(c instanceof type) result.push(c);
		});
		return result;
	}

	/** Finds Nodes by slash-delimited ('/') path.
		If the path starts with a '/' the search begins at the root node of the scene.
		Otherwise the subtree of the current node is searched.
		@param path A path to a Node
		@return {Node} at the given path or false if the target was not found */
	find(path): any {
		var parts = path.split("/");
		if (parts.length==0) return false;
		var node: any = this;
		if (parts[0]==="") {
			if (!this.scene)
				return false;
			node = this.scene.root;
			parts.shift();
		}
		for (var i=0; i<parts.length; i++) {
			node = node.findChildWithName(parts[i]);
			if (node===false)
				return false;
		}
		return node;
	}

	/** Returns the first immediate subnode to this node that has the given name.
		@param name The name of the subnode
		@return Instance of {Node} or false if the target was not found */
	findChildWithName(name): any {
		for (var i=0; i<this.subnodes.length; i++) {
			if (this.subnodes[i].name===name)
				return this.subnodes[i];
		}
		return false;
	}

	/**
	 * Returns the absolute path of this node in the scene tree
	 * as a slash-delimited string. Mostly useful in debug situations.
	 */
	path() {
		var path = [];
		var node = this;
		while (node) {
			path.push(node.name);
			node = node.parent;
		}
		return '/' + path.reverse().join('/');
	}

	/** Calculates axis-aligned bounding-box of this node and all its subnodes */
	getBoundingBox(excludeInvisible): any {
		var bb = new BoundingBox();
		this.onEachChildComponent(function (c) {
			if (c instanceof MeshRendererComponent) bb.encapsulateBox(c.getBoundingBox(excludeInvisible));
		});
		return bb;
	}

	/** Calculates bounding-sphere of this node and all its subnodes */
	getBoundingSphere(excludeInvisible): any {
		var bb = new BoundingSphere();
		this.onEachChildComponent(function (c) {
			if (c instanceof MeshRendererComponent) bb.encapsulateSphere(c.getBoundingSphere(excludeInvisible));
		});
		return bb;
	}


	/** Updates absolute transforms of all child-nodes */
	updateChildTransforms(): any {
		var index, c, l1, l2, subnode;
		var absolute = this.transform.absolute;
		var subnodes = this.subnodes;
		for (index = 0, l1 = subnodes.length; index < l1; index++) {
			subnode = subnodes[index];
			if(!subnode.transform) continue;

			mat4.multiply(subnode.transform.absolute, absolute, subnode.transform.relative);
			subnode.updateChildTransforms();
		}

		for (c = 0, l2 = this.components.length; c < l2; c++) {
			this.components[c].onUpdateTransform(absolute);
		}
	}

	/** Sets absolute position of attached transform component
		@param position Absolute position as vec3 */
	setAbsolutePosition(position) {
		if(!this.parent || !this.parent.transform) {	// No parent given
			this.transform.calculateRelativeFromAbsolute();
			return;
		}
		// This one loses scale:
		mat4.fromRotationTranslationScale(this.transform.absolute, quat.fromMat4(quat.create(), this.transform.absolute), position, mat4.getScale(vec3.create(), this.transform.absolute));
		this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute);
	}
}

(globalThis as any).Node = Node;
export default Node;
