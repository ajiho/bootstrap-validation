import js from "@eslint/js";
import globals from "globals";


export default [
    //继承eslint的推荐规则
    js.configs.recommended,
    {
        //语言选项
        languageOptions: {
            //es6
            ecmaVersion: 2022,
            //普通的脚本
            sourceType: "module",
            //全局变量
            globals: {
                ...globals.jquery,
                ...globals.browser,
                ...globals.es2015,
            }
        },
        plugins: {
            // compat
        },
        //具体规则
        rules: {
            "no-var": 2, // 不能使用 var 定义变量
            //临时关闭未使用变量报错
            "no-unused-vars": 0
        }
    }
];
