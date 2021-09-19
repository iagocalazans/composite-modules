/* eslint-disable require-jsdoc */
import chalk from 'chalk';
import util from 'util';

/**
 * Easy to use and beautiful colorfied logs.
 *
 * @module beauty-logs
 * @example
 *
 * // Easy to declare...
 * class MyClass {
 * private beautyLogs = new BeautyLogs<ModulesContainer>(this) // Set this on the top of your classes.
 * // Your amazing class methods...
 * ...
 *
 * // Then just use as:
 * this.beautyLogs.info('My amazing message.');
 * this.beautyLogs.system('[*] My amazing message.');
 * this.beautyLogs.failed('My amazing message.');
 * this.beautyLogs.warning('My amazing message.');
 * this.beautyLogs.success('My amazing message.');
 * this.beautyLogs.object({ prop: 'My amazing property' });
 * this.beautyLogs.object({ prop: 'My amazing property' });
 *
 * @author Iago Calazans <iago.calazans@gmail.com>
 */
export class BeautyLogs<T extends object> {
  private readonly type;

  constructor (type: T) {
    this.type = type;
  }

  private formattedDate (): string {
    return chalk.blackBright(new Date().toISOString());
  }

  errorObject (data: any): void {
    util.inspect.defaultOptions.depth = 4;
    try {
      const value = JSON.stringify(data);
      return console.log(`${ this.formattedDate() } ${ chalk.redBright('(object)') } [${ this.type.constructor.name }]: ${ chalk.redBright(value) }`);
    } catch (err) {
      return this.failed('Failed to log this object data.');
    }
  }

  object (data: any): void {
    util.inspect.defaultOptions.depth = 4;
    try {
      const value = JSON.stringify(data);
      return console.log(`${ this.formattedDate() } ${ chalk.cyanBright('(object)') } [${ this.type.constructor.name }]: ${ chalk.dim(value) }`);
    } catch (err) {
      return this.failed('Failed to log this object data.');
    }
  }

  info (message: string): void {
    return console.log(`${ this.formattedDate() } ${ chalk.cyanBright('(info)') } [${ this.type.constructor.name }]: ${ chalk.cyanBright(message) }`);
  }

  system (message: string): void {
    return console.log(`${ this.formattedDate() } ${ chalk.magentaBright('(system)') } [${ this.type.constructor.name }]: ${ chalk.magentaBright(message) }`);
  }

  failed (message: string): void {
    return console.log(`${ this.formattedDate() } ${ chalk.redBright('(error)') } [${ this.type.constructor.name }]: ${ chalk.redBright(message) }`);
  }

  warning (message: string): void {
    return console.log(`${ this.formattedDate() } ${ chalk.yellowBright('(warning)') } [${ this.type.constructor.name }]: ${ chalk.yellowBright(message) }`);
  }

  success (message: string): void {
    return console.log(`${ this.formattedDate() } ${ chalk.greenBright('(success)') } [${ this.type.constructor.name }]: ${ chalk.greenBright(message) }`);
  }
}
