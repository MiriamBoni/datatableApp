const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/datatable/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'datatable',
      filename: 'remoteEntry.js',
      exposes: {
        './DatatableApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports=merge(commonConfig,prodConfig);