<template>
  <view class="change-password">
    <u-input
      v-model="oldPassword"
      class="change-password__form--password"
      :placeholder="$t('password_page.old_password_empty_hint')"
      border="bottom"
      :password="!oldPasswordState"
    >
      <image
        slot="suffix"
        class="change-password__available"
        :src="require(`@/static/images/login/password-${ oldPasswordState ? '' : 'un'}available.png`)"
        @click="switchPasswordState('oldPasswordState')"
      />
    </u-input>

    <u-input
      v-model="newPassword"
      class="change-password__form--password"
      :placeholder="$t('password_page.new_password_empty_hint')"
      border="bottom"
      :password="!newPasswordState"
    >
      <image
        slot="suffix"
        class="change-password__available"
        :src="require(`@/static/images/login/password-${ newPasswordState ? '' : 'un'}available.png`)"
        @click="switchPasswordState('newPasswordState')"
      />
    </u-input>
  </view>
</template>

<script>
export default {
    name: 'ChangePassword',
    data() {
        return {
            newPassword: '',
            oldPassword: '',

            oldPasswordState: false,
            newPasswordState: false
        }
    },

    mounted() {
        // 标题设置
        uni.setNavigationBarTitle({ title: this.$t('password_page.change_password') })
    },

    methods: {
        // 切换密码展示状态
        switchPasswordState(key) {
            this[key] = !this[key]
        }
    }
}
</script>

<style lang="scss" scoped>
.change-password {
  padding: 0 52rpx;
    &__available {
      height: 48rpx;
      width: 48rpx;
    }

  &__form {

    &--password {
      margin: 30rpx 0 0;

      .uni-input-placeholder {
        color: #80858E;
        font-size: 32rpx;
      }
    }
  }

}
</style>