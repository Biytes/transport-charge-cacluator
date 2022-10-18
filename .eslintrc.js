module.exports = {
    root: true,
    env: {
        node: true, //Node.js全局变量和Node.js范围。
        'es6': true // 启用ES6的功能。
    },
    globals: {
        uni: true,
        wx: true,
        getCurrentPages: true,
        getApp: true
    },
    extends: ['plugin:@nostalgiaswag/lint/vue'],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6
    },

    rules: {
        'no-console': 1,
        'eqeqeq': 0,
        'semi': 0,
        'indent': ['error', 4],
        // https://eslint.vuejs.org/rules/html-indent.html
        // template的间隔 应该为4格
        'vue/html-indent': ['error', 2],
        'max-len': ['error', {
            'code': 150, // 每行代码不应超过120列, 鹅打卡专属，素材中心地址太长加到150
            'ignoreTemplateLiterals': true,
            'ignoreStrings': true
        }],

        'vue/v-slot-style': 0,
        'max-statements': [1, 100], // 强制 function 块最多允许的的语句数量
        /**
       * TODO 无论是函数声明还是函数表达式，'('前不要空格，但'{'前一定要有空格；函数调用括号前不需要空格；[强制]
       */
        /**
       * TODO 不要在应该做比较的地方做赋值；[强制]
       */
        /**
       * TODO 永远不要直接使用undefined进行变量判断；
       */
        /**
       *  TODO 禁止用中文或其它特殊字符做比较[强制]
       */
        /**
       *  TODO brackets - 括号 [强制]
       */
        // "max-params": [1, 5], // 强制 function 定义中最多允许的参数数量  TODO: 请兵哥确认
        /**
       *  TODO 禁止直接用setTimeout的方式去控制代码流程，除非页面显示需要有延时 [强制]
       */
        /**
       * TODO 挂到window或者document的事件，在关联数据或对象不再使用，组件或模块destroy时，需要进行清理 [强制]
       */
        /**
       *  TODO 拒绝else [强制]
       */
        //  "no-implicit-coercion": 1, //禁止隐式转换  TODO: 请兵哥确认

        // "no-extra-semi": 2, // 禁止不必要的分号  TODO: 请兵哥确认
        'no-use-before-define': 0,

        'no-return-await': 0,

        'prefer-rest-params': 0,

        'vue/attribute-hyphenation': [2, 'always'],

        /** 待调整 */
        'array-callback-return': 0,
        'consistent-this': 0,
        'promise/catch-or-return': 0,

        'vue/singleline-html-element-content-newline': 0,

        'no-undef': 2
    }
};