/*
 * @Description:
 * @Author: mapengfei
 * @Date: 2022-05-27 17:06:43
 * @LastEditors: mapengfei
 * @LastEditTime: 2022-05-31 14:59:31
 */
import Vuex from 'vuex';
const modules = {};

const requireStoreModules = require.context(
    // 当前目录
    '.',
    // 是否查询其子目录
    false,
    // 匹配 API 模块文件名的正则表达式
    /\.\/(?!index).*\.js$/
);

requireStoreModules.keys().forEach(fileName => {
    // 获取模块对象

    const module = requireStoreModules(fileName);

    // 通过路径获取模块名
    // 通过路径获取模块名
    const moduleName = fileName.split('/').pop().split('.').shift();

    modules[moduleName] = module.default || module;
});

export default () => {
    console.log('modules', modules);
    return new Vuex.Store({
        state: {
            test: 'fuck you'
        },
        getters: {},
        actions: {},
        mutations: {
            // 给模块的state赋值
            setState(state, { name, value }) {
                const moduleName = name.split('/')[0]; // 模块名
                const target = name.split('/')[1]; // 目标参数
                // 给模块的state赋值
                if (moduleName && target) {
                    if (Object.prototype.toString.call(value) === '[object Object]') {
                        state[moduleName][target] = Object.assign({}, value);
                    } else {
                        state[moduleName][target] = value;
                    }
                }

                // 给全局的state赋值
                if (moduleName && !target) {
                    state[moduleName] = value;
                }
            }
        },
        modules
    });
};
