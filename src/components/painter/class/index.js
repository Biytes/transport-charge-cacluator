import { TYPES, TEXT_OVERFLOW, isValueInValid, EMPTY_GADGET } from '../constant';
import { PromiseAllSettled, loadRemoteImage } from './utils';
import { handleDefaultProps } from '../class/utils/handleDefaultProps';
import { clipRoundRect, rectSquare, drawLine, drawRect, fillShape } from './utils/drawShape';
import { handleOver } from './utils/layout';
import { path } from '@/utils'

export default class Painter {
    constructor(width, height, proportion, isMiniProgram = false) {
        this.proportion = proportion;
        this.width = width * proportion;
        this.height = height * proportion;
        this.canvas = null;
        this.ctx = null;
        this._gadgets = [];
        this.EMPTY_GADGET = EMPTY_GADGET; // 空部件
        this.isMiniProgram = isMiniProgram;

        // 将没有用到this的方法，定义
        this.loadRemoteImage = loadRemoteImage;
        this.clipRoundRect = clipRoundRect;
        this.handleOver = handleOver;
    }

    // 所有图片
    get images() {
        return this._gadgets.filter(image => image.type === TYPES.IMG);
    }

    // 所有图形
    get shapes() {
        return this._gadgets.filter(gadget => gadget.type === TYPES.SHAPE);
    }

    // 所有文字
    get texts() {
        return this._gadgets.filter(gadget => gadget.type === TYPES.TEXT);
    }

    // 创建
    static create(width, height, canvasStyle, proportion = 2, context) {
        // 如果想用小程序逻辑，需要自己去传
        const painter = new Painter(width, height, proportion, !!path(context, 'isMiniProgram', false));

        console.log('painter', context);

        // 初始化函数
        const initFunc = painter.isMiniProgram ? 'initMiniCanvas' : 'initH5Canvas';

        return painter[initFunc](canvasStyle, context);
    }

    // 用于计算画图出来的像素
    RPX(pixel) {
        return this.proportion * pixel;
    }

    textAlign(width) {
        return this.width / 2 - width / 2;
    }

    // 更新宽高
    setDimensions({ width, height, proportion }) {
        // 更新painter宽高
        this.proportion = proportion;
        this.width = width * proportion;
        this.height = height * proportion;

        // 更新canvas宽高
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    // 初始化H5的canvas
    initH5Canvas(canvasStyle) {
        return new Promise(resolve => {
            const { width, height } = this;

            const canvas = document.createElement('canvas');
            const styleObj = {
                'z-index': '-1',
                display: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                ...canvasStyle
            };
            Object.keys(styleObj).forEach(key => {
                canvas.style[key] = styleObj[key];
            });

            canvas.width = width;
            canvas.height = height;
            document.body.appendChild(canvas);
            canvas.isMiniProgram = this.isMiniProgram;
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            resolve(this);
        });
    }

    // 初始化小程序的canvas
    initMiniCanvas(canvasStyle, context) {
        console.log('context', context);
        // eslint-disable-next-line
        return new Promise((resolve, reject) => {
            const { width, height } = this;
            wx.createSelectorQuery()
                .in(context)
                .select('#customCanvas')
                .fields({
                    node: true
                })
                .exec(res => {
                    console.log('res', res, canvas);
                    const canvas = res[0].node;
                    const ctx = canvas.getContext('2d');
                    canvas.width = width;
                    canvas.height = height;
                    canvas.isMiniProgram = this.isMiniProgram;
                    this.canvas = canvas;
                    this.ctx = ctx;

                    resolve(this);
                });
        });
    }

    // 增加部件
    addGadgets(gadgets) {
        this._gadgets.push(...gadgets);
        return this;
    }

    // 删除部件
    removeGadgets(...labels) {
        this._gadgets = !labels.length ? [] : this._gadgets.filter(_gadget => !labels.includes(_gadget.label));
        return this;
    }

    /**
     * 展示层级：二维码 > 头像 > 文本 > 形状 > 图片
     * 特殊逻辑：二维码、头像从images取出单独绘制，展示层级最高
     */
    async draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawBackgroundColor();

        // 等图片加载完再画其他的
        await this.loadImages();

        this._gadgets.forEach(gadget => {
            switch (gadget.type) {
            case TYPES.IMG:
                this.drawImage(gadget);
                break;

            case TYPES.SHAPE:
                this.drawShape(gadget);
                break;

            case TYPES.TEXT:
                if (!gadget.supportQxContact) this.drawText(gadget);
                break;

            default:
                console.warn('未知类型', gadget.type);
                break;
            }
        });

        return this;
    }

    // 画背景颜色
    drawBackgroundColor() {
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#ffffff'; // 填充颜色
        this.ctx.fill();
    }

