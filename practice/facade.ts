class CPU {
  start() {
    console.log("CPU started...");
  }
}
class Memory {
  load() {
    console.log("Memory loaded...");
  }
}
class HardDrive {
  read() {
    console.log("Hard drive read...");
  }
}

const cpu = new CPU();
const memory = new Memory();
const hd = new HardDrive();

cpu.start();
hd.read();
memory.load();

class Computer {
  private cpu: CPU;
  private memory: Memory;
  private hd: HardDrive;

  constructor(cpu: CPU, memory: Memory, hd: HardDrive) {
    this.cpu = cpu;
    this.memory = memory;
    this.hd = hd;
  }

  public turnOn() {
    cpu.start();
    hd.read();
    memory.load();
  }
}

console.log("");

const newCpu = new CPU();
const newMemory = new Memory();
const newHd = new HardDrive();
const computer = new Computer(newCpu, newMemory, newHd);

computer.turnOn();
