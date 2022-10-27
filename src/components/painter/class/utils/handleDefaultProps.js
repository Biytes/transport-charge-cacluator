import { TYPES, TEXT_OVERFLOW } from '../../constant';
/**
 * @description 处理传进来的数据，根据类型，并转成统一的格式
 * @param {*} props
 * @returns
 */
export function handleDefaultProps(props, canvas = null) {
    // 如果已经初始化过了，就不初始化了
    if (props.isDefault) return props;

    const result = props;

    const RPX = canvas ? px => canvas.RPX.call(canvas, px) : px => px;
    result.x = RPX(props.x || 0);
    result.y = RPX(props.y || 0);

    switch (props.type) {
    case TYPES.TEXT:
        result.maxWidth = RPX(props.maxWidth) || canvas.width;
        result.fontSize = RPX(props.size || 12);
        result.lineHeight = props.lineHeight || 1;
        result.fontWeight = props.fontWeight || 'normal'; // normal lighter bold border
        result.fontStyle = props.fontStyle || 'normal'; // italic
        result.fontFamily = props.fontFamily || 'Arial,sans-serif';
        result.color = props.color || 'black';
        result.textBaseline = props.textBaseline || 'hanging';
        result.textOverflow = props.textOverflow || TEXT_OVERFLOW.ELLIPSIS;
        result.textStyle = props.textStyle || 'fill';
        result.textAlign = props.textAlign || 'left';
        result.linethrough = props.linethrough || false;
        result.underline = props.underline || false;
        result.textBackgroundColor = result.textBackgroundColor || 'transparent';
        break;

    case TYPES.IMG:
        result.width = RPX(props.width || 0);
        result.height = RPX(props.height || 0);
        result.borderRadius = RPX(props.borderRadius || 0);
        break;

    case TYPES.QRCODE:
        result.width = RPX(props.width || 0);
        result.height = RPX(props.height || 0);
        result.borderRadius = RPX(props.borderRadius || 0);
        break;

    case TYPES.SHAPE:
        result.color = props.color || 'black';
        result.width = RPX(props.width || 0);
        result.height = RPX(props.height || 0);
        result.borderRadius = RPX(props.borderRadius || 0);
        break;

    default:
        break;
    }

    result.isDefault = true; // 初始化标识

    return result;
}
