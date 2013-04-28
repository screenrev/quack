// common types
var types = {
    aString: 'a string',
    anEmptyString: '',
    aNumber: 123,
    notANumber: NaN,
    aBoolean: true,
    aFalseBoolean: false,
    anObject: {foo: 'bar'},
    anEmptyObject: {},
    anStrObject: new String(),
    anNumObject: new Number(),
    anArray: [undefined, 'one', 2],
    anEmptyArray: [],
    anArgsObject: (function(){return arguments;})('one', 2),
    aFunction: function(){},
    aDate: new Date(),
    aRegex: / /i,
    aNull: null,
    anUndefined: void 0
};

// quack is passed in, minified or unminified
module.exports = function(quack){
    describe('quack', function(){

        // test common types, minus exceptions
        var testAllExcept = function(except, fun){
            if (typeof except == 'string') except = [except];

            Object.keys(types).forEach(function(key){
                for (var i = 0, max = except.length; i < max; i++) {
                    if (key.toLowerCase().indexOf(except[i]) !== -1) return;
                }
                fun(types[key]);
            });
        };

        it('should pass for valid strings', function(){
            quack('string', [types.aString]).should.equal(true);
            quack('string', [types.anEmptyString]).should.equal(true);
        });

        it('should fail for invalid strings', function(){
            testAllExcept('string', function(value){
                quack('string', [value]).should.equal(false);
            });
        });

        it('should pass for valid numbers', function(){
            quack('number', [types.aNumber]).should.equal(true);
            quack('number', [types.notANumber]).should.equal(true);
        });

        it('should fail for invalid numbers', function(){
            testAllExcept('number', function(value){
                quack('number', [value]).should.equal(false);
            });
        });

        it('should pass for valid booleans', function(){
            quack('boolean', [types.aBoolean]).should.equal(true);
            quack('boolean', [types.aFalseBoolean]).should.equal(true);
        });

        it('should fail for invalid booleans', function(){
            testAllExcept('boolean', function(value){
                quack('boolean', [value]).should.equal(false);
            });
        });

        it('should pass for valid objects', function(){
            quack('object', [types.anObject]).should.equal(true);
            quack('object', [types.anEmptyObject]).should.equal(true);
            quack('object', [types.anStrObject]).should.equal(true);
            quack('object', [types.anNumObject]).should.equal(true);
            quack('object', [types.aDate]).should.equal(true);
            quack('object', [types.anArray]).should.equal(true);
            quack('object', [types.anEmptyArray]).should.equal(true);
            quack('object', [types.aFunction]).should.equal(true);
            quack('object', [types.aRegex]).should.equal(true);
        });

        it('should fail for invalid objects', function(){
            testAllExcept(['object', 'date', 'array', 'function', 'regex'], function(value){
                quack('object', [value]).should.equal(false);
            });
        });

        it('should pass for valid arrays', function(){
            quack('array', [types.anArray]).should.equal(true);
            quack('array', [types.anEmptyArray]).should.equal(true);
        });

        it('should fail for invalid arrays', function(){
            testAllExcept('array', function(value){
                quack('array', [value]).should.equal(false);
            });
        });
    });
};
