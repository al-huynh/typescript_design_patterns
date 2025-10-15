/*
Bridge is a structural design pattern that lets you split a large class
or a set of closely related classes into two separate hierarchies—abstraction 
and implementation—which can be developed independently of each other.

Applicability:
1. Use the Bridge pattern when you want to divide and organize a 
monolithic class that has several variants of some functionality 
(for example, if the class can work with various database servers).

2. Use the pattern when you need to extend a class in several 
orthogonal (independent) dimensions.

3. Use the Bridge if you need to be able to switch implementations at runtime.
*/

class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}

class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

interface Implementation {
  operationImplementation(): string;
}

class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on the platform B.";
  }
}

function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}

let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log("");

implementation = new ConcreteImplementationB();
abstraction = new Abstraction(implementation);
clientCode(abstraction);
