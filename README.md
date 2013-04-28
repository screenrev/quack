# quack

Check the values of arguments passed to a function - see if they quack like a duck.


## example

```javascript
var quack = require('quack');

var coolFunction = function(string, array, object, number){
    if (! quack('string, array, object, number', arguments)) {
        throw new Error('is not a duck');
    }
    console.log('is a duck');
};

coolFunction('one', ['two'], {three: 3}, 'four'); // throws: "is not a duck", last arg is wrong
coolFunction('one', ['two'], {three: 3}, 4); // logs: "is a duck", tick
```


## installation

### NodeJS

```bash
npm install quack
```

```javascript
var quack = require('quack');
```


### Browser

Download `quack.js`, `quack.min.js`, and `quack.js.src`, and add them to your project.


**RequireJS** (AMD)

```javascript
require(['path/to/quack'], function(quack){
    // use quack here
});
```

**Standard**

```html
<script src="path/to/quack.min.js"></script>
```


## usage

`quack` takes two arguments, and returns a `boolean` (`true` if it validates)

- the expected *signature* (array or comma-separated string)
- the *arguments* (`array` or `arguments` object)

Two `arrays`:

```
quack(['string', 'number'], ['my string', 123]); // true
```

A `string` and `arguments` object:

```
var coolFunction = function(){
    return quack('string, number', arguments);
};
coolFunction('my string', 123); // true
```

## validation types

- **string**: `String` (primitive)
- **number**: `Number` (primitive)
- **boolean**: `Boolean` (primitive)
- **object**: ECMAScript `Object`,
    including `Array`, `Function`, `Object`, `RegExp`, `new Number(0)`, and `new String('')`
- **array**: `Array` (not including `arguments` object)
- **function**: `Function`
- **date**: `Date` object
- **regexp**: `RegExp` object
- **arguments**: `arguments` object


## road map

- 0.1: **DONE** initial release, with `string`, `number`, `object`, & `array` (with tests)
- 0.2: **DONE** add `function`, `date`, `regexp`, `arguments`
- 0.3: shorthand
    eg. `'"", {}, [], 1'` short for `'string, object, array, number'`
- 0.4: `options`: a third argument
    - **throws** `boolean`: throw and error if validation fails
    - **console** `boolean`: log to the console if validation fails
    - **message** `string`: a specific message for logged/thrown errors
- 0.5: types of `arrays` & `object` properties
    - `'string[]'`: an `array` of `strings`
    - `'[string, number]'`: specific types within an `array`
    - `'string{}'`: and `object` with only `string` properties
    - `'{val1: string, val2: number}'`: specific `object` property names and types
