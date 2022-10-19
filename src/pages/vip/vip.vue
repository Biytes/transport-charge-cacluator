<template>
  <view class="vip">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form
      ref="form"
      :label-width="85"
      label-position="left"
      :model="formData"
    >
      <u-form-item
        label="Reference No"
        prop="referenceNo"
        border-bottom
      >
        <u--input
          v-model="formData.referenceNo"
          placeholder="please enter reference no"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="lading number"
        prop="ladingNumber"
        border-bottom
      >
        <u--input
          v-model="formData.ladingNumber"
          placeholder="please enter lading number"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="consignee"
        prop="consignee"
        border-bottom
      >
        <u--input
          v-model="formData.consignee"
          placeholder="please enter consignee"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="consignee address"
        prop="consigneeAddress"
        border-bottom
      >
        <u--input
          v-model="formData.consigneeAddress"
          placeholder="please enter consignee"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="收货人电话"
        prop="consigneePhone"
        border-bottom
      >
        <u--input
          v-model="formData.consigneePhone"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="相距公里数"
        prop="delieveryDistance"
        border-bottom
      >
        <u--input
          v-model="formData.delieveryDistance"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="货物重量"
        prop="cargoWeight"
        border-bottom
      >
        <u--input
          v-model="formData.cargoWeight"
          type="digit"
          border="none"
          @change="handleCargoWeightChange"
        />
      </u-form-item>

      <u-form-item
        label="货物体积"
        prop="cargoCBM"
        border-bottom
      >
        <u--input
          v-model="formData.cargoCBM"
          type="digit"
          border="none"
          @
        />
      </u-form-item>

      <u-form-item
        label="货物抛货重货"
        border-bottom
      >
        <u--input
          v-model="cargoDumpingHeavy"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="卸货费"
        prop="ausCash"
        border-bottom
      >
        <u--input
          v-model="formData.ausCash"
          placeholder="please enter consignee"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="卸货费 中方代收"
        prop="commission"
        border-bottom
      >
        <u--input
          v-model="formData.commission"
          placeholder="please enter consignee"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="监管仓预定费"
        prop="bookingFee"
        border-bottom
      >
        <u--input
          v-model="formData.bookingFee"
          placeholder="please enter booking fee"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="过路费"
        prop="toll"
        border-bottom
      >
        <u--input
          v-model="formData.toll"
          placeholder="please enter toll charge"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="尾板费"
        prop="tailboardFee"
        border-bottom
      >
        <u--input
          v-model="formData.tailboardFee"
          placeholder="please enter tailboard fee charge"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="基础配送费"
        border-bottom
      >
        <u--input
          v-model="quoteFee"
          type="digit"
          border="none"
        />
      </u-form-item>


      <u-form-item
        label="燃油配送费"
        border-bottom
      >
        <u--input
          v-model="feulSurcharge"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="超时费"
        prop="overdueCharge"
        border-bottom
      >
        <u--input
          v-model="formData.overdueCharge"
          placeholder="please enter overdue charge"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="应收单票服务费"
        border-bottom
      >
        <u--input
          v-model="charge"
          type="digit"
          border="none"
        />
      </u-form-item>
    </u--form>
  </view>
</template>

<script>
const WEIGHT_PER_CBM = 250 // 重量每立方
export default {
    components: {
    },
    data() {
        return {
            formData: {
                referenceNo: '', // 提单上的number
                ladingNumber: '', // ladding number
                consignee: '', // 收货人
                consigneeAddress: '', // 收货地址
                consigneePhone: '',

                delieveryDistance: '', // 相距公里数
                cargoWeight: '', // 货物重量
                cargoCBM: '', // 货物体积
                ausCash: '', // 卸货现金
                commission: '', // 卸货费 中方代收 AUD
                bookingFee: '', // 监管仓预定费
                toll: '', // 过路费
                tailboardFee: '', // 尾板费
                overdueCharge: '' // 超时费
            },

            ratio: 0.15 // 燃油附加费率比例

        }
    },
    computed: {
        // 货物抛货重货
        cargoDumpingHeavy() {

            if (!this.formData.cargoCBM) return ''

            return +this.formData.cargoCBM * WEIGHT_PER_CBM
        },

        // 基础配送费
        quoteFee() {
            if (!this.formData.cargoCBM) return ''

            return 75 + (this.formData.cargoCBM - 1) * 15
        },

        // 燃油附加费
        feulSurcharge() {
            return this.quoteFee * this.ratio
        },

        // 收费
        charge() {
            const charges = [
                'ausCash',
                'commission',
                'bookingFee',
                'toll',
                'tailboardFee',
                'overdueCharge'
            ]

            let result = 0

            charges.map(key => {
                console.log('this.formData[key]', key);
                result += +this.formData[key] || 0

                return key
            })

            result += this.quoteFee || 0
            result += this.feulSurcharge || 0

            return result
        }
    },
    mounted() {

    },
    methods: {
        handleCargoWeightChange(val) {
            this.formData.cargoCBM = Math.ceil(val / WEIGHT_PER_CBM)
        }
    }
}
</script>

<style lang="scss">
.vip {
    padding: 32rpx;
}

</style>
