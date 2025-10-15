/*
Strategy is a behavioral design pattern that lets you define a family of algorithms, 
put each of them into a separate class, and make their objects interchangeable.

The Strategy pattern suggests that you take a class that does something specific 
in a lot of different ways and extract all of these algorithms into separate classes 
called strategies.

Applicability:
1. Use the Strategy pattern when you want to use different variants of an 
algorithm within an object and be able to switch from one algorithm to 
another during runtime.

2. Use the Strategy when you have a lot of similar classes that only 
differ in the way they execute some behavior.

3. Use the pattern to isolate the business logic of a class from the 
implementation details of algorithms that may not be as important in 
the context of that logic.

4. Use the pattern when your class has a massive conditional statement 
that switches between different variants of the same algorithm.
*/

interface Strategy {
  doAlgorithm(data: string[]): string[];
}

class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public doSomeBusinessLogic(): void {
    console.log(
      "Context: Sorting data using the strategy (not sure how it'll do it)"
    );
    const result = this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]);
    console.log(result.join(","));
  }
}

const context = new Context(new ConcreteStrategyA());
console.log("Client: Strategy is set to normal sorting.");
context.doSomeBusinessLogic();

console.log("");

console.log("Client: Strategy is set to reverse sorting.");
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
