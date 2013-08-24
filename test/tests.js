// quack is passed in, minified or unminified
module.exports = function(quack){
    require('./signature-vs-args.js')(quack);
    require('./values.js')(quack);
    require('./shorthand.js')(quack);
};
