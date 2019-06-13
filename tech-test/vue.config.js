module.exports = {
    css: {
       sourceMap: true,
    },
    baseUrl: '/',
    outputDir: 'dist',
    lintOnSave: false,
    pages: {
        index: {
          entry: 'src/main.js',
          template: 'public/index.html',
          filename: 'index.html',
        },
    },
    configureWebpack: {
        performance: {
            maxAssetSize: 500000,
        },
    }
}