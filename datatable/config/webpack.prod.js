import { merge } from 'webpack-merge';
import { ModuleFederationPlugin } from 'webpack/lib/container/ModuleFederationPlugin';
import commonConfig from './webpack.common';
import packageJson from '../package.json';

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

export default merge(commonConfig, devConfig);
