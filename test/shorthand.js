// common types
var types = {
    aString: 'a string'
};

// quack is passed in, minified or unminified
module.exports = function(quack){
    describe('quack shorthand', function(){

        it('should use shorthand for strings', function(){
            quack('""', [types.aString]).should.equal(true);
        });

    });
};
