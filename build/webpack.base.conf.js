const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const devMode = process.env.NODE_ENV !== 'production';

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    pages: path.join(__dirname, '../src/pages'),
    //assets: 'assets/'
    components: path.join(__dirname, '../src/components'),
}

// for HtmlWebpackPlugin
const PAGES_DIR = PATHS.src
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

module.exports = {
    // BASE config
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src,
        // module: `${PATHS.src}/your-module.js`,
    },
    output: {
        filename: `js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-react-jsx',
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                            ["@babel/plugin-transform-runtime", { "regenerator": true }]
                        ]
                    }
                }
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '~': PATHS.src,
            //'~assets': PATHS.assets,
            '~c': PATHS.components,
            '~p': PATHS.pages,
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name].[hash].css`,
        }),
        /*new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `img` },
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `fonts` },
            { from: `${PATHS.src}/static`, to: '' },
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),*/

        // Automatic creation any html pages (Don't forget to RERUN dev server)
        // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
        // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page}`
        }))
    ],
}