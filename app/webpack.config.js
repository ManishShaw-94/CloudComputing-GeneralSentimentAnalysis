/*

Webpack configuration file for creating a bundle for the frontend code.
It starts bundling from "./src/index.js", linking all the dependencies mentioned in there, 
then their dependencies, then their dependencies, and so on... and also does the necessary 
optimisation and outputs a single "main.js" file in the "dist" directory.

Also uses the "babel-loader" (for parsing React JSX code), 
"html-loader" (for parsing HTML files),
"style-loader" and "css-loader" (for parsing css files),
"file-loader" (for parsing various file types like jpg, png, gif, etc.)

Also uses the "html-webpack-plugin" for appending the blank HTML file
from "public/index.html" with a <script /> which imports the bundled
React code - "main.js" and copies the HTML file inside "dist"  

*/

const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const webpack = require('webpack');
require('dotenv').config()

module.exports = {
   context: __dirname,
   entry: './src/index.js',
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'main.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true
   },
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
            loader: "html-loader",
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
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html'
      }),
      new webpack.EnvironmentPlugin(['HOST']),
   ]
};