/**
 * @description 日签图配置
 */
import {
    TYPES
} from '../painter/constant';

const DEFAULT_BACKGROUND = 'https://wechatapppro-1252524126.cdn.xiaoeknow.com/appAKLWLitn7978/image/b_u_5b2225aa46488_oGKN7IvA/l9qxg1i702ku.png'

export default {
    // 旧日签布局
    DEFAULT: {
        // 在这个结构下 option是背景图片
        preProcess: ({ painter }) => {
            return new Promise(resolve => {
                const result = painter;

                resolve({ ...result });
            });
        },
        gadgets: [
            {
                notation: '背景图片',
                type: TYPES.IMG,
                src: '',
                value: '',
                x: 0,
                y: 0,
                handler: ({ background = DEFAULT_BACKGROUND }, canvas) => {
                    const { width, height } = canvas;
                    return {
                        width,
                        height,
                        value: background,
                        src: background
                    };
                }
            },
            {
                notation: '背景图片',
                type: TYPES.IMG,
                src: '',
                value: '',
                x: 0,
                y: 0,
                handler: ({ background = DEFAULT_BACKGROUND }, canvas) => {
                    return {
                        width: 300,
                        height: 300,
                        value: background,
                        src: background
                    };
                }
            },
            {
                notation: '姓名',
                type: TYPES.TEXT,
                size: 13,
                lineHeight: 1,
                maxWidth: 150,
                fontWeight: 'bold',
                color: '#333333',
                textOverflow: 'ellipsis',
                panelHorizontalCenter: true,
                handler: ({ consignee }, canvas) => {
                    return {
                        value: consignee,
                        x: canvas.RPX(200),
                        y: canvas.RPX(155)
                    };
                }
            },

            {
                notation: '地址',
                type: TYPES.TEXT,
                size: 13,
                lineHeight: 1,
                maxWidth: 150,
                fontWeight: 'bold',
                color: '#333333',
                textOverflow: 'wrap',
                maxLine: 5,
                panelHorizontalCenter: true,
                handler: ({ consigneeAddress }, canvas) => {
                    return {
                        value: consigneeAddress,
                        x: canvas.RPX(200),
                        y: canvas.RPX(182)
                    };
                }
            },

            {
                notation: 'referenceNo',
                type: TYPES.TEXT,
                size: 13,
                lineHeight: 1,
                maxWidth: 150,
                fontWeight: 'bold',
                color: '#333333',
                textOverflow: 'ellipsis',
                panelHorizontalCenter: true,
                handler: ({ referenceNo }, canvas) => {
                    return {
                        value: referenceNo,
                        x: canvas.RPX(545),
                        y: canvas.RPX(155)
                    };
                }
            },

            {
                notation: 'mobile',
                type: TYPES.TEXT,
                size: 13,
                lineHeight: 1,
                maxWidth: 150,
                fontWeight: 'bold',
                color: '#333333',
                textOverflow: 'ellipsis',
                panelHorizontalCenter: true,
                handler: ({ consigneePhone }, canvas) => {
                    return {
                        value: consigneePhone,
                        x: canvas.RPX(200),
                        y: canvas.RPX(358)
                    };
                }
            },
            {
                notation: 'postCode',
                type: TYPES.TEXT,
                size: 13,
                lineHeight: 1,
                maxWidth: 150,
                fontWeight: 'bold',
                color: '#333333',
                textOverflow: 'ellipsis',
                panelHorizontalCenter: true,
                handler: ({ postCode }, canvas) => {
                    return {
                        value: postCode,
                        x: canvas.RPX(200),
                        y: canvas.RPX(328)
                    };
                }
            },
            {
                notation: 'tip',
                type: TYPES.TEXT,
                size: 13,
                lineHeight: 1,
                maxWidth: 150,
                fontWeight: 'bold',
                color: '#333333',
                textOverflow: 'wrap',
                panelHorizontalCenter: true,
                maxLine: 5,
                handler: ({ tip }, canvas) => {
                    return {
                        value: tip,
                        x: canvas.RPX(360),
                        y: canvas.RPX(245)
                    };
                }
            }
        ]
    }
};
