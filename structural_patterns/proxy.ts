/*
Proxy is a structural design pattern that provides an object
that acts as a substitute for a real service object used by a client.
A proxy receives client requests, does some work (access control,
caching, etc.) and then passes the request to a service object.

With Adapter you access an existing object via different interface. 
With Proxy, the interface stays the same. With Decorator you access 
the object via an enhanced interface.

1. Lazy initialization (virtual proxy). This is when you have a 
heavyweight service object that wastes system resources by being 
always up, even though you only need it from time to time.

2. Access control (protection proxy). This is when you want only 
specific clients to be able to use the service object; for instance, 
when your objects are crucial parts of an operating system and clients 
are various launched applications (including malicious ones).

3. Local execution of a remote service (remote proxy). 
This is when the service object is located on a remote server.

4. Logging requests (logging proxy). This is when you want to keep
a history of requests to the service object.

5. Caching request results (caching proxy). This is when you need to 
cache results of client requests and manage the life cycle of this cache, 
especially if results are quite large.

6. Smart reference. This is when you need to be able to dismiss a 
heavyweight object once there are no clients that use it.
*/

interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log("RealSubject: Handling requests.");
  }
}

class Proxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log("Proxy: Checking access prior to firing a real request");
    return true;
  }

  private logAccess(): void {
    console.log(
      "Proxy: Logging the time of request:",
      new Date().toISOString()
    );
  }
}

function clientCode(subject: Subject) {
  subject.request();
}

console.log("Client: Executing the client code with a real subject:");
const realSubject = new RealSubject();
clientCode(realSubject);

console.log("");

console.log("Client: Executing the same client code with a proxy:");
const proxy = new Proxy(realSubject);
clientCode(proxy);
