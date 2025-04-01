import { merge } from 'webpack-merge';
import { ModuleFederationPlugin } from 'webpack/lib/container/ModuleFederationPlugin';
import commonConfig from './webpack.common';
import packageJson from '../package.json';

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8081/',
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      historyApiFallback: true,
    },
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

export default merge(commonConfig, devConfig);
