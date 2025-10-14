/*
Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple 
objects about any events that happen to the object they’re observing.

Applicability:
1. Use the Observer pattern when changes to the state of one object may require changing other objects, 
and the actual set of objects is unknown beforehand or changes dynamically.

2. Use the pattern when some objects in your app must observe others, but only for a limited 
time or in specific cases.
*/

interface Observer {
  update(publisher: Publisher): void;
}

class ConcreteObserverA implements Observer {
  public update(publisher: Publisher): void {
    if (publisher instanceof ConcretePublisher && publisher.state < 10) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(publisher: Publisher): void {
    if (
      publisher instanceof ConcretePublisher &&
      (publisher.state === 0 || publisher.state >= 2)
    ) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}

interface Publisher {
  attach(observer: Observer): void;

  detach(observer: Observer): void;

  notify(): void;
}

class ConcretePublisher implements Publisher {
  public state: number;

  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);

    if (isExist) {
      return console.log("Publisher: Observer already attached");
    }

    console.log("Publisher: Attached an observer.");
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);

    if (index === -1) {
      return console.log("Publisher: Nonexistent observer.");
    }

    this.observers.splice(index, 1);
    console.log("Subject: Detached an observer.");
  }

  public notify() {
    console.log("Subject: Notifying observers...");

    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public someBusinessLogic(): void {
    console.log("\nPublisher: I'm doing something important.");
    this.state = Math.floor(Math.random() * 10 + 1);

    console.log(`\nPublisher: My state just changed to ${this.state}`);
    this.notify();
  }
}

const publisher = new ConcretePublisher();

const observer1 = new ConcreteObserverA();
publisher.attach(observer1);

const observer2 = new ConcreteObserverB();
publisher.attach(observer2);

publisher.someBusinessLogic();
publisher.someBusinessLogic();

publisher.detach(observer2);

publisher.someBusinessLogic();
