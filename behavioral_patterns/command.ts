/*
Command is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. 
This transformation lets you pass requests as a method arguments, delay or queue a request’s execution, and support undoable operations.

Applicability:
1. Use the Command pattern when you want to parameterize objects with operations.

2. Use the Command pattern when you want to queue operations, schedule their execution, or execute them remotely.

3. Use the Command pattern when you want to implement reversible operations.

The client should initialize objects in the following order:
1. Create receivers.
2. Create commands, and associate them with receivers if needed.
3. Create senders, and associate them with specific commands.
*/
interface Command {
  execute(): void;
}

class SimpleCommand implements Command {
  constructor(private payload: string) {}

  public execute(): void {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
    );
  }
}

class ComplexCommand implements Command {
  constructor(
    private receiver: Receiver,
    private a: string,
    private b: string
  ) {}

  public execute(): void {
    console.log(
      "ComplexCommand: Complex stuff should be done by a receiver object."
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Working on (${b}.)`);
  }
}

class Invoker {
  private onStart?: Command;
  private onFinish?: Command;

  public setOnStart(command: Command) {
    this.onStart = command;
  }

  public setOnFinish(command: Command) {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log("Invoker: Does anybody want something done before I begin?");
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log("Invoker: ...doing something really important...");

    console.log("Invoker: Does anybody want something done after I finish?");
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object: any): object is Command {
    return object.execute !== undefined;
  }
}

const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));

invoker.doSomethingImportant();
