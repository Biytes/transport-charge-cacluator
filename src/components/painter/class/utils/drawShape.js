// 判断shape是否能正常画出来
// const isShapeTypeValid = type => ['line'].includes(type)

/**
 * @description 画图形
 * @param {Object} ctx 画布
 * @param {*} gadget 当前部件
 * @param {*} proportion 比例
 */
export function roundRect(ctx, gadget, proportion) {
    const shapes = ['fullRoundRect', 'diagonalRoundRect', 'topRoundRect', 'bottomRoundRect'];
    const { x, y, width: w, height: h } = gadget;
    let { r } = gadget;

    r = r * proportion;
    const color = gadget.color;
    const shape = gadget.shape;
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    // 恢复裁剪前的状态
    ctx.restore();
    ctx.save();
    ctx.moveTo(x + r, y);
    if (shape === shapes[0]) {
        //画四个角都是圆形
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
    } else if (shape === shapes[1]) {
        //只有右上角和左下角为圆形
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.lineTo(x, y);
        ctx.lineTo(x + r, y);
    } else if (shape === shapes[2]) {
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.clip();
    } else if (shape === shapes[3]) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y);
        ctx.clip();
    }
    ctx.closePath();
    ctx.lineWidth = h;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
}

/**
 * @description 画正方形
 * @param {Object} ctx 画布
 * @param {*} gadget 当前部件
 * @param {*} proportion 比例
 */
export function rectSquare(ctx, gadget) {
    const { x, y, width, height, lineWidth = 2, color = '#fff' } = gadget;

    const w = width;
    const h = height;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, w, h);
    ctx.closePath();
}

/**
 * @description 画线
 * @param {Object} ctx 画布
 * @param {*} gadget 当前部件
 * @param {*} proportion 比例
 */
export function drawLine(ctx, gadget) {
    const { x, y, width, height, lineWidth = 2, color = '#fff' } = gadget;

    // 拿到初始坐标，以及宽高
    const w = width;
    const h = height;

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineTo(x + w, y + h);
    ctx.stroke();
    ctx.closePath();
}

/**
 * @description 将图片切割成圆
 * @param {Object} ctx 画布
 * @param {*} gadget 当前部件
 */
export function clipRoundRect(ctx, gadget) {
    const { x, y, width, height, roundRectType } = gadget;
    let { borderRadius: r } = gadget;

    const h = height;
    const w = width;

    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    if (roundRectType === 'full') {
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.clip();
    } else if (roundRectType === 'top') {
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.clip();
    } else if (roundRectType === 'bottom') {
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y);
        ctx.clip();
    } else if (roundRectType === 'bottomLeftAndTopRight') {
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.lineTo(x, y);
        ctx.lineTo(x + r, y);
        ctx.clip();
    } else if (roundRectType === 'topLeftAndBottomRight') {
        ctx.moveTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x, y - r);
        ctx.clip();
    }
}

/**
 * @description 获取边角情况 「10 10 10 10」 或者 「10」
 * @param {*} radius
 * @returns
 */
function getRadius(radius) {
    const actualRadius = String(radius).split(' ');

    if (actualRadius.length === 1) return new Array(4).fill(actualRadius[0]);

    return actualRadius.map(item => Number(item));
}

/**
 * @description 画四边形
 * @param {Object} ctx canvas context
 * @param {*} width 宽度
 * @param {*} height 高度
 * @param {*} radius 边角情况
 */
function drawRoundRectPath(ctx, width, height, radius) {
    const [topLeft, topRight, bottomRight, bottomLeft] = getRadius(radius);

    ctx.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    ctx.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2);

    //矩形下边线
    ctx.lineTo(bottomLeft, height);

    //左下角圆弧，弧度从1/2PI到PI
    ctx.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI);

    //矩形左边线
    ctx.lineTo(0, topRight);

    //左上角圆弧，弧度从PI到3/2PI
    ctx.arc(topLeft, topLeft, topLeft, Math.PI, (Math.PI * 3) / 2);

    //上边线
    ctx.lineTo(width - topRight, 0);

    //右上角圆弧
    ctx.arc(width - topRight, topRight, topRight, (Math.PI * 3) / 2, Math.PI * 2);

    //右边线
    ctx.lineTo(width, height - bottomRight);
    ctx.closePath();
}

/**
 * @description 处理有背景和没背景
 * @param {*} ctx
 * @param {*} gadget
 * @param {*} proportion
 * @returns
 */
export function drawRect(ctx, gadget) {
    const { x, y, width, height, borderRadius: r, lineWidth, strokeColor, fillColor } = gadget;

    ctx.save();
    ctx.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(ctx, width, height, r);

    // 有fillColor是有背景的
    if (fillColor) {
        ctx.fillStyle = fillColor || '#fff'; //若是给定了值就用给定的值否则给予默认值
        ctx.fill();
    } else if (strokeColor) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor || '#000';
        ctx.stroke();
    }

    ctx.restore();
}

/**
 * @description 画基础图形
 * @param {*} ctx
 * @param {*} gadget
 * @param {*} proportion
 * @returns
 */
export function fillShape(ctx, gadget, proportion = 1) {
    const { height, color } = gadget;
    ctx.save();
    ctx.beginPath();
    this.clipRoundRect(ctx, gadget, proportion);
    ctx.closePath();
    ctx.lineWidth = height;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
}
