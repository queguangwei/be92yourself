import webpack            from 'webpack'
import webpackConfig      from './_base'
import config             from '../../config'
import ExtractTextPlugin  from 'extract-text-webpack-plugin'

webpackConfig.devtool = 'source-map'
webpackConfig.eslint.emitWarning = true

webpackConfig.entry.app.unshift(
  `webpack-dev-server/client?${config.get('webpack_public_path')}`,
  `webpack/hot/dev-server`
)

webpackConfig.output.publicPath = `${config.get('webpack_public_path')}/`

webpackConfig.plugins.push(
  new ExtractTextPlugin('[name].css')
)

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].js'
)

commonChunkPlugin.__KARMA_IGNORE__ = true
webpackConfig.plugins.push(commonChunkPlugin)

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

export default webpackConfig
