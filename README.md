eslint-config-fixable-all
=========================
[![Build Status](https://travis-ci.org/rhysd/eslint-config-fixable-all.svg?branch=master)](https://travis-ci.org/rhysd/eslint-config-fixable-all)

This is a list of [eslint](http://eslint.org/) rules which can be fixed automatically by `eslint --fix`.  This configuration specifies all fixable rules as 'error'. So all the fixable rules violation causes linter error and we need to fix them. With this configuration it ensures all the fixable problems should be fixed.

## Installation

```
$ npm install --save-dev eslint eslint-config-fixable-all
```

## Usage

At first, extend this config to your `.eslintrc`

```diff
 {
-    "extends": ["eslint:recommended"]
+    "extends": ["eslint:recommended", "fixable"]
 }
```

And then, after adding your changes, try `eslint` command

```sh
$ git add -A
$ "$(npm bin)/eslint" .
```

If some error occurred, try `eslint --fix` to fix code and see the result

```sh
$ "$(npm bin)/eslint" --fix .
$ git diff
```

If you don't want to fix or change the fixing behavior, please overwrite the rule in your configuration.
For example, if you don't want to add semicolon, overwrite the configuration.

```diff
 {
     "extends": ["eslint:recommended", "fixable"],
+    "rules": {
+        "semi": ["error", "never"]
+    }
 }
```

Or if you don't want to fix semicolon, you can off the configuration.

```diff
 {
     "extends": ["eslint:recommended", "fixable"],
+    "rules": {
+        "semi": "off"
+    }
 }
```

When you want to rollback the fixes, you can simply `git checkout`.

```sh
$ git checkout . # Rollback all fixes in current directory
```

After you can accept the fixes, `git add -A` to add them to Git index.

## Versioning

Major version and minor version are synchronized with eslint. For example, eslint-config-fixable-all v3.9.x is compatible with eslint v3.9.x. eslint-config-fixable-all's patch version is not compatible with eslint. But you need not to care about it because eslint follows semantic versioning.

## License

[MIT License](./LICENSE)
