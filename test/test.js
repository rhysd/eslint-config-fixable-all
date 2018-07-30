const { strictEqual: eq, notStrictEqual: neq } = require('assert');
const CLIEngine = require('eslint').CLIEngine;

describe('eslint-config-fixable-all', function() {
    beforeEach(function() {
        this.cli = new CLIEngine({
            useEslintrc: false,
            configFile: 'eslintrc.json',
        });
    });

    afterEach(function() {
        delete this.cli;
    });

    it('detects fixable error', function() {
        const code = 'var foo = 42';
        const checked = this.cli.executeOnText(code);
        neq(checked.errorCount, 0);
        eq(checked.warningCount, 0);

        const ids = checked.results[0].messages.map(m => m.ruleId);
        neq(ids.indexOf('no-var'), -1);
        neq(ids.indexOf('eol-last'), -1);
        neq(ids.indexOf('semi'), -1);
    });

    it('does not detect non-fixable error', function() {
        const code = 'console.log("test");\n';
        const checked = this.cli.executeOnText(code);
        eq(checked.errorCount, 0);
        eq(checked.warningCount, 0);
    });
});
