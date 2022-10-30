<template>
  <view class="order">
    <view class="order__previewer">
      <image
        v-if="imageUrl"
        :src="imageUrl"
        mode="widthFix"
        :show-menu-by-longpress="true"
        @click="previewImg"
      />
    </view>

    {{ imageUrl }}

    <!-- 画证书的组件 -->
    <OrderPainter
      v-if="order && startDrawing"
      :order="order"
      @drawFulfilled="done"
    />
  </view>
</template>

<script>
import OrderPainter from '@/components/orderPainter'
export default {
    components: {
        OrderPainter
    },
    data() {
        return {
            order: null,
            imageUrl: '',
            startDrawing: false
        }
    },
    computed: {
    },
    onLoad(options) {
        console.log('options', options);
        this.order = options

        // {
        //     consignee: 'Weckson1111ssdasdasdasds',
        //     consigneeAddress: '8 Gillingham 4102',
        //     consigneePhone: '13750121745',
        //     postCode: '122222',
        //     referenceNo: '1653082552',
        //     tip: '大索伦蒂诺卡洛斯你的卡拉上你的快乐暗示的离开那是离开的那silken卢卡斯你的卢卡斯你的了看谁的离开拿上来看到你阿莱克斯等你卢卡斯你的了看谁的离开啊',
        //     productQuantity: 100,
        //     productDescription: '三打卡留念silken考虑到那时离开的那卢卡斯你的卢卡斯你的款蓝色的快乐按时打卡nasal 撒的阿斯顿阿斯顿阿斯顿阿斯顿'
        // }


        setTimeout(() => {
            this.startDrawing = true
        }, 1000)
    },
    methods: {
        /**预览图片 */
        previewImg() {
            if (!this.imageUrl) return

            uni.previewImage({
                urls: [this.imageUrl],
                current: this.imageUrl
            });
        },
        done(url) {
            console.log('url', url);
            this.imageUrl = url
        }

    }
}
</script>

<style lang="scss" scoped>
.order {
  background: #ffffff;
  position: relative;
  padding-top: 20rpx;
  max-width: 100vw;
  max-height: 100vh;
  &__previewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1200rpx;
    image {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
