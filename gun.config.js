const config = {
    port: 3000,
    defaultEntry: true,
    defaultHtmlPlugin: true,
    openBrowser: false,
    publicPath: '/',
    writeToDisk: false,
    entry: null,
    proxy: null,
    htmlPluginOption: null,
    definePluginOption: null,
    hot: true,
    liveReload: false,
    alias: {
        'gun-view': '../../index',
        '@': '/',
    },
};

module.exports = config;

