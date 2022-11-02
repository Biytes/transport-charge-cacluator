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
        border-bottom
        @click.stop="handleShowActionSheet('warehouses')"
      >
        <u--input
          v-model="warehouse.name"
          disabled
          placeholder="please select warehouse"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="starting point address"
        border-bottom
        @click.stop="handleShowActionSheet('startingPoint')"
      >
        <u--input
          v-model="startingPoint.name"
          disabled
          placeholder="please select startingPoint"
          border="none"
        />
      </u-form-item>


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
          @click="calculate"
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
        prop="deliveryDistance"
        border-bottom
      >
        <u--input
          v-model="formData.deliveryDistance"
          type="digit"
          border="none"
        />

        <view slot="right">
          KM
        </view>
      </u-form-item>

      <u-form-item
        label="配送时间"
        prop="deliveryDuration"
        border-bottom
      >
        <u--input
          v-model="formData.deliveryDuration"
          type="digit"
          border="none"
        />

        <view slot="right">
          分
        </view>
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

        <view slot="right">
          KG
        </view>
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

        <view slot="right">
          CBM{{ cargoCBMhint ? `「${cargoCBMhint}」` : '' }}
        </view>
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

        <view slot="right">
          KG
        </view>
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

        <view slot="right">
          AUD
        </view>
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

        <view slot="right">
          AUD
        </view>
      </u-form-item>

      <u-form-item
        label="监管仓预定费"
        border-bottom
      >
        <u-radio-group
          v-model="bookingFeeIndex"
          icon-placement="right"
          @change="changeBookingFee"
        >
          <u-radio
            v-for="(item, index) in bookingFeeConfig"
            :key="index"
            :custom-style="{marginLeft: '8px'}"
            :label="item.name"
            :name="index"
          />
        </u-radio-group>

        <view slot="right">
          AUD
        </view>
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

        <view slot="right">
          AUD
        </view>
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

        <view slot="right">
          AUD
        </view>
      </u-form-item>

      <u-form-item
        label="基础配送费"
        border-bottom
      >
        <u--input
          v-model="quoteFee"
          :disabled="true"
          type="digit"
          border="none"
        />

        <view slot="right">
          AUD (Excluding GST)
        </view>
      </u-form-item>

      <!-- 当基础配送费为空时，输入 -->
      <u-form-item
        label="额外配送费"
        border-bottom
      >
        <u--input
          v-model="formData.extraQuoteFee"
          type="digit"
          border="none"
        />

        <view slot="right">
          AUD (Excluding GST)
        </view>
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

        <view slot="right">
          AUD
        </view>
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

        <view slot="right">
          AUD
        </view>
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

        <view slot="right">
          AUD
        </view>
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

      <u-form-item
        label="产品名称"
        prop="overdueCharge"
        border-bottom
      >
        <u--input
          v-model="formData.productDescription"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="产品数量"
        prop="overdueCharge"
        border-bottom
      >
        <u--input
          v-model="formData.productQuantity"
          type="digit"
          border="none"
        />
      </u-form-item>

      <u-form-item
        label="总耗时"
        border-bottom
      >
        <u--input
          v-model="deliveryDurationWhole"
          :disabled="true"
          border="none"
        />

        <view slot="right">
          分
        </view>
      </u-form-item>

      <u-form-item
        label="总路程"
        border-bottom
      >
        <u--input
          v-model="deliveryDistanceWhole"
          :disabled="true"
          border="none"
        />

        <view slot="right">
          KM
        </view>
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

    <!-- 起点选择器 -->
    <u-action-sheet
      :show="showStartingPointSelector"
      :actions="startingPoints"
      title="Please select starting point"
      @close="handleHideActionSheet('startingPoint')"
      @select="selectWareHouse"
    />

    <!-- 仓库选择器 -->
    <u-action-sheet
      :show="showWareHouseSelector"
      :actions="warehouses"
      title="Please select starting point"
      @close="handleHideActionSheet('warehouses')"
      @select="selectWareHouse"
    />

    <u-toast ref="uToast" />
  </view>
</template>

