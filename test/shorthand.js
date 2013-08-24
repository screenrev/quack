var types = require('./types');

// quack is passed in, minified or unminified
module.exports = function(quack){
    describe('quack shorthand', function(){

        it('should use shorthand for strings', function(){
            quack('""', [types.aString]).should.equal(true);
        });

        it('should use shorthand for arrays', function(){
            quack('[]', [types.anArray]).should.equal(true);
        });
    });
};
