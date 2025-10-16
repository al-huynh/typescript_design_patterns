class OldPaymentSystem {
  makePayment(): string {
    return "200";
  }
}

class NewPaymentApp {
  payNow(): number {
    return 200;
  }
}

const oldSys = new OldPaymentSystem();
const newApp = new NewPaymentApp();

// client expects only payNow()

class OldPaymentSystemAdapter extends NewPaymentApp {
  oldPaymentSystem: OldPaymentSystem;

  constructor(oldPaymentSystem: OldPaymentSystem) {
    super();
    this.oldPaymentSystem = new OldPaymentSystem();
  }

  payNow(): number {
    return Number(this.oldPaymentSystem.makePayment());
  }
}

const oldPaymentSystem = new OldPaymentSystem();
const newPaymentApp = new NewPaymentApp();

console.log(typeof oldPaymentSystem.makePayment());
console.log(typeof newPaymentApp.payNow());

const oldPaymentSystemAdapter = new OldPaymentSystemAdapter(oldPaymentSystem);
console.log(typeof oldPaymentSystemAdapter.payNow());
