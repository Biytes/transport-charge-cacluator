<template>
  <view class="login-page">
    <view class="login-page__logo">
      <image :src="require('@/static/images/common/word-logo.png')" />
    </view>

    <!-- form -->
    <view class="login-page__form">
      <u-input
        v-model="email"
        :placeholder="$t('email')"
        border="bottom"
        clearable
      />

      <u-input
        v-model="password"
        class="login-page__form--password"
        :placeholder="$t('password')"
        border="bottom"
        :password="!passwordState"
      >
        <image
          slot="suffix"
          class="login-page__available"
          :src="require(`@/static/images/login/password-${ passwordState ? '' : 'un'}available.png`)"
          @click="switchPasswordState"
        />
      </u-input>
    </view>

    <!-- 文案 -->
    <view
      class="login-page__forgot-password"
      @click="$navigateTo('/pages/account/forgotPassword')"
    >
      {{ $t('password_page.forgot_password') }}?
    </view>

    <!-- 按钮 -->
    <view
      class="login-page__login-button"
      @click="login"
    >
      {{ $t('login') }}
    </view>

    <!-- 协议 -->
    <view class="login-page__agreement">
      <Agreement :check-agreement.sync="checkAgreement" />
    </view>

    <!-- 新建账号 -->
    <view
      class="login-page__create"
      @click="$navigateTo('/pages/account/register')"
    >
      <image :src="require('@/static/images/common/create-account.png')" />

      <text>{{ $t('login_page.create_new_account') }}</text>
    </view>

    <!-- 第三方 -->
    <view class="login-page__thirdparty">
      <view class="login-page__thirdparty-content">
        <view class="line-left" />
        or join with
        <view class="line-right" />
      </view>

      <view class="login-page__thirdparty-platform">
        <view
          v-for="platform in platforms"
          :key="platform.name"
          class="login-page__thirdparty-item"
          @click="clickPlatform(platform)"
        >
          <image :src="platform.icon" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Agreement from '@/components/agreement'
import { mapActions } from 'vuex'

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

            platforms: [
                {
                    name: 'apple',
                    icon: require('@/static/images/login/apple.png')
                },
                {
                    name: 'google',
                    icon: require('@/static/images/login/google.png')
                },
                {
                    name: 'facebook',
                    icon: require('@/static/images/login/facebook.png')
                },
                {
                    name: 'line',
                    icon: require('@/static/images/login/line.png')
                }
            ]
        }
    },

    mounted() {

    },
    methods: {
        ...mapActions('common', ['switchLanguages']),
        login() {
            // TODO: login
        },

        // 切换密码展示状态
        switchPasswordState() {
            this.passwordState = !this.passwordState
        },

        // 点击第三方平台
        clickPlatform(platform) {
            console.log('platform', platform);

            this.$navigateTo('/pages/account/thirdParty')
        }
    }
}
</script>

<style lang="scss">
.login-page {
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

  &__forgot-password {
    margin: 30rpx 0 0;
    text-align: right;
  }

  &__login-button {
    height: 112rpx;
    color: #fff;
    background: linear-gradient(360deg, #4D4D4D 0%, #303030 100%);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36rpx;
    margin-top: 96rpx;
  }

  &__agreement {
    margin: 22rpx 0 0;
  }

  &__create {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3067F0;
    font-size: 28rpx;
    margin-top: 100rpx;

    image {
      margin-right: 10rpx;
      width: 48rpx;
      height: 48rpx;
    }
  }

  &__thirdparty {
    margin: 120rpx 0 0;
    &-content {
      color: #808690;
      display: flex;
      align-items: center;

      .line-left, .line-right {
        flex: 1;
        height: 2rpx;
        background: #e2e2e2;
      }

      .line-left {
        margin-right: 50rpx;
      }

      .line-right {
        margin-left: 50rpx;
      }
    }

    &-platform {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40rpx;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f2f2f2;
      border-radius: 96rpx;
      height: 96rpx;
      width: 96rpx;
      image {
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
}
</style>
