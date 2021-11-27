const fs = require('fs');

fs.readFile('./lib/config.less', 'utf-8', (err, file) => {
    const data = file.replace('../../luban.config.less', '../../../luban.config.less');
    fs.writeFileSync('./lib/config.less', data, {encoding: 'utf8'});
});


fs.readFile('./lib/icon/icon.js', 'utf-8', (err, file) => {
    const data = file.replace('./demo/${props.type}', '../../../../src/component/icon/${props.type}');
    fs.writeFileSync('./lib/icon/icon.js', data, {encoding: 'utf8'});
});