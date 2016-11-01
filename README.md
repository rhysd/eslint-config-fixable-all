eslint-config-fixable
=====================

This is a list of rule which can be fixed automatically by `eslint --fix`.  This configuration specifies all fixable rules as 'error'. So all the fixable rules violation causes linter error and we need to fix them. With this configuration it ensures all the fixable problems should be fixed.

## Installation

```
$ npm install --save-dev eslint eslint-config-fixable
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

## License

[MIT License](./LICENSE)
