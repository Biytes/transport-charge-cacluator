<template>
  <view class="feedback">
    <textarea
      v-model="feedback"
      :placeholder="$t('feedback_page.placeholder')"
    />
  </view>
</template>

<script>
export default {
    name: 'Feedback',
    data() {
        return {
            feedback: ''
        }
    },

    mounted() {
        // 标题设置
        uni.setNavigationBarTitle({ title: this.$t('feedback_page.title') })
    },

    methods: {
        save() {
            // 保存feedback
        }
    }
}
</script>

<style lang="scss" scoped>
.feedback {
    padding: 32rpx;

    textarea {
        padding: 32rpx;
        background: #F7F7F7;
        width: 100%;
        height: 936rpx;
    }

}
</style>