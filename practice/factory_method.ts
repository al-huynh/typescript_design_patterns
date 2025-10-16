abstract class Shape {
  public shape: string = "default shape";
}
class Circle extends Shape {
  public shape: string = "circle";
}
class Square extends Shape {
  public shape: string = "square";
}

function getShape(type: string): Shape {
  if (type === "circle") return new Circle();
  if (type === "square") return new Square();
  throw new Error("Unknown shape type");
}

abstract class ShapeFactory {
  abstract createShape(): Shape;

  public draw(): void {
    console.log(`My shape is ${this.createShape().shape}`);
  }
}

class CircleFactory extends ShapeFactory {
  createShape(): Shape {
    return new Circle();
  }
}

class SquareFactory extends ShapeFactory {
  createShape(): Shape {
    return new Square();
  }
}

const circleFactory = new CircleFactory();
const squareFacotry = new SquareFactory();

circleFactory.draw();
squareFacotry.draw();
