import { BeautyLogs } from './beauty-logs';

export interface EventEmitterOptions {
  /**
   * Enables automatic capturing of promise rejection.
   */
  captureRejections?: boolean | undefined
}

/**
 * This module gives to you the ability to containerize
 * your application modules, to make them acessible by any
 * part of your project.
 *
 * @module Module
 * @author Iago Calazans <iago.calazans@gmail.com>
 */
export abstract class Module {
  protected container: Module;
  public beautyLogs = new BeautyLogs<Module>(this);

  /**
   * Constructs a new container by setting the name parameter as its name property.
   *
   * @param {string} name
   */
  constructor (private readonly name: string) {}

  /**
   *
   * Used by the add function to set this container as the parent of a child container.
   *
   * @param {Object.Module} container
   */
  setContainer (container: Module): void {
    this.container = container;
  }

  /**
   *
   * Method provides access to the parent container of this container, which is private by default.
   *
   * @return {Object.Module} The parent container of this container, which is private by default.
   */
  getContainer (): Module {
    return this.container;
  }

  /**
   * Specifies whether this object is a container or not.
   *
   * @return {boolean} Returns true or false
   */
  abstract isContainer (): boolean;

  /**
   * Start chain like and traverses recursively through all its children to execute individuals load() functions.
   */
  abstract init (): Promise<void>;

  /**
   * Abort init() execution and starts killing all modules.
   */
  abstract kill (): Promise<void>;

  /**
   * Load the specified module. All classes that extend must have.
   */
  abstract load (): Promise<void>;

  /**
   * Unload the specified module. All classes that extend must have.
   */
  abstract unload (): Promise<void>;

  /**
   * Add a new module as a child of this container, be it simple or another container.
   *
   * @param {Object.Module} module
   */
  public add (module: Module): void {}

  /**
   * Remove a child module from this container, be it simple or another container.
   *
   * @param {Object.Module} children
   */
  public remove (children: Module): void {};

  /**
   * Search for the desired module name within the child listing of this container.
   *
   * @param {string} name
   * @return {Object.Module|undefined} If found, returns the child, otherwise returns undefined.
   */
  abstract use (name: string): Module | undefined;

  /**
   * Returns the name of the current container.
   *
   * @return {string} Returns the name of the current container.
   */
  public getName (): string {
    return this.name;
  };
}
