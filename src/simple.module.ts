import EventEmitter from 'events';
import { Module } from './core.module';

/**
 * This is a simple module, which has no adjacent modules (children).
 *
 * @module SimpleModule
 * @author Iago Calazans <iago.calazans@gmail.com>
 * @extends Module
 */
export class SimpleModule extends Module {
  /**
   * Constructs a new container by setting the name parameter as its name property.
   *
   * @param {string} name
   */
  constructor (
    name: string,
    private readonly _children: Module[] = [],
    protected readonly _events: EventEmitter = new EventEmitter()
  ) {
    super(name);
  }

  /**
   * Specifies whether this object is a container or not.
   *
   * @return {boolean} Always false for SimpleModule
   */
  isContainer (): boolean {
    return false;
  }

  /**
   * Start this module and return.
   *
   * @return {Promise}
   */
  async init (): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * Method not available for this type of Module.
   *
   * @return {undefined}
   */
  use (): undefined {
    this.beautyLogs.warning(`You are trying to invoke child into the Module ${ this.constructor.name } but it isnt a container.`);
    return undefined;
  }
}
