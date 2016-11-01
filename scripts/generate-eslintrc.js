const rules = require('eslint/lib/rules');
const load = require('eslint/lib/load-rules');

const enabled = Object.keys(load()).reduce((acc, id) => {
    const r = rules.get(id);
    if (!r.meta.deprecated && r.meta.fixable) {
        acc[id] = 'error';
    }
    return acc;
}, {});

process.stdout.write(JSON.stringify({ rules: enabled }, null, 2) + '\n');
