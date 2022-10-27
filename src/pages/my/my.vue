<template>
  <view class="my">
    <u--form
      ref="form"
      :label-width="85"
      label-position="left"
      :model="formData"
    >
      <u-form-item
        label="access token"
        prop="accessToken"
        border-bottom
      >
        <u--input
          v-model="formData.accessToken"
          placeholder="please select accessToken"
          border="none"
        />
      </u-form-item>
    </u--form>
  </view>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    components: {
    },
    data() {
        return {
            formData: {
                accessToken: ''
            }
        }
    },
    computed: {
        ...mapState('common', ['accessToken'])
    },

    watch: {
        'formData.accessToken': {
            deep: true,
            handler(newVal) {
                this.setAccessToken(newVal)
            }
        }
    },
    mounted() {
        this.formData.accessToken = this.accessToken
    },
    methods: {
        ...mapActions('common', ['setAccessToken'])
    }
}
</script>

<style lang="scss">
.my {
  padding: 32rpx;
}
</style>
