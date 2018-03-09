const rewireProvidePlugin = require('react-app-rewire-provide-plugin')

module.exports = (config, env) => {
  config.module.rules.push(
    {
        test: /\.html$/,
        loader: 'html-loader'
    });
    config.module.rules.push(
    {
      test: /bootstrap\/dist\/js\/umd\//,
      loader: 'imports-loader?jQuery=jquery'
    });
    config.plugins.push(
      rewireProvidePlugin(config, env, {
  'window.jQuery': 'jquery'
  })
    );
    return config;
}
// Use `webpack.ProvidePlugin` to add jQuery globally

    //   {
    //     test: /\.scss$/,
    //     use: ["style-loader", "css-loader", "sass-loader"]
    //   },
    //   {
    //     test: /\.css$/,
    //       use: [
    //         'style-loader',
    //         'css-loader'
    //       ]
    //     },
    //   {
    //       test: /\.html$/,
    //       loader: 'html-loader'
    //   },
    //   {
    //      test: /\.(png|svg|jpg|gif)$/,
    //      use: [
    //        'file-loader'
    //      ]
    //    },
    //    {
    //     test: /\.(woff|woff2|eot|ttf|otf)$/,
    //     use: [
    //      'file-loader'
    //     ]
    //   },
    //   // {
    //   //     test: /\.(png|jpg|gif|bmp)$/,
    //   //     loader : 'file-loader',
    //   //     options: { name: 'images/[hash].[ext]'},
    //   // },
    //   {
    //      test: /\.css$/,
    //      loader: 'css-loader'
    //   },
    //   {
    //       test: /bootstrap\/dist\/js\/umd\//,
    //       loader: 'imports-loader?jQuery=jquery'
    //   },
    //   // {
    //   //     test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    //   //     loader: "file-loader?name=fonts/[name].[ext]"
    //   // },
    //   // include: path.resolve('src')
    // }

// }
