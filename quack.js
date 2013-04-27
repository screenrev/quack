/*
    quack.js
    Check the values of passed arguments in a function - see if they quack like a duck.
    https://github.com/screenRev/quack
*/

void (function(root, undefined){

    'use strict';

    /*
        check the arguments against the expected signature
        @param {arguments|array|string} args: array-like arguments (or array of arguments) to check
        @param {string|string[]} signature: string (for one), or array of strings to check against
    */
    var quack = function quack(args, signature){
        // convert strings to arrays
        if (typeof signature === 'string') signature = [signature];
        if (typeof args === 'string') args = [args];

        args = [].slice.apply(args);

        for (var i = 0, max = signature.length; i < max; i++) {
            if (typeof signature[i] !== args[i].toLowerCase()) return false;
        }

        return true;
    };

    // module definitions
    if (exports) module.exports = quack; // NodeJS
    else if (define && define.amd) define(quack); // AMD
    else root.quack = quack; // root = window

})(this);
