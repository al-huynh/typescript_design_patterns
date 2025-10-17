/*
Decorator is a structural design pattern that lets you attach new behaviors 
to objects by placing these objects inside special wrapper objects that contain the behaviors.

Applicability:
1. Use the Decorator pattern when you need to be able to assign extra behaviors to objects 
at runtime without breaking the code that uses these objects.

2. Use the pattern when it’s awkward or not possible to extend an object’s behavior 
using inheritance.
*/

interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}

class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

function clientCode(component: Component): void {
  console.log(`RESULT: ${component.operation()}`);
}

const simple = new ConcreteComponent();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");

const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
