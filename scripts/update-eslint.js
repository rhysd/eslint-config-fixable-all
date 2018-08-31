/* eslint-disable no-console */

const { execSync } = require('child_process');
const sv = require('semver');
const here = require('heredocument');
const pkg = require('../package.json');
const { argv } = process;

if (argv[2] && argv[2].endsWith('help')) {
    console.log(here`
        npm run update [-- {new eslint version}]

          If no new eslint version is given, minor version will be bumped up.
          After updating dev/peer dependencies, new commit will automatically be
          created.
    `);
    process.exit(0);
}

const currentVer = pkg.devDependencies.eslint.slice(1);
const nextVer = argv[2] || sv.inc(currentVer, 'minor');

console.log(`Update eslint from v${currentVer} to v${nextVer}`);

const commands = [
    `sed -i '' 's/"eslint": "~${currentVer}"/"eslint": "~${nextVer}"/g' package.json`,
    'npm install',
    'npm run generate',
    'git add eslintrc.json package.json',
    `git commit -m 'eslint ${nextVer}'`,
];
for (const cmd of commands) {
    console.log(`Running "${cmd}"...`);
    console.log((execSync(cmd).toString() + '\n').replace(/\n\n$/, '\n'));
}
