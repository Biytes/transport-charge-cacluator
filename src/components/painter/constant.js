// 默认画图类型
export const DEFAULT_TYPE = 'DEFAULT';

// 小组件的类型
export const TYPES = {
    IMG: 'img',
    TEXT: 'font',
    SHAPE: 'shapes',
    BASE64: 'base64',
    QRCODE: 'qrcode' // 小程序不支持
};

// 空部件
export const EMPTY_GADGET = { value: '' };

export const TEXT_OVERFLOW = {
    WRAP: 'wrap',
    ELLIPSIS: 'ellipsis',
    TEXTLIST: 'textlist'
};

// 判断值正常
export const isValueInValid = data => ['', 'undefined', NaN, null, undefined].includes(data);
