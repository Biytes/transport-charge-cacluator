/**
 * 打榜模块
 */

const DEFAULT_LANGUAGE = 'zh-CN'
import ACCESS_TOKEN_KEY from '@/constant'
import { setStorageSync, getStorageSync } from '@/utils'

export default {
    namespaced: true,
    state: {
        locale: DEFAULT_LANGUAGE, // 语言设置
        version: 'V.10',
        accessToken: 'pk.eyJ1Ijoid2Vja3NvbiIsImEiOiJjbDlpa3Y3OHMwOGdlM3Bwa3VzbXVudW5rIn0.2LA9W6XHbOFXFZgY0nGI_w'
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
        },

        // 设置token
        setAccessToken({ commit }, accessToken) {
            setStorageSync(ACCESS_TOKEN_KEY, accessToken)
            commit('setState', ['accessToken', accessToken])
        },

        // 获取accessToken
        getAccessToken({ commit }) {
            const token = getStorageSync(ACCESS_TOKEN_KEY)

            if (!token) return
            const accessToken = token
            commit('setState', ['accessToken', accessToken])
        }
    }
};
