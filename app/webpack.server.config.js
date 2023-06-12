/*

Webpack configuration file for creating a bundle for the server code.
It starts bundling from "./server/index.js", linking all the dependencies mentioned in there, 
then their dependencies, then their dependencies, and so on... and also does the necessary 
optimisation and outputs a single "bundle.js" file in the "build" directory.

*/


const webpackNodeExternals = require("webpack-node-externals");
const path = require( 'path' );

module.exports = {
   context: __dirname,
   entry: './server/index.js',
   output: {
      path: path.resolve( __dirname, 'build' ),
      filename: 'bundle.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true
   },
   node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
   target: "node",
   module: {
      rules: [
         {
            test: /\.js$/,
            loader: 'babel-loader',
            options:
                {
                    presets:['@babel/preset-react']
                }
         },
         {
            test: /\.html$/,
            use: [{loader: "html-loader"}]
        },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         }
]
   },
   externals: [webpackNodeExternals()],
};