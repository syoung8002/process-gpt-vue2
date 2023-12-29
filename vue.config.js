module.exports = {
    configureWebpack: {
        devServer: {
            port: '8080',
            disableHostCheck: true
        }
    },
    "transpileDependencies": [
        "vuetify"
    ],
    "runtimeCompiler": true
}
