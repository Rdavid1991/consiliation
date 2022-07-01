module.exports = {
    "env": {
        "browser" : true,
        "es2021"  : true,
        "node"    : true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser"        : "@typescript-eslint/parser",
    "parserOptions" : {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion" : "latest",
        "sourceType"  : "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-shadow" : ["warn"],
        "indent"                       : [
            "warn",
            4,
            {
                "SwitchCase"               : 1,
                "offsetTernaryExpressions" : true,
            }
        ],
        "jsx-quotes": [
            "warn",
            "prefer-double"
        ],
        "key-spacing": [
            "warn",
            {
                align: {
                    afterColon  : true,
                    beforeColon : true,
                    on          : "colon",
                },
            },
        ],
        "no-debugger"           : "warn",
        "no-prototype-builtins" : 0,
        "no-shadow"             : "off",
        "no-undef"              : "off",
        "prettier/prettier"     : 0,
        "quotes"                : [
            "warn",
            "double",
            { "allowTemplateLiterals": true, "avoidEscape": true }
        ],
        "react-hooks/exhaustive-deps"   : 0,
        "react-native/no-inline-styles" : 0,
        "react/jsx-indent"              : ["warn", 4],
        "react/jsx-indent-props"        : ["warn", 4],
        "react/react-in-jsx-scope"      : 0,
        "semi"                          : "warn",
        "sort-keys"                     : "warn",
        "space-in-parens"               : ["warn", "always" , { "exceptions": ["[]","()","{}"] }]
    }
};
