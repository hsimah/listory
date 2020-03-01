const list = require('./modules/list/resolvers');
const listItem = require('./modules/list-item/resolvers');

const resolvers = Object.assign({}, list, listItem);

module.exports = resolvers;