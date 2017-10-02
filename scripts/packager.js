const colors = require('colors');
const fs = require('fs');
const jsonfile = require('jsonfile');
const mkdirp = require('mkdirp');
const packager = require('electron-packager');
const path = require('path');
const rimraf = require('rimraf');

const platform = process.platform;
const version = jsonfile.readFileSync('package.json').version;

let build, files, ignoredPaths, postPackage;

console.log(colors.red(`Compiling cXb reader ${version}.`));

// Final Destination for app
build = path.join('.', 'build', version);
mkdirp.sync(build);
files = fs.readdirSync(build);
for (let i = 0; i < files.length; i++) {
  console.log(`Removing ${files[i]}.`);
  rimraf.sync(path.join(build, files[i]));
}

// Excludes other builds from this build
ignoredPaths = fs.readdirSync(path.join('.','build'));

// Build Function
console.log(colors.grey('Please wait.'));
packager(
  {
    dir: './',
    name: 'cXb',
    platform: platform,
    arch: 'x64',
    prune: true,
    out: build,
    ignore: ignoredPaths,
  },
  function cb(err, appPaths) {
    postPackage(err, appPaths);
  }
);

postPackage = (err, appPaths) => {
  if (err) {
    console.error(
      colors.red(
        `cXb Reader packaging failed. \n
        Error: ${err}`
      )
    );
  } else {
    console.log(
      colors.green(
        `cXb reader packaging successful! Files can be found at \n
        ${appPaths}`
      )
    );
  }
};
