import EventEmitter from 'events';
import { Module } from './core.module';

/**
 * This is a simple module, which has no adjacent modules (children).
 *
 * @class SimpleModule
 * @author Iago Calazans <iago.calazans@gmail.com>
 * @extends Module
 */
export abstract class SimpleModule extends Module {
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
   * Loads module functionalities, must be implemented in each module.
   * As you extended this Composite module, you must implement this method!
   */
  abstract load (): Promise<void>;

  /**
   * Unload module functionalities, must be implemented in each module.
   * As you extended this Composite module, you must implement this method!
   */
  abstract unload (): Promise<void>;

  /**
   * Start this module and return.
   *
   * @return {Promise}
   */
  async init (): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _module = await this.load();
      this.beautyLogs.success(`Module ${ this.constructor.name } successfully loaded.`);
    } catch (err) {
      this.beautyLogs.failed(`Module ${ this.constructor.name } failed to load, aborting.`);
      void this._events.emit('failed');
      throw new Error(`Module ${ this.constructor.name } failed to load, aborting.`);
    }
  }

  /**
   * It goes through all the children of this container in Chain of Responsibility style, performing the kill/stop process in each of the adjacent modules.
   *
   * @return {Promise}
   */
  async kill (): Promise<void> {
    void this.beautyLogs.system(`[*] Detaching ${ this.constructor.name }.`);
    await this.unload();
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
