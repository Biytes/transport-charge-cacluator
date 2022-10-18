<template>
  <view class="register-page">
    <view class="register-page__logo">
      <image
        :src="require('@/static/images/common/round-logo.png')"
        @click="displayUploadPopup"
      />

      <text>{{ $t('register_page.edit_avatar') }}</text>
    </view>

    <!-- form -->
    <view class="register-page__form">
      <u-input
        v-model="nickName"
        :placeholder="$t('register_page.nickname')"
        border="bottom"
        @click="changeAvatar"
      />

      <u-input
        v-model="email"
        class="register-page__form--password"
        :placeholder="$t('email')"
        border="bottom"
        clearable
      >
        <view
          slot="suffix"
          :class="['verfication-code', isSentVerficationCode ? 'sent' : '' ]"
          @click="getVerficationCode"
        >
          {{ $t(`${isSentVerficationCode ? '' : 'send_code'}`) }}{{ isSentVerficationCode ? `${countdownTime} ${$t('second')}` : '' }}
        </view>
      </u-input>

      <u-input
        v-model="verficationCode"
        class="register-page__form--password"
        :placeholder="$t('verfication_code')"
        border="bottom"
      />

      <u-input
        v-model="password"
        class="register-page__form--password"
        :placeholder="$t('password')"
        border="bottom"
        :password="!passwordState"
      >
        <image
          slot="suffix"
          class="register-page__available"
          :src="require(`@/static/images/login/password-${ passwordState ? '' : 'un'}available.png`)"
          @click="switchPasswordState"
        />
      </u-input>
    </view>

    <!-- 按钮 -->
    <view
      class="register-page__submit-button"
      @click="submitPassword"
    >
      {{ $t('register') }}
    </view>

    <!-- 协议 -->
    <view class="register-page__agreement">
      <Agreement :check-agreement.sync="checkAgreement" />
    </view>

    <!-- 已经有账号 -->
    <view class="register-page__existing-account">
      {{ $t('register_page.existing_account') }}
      <text @click="$navigateTo('/pages/account/login')">
        {{ $t('login') }}
      </text>
    </view>

    <!-- 上传提示 -->
    <u-popup
      :show.sync="showUploadPopup"
      round="20px"
      mode="bottom"
      @close="showUploadPopup = false"
    >
      <view class="upload-panel">
        <text class="upload-panel__title upload-panel__border">Upload Avatar</text>
        <text class="upload-panel__border">{{ $t('album') }}</text>
        <text>Photograph</text>

        <text
          class="upload-panel__cancel"
          @click="showUploadPopup = false"
        >
          {{ $t('cancel') }}
        </text>
      </view>
    </u-popup>
  </view>
</template>

<script>
import Agreement from '@/components/agreement'
import { debounce } from '@/utils'

export default {
    components: {
        Agreement
    },
    data() {
        return {
            nickName: '', //用户名
            email: '', // 邮箱
            password: '', // 密码
            passwordState: false, // 是否不展示密码
            verficationCode: '', // 验证码
            checkAgreement: false, // 是否同意协议
            isSentVerficationCode: false, // 是否发送了邮箱验证码

            countdownTimer: '', // 倒计时计数器
            countdownTime: 60, // 倒计时时间

            // 上传
            showUploadPopup: false
        }
    },

    mounted() {

    },
    methods: {

        // 切换密码展示状态
        switchPasswordState() {
            this.passwordState = !this.passwordState
        },

        // 倒计时
        countDown() {
            const temp = this.countdownTime

            this.countdownTimer = setInterval(() => {
                if (this.countdownTime <= 0) {
                    clearInterval(this.countdownTimer)
                    this.countdownTimer = null
                    this.countdownTime = temp
                    this.isSentVerficationCode = false
                } else {
                    this.countdownTime--
                }
            }, 1000)
        },

        // 获取verification code
        getVerficationCode: debounce(function () {
            this.isSentVerficationCode = true
            this.countDown()
        }, 200),

        // 切换头像
        changeAvatar() {

        },

        // 提交密码
        submitPassword() {
            // TODO: 提交密码

            const params = {
                email: this.email,
                password: this.password,
                verificationCode: this.verificationCode
            }

            console.log('提交密码', params);
        },

        // 展示上传弹窗
        displayUploadPopup() {
            this.showUploadPopup = true
        }
    }
}
</script>

<style lang="scss">
.register-page {
  padding: 0rpx 48rpx;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 32rpx;
    color: #9EA2A6;

    image {
      height: 184rpx;
      width: 184rpx;
    }

    text {
      margin: 20rpx 0 0;
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

    .verfication-code {
        padding: 6rpx 12rpx;
        background: #3D3D3D;
        color: #fff;
        font-size: 24rpx;
        border-radius: 40rpx;

        // 发送状态
        &.sent {
            background: #C1C1C1;
        }
    }
  }

  &__forgot-password {
    margin: 30rpx 0 0;
    text-align: right;
  }

  &__submit-button {
    color: #fff;
    background: linear-gradient(360deg, #4D4D4D 0%, #303030 100%);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36rpx;
    margin-top: 96rpx;
    height: 112rpx;
    min-height: 112rpx;
  }

  &__agreement {
    margin: 22rpx 0 0;
  }

  &__existing-account {
      color: #808690;
      font-size: 28rpx;
      text-align: center;
      margin-top: 168rpx;
      padding-bottom: 96rpx;

      text {
          color: #6D97FF;
          margin-left: 10rpx;
      }
  }

  .upload-panel {
      background: #f0f0f0;
      display: flex;
      flex-direction: column;
      border-radius: 40rpx;

      &__title {
          color: #272525;
          font-size: 36rpx;
          font-weight: bold;
          border-radius: 40rpx 40rpx 0 0;
      }

      text {
        background: #F9F9F9;
        padding: 56rpx 48rpx;
        color: #333;
        display: block;
      }

      &__border {
        border-bottom: 2rpx solid #f0f0f0;
      }

      &__cancel {
          margin-top: 20rpx;
          color: #838181;
      }
  }
}
</style>
