const execSync = require('child_process').execSync;
const sv = require('semver');
const eslint = require('eslint/package.json');
const pkg = require('../package.json');

console.log(`eslint version: ${eslint.version}`);

let next = null;

if (sv.major(pkg.version) === sv.major(eslint.version) &&
    sv.minor(pkg.version) === sv.minor(eslint.version)) {
    next = sv.inc(pkg.version, 'patch');
} else {
    next = `${sv.major(eslint.version)}.${sv.minor(eslint.version)}.0`;
}

if (next === null) {
    console.error(`Invalid next version for ${pkg.version}`);
    process.exit(130);
}

const cmd = `npm version ${next}`
console.log(`Executing ${cmd}...`);

execSync(cmd);
