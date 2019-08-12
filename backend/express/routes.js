const api = require('./routes/api');
const slack = require('./routes/slack');
const base = require('./routes/base');

const Routes = [
    {path:'/api', router:api},
    {path:'/slack', router:slack},
    {path:'', router: base},
];

module.exports = Routes;