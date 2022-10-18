<template>
  <!-- 协议 -->
  <view class="agreement">
    <image
      :src="require(`@/static/images/common/agreement-${checkAgreement ? 'checked' : 'unchecked'}.png`)"
      @click="switchAgreement"
    />
  </view>
</template>

<script>
export default {
    props: {
        checkAgreement: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },

    mounted() {
        this.initAgreement()
    },

    methods: {
        // 切换同意协议
        switchAgreement() {
            this.$emit('update:checkAgreement', !this.checkAgreement)

            uni.setStorageSync('checkAgreement', !this.checkAgreement)
        },

        // 初始化同意协议
        initAgreement() {
            const checkAgreement = uni.getStorageSync('checkAgreement')

            this.$emit('update:checkAgreement', !!checkAgreement)
        }
    }
}
</script>

<style lang="scss">
.agreement {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    image {
      width: 22rpx;
      height: 22rpx;
      margin-right: 10rpx;
    }
}
</style>
