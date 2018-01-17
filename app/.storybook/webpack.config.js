const path = require('path');

module.exports = {
  output: {
    publicPath: '/reamp',
  },
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}
