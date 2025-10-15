/*
Memento is a behavioral design pattern that lets you save and restore the previous state of an 
object without revealing the details of its implementation.

Applicability:
1. Use the Memento pattern when you want to produce snapshots of the object’s state to be able 
to restore a previous state of the object.

2. Use the pattern when direct access to the object’s fields/getters/setters violates its encapsulation.
*/

interface Memento {
  getState(): string;
  getName(): string;
  getDate(): string;
}

class ConcreteMemento implements Memento {
  private state: string;

  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
    console.log(this.date);
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / (${this.state}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Originator: My initial state is ${this.state}`);
  }

  public doSomething(): void {
    console.log("Originator: I'm doing something important.");
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = ["dog", "cat", "fish", "lizard", "pickle"];
    return charSet[Math.floor(Math.random() * length) % charSet.length];
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Originator: My state has changed to ${this.state}`);
  }
}

class Caretaker {
  private mementos: Memento[] = [];

  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log("\nCaretaker: Saving Originator's state...");
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();

    console.log(`Caretaker: Restoring state to: ${memento!.getName()}`);
    this.originator.restore(memento!);
  }

  public showHistory(): void {
    console.log("Caretaker: Here's the list of mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

const originator = new Originator("Super-duper-super-puper-super.");
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log("");
caretaker.showHistory();

console.log("\nClient: Now, let's rollback!\n");
caretaker.undo();

console.log("\nClient: Once more!\n");
caretaker.undo();
