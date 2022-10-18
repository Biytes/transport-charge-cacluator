<template>
  <view class="about-us">
    I am about us
  </view>
</template>

<script>
export default {
    name: 'AboutUs',
    data() {
        return {

        }
    },

    mounted() {
        // 标题设置
        uni.setNavigationBarTitle(this.$t('about_us_page.title'))
    }
}
</script>

<style lang="scss" scoped>
.about-us {

}
</style>