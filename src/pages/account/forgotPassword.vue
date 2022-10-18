<template>
  <view class="forgot-password-page">
    <view class="forgot-password-page__logo">
      <image :src="require('@/static/images/common/word-logo.png')" />
    </view>

    <!-- form -->
    <view class="forgot-password-page__form">
      <u-input
        v-model="email"
        :placeholder="$t('email')"
        border="bottom"
        clearable
      >
        <view
          slot="suffix"
          :class="['verfication-code', isSentVerficationCode ? 'sent' : '' ]"
          @click="getVerficationCode"
        >
          {{ isSentVerficationCode ? `(${countdownTime})` : '' }}{{ $t('second') }}
        </view>
      </u-input>

      <u-input
        v-model="verficationCode"
        class="forgot-password-page__form--password"
        :placeholder="$t('verfication_code')"
        border="bottom"
      />

      <u-input
        v-model="password"
        class="forgot-password-page__form--password"
        :placeholder="$t('password_page.new_password')"
        border="bottom"
        :password="!passwordState"
      >
        <image
          slot="suffix"
          class="forgot-password-page__available"
          :src="require(`@/static/images/login/password-${ passwordState ? '' : 'un'}available.png`)"
          @click="switchPasswordState"
        />
      </u-input>
    </view>

    <!-- 按钮 -->
    <view
      class="forgot-password-page__login-button"
      @click="submitPassword"
    >
      {{ $t('password_page.save_password') }}
    </view>
  </view>
</template>

<script>
import { debounce } from '@/utils'

export default {
    data() {
        return {
            email: '', // 邮箱
            password: '', // 密码
            passwordState: false, // 是否不展示密码
            verficationCode: '', // 验证码
            checkAgreement: false, // 是否同意协议
            isSentVerficationCode: false, // 是否发送了邮箱验证码

            countdownTimer: '', // 倒计时计数器
            countdownTime: 60 // 倒计时时间
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


        // 提交密码
        submitPassword() {
            // TODO: 提交密码

            const params = {
                email: this.email,
                password: this.password,
                verificationCode: this.verificationCode
            }

            console.log('提交密码', params);
        }
    }
}
</script>

<style lang="scss">
.forgot-password-page {
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
}
</style>
