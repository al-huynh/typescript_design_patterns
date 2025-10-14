/*
The main idea of the Iterator pattern is to extract the traversal 
behavior of a collection into a separate object called an iterator.

Applicability
1. Use the Iterator pattern when your collection has 
a complex data structure under the hood, but you want to hide 
its complexity from clients (either for convenience or security reasons).

2. Use the pattern to reduce duplication of the traversal code across your app.

3. Use the Iterator when you want your code to be able to traverse different 
data structures or when types of these structures are unknown beforehand.
*/

interface IteratorInterface<T> {
  current(): T;

  next(): T;

  key(): number;

  valid(): boolean;

  rewind(): void;
}

interface Aggregator {
  getConcreteIterator(): IteratorInterface<string>;
}

class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getConcreteIterator(): IteratorInterface<string> {
    return new AlphabeticalOrderIterator(this);
  }

  public getReverseIterator(): IteratorInterface<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}

class AlphabeticalOrderIterator implements IteratorInterface<string> {
  private collection: WordsCollection;

  private position: number = 0;

  private reverse: boolean = false;

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = this.collection.getCount() - 1;
    }
  }

  public rewind(): void {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): string {
    const item = this.current();
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }
    return this.position < this.collection.getCount();
  }
}

const collection = new WordsCollection();
collection.addItem("First");
collection.addItem("Second");
collection.addItem("Third");

const iterator = collection.getConcreteIterator();

console.log("Straight traversal:");
while (iterator.valid()) {
  console.log(iterator.next());
}

console.log("");

console.log("Reverse traversal:");
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}
