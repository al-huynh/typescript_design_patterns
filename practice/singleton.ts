class Logger {
  log(msg: string) {
    console.log(msg);
  }
}

const logger1 = new Logger();
const logger2 = new Logger();

console.log(logger1 === logger2);

class LoggerSingleton {
  static #logger: LoggerSingleton;
  private constructor() {}

  log(msg: string) {
    console.log(msg);
  }

  public static get logger() {
    if (!LoggerSingleton.#logger) {
      this.#logger = new LoggerSingleton();
    }

    return LoggerSingleton.#logger;
  }
}

const loggerSingleton1 = LoggerSingleton.logger;
const loggerSingleton2 = LoggerSingleton.logger;

console.log(loggerSingleton1 === loggerSingleton2);
