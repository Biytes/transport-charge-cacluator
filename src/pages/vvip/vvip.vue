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
        label="wareHouse address"
        prop="wareHouseIndex"
        border-bottom
        @click.stop="handleShowWareHouseAddress"
      >
        <u--input
          v-model="warehouse.name"
          disabled
          placeholder="please select warehouse"
          border="none"
        />
      </u-form-item>

      <u-action-sheet
        :show="showWareHouseSelector"
        :actions="warehouses"
        title="Please select warehouse"
        @close="showWareHouseSelector = false"
        @select="selectWareHouse"
      />

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

        <u-button
          slot="right"
          type="plain"
          text="search"
          @click="calculateDistance"
        />
      </u-form-item>

      <u-form-item
        label="PostCode"
        prop="postCode"
        border-bottom
      >
        <u--input
          v-model="formData.postCode"
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
        label="途径收费站"
        border-bottom
      >
        <u--input
          disbaled
          :value="chargeStops.join(', ')"
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
          placeholder="please enter 卸货费"
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
          placeholder="please enter 卸货费 中方代收"
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
          :value="formData.toll"
          disbaled
          placeholder="please enter toll charge"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="尾板费"
        border-bottom
      >
        <u-radio-group
          v-model="tailboardFeeIndex"
          icon-placement="right"
          @change="changeTailboard"
        >
          <u-radio
            v-for="(item, index) in tailboardFeeConfig"
            :key="index"
            :custom-style="{marginLeft: '8px'}"
            :label="item.name"
            :name="index"
          />
        </u-radio-group>
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
        prop="overdueCharge"
        border-bottom
      >
        <u--input
          v-model="charge"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="备注"
        prop="tip"
        border-bottom
      >
        <u--textarea
          v-model="formData.tip"
          placeholder="请输入备注"
          count
        />
      </u-form-item>
    </u--form>

    <view class="actions">
      <u-button
        slot="right"
        type="plain"
        text="generate"
        @click="generateOrder"
      />
    </view>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
