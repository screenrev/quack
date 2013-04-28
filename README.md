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

- **string**: `string` (primitive)
- **number**: `number` (primitive)
- **boolean**: `boolean` (primitive)
- **object**: ECMAScript `object`,
    including `array`, `function`, `object`, `regex`, `new Number(0)`, and `new String('')`
- **array**: `array` (not including `arguments` object)


## road map

- 0.1: initial release, with `string`, `number`, `object`, & `array` (with tests)
- 0.2: add `function`, `date`, `regex`, `arguments`, `simpleObject`
- 0.3: shorthand
    eg. `'"", {}, [], 1'` short for `'string, object, array, number'`
- 0.4: `options`: a third argument
    - *throws* `boolean`: throw and error if validation fails
    - *console* `boolean`: log to the console if validation fails
    - *message* `string`: a specific message for logged/thrown errors
- 0.5: types of `arrays` & `object` properties
    - `'string[]'`: an `array` of `strings`
    - `'[string, number]'`: specific types within an `array`
    - `'string{}'`: and `object` with only `string` properties
    - `'{val1: string, val2: number}'`: specific `object` property names and types
