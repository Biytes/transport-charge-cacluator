<template>
  <!-- 上传提示 -->
  <u-popup
    :show.sync="visible"
    mode="bottom"
    @close="hide"
  >
    <view class="languages">
      <!-- 选择语言弹窗 -->
      <view class="languages__title">{{ $t('setting_page.set_languages') }}</view>
      <view class="languages__list">
        <!-- 单个语言 -->
        <view
          v-for="language in languages"
          :key="language.title"
          class="languages__item"
          @click="handleSwitchLanguage(language)"
        >
          {{ language.title }}
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 语言选项
            languages: [
                {
                    title: 'English',
                    locale: 'en-ES'
                },
                {
                    title: '日本語',
                    locale: 'ja-JP'
                },
                {
                    title: 'Deutsch',
                    locale: 'de-DE'
                },
                {
                    title: '简体中文',
                    locale: 'zh-CN'
                },
                {
                    title: 'Español',
                    locale: 'en-US'
                }
            ]
        }
    },

    computed: {
        ...mapState('common', ['locale'])
    },

    methods: {
        ...mapActions('common', ['switchLanguages']),

        // 切换语言
        handleSwitchLanguage(language) {
            this.switchLanguages(language.locale)
            this._i18n.locale = this.locale

            this.$emit('switch', language)

            // 切换完就关
            this.hide()
        },

        hide() {
            this.$emit('update:visible', false)
        }
    }
}
</script>


<style lang="scss" scoped>

.languages {
    background: #fff;
    border-radius: 40rpx 40rpx 0 0;

    &__title {
        padding: 52rpx 48rpx;
        font-size: 40rpx;
        line-height: 56rpx;
        color: #333;
        font-weight: bold;
    }

    &__list {
        font-size: 36rpx;
    }

    &__item {
        padding: 52rpx 48rpx;
        border-top: 2rpx #E2E2E2 solid;
    }
}

</style>