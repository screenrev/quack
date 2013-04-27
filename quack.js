/*
    quack.js
    Check the values of passed arguments in a function - see if they quack like a duck.
    https://github.com/screenRev/quack
*/

void (function(root, undefined){

    'use strict';

    /*
        check the arguments against the expected signature

            quack('string, number, array', 'one', 2, [3]); // true

        @param {string|string[]} signature: string (for one), or array of strings to check against
        @param {arguments|array|string} args: array-like arguments (or array of arguments) to check
        @returns {boolean} true if the arguments match the signature
    */
    var quack = function quack(signature, args){
        // convert array-like "arguments" to an array
        if (isArguments(args)) args = [].slice.apply(args);

        // convert signature to an array
        if (typeof signature == 'string') {
            // trim whitespace and split on commas (with or without spaces)
            signature = signature.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/);
        }

        // iterate over the signature, matching types against arguments
        for (var i = 0, max = signature.length; i < max; i++) {
            var sig = signature[i].toLowerCase();
            var arg = args[i];

            if (sig == 'object') return isObject(arg);
            else if (sig == 'array') return isArray(arg);
            else if (sig !== typeof arg) return false;
        }

        return true;
    };


    /*
        Type checking
    */

    var objectTypes = {
        'function': true,
        'object': true
    };

    function isArguments(value){
        return toString.call(value) == '[object Arguments]';
    }

    function isObject(value) {
          return value ? !! objectTypes[typeof value] : false;
    }

    function isArray(value){
      return value ? (typeof value == 'object' && toString.call(value) == '[object Array]') : false;
    }


    /*
        module definitions
    */

    if (exports) module.exports = quack; // NodeJS
    else if (define && define.amd) define(quack); // AMD
    else root.quack = quack; // root = window

})(this);