<script>
const WEIGHT_PER_CBM = 250 // 重量每立方
const PETROL_RATIO = 0.2 // 燃油附加费率比例
import { vipDistancePriceConfig } from '@/constant/vip'
import { tailboardFeeConfig, bookingFeeConfig, warehouses, startingPoints } from '@/constant'
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

                deliveryDistance: '', // 相距公里数
                deliveryDuration: '', // 相距时间

                cargoWeight: '', // 货物重量
                cargoCBM: '', // 货物体积
                ausCash: '', // 卸货现金
                commission: '', // 卸货费 中方代收 AUD
                bookingFee: '', // 监管仓预定费
                toll: '', // 过路费
                tailboardFee: '', // 尾板费
                overdueCharge: '', // 超时费
                extraQuoteFee: '', // 额外配送费
                tip: '', // 备注
                productDescription: '', // 产品描述
                productQuantity: '' // 产品数量
            },

            petrolRatio: PETROL_RATIO, // 燃油附加费率比例
            cargoCBMhint: '',

            warehouses, // 仓库地址
            startingPoints, // 起点选择


            vipDistancePriceConfig, // vip收费

            warehouse: warehouses[0], // 仓库地址
            startingPoint: startingPoints[0], // 起始地址
            targetCoordinates: null, // 目标坐标
            consigneeAddress: null, // 目标地址

            // 收费站
            chargeStops: [],

            // 距离计算的配置
            distanceConfig: null,

            // 尾板费
            tailboardFeeConfig,
            tailboardFeeIndex: 0,

            // 预订费
            bookingFeeConfig,
            bookingFeeIndex: 0,

            // charge
            charge: '', // 最终的价格

            showWareHouseSelector: false, // 仓库地址选择
            showStartingPointSelector: false, // 仓库地址选择
            actionSheetKeyMaps: {
                'warehouses': 'showWareHouseSelector',
                'startingPoint': 'showStartingPointSelector'
            },

            // 行驶总距离
            deliveryDistanceWhole: '',
            // 使用的总时间
            deliveryDurationWhole: ''
        }
    },
    computed: {
        ...mapState('common', ['accessToken']),

        // 基础配送费不合理
        isQuoteFeealid() {
            const distanceOutOfRange = this.formData.deliveryDistance > 74.9;
            const CBMOutOfLimit = this.formData.cargoCBM > 19

            return distanceOutOfRange || CBMOutOfLimit
        },

        // 货物抛货重货
        cargoDumpingHeavy() {

            if (!this.formData.cargoCBM) return ''

            const cargoCBMWeight = +this.formData.cargoCBM * WEIGHT_PER_CBM
            const cargoWeigth = +this.formData.cargoWeight

            return Math.max(cargoCBMWeight, cargoWeigth)
        },

        // 基础配送费
        quoteFee: {
            set(newVal) {
                console.log('setQuoteFee', newVal);
            },

            get() {
                if (this.isQuoteFeeInvalid) return ''

                if (this.distanceConfig) {
                    const { initialPrice, pricePerCBM } = this.distanceConfig

                    // 实际要计算的CBM
                    const cargoCBM = Number(this.cargoDumpingHeavy / WEIGHT_PER_CBM).toFixed(2)
                    const extraCargoCBM = Math.ceil(cargoCBM - 1) // 额外的立方米

                    const extraFee = extraCargoCBM * pricePerCBM

                    return initialPrice + extraFee
                }

                return 0
            }
        },

        // 燃油附加费
        feulSurcharge() {
            return ((this.quoteFee + +this.formData.extraQuoteFee) * this.petrolRatio).toFixed(2)
        }
    },

    watch: {
        // 仓库地址
        'warehouse': {
            deep: true,
            handler() {
                if (this.formData.consigneeAddress) this.calculate()
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
        'formData.deliveryDistance': {
            handler(val) {
                const distance = Math.round(val);

                const config = this.vipDistancePriceConfig.find(item => {
                    const { min, max } = item;

                    const result = distance >= min && distance <= max

                    return result
                })

                if (config) this.distanceConfig = config

                console.log('config', config);
            }
        },

        // 抛重体积
        'formData.cargoCBM': {
            handler(value) {
                const { cargoWeight = '' } = this.formData

                const weightCBM = cargoWeight / WEIGHT_PER_CBM

                this.cargoCBMhint = value > weightCBM ? '抛货重量' : '实际重量'
            }
        },

        formData: {
            deep: true,
            handler() {
                this.calculateCharge()
            }
        }

    },

    async mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.changeTailboard(0)
            this.changeBookingFee(0)
        },
        // 当重量变化的时候
        handleCargoWeightChange(val) {
            let result = val / WEIGHT_PER_CBM

            if (result <= 1) result = Math.ceil(result)

            this.formData.cargoCBM = result
        },

        // 打开选择框
        handleShowActionSheet(key) {
            const actionKey = this.actionSheetKeyMaps[key]

            if (!actionKey) return console.warn('未知类型');

            this[actionKey] = true
        },

        // 隐藏选择框
        handleHideActionSheet(key) {
            const actionKey = this.actionSheetKeyMaps[key]

            if (!actionKey) return console.warn('未知类型');

            this[actionKey] = false
        },

        // 选择地址
        selectWareHouse(warehouse) {
            this.warehouse = warehouse
        },

        // 切换
        changeTailboard(index) {
            this.formData.tailboardFee = this.tailboardFeeConfig[index].value
        },

        // 切换
        changeBookingFee(index) {
            this.formData.bookingFee = this.bookingFeeConfig[index].value
        },

        async calculate() {
            await this.calculateDistance() // 计算一段距离
            this.calculateWholeTrip() // 计算整段
        },

        async calculateWholeTrip() {
            const res = await this.getDistance(this.startingPoint, this.warehouse, this.targetCoordinates, this.startingPoint)

            console.log('res', res);

            const routes = this.$path(res, 'data.routes', [])

            const distance = this.$path(routes, '0.distance', '空')
            const duration = this.$path(routes, '0.duration', '空')

            this.deliveryDistanceWhole = `${(distance / 1000).toFixed(3)}`
            this.deliveryDurationWhole = `${((duration) / 60).toFixed(2)}`

        },

        // 计算距离
        async calculateDistance() {
            if (!this.warehouse) return this.showToast({ type: 'default', title: '请选择仓库'})
            if (!this.formData.consigneeAddress) return this.showToast({ type: 'default', title: '请输入目标地址'})

            const warehouse = this.warehouse

            // 拿到目标地址坐标
            const targetCoordinates = await this.getCoordinates(this.formData.consigneeAddress)

            this.targetCoordinates = targetCoordinates

            // 获取地址
            const res = await this.getDistance(warehouse, targetCoordinates)

            const routes = this.$path(res, 'data.routes', [])

            const distance = this.$path(routes, '0.distance', '空')
            const duration = this.$path(routes, '0.duration', '空')

            const chargeStops = this.$path(routes, '0.legs.0.summary', [])

            this.$set(this, 'chargeStops', chargeStops.split(','))

            this.formData.deliveryDistance = `${(distance / 1000).toFixed(3)}`
            this.formData.deliveryDuration = `${(duration / 60).toFixed(2)}`
        },

        // 获取坐标
        async getCoordinates(address) {
            const params = {
                address,
                accessToken: this.accessToken
            }

            try {
                const res = await this.$api.common.getCoordinates(params)
                const coordinates = this.$path(res, 'data.features.0.center', []);
                const [longtitude, latitude] = coordinates;

                return { longtitude, latitude }

            } catch (error) {
                console.warn('getCoordinates', error);
            }
        },

        // 获取距离
        async getDistance(address1, address2, address3 = {}, address4 = {}) {
            const params = {
                longtitude1: address1.longtitude,
                latitude1: address1.latitude,
                longtitude2: address2.longtitude,
                latitude2: address2.latitude,
                longtitude3: address3.longtitude,
                latitude3: address3.latitude,
                longtitude4: address4.longtitude,
                latitude4: address4.latitude,
                accessToken: this.accessToken
            }

            try {
                const res = await this.$api.common.getDistance(params)

                return res

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
                tip: this.formData.tip,
                productDescription: this.formData.productDescription,
                productQuantity: this.formData.productQuantity
            }

            this.$navigateTo('/pages/order/preview', order)
        },

        // 计算价格
        calculateCharge() {
            const charges = [
                'ausCash',
                'commission',
                'bookingFee',
                'toll',
                'tailboardFee',
                'overdueCharge',
                'extraQuoteFee'
            ]

            let result = 0

            charges.map(key => {
                result += +this.formData[key] || 0

                return key
            })

            result += +this.quoteFee || 0
            result += +this.feulSurcharge || 0

            this.charge = result
        }
    }
}
</script>

<style lang="scss">
.vip {
    padding: 32rpx;
}

</style>
