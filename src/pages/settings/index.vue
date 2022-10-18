<template>
  <view class="settings">
    <!-- basic -->
    <view
      class="settings__list basic"
    >
      <view class="settings__title">
        {{ $t('setting_page.basic_settings') }}
      </view>

      <view
        v-for="item in basicSettings"
        :key="item.modules"
        class="settings__item"
        @click="item.handler"
      >
        <image
          class="settings__item-icon"
          :src="require(`@/static/images/settings/${item.module.replace(/_/g, '-')}.png`)"
        />

        <view class="settings__item-title">
          {{ $t(`setting_page.${item.module}`) }}
        </view>

        <!-- 版本号和语言特殊逻辑 -->

        <view class="settings__item-sub">
          {{ handleBasicSubContent(item) }}
        </view>

        <image
          class="settings__item-arrow"
          :src="require(`@/static/images/settings/arrow-right.png`)"
        />
      </view>
    </view>

    <!-- account bind -->
    <view
      class="settings__list binding"
    >
      <view class="settings__title">
        {{ $t('setting_page.bind_settings') }}
      </view>

      <view
        v-for="item in thirdPartySettings"
        :key="item.modules"
        class="settings__item"
        @click="thirdPartyHandler(item)"
      >
        <image
          class="settings__item-icon"
          :src="require(`@/static/images/settings/${item.module.replace(/_/g, '-')}.png`)"
        />

        <view class="settings__item-title">
          {{ $t(`setting_page.${item.module}`) }}
        </view>

        <!-- 绑定状态 -->
        <view class="settings__item-sub">
          {{ $t(`setting_page.${item.status ? 'bound' : 'unbound'}`) }}
        </view>

        <image
          class="settings__item-arrow"
          :src="require(`@/static/images/settings/arrow-right.png`)"
        />
      </view>
    </view>

    <!-- 动作 -->
    <view class="settings__actions">
      <view
        class="common-button revert"
        @click="confirmLogout"
      >
        {{ $t('setting_page.logout_button') }}
      </view>
    </view>


    <!-- modal -->
    <u-modal
      v-if="modalConfig"
      :show="modalConfig.isShowModal"
      :cancel-color="modalConfig.cancelColor || '#838181'"
      :confirm-color="modalConfig.confirmColor || '#E21D1C'"
      width="468rpx"
      :show-cancel-button="true"
      :confirm-text="$t(modalConfig.confirmKey || 'confirm')"
      :cancel-text="$t(modalConfig.cancelKey || 'cancel')"
      :close-on-click-overlay="true"
      @close="hideModal"
      @cancel="hideModal"
      @confirm="modalConfig.confirm"
    >
      <view style="font-size: 32rpx; line-height: 44rpx; color: #333;">
        {{ $t(modalConfig.contentKey, modalConfig.params() || {}) }}
      </view>
    </u-modal>

    <!-- 切换语言弹窗 -->
    <LanguageSwitcher
      :visible.sync="isShowLanguageSwitcher"
    />
  </view>
</template>

