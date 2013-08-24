// common JS object types
module.exports = {
    aString: 'a string',
    anEmptyString: '',
    aNumber: 123,
    notANumber: NaN,
    aBoolean: true,
    aFalseBoolean: false,
    anObject: {foo: 'bar'},
    anEmptyObject: {},
    aStrObject: new String(),
    aNumObject: new Number(),
    anArray: [undefined, 'one', 2],
    anEmptyArray: [],
    anArgsObject: (function(){return arguments;})('one', 2),
    aFunction: function(){},
    aDate: new Date(),
    aRegExp: / /i,
    aNull: null,
    anUndefined: void 0
};
