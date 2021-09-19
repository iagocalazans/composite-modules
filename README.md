<h1 align="center">Welcome to Composite Modules 👋</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
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
import { Container, SimpleModule } from 'composite-modules'
```

---

## Usage:

### Common application, normal structure.  

You will create a Container object and add the desired modules to it, assembling the composition.

```js
const container = new Container('container');
const myModuleOne = new MyModuleOne('moduleOne');
const myModuleTwo = new Container('moduleTwo');
const myModuleThree = new SimpleModule('moduleThree');

container.add(myModuleOne);
container.add(myModuleTwo);
container.add(myModuleThree);

void container.init()

container.events.on('ready', (modules) => {
    // Here we ensure that all of your modules have been loaded. and you can access them.
    container.use('moduleOne').specificFunction();

    ...
})

```

### Extend the original container, or use it. 

You can use it as it is distributed or extend the original modules. Adding specific functions for your business.

```js
export class MyModule extends Container {
    private _module: Container

    // As a standard you always need to pass a name as parameter.
    constructor(name: string, yourParams: any) {
        super(name); // Must always pass name as super call.

        // Your definitions goes here...
        ...
    }

    async init() {
        // Implement your module load methods and actions...
        ...

        // And set it returns/values to this class property module.
        this._module = operationResult;
    }
}
```

---


## Author

👤 **Iago Calazans** (💼 *Senior Node|TypeScript Developer*)

* Website: https://iagocalazans.github.io/
* GitHub: https://github.com/iagocalazans/
