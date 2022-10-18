/**
 * 打榜模块
 */

const DEFAULT_LANGUAGE = 'zh-CN'

export default {
    namespaced: true,
    state: {
        locale: DEFAULT_LANGUAGE, // 语言设置
        version: 'V.10'
    },

    mutations: {
        setState(state, [name, value]) {
            state[name] = value;
        }
    },

    actions: {
        // 切换语言
        switchLanguages({ commit }, locale) {
            uni.setStorageSync('locale', locale)
            commit('setState', ['locale', locale])
        },

        // 获取当前语言
        getLocaleLanguages({ commit }) {
            const locale = uni.getStorageSync('locale') || DEFAULT_LANGUAGE
            commit('setState', ['locale', locale])
        }
    }
};
