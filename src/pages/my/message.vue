<template>
  <view class="my-message">
    I am my-message
  </view>
</template>

<script>
export default {
    name: 'MyMessage',
    data() {
        return {

        }
    },

    mounted() {
        // 标题设置
        // uni.setNavigationBarTitle(this.$t('about_us_page.title'))
    }
}
</script>

<style lang="scss" scoped>
.my-message {

}
</style>