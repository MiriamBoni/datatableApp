import { merge } from 'webpack-merge';
import { ModuleFederationPlugin } from 'webpack/lib/container/ModuleFederationPlugin';
import commonConfig from './webpack.common';
import packageJson from '../package.json';


const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        datatable: `datatable@${domain}/datatable/latest/remoteEntry.js`
      },
      shared: packageJson.dependencies,
    }),
  ],
};

export default merge(commonConfig, prodConfig);
