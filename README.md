<h1 align="center">Welcome to Composite Modules 👋</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.5-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-14.x-blue.svg" />
  <a href="#" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-no-red.svg" />
  </a>
</p>

### This module facilitates the usage of a Composite based module structure on your system.

## Install
yarn users:
```sh
yarn add composite-modules
```
npm users:
```sh
npm install composite-modules
```

Importing:
```js
import { ModulesContainer } from 'composite-modules'
```

---

## Usage:

### Common application, normal structure.  

You should use the default ModuleContainer and add all the modules you created to it.

```js
const unamedComposite = new ModuleUnamed('unamed');
const anotherUnamedComposite = new AnotherModuleUnamed('anotherUnamed');
const simpleModule = new SimpleUnamedModule('simpleUnamed');

anotherUnamedComposite.add(simpleModule);
unamedComposite.add(anotherUnamedComposite);
ModulesContainer.add(unamedComposite);

void ModulesContainer.init();

ModulesContainer.events.on('ready', (modules) => {
    // Here we ensure that all of your modules have been loaded and you can access them.
    modules.collection.use('anotherUnamed').anotherFunction()

    ...
})

```

### To create your Module, extend the CompositeModule or the SimpleModule.

You need to extend the CompositeModule or SimpleModule modules, creating from them the modules you want to add to the module tree. 

Remembering that the CompositeModule can have child modules. These will normally be loaded into the structure, as long as they are added correctly. 

```js
export class ModuleUnamed extends CompositeModule {
    // You can add as many properties as you need... 
    private myProperty: any;
    public myPropertyTwo: any;

    // As a standard you always need to pass a name as parameter.
    constructor(name: string, yourParams: any) {
        super(name); // Must always pass name as super call.

        // Your constructor definitions goes here...
        ...
    }

    async load (): Promise<void> {
        this.beautyLogs.info('Loading this structures...');
        
        // Your loading definitions goes here...
        ...

        this.beautyLogs.success('Loaded this structures...');
    }

    async unload (): Promise<void> {
        this.beautyLogs.info('Unoading this structures...');

        // Your unload definitions goes here...
        ...

        this.beautyLogs.success('Unloaded this structures...');
    }
}
```

I recommend using `this.beautyLogs` for logs, it displays logs in a pattern and pretty like this (with colors):

```sh
2021-09-22T15:28:41.218Z (system) [Container]: [*] System is starting...
2021-09-22T15:28:41.220Z (info) [SimpleUnamedModule]: Loading this structures...
2021-09-22T15:28:41.220Z (success) [SimpleUnamedModule]: Loaded this structures...
2021-09-22T15:28:41.220Z (info) [AnotherModuleUnamed]: Loading this structures...
2021-09-22T15:28:41.221Z (info) [ModuleUnamed]: Loading this structures...
2021-09-22T15:28:41.221Z (success) [ModuleUnamed]: Loaded this structures...
```


---


## Author

👤 **Iago Calazans** (💼 *Senior Node | TypeScript Developer*)

* Website: https://iagocalazans.github.io/
* GitHub: https://github.com/iagocalazans/
