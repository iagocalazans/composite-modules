import EventEmitter from 'events';
import { Module } from './core.module';

/**
 * This module gives to you the ability to containerize
 * your application modules, to make them acessible by any
 * part of your project.
 *
 * @class CompositeModule
 * @author Iago Calazans <iago.calazans@gmail.com>
 * @extends Module
 */
export abstract class CompositeModule extends Module {
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
   * Add a new module as a child of this container, be it simple or another container.
   *
   * @param {Object.Module} module
   */
  add (module: Module): void {
    this._children.push(module);
    module.setContainer(this);
  }

  /**
   * Remove a child module from this container, be it simple or another container.
   *
   * @param {Object.Module} children
   */
  remove (children: Module): void {
    const componentIndex = this._children.indexOf(children);
    this._children.splice(
      componentIndex, 1
    );

    // @ts-expect-error
    children.setContainer(null);
  }

  /**
   * Search for the desired module name within the child listing of this container.
   *
   * @param {string} name
   * @return {Object.Module|undefined} If found, returns the child, otherwise returns undefined.
   */
  use (name: string): Module | undefined {
    const module = this._children.find((module) => module.getName() === name);
    if (module !== undefined) {
      return module;
    }
  }

  /**
   * Specifies whether this object is a container or not.
   *
   * @return {boolean} Always true for Container
   */
  isContainer (): boolean {
    return true;
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
   * It goes through all the children of this container in the Chain of Responsibility style, carrying out the loading/start process in each of the adjacent modules.
   *
   * @return {Promise}
   */
  async init (): Promise<void> {
    const queue = [];
    for (const child of this._children) {
      void queue.push(child.init());
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _module = await this.load();
      await Promise.all(queue);
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

    for (const child of this._children) {
      void child.kill();
      this.remove(child);
    }

    await this.unload();
  }

  /**
   * Allows access to events emitted within the container.
   */
  get events (): EventEmitter {
    return this._events;
  }

  /**
   * Allows access to childrens modules as collection.
   */
  get collection (): Module[] {
    return this._children;
  }
}
