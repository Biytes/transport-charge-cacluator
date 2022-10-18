import { path, formatParams } from '@/utils'
import { mapState } from 'vuex'

export default {

    methods: {
        $path: path,

        // 去某个页面
        $navigateTo(url, params = {}) {
            uni.navigateTo({
                url: formatParams(url, params)
            })
        }
    },
    computed: {
        ...mapState('common', ['locale', 'version'])
    }
}