class User {
  constructor(
    public name: string,
    public age: number,
    public email?: string,
    public phone?: string,
    public address?: string
  ) {}
}
const u = new User("Alan", 23, undefined, undefined, "Atlanta");

interface IUserBuilder {
  setName(name: string): UserBuilder;
  setAge(age: number): UserBuilder;
  setEmail(email: string): UserBuilder;
  setPhone(phone: string): UserBuilder;
  setAddress(address: string): UserBuilder;
}

class UserBuilder implements IUserBuilder {
  private user: User;

  constructor() {
    this.user = new User("defaultName", -99);
  }
  public setName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  public setAge(age: number): UserBuilder {
    this.user.age = age;
    return this;
  }

  public setEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  public setPhone(phone: string): UserBuilder {
    this.user.phone = phone;
    return this;
  }

  public setAddress(address: string): UserBuilder {
    this.user.address = address;
    return this;
  }

  public build() {
    return this.user;
  }
}

console.log(JSON.stringify(u));

const userBuilder = new UserBuilder()
  .setName("Alan")
  .setAge(23)
  .setAddress("Atlanta");

console.log(JSON.stringify(userBuilder.build()));
