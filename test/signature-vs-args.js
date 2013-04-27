// quack is passed in, minified or unminified
module.exports = function(quack){
    describe('quack', function(){

        it('should take arrays for the signature and args', function(){
            quack(['string', 'number'], ['one', 2]).should.equal(true);
        });

        it('should take a string signature', function(){
            quack('string', ['one']).should.be.equal(true);
        });

        it('should take a comma-separated string signature', function(){
            quack('string, number', ['one', 2]).should.be.equal(true);
        });

        it('should allow spaces in the signature', function(){
            quack(' string , number , string ', [' ', 2, ' ']).should.be.equal(true);
        });

        it('should take a single non-array arg', function(){
            quack('number', 1).should.be.equal(true);
        });

        it('should take an "arguments" object', function(){
            (function(){
                quack('string, number', arguments).should.be.equal(true);
            })('one', 2);
        });

        it('should take more args than signature values', function(){
            quack('string, number', ['one', 2, 'three']).should.be.equal(true);
        });

        it('should fail for more signature values than args', function(){
            quack('string, number, string', ['one', 2]).should.be.equal(false);
        });
    });
};
