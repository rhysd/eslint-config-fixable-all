const assert = require('assert');
const CLIEngine = require('eslint').CLIEngine;

describe('eslint-config-fixable', function() {
    beforeEach(function () {
        this.cli = new CLIEngine({
            useEslintrc: false,
            configFile: 'eslintrc.json'
        });
    });

    afterEach(function () {
        delete this.cli;
    });

    it('detects fixable error', function () {
        const code = 'var foo = 42';
        const checked = this.cli.executeOnText(code);
        assert.notEqual(checked.errorCount, 0);
        assert.equal(checked.warningCount, 0);

        const ids = checked.results[0].messages.map(m => m.ruleId);
        assert.notEqual(ids.indexOf('no-var'), -1);
        assert.notEqual(ids.indexOf('eol-last'), -1);
        assert.notEqual(ids.indexOf('semi'), -1);
    });

    it('does not detect non-fixable error', function () {
        const code = 'console.log("test");\n';
        const checked = this.cli.executeOnText(code);
        assert.equal(checked.errorCount, 0);
        assert.equal(checked.warningCount, 0);
    });
});
