import deDe from './de-DE'
import enUs from './en-US'
import jaJp from './ja-JP'
import zhCn from './zh-CN'
import esEs from './es-ES'

import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    'en-US': enUs, // 英语
    'de-DE': deDe, // 德语
    'ja-JP': jaJp, // 日语
    'zh-CN': zhCn, // 中文
    'es-ES': esEs // 西班牙语
}

const i18n = new VueI18n({
    locale: 'zh-CN', // set locale
    messages // set locale messages
})

export default i18n;