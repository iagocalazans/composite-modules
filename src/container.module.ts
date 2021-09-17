import EventEmitter from 'events';
import { Module } from './core.module';

/**
 * This module gives to you the ability to containerize
 * your application modules, to make them acessible by any
 * part of your project.
 *
 * @module Container
 * @author Iago Calazans <iago.calazans@gmail.com>
 * @extends Module
 */
export class Container extends Module {
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
   * It goes through all the children of this container in the Chain of Responsibility style, carrying out the loading/start process in each of the adjacent modules.
   *
   * @return {Promise}
   */
  async init (): Promise<void> {
    void process.on(
      'SIGINT', (_signal) => {
        void this.beautyLogs.failed('[*] (Ctrl + C) shortkey received... Shutting down the system!');
        void this.kill();
      }
    );

    void console.clear();
    void this.beautyLogs.system('[*] System is starting...');

    const queue = [];
    for (const child of this._children) {
      void queue.push(child.init());
    }

    try {
      await Promise.all(queue);

      void this.beautyLogs.system('[*] Modules load completed. The system loaded and started completely.');

      void this._events.emit(
        'ready', this._children
      );
    } catch (err) {
      void this._events.emit('failed');
      return this.kill();
    }
  }

  /**
   * It goes through all the children of this container in Chain of Responsibility style, performing the kill/stop process in each of the adjacent modules.
   *
   * @return {Promise}
   */
  kill (): void {
    void this.beautyLogs.system(`[*] Detaching ${ this.constructor.name }.`);
    void this.beautyLogs.system('[*] Modules detached. The system is exiting now! Cya!');

    return process.exit();
  }

  /**
   * Allows access to events emitted within the container.
   */
  get events (): EventEmitter {
    return this._events;
  }
}
