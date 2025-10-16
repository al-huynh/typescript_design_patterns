// class Coffee {
//   cost(base: number, withMilk: boolean) {
//     let total = base;
//     if (withMilk) total += 2;
//     return total;
//   }
// }

interface Coffee {
  cost(): number;
}

class SimpleCoffee implements Coffee {
  cost() {
    return 5;
  }
}

class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() {
    return this.coffee.cost() + 2;
  }
}

class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() {
    return this.coffee.cost() + 1;
  }
}

const coffee = new SugarDecorator(new MilkDecorator(new SimpleCoffee()));

console.log(coffee.cost());
