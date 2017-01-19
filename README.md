# onbeforecreate

Allow Mithril components to circumvent DOM creation

## Why?

The canonical use case involves components whose instances are required to move about the page. Consider a drag-and-drop interface: if the component moves from one position to another in the same parent, you can simply use the `key` attribute and rely on Mithril to move the DOM and maintain state. But if the DOM needs to move 'up and down', ie the component is inserted into another parent, you will need to define the logic for juggling DOM and state yourself. But when this situation does arise you have to fight the framework every step of the way, because the draw loop has become our enemy - you want to move a component instance but you can't update from one parent to another, and you can't avoid new DOM being created. The component API becomes your enemy.

onbeforecreate solves this by providing a component factory that allows a new `onbeforecreate` method with similar semantics to `onbeforeupdate`, which runs before `oninit` and - if the method returns `false` - skips `oninit`, DOM creation, and `oncreate`, giving you a stateful component that plays nicely with Mithril's vdom but allowing you full control over the component's initial lifecycle loop.

***

More to come
