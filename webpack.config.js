var path = require('path');

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
   const config = {
      splitChunks: {
         chunks: 'all'
      }
   }

   if (isProd) {
      config.minimizer = [
         new TerserPlugin(), new CssMinimizerPlugin(), new HtmlMinimizerPlugin(),
      ]
   }
}

module.exports = {
   entry: "./app/app.jsx", // входная точка - исходный файл
   output: {
      path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
      publicPath: '/public/',
      filename: "bundle.js",       // название создаваемого файла
   },
   devtool: "source-map",
   devServer: {
      historyApiFallback: true,
      port: 8081,
      open: true
   },
   devtool: isDev ? 'source-map' : false,
   module: {
      rules: [   //загрузчик для jsx
         {
            test: /\.jsx?$/, // определяем тип файлов
            exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
            loader: "babel-loader",   // определяем загрузчик
            options: {
               presets: ["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
            },
         },
         {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader']
         },
         {
            test: /\.(png|jpg|svg|gif)$/,
            use: ['file-loader']
         }
      ]
   },
   plugins: (isProd) ? [new HtmlWebpackPlugin({
      // template: './index.html'
   })] : [],
}