    // 加载所有图片
    async loadImages() {
        try {
            const { images } = this;

            const finalImages = [...images];

            const imagesLoadStatus = await PromiseAllSettled(
                finalImages.map(image => this.loadRemoteImage(image, this.canvas, this))
            );

            console.log('imagesLoadStatus', imagesLoadStatus, finalImages);
        } catch (error) {
            console.warn('loadImages error', error);
        }
    }

    // 画图，切图
    drawImage(gadget) {
        const { x, y, width, height, loadedImg } = gadget;

        if (!loadedImg) return;

        this.ctx.save();
        this.ctx.beginPath();
        this.clipRoundRect(this.ctx, gadget, this.proportion);
        this.ctx.drawImage(loadedImg, x, y, width, height);
        this.ctx.closePath();
        this.ctx.restore();
    }

    // 画文字
    drawText(gadget) {
        const { value, textOverflow } = gadget;

        // 值如果是不正常的
        if (isValueInValid(value)) return;

        this.ctx.save();
        this.initTextStyle(gadget);

        const drawFnMap = {
            [TEXT_OVERFLOW.WRAP]: this.drawMultiLineWrapText,
            [TEXT_OVERFLOW.ELLIPSIS]: this.drawSingleLineEllipsisText,
            [TEXT_OVERFLOW.TEXTLIST]: this.drawMultiLineTextList
        };

        // 选择画图类型
        const fn = drawFnMap[textOverflow];

        // 将this指向当前painter
        if (fn) {
            fn.call(this, gadget);
        } else {
            this.fillText(value, gadget);
        }

        this.ctx.restore();
    }

    // 画文字
    fillText(value, gadget) {
        this.ctx.beginPath();
        const { x, y, color, linethrough, underline, fontSize, textAlign, textBackgroundColor, lineHeight } = gadget;
        const { width, height } = this.getTextRect({
            ...gadget,
            value
        });
        const heightPerLine = height;

        // 背景颜色
        if (textBackgroundColor && textBackgroundColor !== 'transparent') {
            this.ctx.save();
            const finalX = textAlign === 'center' ? x - width / 2 : x;
            const strokeLineY = y - (heightPerLine - fontSize) / this.proportion;
            // const strokeLineY = y + heightPerLine / lineHeight / 2 - lineWidth;

            this.ctx.fillStyle = textBackgroundColor;
            this.ctx.fillRect(finalX, strokeLineY, width, fontSize * lineHeight);
            this.ctx.restore();
        }

        this.ctx.save();
        this.initTextStyle(gadget);
        this.ctx.fillText(value, x, y);
        this.ctx.restore();

        // 横线
        if (linethrough) {
            this.ctx.save();
            const finalX = textAlign === 'center' ? x - width / 2 : x;
            const lineWidth = (fontSize / 16) * this.proportion;
            const strokeLineY = y + heightPerLine / lineHeight / 2 - lineWidth;
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeStyle = color;
            this.ctx.moveTo(finalX, strokeLineY);
            this.ctx.lineTo(finalX + width, strokeLineY);
            this.ctx.stroke();
            this.ctx.restore();
        }

        // 下划线
        if (underline) {
            this.ctx.save();
            const finalX = textAlign === 'center' ? x - width / 2 : x;
            const lineWidth = (fontSize / 16) * this.proportion;
            const strokeLineY = y + heightPerLine / lineHeight - lineWidth;

            // if (gadget.notation === '标题')
            //     console.log(
            //         'strokeLineY',
            //         y,
            //         width,
            //         heightPerLine,
            //         strokeLineY,
            //         this.proportion,
            //         y + heightPerLine + lineWidth
            //     );
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeStyle = color;
            this.ctx.moveTo(finalX, strokeLineY);
            this.ctx.lineTo(finalX + width, strokeLineY);
            this.ctx.stroke();
            this.ctx.restore();
        }
        this.ctx.closePath();
    }

    drawMultiLineTextList(gadget) {
        const textList = String(gadget.value).split('\n');
        const { maxLine = 2 } = handleDefaultProps(gadget);
        textList.forEach((item, index) => {
            if (index > maxLine - 1) return;
            const gadgetCopy = gadget;
            const lastGadgetCopy = JSON.parse(JSON.stringify(gadget));
            gadgetCopy.value = item;
            let everyLineHeight = 0;
            if (index !== 0) {
                lastGadgetCopy.value = textList[index - 1];
                everyLineHeight = this.getTextRect(lastGadgetCopy).height;
            }
            gadgetCopy.y += everyLineHeight;
            this.drawMultiLineWrapText(gadgetCopy);
        });
    }

