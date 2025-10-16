function calculateDiscount(type: string, amount: number) {
  if (type === "regular") return amount * 0.1;
  if (type === "vip") return amount * 0.2;
  if (type === "super-vip") return amount * 0.3;
  return 0;
}

interface Discount {
  getDiscount(amount: number): number;
}

class RegularDiscount implements Discount {
  getDiscount(amount: number): number {
    return amount * 0.1;
  }
}

class VipDiscount implements Discount {
  getDiscount(amount: number): number {
    return amount * 0.2;
  }
}

class SuperVipDiscount implements Discount {
  getDiscount(amount: number): number {
    return amount * 0.3;
  }
}

class Context {
  constructor(private strategy: Discount) {}

  public setDiscount(discount: Discount) {
    this.strategy = discount;
  }

  execute(amount: number) {
    return this.strategy.getDiscount(amount);
  }
}

const discount = new Context(new RegularDiscount());
console.log(discount.execute(100));
discount.setDiscount(new VipDiscount());
console.log(discount.execute(100));
discount.setDiscount(new SuperVipDiscount());
console.log(discount.execute(100));
