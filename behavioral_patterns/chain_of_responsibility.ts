/*
Chain of Responsibility is behavioral design pattern that allows passing request along the 
chain of potential handlers until one of them handles request.

The pattern allows multiple objects to handle the request without coupling sender class 
to the concrete classes of the receivers. The chain can be composed dynamically at runtime 
with any handler that follows a standard handler interface.

Applicability
1. Use the Chain of Responsibility pattern when your program is expected 
to process different kinds of requests in various ways, but the exact types of 
requests and their sequences are unknown beforehand.

2. Use the pattern when it’s essential to execute several handlers in a particular order.

3. Use the CoR pattern when the set of handlers and their order are supposed to change at runtime.*/

interface Handler<Request = string, Result = string> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

  handle(request: Request): Result;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;

    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return "";
  }
}

class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}`;
    }

    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

function clientCode(handler: Handler) {
  const foods = ["Nut", "Banana", "Cup of coffee"];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`${result}`);
    } else {
      console.log(`${food} was left untouched.`);
    }
  }
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

clientCode(monkey);

console.log("");

clientCode(squirrel);
