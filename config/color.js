var colors = require('colors/safe');

// set theme
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'blue',
    data: 'grey',
    help: 'green',
    warn: ['yellow', 'bold'],
    debug: 'cyan',
    error: ['red', 'bold'],
    get: ['green', 'italic'],
    post: ['blue', 'italic'],
    put: ['orange', 'italic'],
    delete: ['red', 'italic']
});

module.exports = colors;