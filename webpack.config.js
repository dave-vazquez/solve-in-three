const path = require('path');

module.exports = {
    entry: './src2/index-test.js',
    output:
    {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
}