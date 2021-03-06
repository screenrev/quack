/*
    quack.js
    Check the values of passed arguments in a function - see if they quack like a duck.
    https://github.com/screenRev/quack
    borrowed some type checking from https://github.com/bestiejs/lodash
*/

void(function(root, undefined) {

    'use strict';

    /*
        check the arguments against the expected signature

            quack('string, number, array', 'one', 2, [3]); // true

        @param {string|string[]} signature: string (for one), or array of strings to check against
        @param {arguments|array|string} args: array-like arguments (or array of arguments) to check
        @returns {boolean} true if the arguments match the signature
    */
    var quack = function quack(signature, args) {
        var i, max, sig, arg;

        // convert array-like "arguments" to an array
        if (isArguments(args)) args = [].slice.apply(args);

        // convert signature to an array
        if (typeof signature == 'string') {
            // trim whitespace and split on commas (with or without spaces)
            signature = signature.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/);
        }

        // iterate over the signature, matching types against arguments
        for (i = 0, max = signature.length; i < max; i++) {
            sig = signature[i].toLowerCase();
            sig = shorthand[sig] || sig; // test for shorthand methods
            arg = args[i];

            if (sig == 'object') {
                if (! isObject(arg)) return false;
            }
            else if (sig == 'array') {
                if (! isArray(arg)) return false;
            }
            else if (sig == 'function') {
                if (! isFunction(arg)) return false;
            }
            else if (sig == 'date') {
                if (! isDate(arg)) return false;
            }
            else if (sig == 'regexp') {
                if (! isRegExp(arg)) return false;
            }
            else if (sig == 'arguments') {
                if (! isArguments(arg)) return false;
            }
            else if (sig !== typeof arg) return false;
        }

        return true;
    };


    /*
        Type checking
    */

    var toString = {}.toString;
    var objectTypes = {
        'function': true,
        'object': true
    };
    var shorthand = {
        '""': 'string',
        '1': 'number',
        '[]': 'array'
    };

    var isArguments = function(value) {
        return toString.call(value) == '[object Arguments]';
    };

    // fallback for browsers that can't detect `arguments` objects by [[Class]]
    if (! isArguments(arguments)) isArguments = isArgumentsFallback;
    var isArgumentsFallback = function(value) {
        return value ? {}.hasOwnProperty.call(value, 'callee') : false;
    };

    var isObject = function(value) {
          return value ? !! objectTypes[typeof value] : false;
    };

    var isArray = function(value) {
      return value ? (typeof value == 'object' && toString.call(value) == '[object Array]') : false;
    };

    var isFunction = function(value) {
        return typeof value == 'function';
    };

    // fallback for older versions of Chrome and Safari
    var isFunctionFallback = function(value) {
        return typeof value == 'function' && toString.call(value) == '[object Function]';
    };
    if (isFunction(/x/)) isFunction = isFunctionFallback;

    var isDate = function(value) {
        return value ? (typeof value == 'object' && toString.call(value) == '[object Date]') : false;
    };

    var isRegExp = function(value) {
        return value ? (typeof value == 'object' && toString.call(value) == '[object RegExp]') : false;
    };

    /*
        module definitions
    */

    if (exports) module.exports = quack; // NodeJS
    else if (define && define.amd) define(quack); // AMD
    else root.quack = quack; // root = window

})(this);
