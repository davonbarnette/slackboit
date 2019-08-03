const api = require('./routes/api');
const slack = require('./routes/slack');

const Routes = [
    {path:'/api', router:api},
    {path:'/slack', router:slack}
];

module.exports = Routes;