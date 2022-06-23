module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://106.15.48.207:8080/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}