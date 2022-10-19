<template>
  <view class="content">
    <view>
      asdasdsa
    </view>
    <!-- <Tabbar /> -->
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
    components: {
    },
    data() {
        return {
            title: 'Hello'
        }
    },
    computed: {
        ...mapState(['test'])
    },
    mounted() {
        uni.navigateTo({
            url: '/pages/account/login'
        })
    },
    methods: {

    }
}
</script>

<style lang="scss">
</style>
