const Rules = require('eslint/lib/rules');
const rules = new Rules();

const enabled = Object.keys(rules._rules).reduce((acc, id) => {
    const r = rules.get(id);
    if (!r.meta.deprecated && r.meta.fixable) {
        acc[id] = 'error';
    }
    return acc;
}, {});

process.stdout.write(JSON.stringify({ rules: enabled }, null, 2) + '\n');
