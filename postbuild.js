const fs = require('fs');

fs.readFile('./lib/icon/icon.js', 'utf-8', (err, file) => {
    const data = file.replace('./demo/${props.type}', '../../../../src/component/icon/${props.type}');
    fs.writeFileSync('./lib/icon/icon.js', data, {encoding: 'utf8'});
});
