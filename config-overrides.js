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
