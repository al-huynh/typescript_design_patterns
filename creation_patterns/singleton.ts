/*
Singleton is a creational design pattern that lets you ensure that a class 
has only one instance,  while providing a global access point to this instance.

Applicability:
1. Use the Singleton pattern when a class in your program should 
have just a single instance available to all clients; for example,
a single database object shared by different parts of the program.

2. Use the Singleton pattern when you need stricter control over global variables.
*/

class Singleton {
  static #instance: Singleton;

  private constructor() {}

  public static get instance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }

  public businessLogic() {}
}

function clientCode() {
  const s1 = Singleton.instance;
  const s2 = Singleton.instance;

  if (s1 === s2) {
    console.log("Singleton works, both variables contain the same instance");
  } else {
    console.log("Singleton failed, variables contain the different instances");
  }
}

clientCode();
