/*
Adapter is a structural design pattern that allows objects with 
incompatible interfaces to collaborate.

This is a special object that converts the interface of one object 
so that another object can understand it.

Applicability:
1. Use the Adapter class when you want to use some existing class, 
but its interface isn’t compatible with the rest of your code.

2. Use the pattern when you want to reuse several existing subclasses 
that lack some common functionality that can’t be added to the superclass.
*/
class Target {
  public request(): string {
    return "Target: The default target's behavior.";
  }
}

class Adaptee {
  public specificRequest(): string {
    return ".eerpadA eht fo roivaheb laicepS";
  }
}

class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

function clientCode(target: Target) {
  console.log(target.request());
}

console.log("Client: I can work just fine with the Target objects:");
const target = new Target();
clientCode(target);

console.log("");

const adaptee = new Adaptee();
console.log(
  "Client: The Adaptee class has a weird interface. See, I don't understand it:"
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log("");

console.log("Client: But I can work with it via the Adapter:");
const adapter = new Adapter(adaptee);
clientCode(adapter);
