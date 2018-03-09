const path = require('path');

module.exports = function(config) {
  // Use your own ESLint file
  let eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;

  // Add the SASS loader second-to-last
  // (last one must remain as the "file-loader")
  let loaderList = config.module.rules[1].oneOf;
  loaderList.splice(loaderList.length - 1, 0,
  {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"]
  },
  {
    test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
  {
      test: /\.html$/,
      loader: 'html-loader'
  },
  {
     test: /\.(png|svg|jpg|gif)$/,
     use: [
       'file-loader'
     ]
   },
   {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
     'file-loader'
    ]
  },
  {
     test: /\.css$/,
     loader: 'css-loader'
  },
  {
      test: /bootstrap\/dist\/js\/umd\//,
      loader: 'imports-loader?jQuery=jquery'
  },
);
}
