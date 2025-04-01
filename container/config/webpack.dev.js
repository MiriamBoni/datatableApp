import { merge } from 'webpack-merge';
import { ModuleFederationPlugin } from 'webpack/lib/container/ModuleFederationPlugin';
import commonConfig from './webpack.common';
import packageJson from '../package.json';


const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        datatable: 'datatable@http://localhost:8081/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

export default merge(commonConfig, devConfig);
