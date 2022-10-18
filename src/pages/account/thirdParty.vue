<template>
  <view class="thirdParty-page">
    <view class="thirdParty-page__logo">
      <image :src="require('@/static/images/common/word-logo.png')" />
    </view>

    <!-- form -->
    <view class="thirdParty-page__form">
      <u-input
        v-model="email"
        :placeholder="$t('email')"
        border="bottom"
        clearable
      />

      <u-input
        v-model="password"
        class="thirdParty-page__form--password"
        :placeholder="$t('password')"
        border="bottom"
        :password="!passwordState"
      >
        <image
          slot="suffix"
          class="thirdParty-page__available"
          :src="require(`@/static/images/login/password-${ passwordState ? '' : 'un'}available.png`)"
          @click="switchPasswordState"
        />
      </u-input>
    </view>

    <view class="thirdParty-page__actions">
      <!-- 按钮 -->
      <view
        class="common-button"
        @click="loginBind"
      >
        {{ $t('thridparty_bind_page.bind_and_login') }}
      </view>

      <view
        class="common-button revert"
        @click="registerBind"
      >
        {{ $t('thridparty_bind_page.register_and_bind') }}
      </view>
    </view>


    <!-- 协议 -->
    <view class="thirdParty-page__agreement">
      <Agreement :check-agreement.sync="checkAgreement" />
    </view>

    <!-- 选择社区 -->
    <u-popup
      :show.sync="showChooseCommunityPopup"
      round="20px"
      mode="bottom"
      @close="hideCommunityPopup"
    >
      <view class="choose-panel">
        <view
          class="choose-panel__close"
          @click="hideCommunityPopup"
        >
          <image :src="require('@/static/images/community/close.png')" />
        </view>

        <!-- 头部 -->
        <view class="choose-panel__title">
          {{ $t('select_area.community_join_title') }}
        </view>
        <view class="choose-panel__hint">
          {{ $t('select_area.community_area_hint') }}
        </view>

        <!-- 社区列表 -->
        <view class="choose-panel__communities">
          <view class="sub-title">
            {{ $t('select_area.community_join_sub_title') }}
          </view>
          <view class="choose-panel__list">
            <view
              v-for="community in communities"
              :key="community.name"
              :class="['choose-panel__community', selectedCommunity && selectedCommunity.name === community.name ? 'selected' : '']"
            >
              <view
                class="choose-panel__community-cover"
                @click="hideCommunityPopup"
              >
                <image :src="community.icon" />
              </view>

              <view
                class="choose-panel__community-title"
                @click="selectedCommunity = community"
              >
                {{ community.name }}
              </view>

              <image
                v-if="selectedCommunity && selectedCommunity.name === community.name"
                class="choose-panel__community-check"
                :src="require('@/static/images/community/confirm.png')"
              />
            </view>
          </view>

          <view
            class="common-button"
            @click="handleShowConfirmModal"
          >
            {{ $t('select_area.community_join_confirm') }}
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 当有选中的社区才展示 -->
    <u-modal
      v-if="selectedCommunity"
      :show="showConfirmModal"
      cancel-color="#838181"
      confirm-color="#E21D1C"
      :show-cancel-button="true"
      :confirm-text="$t('confirm')"
      :cancel-text="$t('cancel')"
      :close-on-click-overlay="true"
      @close="showConfirmModal = false"
      @cancel="showConfirmModal = false"
      @confirm="confirmJoin"
    >
      <view style="font-size: 32rpx; line-height: 44rpx; color: #333;">
        {{ $t('select_area.community_join_hint', { communityName: selectedCommunity.name }) }}
      </view>
    </u-modal>
  </view>
</template>

<script>
import Agreement from '@/components/agreement'

export default {
    components: {
        Agreement
    },
    data() {
        return {
            email: '', // 邮箱
            password: '', // 密码
            passwordState: false, // 是否不展示密码
            checkAgreement: false, // 是否同意协议

            showChooseCommunityPopup: false, // 选择社区弹窗

            selectedCommunity: null, // 被选中的社区
            showConfirmModal: false, // 展示确定提示

            communities: [
                {
                    name: 'American community',
                    icon: require('@/static/images/community/america.png')
                },
                {
                    name: 'British community',
                    icon: require('@/static/images/community/british.png')
                },
                {
                    name: 'Japanese community',
                    icon: require('@/static/images/community/japan.png')
                },
                {
                    name: 'European community',
                    icon: require('@/static/images/community/european.png')
                }
            ]
        }
    },

    mounted() {

    },
    methods: {
        // 登录并绑定
        loginBind() {
            this.showChooseCommunity()
        },

        // 注册并绑定
        registerBind() {

        },

        // 切换密码展示状态
        switchPasswordState() {
            this.passwordState = !this.passwordState
        },

        // 展示选择社区弹窗
        showChooseCommunity() {
            this.showChooseCommunityPopup = true
        },

        // 隐藏选择社区弹窗
        hideCommunityPopup() {
            this.showChooseCommunityPopup = false
        },

        // 展示确定弹窗
        handleShowConfirmModal() {
            // 没有选择则不展示
            if (!this.selectedCommunity) return

            this.showConfirmModal = true
        },

        // 确定加入
        confirmJoin() {
            // TODO: 确定加入请求接口
        }
    }
}
</script>

<style lang="scss">
.thirdParty-page {
  padding: 0rpx 48rpx;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  &__logo {
    display: flex;
    justify-content: center;
    margin-top: 120rpx;

    image {
      height: 56rpx;
      width: 380rpx;
    }
  }

  &__available {
    height: 48rpx;
    width: 48rpx;
  }

  &__form {
    margin: 120rpx 0 0;

    &--password {
      margin: 100rpx 0 0;
    }
  }

  &__actions {
      margin: 100rpx 0 0;
  }


  &__agreement {
    margin: 22rpx 0 0;
  }

  .choose-panel {
    background: #F9F9F9;
    border-radius: 40rpx 40rpx 0 0;
    position: relative;

    &__close {
        position: absolute;
        width: 72rpx;
        height: 72rpx;
        background: #fff;
        border-radius: 36rpx;

        display: flex;
        justify-content: center;
        align-items: center;
        right: 52rpx;
        top: -36rpx;

        image {
            width: 40rpx;
            height: 40rpx;
        }
    }

    &__title {
        padding: 112rpx 52rpx 0;
        font-size: 72rpx;
        line-height: 100rpx;
        font-weight: bold;
        color: #333;
    }

    &__hint {
        padding: 0 52rpx;
        margin: 28rpx 0 0;
        color: #b2b2b2;
        font-size: 32rpx;
        line-height: 44rpx;
    }

    &__subtitle {
        color: #333;
        font-size: 32rpx;
        font-weight: bold;
        line-height: 44rpx;
    }

    &__communities {
        margin: 52rpx 0 0;
        padding: 52rpx;
        border-radius: 40rpx 40rpx 0 0;
        background: #fff;

    }

    &__community {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 52rpx;
        color: #838181;

        &.selected {
            color: #E3211D;
            font-weight: bold;
        }

        &-cover {
            padding: 8rpx 6rpx;
            border: 2rpx solid #D8D8D8;
            border-radius: 4rpx;
            image {
                width: 70rpx;
                height: 40rpx;
            }
        }

        &-title {
            margin-left: 32rpx;
            font-size: 32rpx;
            flex: 1;
        }

        &-check {
            width: 24rpx;
            height: 24rpx;
        }
    }

    .common-button {
        margin-top: 52rpx;
    }
  }

}
</style>
