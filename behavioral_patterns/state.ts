/*
State is a behavioral design pattern that allows an object to 
change the behavior when its internal state changes.
The State pattern suggests that you create new classes for all possible 
states of an object and extract all state-specific behaviors into these classes.

Applicability:
1. Use the State pattern when you have an object that behaves differently
depending on its current state, the number of states is enormous, and 
the state-specific code changes frequently.

2. Use the pattern when you have a class polluted with massive conditionals 
that alter how the class behaves according to the current values of the class’s fields.

3. Use State when you have a lot of duplicate code across similar states and 
transitions of a condition-based state machine.
*/
class Context {
  private state?: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State) {
    console.log(`Context: Transition to ${<any>state.constructor.name}`);
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state?.handle1();
  }

  public request2(): void {
    this.state?.handle2();
  }
}

abstract class State {
  protected context?: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

class ConcreteStateA extends State {
  public handle1(): void {
    console.log("ConcreteStateA handles request1");
    console.log("ConcreteStateA wants to change the state of the context.");
    this.context?.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log("ConcreteStateA handles request2.");
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log("ConcreteStateb handles request1.");
  }

  public handle2(): void {
    console.log("ConcreteStateB handles request2");
    console.log("ConcreteStateB wants to change the state of the context.");
    this.context?.transitionTo(new ConcreteStateA());
  }
}

const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