const WEIGHT_PER_CBM = 250 // 重量每立方
const PETROL_RATIO = 0.15 // 燃油附加费率比例
import { vvipistancePriceConfig } from '@/constant/vvip'
import { tailboardFeeConfig } from '@/constant'
import { mapState } from 'vuex'
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
                postCode: '', // 邮政编码
                consigneePhone: '',

                delieveryDistance: '', // 相距公里数
                cargoWeight: '', // 货物重量
                cargoCBM: '', // 货物体积
                ausCash: '', // 卸货现金
                commission: '', // 卸货费 中方代收 AUD
                bookingFee: '', // 监管仓预定费
                toll: '', // 过路费
                tailboardFee: '', // 尾板费
                overdueCharge: '', // 超时费

                tip: '' // 备注
            },

            ratio: PETROL_RATIO, // 燃油附加费率比例

            warehouses: [
                {
                    name: 'warehouse1',
                    longtitude: 153.150146,
                    latitude: -27.431228
                },
                {
                    name: 'warehouse2',
                    longtitude: 153.037142,
                    latitude: -29.484764
                }
                // {
                //     name: 'warehouse3',
                //     longtitude: 153.037142,
                //     latitude: -29.484764
                // }
            ],

            vvipistancePriceConfig, // vip收费

            warehouse: null, // 仓库地址
            consigneeAddress: null, // 目标地址

            showWareHouseSelector: false,

            distance: 0,

            // 收费站
            chargeStops: [],

            // 距离计算的配置
            distanceConfig: null,
            tailboardFeeConfig,
            tailboardFeeIndex: 0
        }
    },
    computed: {
        ...mapState('common', ['accessToken']),
        // 货物抛货重货
        cargoDumpingHeavy() {

            if (!this.formData.cargoCBM) return ''

            return +this.formData.cargoCBM * WEIGHT_PER_CBM
        },

        // 基础配送费
        quoteFee() {
            if (this.distanceConfig) {
                const { initialPrice, pricePerCBM } = this.distanceConfig

                const cargoCBM = this.$path(this.formData, 'cargoCBM', 1)
                const extraCargoCBM = Math.ceil(cargoCBM - 1) // 额外的立方米

                const extraFee = extraCargoCBM * pricePerCBM

                return initialPrice + extraFee
            }

            return 0
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
                result += +this.formData[key] || 0

                return key
            })

            result += this.quoteFee || 0
            result += this.feulSurcharge || 0

            return result
        }
    },

    watch: {
        // 仓库地址
        'warehouse': {
            deep: true,
            handler() {
                if (this.formData.consigneeAddress) this.calculateDistance()
            }
        },

        // 收费站
        chargeStops: {
            deep: true,
            handler(newVal) {
                this.formData.toll = newVal.length * 7 * 2
            }
        },

        // 距离计算
        distance: {
            handler(val) {
                const distance = Math.round(val);

                const config = this.vvipistancePriceConfig.find(item => {
                    const { min, max } = item;

                    const result = distance >= min && distance <= max

                    return result
                })

                if (config) this.distanceConfig = config

                console.log('config', config);
            }
        }
    },

    async mounted() {
        this.warehouse = this.warehouses[0]
        this.changeTailboard(0)
    },
    methods: {
        // 当重量变化的时候
        handleCargoWeightChange(val) {
            this.formData.cargoCBM = Math.ceil(val / WEIGHT_PER_CBM)
        },

        // 选择地址
        selectWareHouse(warehouse) {
            this.warehouse = warehouse
        },

        handleShowWareHouseAddress() {
            this.showWareHouseSelector = true
        },

        // 切换
        changeTailboard(index) {
            this.formData.tailboardFee = this.tailboardFeeConfig[index].value
        },

        // 计算距离
        async calculateDistance() {
            if (!this.warehouse) return this.showToast({ type: 'default', title: '请选择仓库'})
            if (!this.formData.consigneeAddress) return this.showToast({ type: 'default', title: '请输入目标地址'})

            const warehouse = this.warehouse

            // 拿到目标地址坐标
            const targetCoordinates = await this.getCoordinates()

            // 获取地址
            const distance = await this.getDistance(targetCoordinates, warehouse)

            this.formData.delieveryDistance = `${(distance / 1000).toFixed(3)}km`
            this.distance = (distance / 1000).toFixed(3)
        },

        // 获取坐标
        async getCoordinates() {
            const params = {
                address: this.formData.consigneeAddress,
                accessToken: this.accessToken
            }

            try {
                const res = await this.$api.common.getCoordinates(params)
                const coordinates = this.$path(res, 'data.features.0.center', []);
                const [longtitude, latitude] = coordinates;

                console.log('res', res, longtitude, latitude);

                return { longtitude, latitude }

            } catch (error) {
                console.warn('getCoordinates', error);
            }
        },

        // 获取距离
        async getDistance(address1, address2) {
            const params = {
                longtitude1: address1.longtitude,
                latitude1: address1.latitude,
                longtitude2: address2.longtitude,
                latitude2: address2.latitude,
                accessToken: this.accessToken
            }

            try {
                const res = await this.$api.common.getDistance(params)

                const routes = this.$path(res, 'data.routes', [])

                const distances = routes.map(route => route.distance).sort((x, y) => x - y);

                const distance = this.$path(distances, '0', '空')

                const chargeStops = this.$path(routes, '0.legs.0.summary', [])

                this.$set(this, 'chargeStops', chargeStops.split(','))

                console.log('res', res);

                return distance

            } catch (error) {
                console.warn('getDistance', error);
            }
        },

        showToast(params) {
            this.$refs.uToast.show({
                ...params,
                complete() {
                    params.url && uni.navigateTo({
                        url: params.url
                    })
                }
            })
        },

        // 生成订单
        generateOrder() {
            const order = {
                postCode: this.formData.postCode || '',
                consignee: this.formData.consignee,
                consigneeAddress: this.formData.consigneeAddress,
                consigneePhone: this.formData.consigneePhone,
                referenceNo: this.formData.referenceNo,
                tip: this.formData.tip
            }

            this.$navigateTo('/pages/order/preview', order)
        }
    }
}
</script>

<style lang="scss">
.vip {
    padding: 32rpx;
}

</style>
