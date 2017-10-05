var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var args = process.argv;

var awsConfigPath = path.resolve('./config.json');

if (fs.existsSync(awsConfigPath) && args.indexOf('--force') === -1) {
  console.log(`config.json exists; skipping prompts`);
  process.exit(0);
}

var required = function(value) {
  return value.length > 0;
};

inquirer.prompt([
  {
    type: 'input',
    name: 'accessKeyId',
    message: 'accessKeyId',
    validate: required
  },
  {
    type: 'input',
    name: 'secretAccessKey',
    message: 'secretAccessKey',
    validate: required
  },
  {
    type: 'input',
    name: 'region',
    message: 'region',
    validate: required
  }
])
  .then(function(results) {
    fs.writeFile(awsConfigPath, JSON.stringify(results, null, 2), 'utf8', function(err) {
      if (err) {
        console.warn(err);
      }
    })
  });