//wwww/controllers/Web.js
const { renderer, createBundleRenderer } = require('vue-server-renderer');
const Vue = require('vue');
const fs = require('fs');


class Web {
    static async createHtml(ctx, next) {
        //上下文
        const context = {
            url: ctx.url
        }
        const serverBundle = require('../../www/dist/client/vue-ssr-server-bundle.json')
        const clientManifest = require('../../www/dist/client/vue-ssr-client-manifest.json')
        const renderer = createBundleRenderer(serverBundle, {
            // runInNewContext: false, // 推荐
            template: fs.readFileSync('./www/index.template.html', 'utf-8'),
            clientManifest
        })

        const html = await renderer.renderToString(context)
        ctx.body = html
    }
}

module.exports = Web;