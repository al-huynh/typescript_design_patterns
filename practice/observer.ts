// class Stock {
//   price = 100;
//   getPrice() {
//     return this.price;
//   }
// }

// setInterval(() => {
//   const price = stock.getPrice();
//   console.log("Checking price:", price);
// }, 1000);

interface Observer {
  update(price: number): void;
}

class Stock {
  private observers: Observer[] = [];
  private price = 100;

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs != observer);
  }

  setPrice(price: number) {
    this.price = price;
    this.notify();
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this.price));
  }
}

class Trader implements Observer {
  update(price: number) {
    console.log(`Trader tracks new price: ${price}`);
  }
}

const stock = new Stock();
const trader1 = new Trader();
stock.attach(trader1);
stock.setPrice(100);

const trader2 = new Trader();
stock.attach(trader2);
stock.setPrice(200);

stock.detach(trader1);
stock.setPrice(250);
