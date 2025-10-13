/*
Prototype is a creational design pattern that lets you copy existing objects 
without making your code dependent on their classes.

Problems:
1. Not all objects can be copied because some of the object’s fields 
may be private and not visible from outside of the object itself

2. Since you have to know the object’s class to create a duplicate, 
your code becomes dependent on that class

3. Sometimes you only know the interface that the object follows, 
but not its concrete class, when, for example, a parameter in a method 
accepts any objects that follow some interface

Applicability:
1.  Use the Prototype pattern when your code shouldn’t depend on 
the concrete classes of objects that you need to copy.

2. Use the pattern when you want to reduce the number of subclasses 
that only differ in the way they initialize their respective objects.
*/
class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);
    // clone.component = this.component;

    clone.circularReference = new ComponentWithBackReference(clone);

    return clone;
  }
}

function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log(
      "Primitive field values have been carried over to a clone. Yay!"
    );
  } else {
    console.log("Primitive field values have not been copied. Booo!");
  }
  if (p1.component === p2.component) {
    console.log("Simple component has not been cloned. Booo!");
  } else {
    console.log("Simple component has been cloned. Yay!");
  }

  if (p1.circularReference === p2.circularReference) {
    console.log("Component with back reference has not been cloned. Booo!");
  } else {
    console.log("Component with back reference has been cloned. Yay!");
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log(
      "Component with back reference is linked to original object. Booo!"
    );
  } else {
    console.log("Component with back reference is linked to the clone. Yay!");
  }
}

clientCode();
