var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var appDirectory = path.resolve(fs.realpathSync(process.cwd()));
var production = '/public_html/';
var staging = '/staging.celmegvalositas.com/';
var remoteRoot = argv.target === 'production' ? production : staging;

var config = {
  username: process.env.CELMEGVALOSITAS_FTP_USERNAME,
  password: process.env.CELMEGVALOSITAS_FTP_PASSWORD,
  host: "celmegvalositas.com",
  port: 21,
  localRoot: path.join(appDirectory, "dist"),
  remoteRoot: remoteRoot,
  exclude: ['.git', '.idea', 'node_modules/*', 'build/*']
}

console.log('Deploying to ' + remoteRoot);

ftpDeploy.deploy(config, function(err) {
  if (err) console.log(err)
  else console.log('finished');
});

ftpDeploy.on('uploaded', function(data) {
  console.log(data);
});
