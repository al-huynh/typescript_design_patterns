/*
The Factory Method pattern suggests that you replace direct object construction calls (using the new operator) 
with calls to a special factory method. Don’t worry: the objects are still created via the new operator, 
but it’s being called from within the factory method. 
Objects returned by a factory method are often referred to as products.

1. Use the Factory Method when you don’t know beforehand the exact types 
and dependencies of the objects your code should work with.

2. Use the Factory Method when you want to provide users 
of your library or framework with a way to extend its internal components.

3. Use the Factory Method when you want to save system resources 
by reusing existing objects instead of rebuilding them each time.
*/
interface Product {
  operation(): string;
}

abstract class Creator {
  public abstract factoryMethod(): Product;

  public someOperation(): string {
    const product = this.factoryMethod();

    return `Creator: The same creator's code just worked with ${product.operation()}`;
  }
}

class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return `{Result of ConcreteProduct1}`;
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return `{Result of ConcreteProduct2}`;
  }
}

function clientCode(creator: Creator) {
  console.log(
    "Client: I'm not aware of the creator's class, but it still works."
  );
  console.log(creator.someOperation());
}

console.log("App: Launched with the ConcreteCreator1.");
clientCode(new ConcreteCreator1());
console.log("");

console.log("App: Launched with the ConcreteCreator2.");
clientCode(new ConcreteCreator2());
