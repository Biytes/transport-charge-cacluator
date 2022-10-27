<template>
  <PainterDom
    v-if="order && painterType"
    :painter="order"
    :painter-type="painterType"
    :width="width"
    :height="height"
    config-type="ORDER"
    @drawFulfilled="drawFulfilled"
  />
</template>

<script>
// 由于该项目的证书组件与返学费的耦合，当前组件只生成图片url
import PainterDom from '@/components/painterDom/index'

export default {
    name: 'Order',
    components: {
        PainterDom
    },

    props: {
        order: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            painterType: 'DEFAULT', // 当前的配置
            width: 793,
            height: 1122
        }
    },

    methods: {
        // 画图结束
        drawFulfilled(url) {
            this.$emit('drawFulfilled', url)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>