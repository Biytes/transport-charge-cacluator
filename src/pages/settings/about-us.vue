<template>
  <view class="about-us">
    <view class="about-us__title">
      {{ $t('about_us_page.title') }}
    </view>

    <view class="about-us__subtitle">
      {{ $t('about_us_page.service') }}
    </view>

    <view class="about-us__content">
      {{ $t('about_us_page.content') }}
    </view>
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
        uni.setNavigationBarTitle({ title: this.$t('about_us_page.title') })
    }
}
</script>

<style lang="scss" scoped>
.about-us {
    padding: 52rpx;
    color: #333;
    &__title {
        font-size: 48rpx;
        font-weight: bold;
        line-height: 66rpx;
    }

    &__subtitle {
        margin: 32rpx 0 0;
        font-weight: bold;
        line-height: 44rpx;
    }

    &__content {
        color: #808690;
        margin: 32rpx 0 0;
        line-height: 44rpx;
    }

}
</style>