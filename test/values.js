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
    anArray: [undefined, 'one', 2],
    aFunction: function(){},
    anEmptyArray: [],
    aDate: new Date(),
    aRegex: / /i,
    aNull: null,
    anUndefined: void 0
};

// quack is passed in, minified or unminified
module.exports = function(quack){
    describe('quack', function(){

        // test common types, apart from exeptions
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
            quack('string', types.aString).should.equal(true);
            quack('string', types.anEmptyString).should.equal(true);
        });

        it('should fail for invalid strings', function(){
            testAllExcept('string', function(value){
                quack('string', value).should.equal(false);
            });
        });

        it('should pass for valid numbers', function(){
            quack('number', types.aNumber).should.equal(true);
            quack('number', types.notANumber).should.equal(true);
        });

        it('should fail for invalid numbers', function(){
            testAllExcept('number', function(value){
                quack('number', value).should.equal(false);
            });
        });
    });
};
