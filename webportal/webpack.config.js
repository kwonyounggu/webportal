var path = require("path"); //this will give a abolute path of asgraph such as /home/younggu/git/asgraph
/*const path = require("path")
{
	resolve:
	{
		modules: [path.resolve('qambiLink'), 'node_modules']
	}
}*/
var HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
//abcjs works after including include source path in rules<-moudle
/*
 * This is written on May 27 2019
 * Note: 
 * 	change output: { publicPath: "/js/built/"} when you want to compile '>npm run prod'
 *  so that n_index_bundle.js will be called in a proper way.
 *  
 *  optimization:
		{
			splitChunks:
			{
				chunks: "all"
			}
		},
 * */
module.exports=
{
		
		mode: "development",
		entry: 
		{
			root: "./src/main/webapp/js/root_index.jsx",
			admin: "./src/main/webapp/js/admin_index.jsx",
			tutorial: "./src/main/webapp/js/tutorial_index.jsx"
		},
		output:
		{
			path: path.resolve(__dirname, "src/main/webapp/js/built"),
			filename: "[name]_index_bundle.js",
			chunkFilename: "[name]_index_bundle.js",
			publicPath: "/js/built/"
		},	
		resolve:
		{
			extensions: ['.js', '.jsx']
		},	
		module:
		{
			rules:
			[
				{ 
					test: /.(js|jsx)$/,
					exclude: /node_modules/,
					//include: SRC_DIR+"/main/webapp/js", 
					use: 
					{
						loader: "babel-loader"
					}
					
				},
				{ test: /\.css$/, use: ["style-loader", "css-loader"]},
				{				
				  //see https://www.youtube.com/watch?v=cDLfpth5a3s
				  test: /\.(jpe?g|png|gif|svg)$/i, 
				  use: 
				  [
					"file-loader?name=[path][name].[ext]",
					"image-webpack-loader"
				  ]
				},
				{
			        test: /\.html$/i,
			        loader: 'html-loader',
			    },
				{
					//https://github.com/webpack-contrib/file-loader/issues/259
			        test: /\.json$/,
			        loader: "file-loader",
			        type: "javascript/auto"
			    }
			]
		},
		devServer:
		{
			historyApiFallback: true,
			watchContentBase: true,
			https: true
		},
		watchOptions:
		{
			poll: true
		},
		plugins:
		[
			new HtmlWebpackPlugin
			(
				{
					minify: {callapseWhitespace: true},
					filename: "index.html",
					template: "src/main/webapp/index.html",
					chunks: ["root"]
				}
			),
			new HtmlWebpackPlugin
			(
				{
					minify: {callapseWhitespace: true},
					filename: "admin_index.html",
					template: "src/main/webapp/index.html",
					chunks: ["admin"]
				}
			),
			new HtmlWebpackPlugin
			(
				{
					minify: {callapseWhitespace: true},
					filename: "tutorial_index.html",
					template: "src/main/webapp/index.html",
					chunks: ["tutorial"]
				}
			)
		]
		
};