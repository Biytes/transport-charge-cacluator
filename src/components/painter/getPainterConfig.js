import { isValueInValid } from './constant';
import { handleDefaultProps } from './class/utils/handleDefaultProps';
import { deepClone } from './class/utils';

// 默认预处理函数
const defaultPreprocess = painter => Promise.resolve(painter);

/**
 * @description 核心获取配置的方法
 * @param {*} type 当前证书类型
 * @param {*} painter 当前原始数据
 * @param {*} canvas 当前画布容器
 * @param {*} option 外部传进来的option， 什么格式都可以，取决于在配置里如何使用
 * @returns Config
 */
export const getPainterConfig = async ({ type = '', painter, canvas, CONFIG = {}, option }) => {
    try {
        // First Step: 获取配置
        // TODO: 待规划
        const config = deepClone(CONFIG[type]);

        // 如果找不到config，就
        if (!config) {
            console.warn('未知的证书类型类型', type);
            return [];
        }

        console.log('type', type);

        // 统一根据配置处理组件内的数据「Extra Step」
        config.gadgets = config.gadgets.map(gadget => handleDefaultProps(gadget, canvas));

        // Second Step: 配置所需要的准备工作等
        const preProcess = config.preProcess || defaultPreprocess; // 如果没有preprocess ，就默认的
        const processedPainter = await preProcess({
            painter: deepClone(painter),
            canvas,
            gadgets: config.gadgets,
            option
        });

        // Third Step: 将每个组件再重新取值
        const gadgets = config.gadgets
            .map(gadget => {
                const { handler = null } = gadget;

                const temp = handler ? handler(processedPainter, canvas, gadget) : gadget;

                // 重新将生成的值返回
                return Object.assign({}, gadget, temp);
            })
            // Fourth Step 将value为空的组件去除【不展示】
            .filter(item => !isValueInValid(item.value));

        return gadgets;
    } catch (error) {
        console.warn('getConfig', error);
        throw new Error(error);
    }
};
