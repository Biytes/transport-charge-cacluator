<template>
  <view class="version">
    <image
      class="version__logo"
      :src="require('@/static/images/common/word-logo.png')"
    />

    <view class="version__content">
      GT lynck
      <text>{{ version }}</text>
    </view>

    <view
      v-if="latestVersion"
      class="common-button"
      @click="confirmUpdateVersion"
    >
      {{ $t('version_page.version_need_update', { Version: latestVersion }) }}
    </view>

    <u-modal
      :show="showConfirmModal"
      cancel-color="#838181"
      confirm-color="#2E67F3"
      :show-cancel-button="true"
      :confirm-text="$t('version_page.upgrade')"
      :cancel-text="$t('cancel')"
      :close-on-click-overlay="true"
      width="468rpx"
      @close="showConfirmModal = false"
      @cancel="showConfirmModal = false"
      @confirm="confirmUpdate"
    >
      <view style="font-size: 32rpx; line-height: 44rpx; color: #333;">
        {{ $t('version_page.version_need_update', { Version: latestVersion }) }}
      </view>
    </u-modal>
  </view>
</template>

<script>
export default {
    name: 'Version',
    data() {
        return {
            latestVersion: 'v1.0.1',
            showConfirmModal: false
        }
    },

    mounted() {
        // 标题设置
        uni.setNavigationBarTitle(this.version)
    },

    methods: {
        confirmUpdateVersion() {
            this.showConfirmModal = true
        },

        // 确定更新
        confirmUpdate() {

        }
    }
}
</script>

<style lang="scss" scoped>
.version {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 76rpx;
    &__logo {
        height: 56rpx;
        width: 380rpx;
        margin-top: 300rpx;
    }

    &__content {
        margin: 44rpx 0 0;
        font-size: 40rpx;

        display: flex;
        align-items: center;
        text {
            font-size: 32rpx;
            margin-left: 20rpx;
        }
    }

    .common-button {
        margin-top: 232rpx;
        width: 100%;
        font-weight: bold;
    }
}
</style>