const Explorer = require('./explorer/explorer');
const ViewToggle = require('./explorer/view');

let explorer = new Explorer();
explorer.getDirectory('');

let viewToggle = new ViewToggle();
viewToggle.listen();