<script>
import LanguageSwitcher from '@/components/languagesSwitch'
export default {
    components: {
        LanguageSwitcher
    },
    data() {
        return {
            basicSettings: [
                {
                    module: 'change_password',
                    subContent: '', // 右侧的内容
                    handler: () => this.$navigateTo('/pages/settings/change-password') // 点击需要展示的内容
                },
                {
                    module: 'set_languages',
                    subContent: '', // 右侧的内容
                    handler: () => this.isShowLanguageSwitcher = true // 点击需要展示的内容
                },
                {
                    module: 'feedback',
                    subContent: '', // 右侧的内容
                    handler: () => this.$navigateTo('/pages/settings/feedback') // 点击需要展示的内容
                },
                {
                    module: 'rating_and_feedback',
                    subContent: '', // 右侧的内容
                    handler: () => this.$navigateTo('/pages/settings/rating-and-feedback') // 点击需要展示的内容
                },
                {
                    module: 'about_us',
                    subContent: '', // 右侧的内容
                    handler: () => this.$navigateTo('/pages/settings/about-us') // 点击需要展示的内容
                },
                {
                    module: 'version',
                    subContent: '', // 右侧的内容
                    handler: () => this.$navigateTo('/pages/settings/version') // 点击需要展示的内容
                }
            ],

            thirdPartySettings: [
                {
                    module: 'facebook',
                    status: 0, // 绑定状态
                    handler: () => {} // 点击需要展示的内容
                },
                {
                    module: 'twitter',
                    status: 1,
                    handler: () => {} // 点击需要展示的内容
                },
                {
                    module: 'google',
                    status: 0, // 绑定状态
                    handler: () => {} // 点击需要展示的内容
                },
                {
                    module: 'instagram',
                    status: 1, // 绑定状态
                    handler: () => {} // 点击需要展示的内容
                },
                {
                    module: 'apple',
                    status: 0, // 绑定状态
                    handler: () => {} // 点击需要展示的内容
                }
            ],

            modalKey: '',
            thirdParty: null,

            // modal的配置
            modalConfigs: {
                'logout': {
                    isShowModal: false,
                    contentKey: 'setting_page.logout_confirm_hint',
                    confirmKey: 'setting_page.logout',
                    cancelKey: 'cancel',
                    confirm: () => this.logout()
                },
                'bind': {
                    isShowModal: false,
                    contentKey: 'setting_page.jump_thirdparty_for_bind',
                    confirmKey: 'confirm',
                    params: () => { return { thirdParty: this.thirdParty.module } },
                    confirmColor: '#333',
                    cancelKey: 'cancel',
                    confirm: () => this.bindThirdParty()
                },
                'unbind': {
                    isShowModal: false,
                    contentKey: 'setting_page.unbound_hint',
                    confirmKey: 'confirm',
                    cancelKey: 'cancel',
                    confirm: () => this.unbindThirdParty()
                }
            },

            // 其他业务
            isShowLanguageSwitcher: false
        }
    },

    computed: {
        modalConfig() {
            return this.modalConfigs[this.modalKey] || null
        },

        // 展示的语言
        displayLanguage() {
            const map = {
                'en-ES': 'English',
                'ja-JP': '日本語',
                'de-DE': 'Deutsch',
                'zh-CN': '简体中文',
                'en-US': 'Español'
            }

            return map[this.locale] || ''
        }
    },

    mounted() {

    },
    methods: {
        handleBasicSubContent(item) {
            if (item.module === 'set_languages') return this.displayLanguage
            if (item.module === 'version') return this.version

            return item.sub
        },

        // 第三方绑定的函数
        thirdPartyHandler(thirdParty) {
            this.thirdParty = thirdParty

            // 1是绑定了，0是没绑定
            this.modalKey = thirdParty.status ? 'unbind' : 'bind'

            this.showModal()

        },

        // 打开确定弹窗
        confirmLogout() {
            this.modalKey = 'logout'

            this.showModal()
        },

        // 打开弹窗
        showModal() {
            this.modalConfigs[this.modalKey].isShowModal = true
        },

        hideModal() {
            this.modalConfigs[this.modalKey].isShowModal = false

            this.modalKey = ''
        },

        // 绑定第三方平台
        bindThirdParty() {
            // TODO: this.thirdParty
        },

        // 解绑第三方平台
        unbindThirdParty() {
            // TODO: this.thirdParty
        },

        //
        logout() {
            console.log('this', this.modalConfigs);
        }
    }
}
</script>

<style lang="scss">
.settings {
    padding: 48rpx 48rpx 100rpx;

    &__list {
        margin: 50rpx 0 0;
    }

    &__title {
        font-size: 48rpx;
        color: #000;
        font-weight: bold;
    }

    &__item {
        display: flex;
        align-items: center;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid #E2E2E2;
        margin: 48rpx 0 0;
        &-icon {
            width: 48rpx;
            height: 48rpx;
        }

        &-title {
            flex: 1;
            margin-left: 20rpx;
            font-size: 32rpx;
            color: #333;
        }

        &-sub {
            color: #838181;
            font-size: 28rpx;
            margin-right: 30rpx;
        }

        &-arrow {
            width: 13.5px;
            height: 13.5px;
        }
    }

    &__actions {
        margin: 30rpx 0 0;
        .common-button {
            &.revert {
                color: #DF0001;
                border-color: #DF0001;
            }
        }
    }
}
</style>
