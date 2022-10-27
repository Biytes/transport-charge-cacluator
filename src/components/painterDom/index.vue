<template>
  <canvas
    v-show="isVisible"
    id="customCanvas"
    class="canvas-position"
    type="2d"
    :style="{ height: `${height}px`, width: `${width}px` }"
  />
</template>

<script>
import Painter from '@/components/painter/class';
import { getPainterConfig } from '@/components/painter/getPainterConfig'
const PAINTER_WIDTH = 375;
const PAINTER_HEIGHT = 667;
import ORDER from '@/components/orderPainter/order'

export default {
    name: 'PainterDom',
    props: {
    // 当前Painter
        painter: {
            type: Object,
            default: () => {}
        },

        // 画布宽度
        width: {
            type: Number,
            default: PAINTER_WIDTH
        },

        // 画布高度
        height: {
            type: Number,
            default: PAINTER_HEIGHT
        },

        // 配置类型
        configType: {
            type: String,
            required: true,
            validator: val => {
                return ['ORDER'].includes(val)
            }
        },

        // 当前painter的类型, 用于获取config
        painterType: {
            type: String,
            default: 'DEFAULT'
        },

        // 当前的其他option
        currentOption: {
            type: Object,
            default: () => {
                return {
                    optionIndex: 0,
                    option: null
                }
            }
        },

        // 自定义比例
        proportion: {
            type: Number,
            default: wx.getSystemInfoSync().pixelRatio
        },

        // 用于修改内部样式
        painterStyle: {
            type: [Object, String],
            default: () => {}
        },

        // 由于自定义的配置，得额外加进来所以，没办法
        extraConfig: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            isVisible: true,
            painterConfig: null, // 当前painter的配置
            painterDom: null,
            isMiniProgram: true
        };
    },

    //
    computed: {
    // 由于当前海报，由外部以及类型决定，所以整合起来
        currentType() {
            const optionIndex = (this.currentOption && this.currentOption.optionIndex) || 0
            return `${optionIndex}_${this.painterType}`
        },

        // 由于配置通过属性传进来会丢失preprocess，所以使用这种比较笨的方式
        configs() {
            const maps = {
                'ORDER': ORDER
            }

            return maps[this.configType]
        }
    },
    watch: {
    // 外部传进来的options发生变化了，就执行
        currentType: {
            handler() {
                this.updatePainter()
            }
        }
    },

    async mounted() {
        this.cleanUpWxFileSystemMemory(2);
        this.painterDom = await Painter.create(this.width, this.height, {}, this.proportion, this)

        console.log('111');

        // 生成
        this.generatePainter(15);
    },
    methods: {
    // 生成海报
        async generatePainter(random) {
            this.$emit('drawBegin');
            try {
                // 返回canvas容器
                const painterConfig = await getPainterConfig({
                    type: this.painterType,
                    painter: this.painter,
                    canvas: this.painterDom,
                    option: this.currentOption,
                    CONFIG: this.configs
                });

                this.painterConfig = painterConfig
                this.painterDom.addGadgets(painterConfig)

                console.log('painterConfig', painterConfig);

                // 开始画
                await this.painterDom.draw();

                // 拿到base64
                const response = this.painterDom.toImageUrl();
                this.isVisible = false

                this.cleanUpWxFileSystemMemory(43);
                this.wxWriteFile(response, random);
            } catch (error) {
                console.error('draw error', error);
            }
        },

        // 更新海报
        updatePainter() {
            this.painterDom.removeGadgets()
            this.$nextTick(() => {
                this.generatePainter(15);
            });
        },

        // 获取微信文件列表，写文件
        getWxFilesListAndWriteFile(response, random) {
            const that = this;
            const fs = wx.getFileSystemManager();
            fs.readdir({
                dirPath: wx.env.USER_DATA_PATH,
                // eslint-disable-next-line
        success(res) {
                    //res.files为存入的列表路径
                    that.wxWriteFile(response, random);
                }
            });
        },

        // 清除微信本地文件缓存
        cleanUpWxFileSystemMemory(n) {
            const fs = wx.getFileSystemManager();
            fs.readdir({
                dirPath: wx.env.USER_DATA_PATH,
                success(res) {
                    //res.files为存入的列表路径
                    const indexVal = res.files.length;
                    //由于微信本地存储超过10M时，写入文件失败，10M大概是43张海报的内存，所以大于42时，清除垃圾文件，再写入
                    if (indexVal > n) {
                        res.files.forEach(el => {
                            const name = (wx.env.USER_DATA_PATH + el).replace(/usr/g, 'usr/');
                            fs.unlink({
                                filePath: name,
                                fail(e) {
                                    console.log('文件删除失败：', e);
                                },
                                success(succ) {
                                    console.log('文件删除成功：', succ);
                                }
                            });
                        });
                    }
                }
            });
        },

        // 写入文件
        wxWriteFile(response) {
            const fs = wx.getFileSystemManager();
            const randomKey = String(Math.random(0, 1)).slice(2)
            //随机定义路径名称
            const CODE_IMG = `${wx.env.USER_DATA_PATH}/${this.currentType}_${randomKey}.png`;

            //将base64图片写入
            fs.writeFile({
                filePath: CODE_IMG,
                data: response.slice(22),
                encoding: 'base64',
                success: res => {
                    //写入成功了的话，新的图片路径就能用了
                    console.log('CODE_IMG', CODE_IMG, res);
                    this.$emit('drawFulfilled', CODE_IMG);
                },
                fail: error => console.warn(error)
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import './style/functions.scss';
$painterWidth: rpx(255);
$painterHeight: $painterWidth * 16 / 9;

.canvas-position {
    //把canvas定位到可视区外，这样切换励志语录时，不会看到页面级抖动
    position: absolute;
    left: 9999px;
    top: 9999px;
}

.painter-content {
    height: $painterHeight;
    border-radius: rpx(8);
    box-shadow: rpx(0) rpx(6) rpx(10) rpx(0) rgb(0 0 0 / 8%);
    width: $painterWidth;
}
</style>
