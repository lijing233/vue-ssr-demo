const Router = require('koa-router');
const router = new Router();
const Web = require('../controllers/Web')


router.get('*', Web.createHtml);
module.exports = router;