    // 画多行的文字
    drawMultiLineWrapText(gadget) {
        this.ctx.beginPath();
        const { value, x, lineHeight, fontSize, maxWidth, maxLine = 2, textOverflowAlign } = handleDefaultProps(gadget);
        let { y } = handleDefaultProps(gadget);
        const charArr = String(value).split('');
        let currentLineText = '';
        let currentLine = 1;

        for (let i = 0; i < charArr.length; i++) {
            const char = charArr[i];
            const { width } = this.ctx.measureText(`${currentLineText}${char}`);

            if (width > maxWidth) {
                if (currentLine === maxLine) {
                    currentLineText = currentLineText.slice(0, currentLineText.length - 2);
                    currentLineText += '...';
                }
                this.fillText(currentLineText, {
                    ...gadget,
                    x,
                    y
                });
                // 因为加上这个 char 使得当前行超出宽度限制，所以这个字符变成下一行的首字
                currentLineText = char;
                // y 加上行高
                y += fontSize * lineHeight;

                currentLine += 1; // 增加一行

                // 如果，大于行数，直接结束【在下面结束的话，会多画一个字】
                if (currentLine > maxLine) return;
            } else {
                currentLineText += char;
            }
        }
        let finalX = x;
        if (textOverflowAlign === 'center') {
            const { width } = this.getTextRect({
                ...handleDefaultProps(gadget),
                value: currentLineText
            });
            finalX = this.width / 2 - width / 2;
        }
        this.fillText(currentLineText, {
            ...gadget,
            x: finalX,
            y
        });
        this.ctx.closePath();
    }

    // 画单行的文字
    drawSingleLineEllipsisText(gadget) {
        this.ctx.beginPath();
        const { value, x, y, maxWidth } = gadget;
        const charArr = String(value).split('');
        let sumText = '';
        for (let i = 0; i < charArr.length; i++) {
            const char = charArr[i];
            const { width } = this.ctx.measureText(`${sumText}${char}`);

            if (width > maxWidth) {
                sumText += '...';
                this.fillText(sumText, {
                    ...gadget,
                    x,
                    y
                });
                break;
            } else {
                sumText += char;
            }
        }

        this.fillText(sumText, gadget);
        this.ctx.closePath();
    }

    // 初始化字体的样式
    initTextStyle(gadget) {
        const { fontSize, fontWeight, fontFamily, color, textBaseline, textAlign, fontStyle } = gadget;
        this.ctx.textAlign = textAlign;
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
        this.ctx.textBaseline = textBaseline;
    }

    // 默认画形状
    drawShape(gadget) {
        const ShapeFuncMap = {
            rectSquare,
            line: drawLine,
            rect: drawRect
        };

        const func = ShapeFuncMap[gadget.shape] || fillShape;

        func(this.ctx, gadget, this.proportion);
    }

    // 获取文字的实际长宽 不能删[用于计算文字宽度高度]
    getTextRect(gadget) {
        if (!gadget) return {};

        const { maxWidth = this.width, lineHeight, fontSize, maxLine } = handleDefaultProps(gadget, this);

        this.initTextStyle(gadget);
        const { width } = this.ctx.measureText(gadget.value);
        const res = this.ctx.measureText(gadget.value);

        if (gadget.notation === '标题') console.log('getTextRect', res, gadget.value);

        const isMultiLine = width > maxWidth;
        let lineNum = isMultiLine ? Math.ceil(width / maxWidth) : 1;
        const value = String(gadget.value);
        if (value.indexOf('\n') !== -1) {
            lineNum = maxLine;
        }
        const everyLineHeight = lineHeight * fontSize;
        return {
            width: Math.min(width, maxWidth),
            height: (lineNum > maxLine ? maxLine : lineNum) * everyLineHeight
        };
    }

    // 将canvas转化成url
    toImageUrl(type = 'image/png') {
        return this.canvas.toDataURL(type);
    }

    // 清除canvas 【在beforeDestroy执行】
    removeCanvas() {
        this.canvas.remove();
    }

    // 异步返回图片对象
    // eslint-disable-next-line class-methods-use-this
    asyncImg(src) {
        const image = this.isMiniProgram ? this.canvas.createImage() : new Image();
        image.src = src;
        return new Promise((resolve, reject) => {
            image.onload = () => {
                resolve(image);
            };
            image.onerror = () => {
                reject(image);
            };
        });
    }

    async handleBackground(canvas, painter) {
        const { width, height, ctx } = canvas;
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        const { background_url } = painter.background_info;
        const bg = await this.asyncImg(background_url);
        let bgh = this.RPX(bg.height / 2);
        let bgw = this.RPX(bg.width / 2);
        let x, y;
        if (bgw / bgh > width / height) {
            // 横图
            console.warn('横图');
            bgh = bgw > width ? (bgh * width) / bgw : (bgh * bgw) / width;
            bgw = width;
            x = 0;
            y = (height - bgh) / 2;
        } else {
            // 长图
            console.warn('长图');
            bgw = bgh > height ? (bgw * height) / bgh : (bgw * bgh) / height;
            bgh = height;
            x = (width - bgw) / 2;
            y = 0;
        }
        painter.background_info = {
            ...painter.background_info,
            bgw,
            bgh,
            x,
            y
        };
        return painter;
    }
}
