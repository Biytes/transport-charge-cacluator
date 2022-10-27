/**
 * @description 判断当前的参数第一个必须为对象，并且不能是空对象
 * @param {*} obj
 * @returns
 */
export function verifyObjEmpty(obj) {
    if (Object.prototype.toString(obj) !== '[object Object]') {
        console.error('objToPoster的第一个参数必须为一个对象');
        return;
    }
    if (JSON.stringify(obj) === '{}' && !Object.getOwnPropertySymbols(obj).length) {
        console.error('objToPoster的第一个参数不能为空对象');
        return;
    }
}

// 因为旧设备兼容问题iphone5s等旧机型使用 Promise.allSettled 报错，所以单独实现一个allSettled
/**
 * @description 解决异步
 * @param {*} promises
 * @returns
 */
export function PromiseAllSettled(promises = []) {
    if (!promises.length) return Promise.resolve([]);

    return new Promise(resolve => {
        let count = promises.length;
        const results = [];
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(
                value => {
                    results[i] = {
                        status: 'fulfilled',
                        value
                    };
                    count--;
                    if (count <= 0) resolve(results);
                },
                reason => {
                    results[i] = {
                        status: 'rejected',
                        reason
                    };
                    count--;
                    if (count <= 0) resolve(results);
                }
            );
        }
    });
}

// 将图片转化为base64再进行下载 解决跨域问题
export const urlToBase64 = url => {
    return new Promise(resolve => {
        // 实例化一个img对象
        const img = new Image();

        // 设置img的图片路径
        img.src = url;
        // 设置跨域解决
        img.setAttribute('crossOrigin', 'Anonymous');
        const self = this;
        // img加载完后处理
        img.onload = function () {
            // 创建一个canvas对象
            const canvas = document.createElement('canvas');
            // 把图片的宽度设为canves的宽度
            canvas.width = img.width;
            // 把图片的高度设为canves的高度
            canvas.height = img.height;
            // 创建一个2d画布
            const ctx = canvas.getContext('2d');
            // 将img中的内容画到画布上
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 将画布内容转换为base64
            const base64 = canvas.toDataURL() || '';
            // 创建a链接

            resolve(base64);
        };

        img.error = function () {
            resolve('');
        };
    });
};

// 异步加载图片
export const loadRemoteImage = (image, canvas, context) => {
    return new Promise((resolve, reject) => {
        const isMiniProgram = context.isMiniProgram;
        const img = isMiniProgram ? canvas.createImage() : new Image();
        img.crossOrigin = 'anonymous';

        const isMiniProgramStashLink = image.src.indexOf('http://tmp') >= 0 || image.src.indexOf('wxfile://usr') >= 0;
        img.src = isMiniProgramStashLink ? image.src : image.src.replace(/http:/, 'https:'); // http的链接会跨域，要转成https，cos桶链接自己会访问得到

        // 判断是否为静态图片链接, 如果不是静态图片链接，说明是base64，或者后端生成的一些链接
        const isValidImageUrl = image.src.indexOf('http') >= 0;

        // 如果不是，就不需要走onload，直接赋值s
        if (!isValidImageUrl) {
            image.loadedImg = img;
            resolve(true);
        } else {
            img.onload = () => {
                image.loadedImg = img;

                resolve(true);
            };
            img.onerror = async reason => {
                reject(reason);
                // 如果是小程序，就不走下面的
                if (context.isMiniProgram) return reject(reason);
            };
        }
    });
};

/**
 * 深度拷贝
 * @param {*} data
 * @returns {*}
 */
export function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const newObj = new obj.constructor(),
        currentObj = [obj],
        copyObj = [newObj],
        visitedCurrent = [],
        visitedCopy = [];
    while (currentObj.length > 0) {
        const currentElement = currentObj.shift();
        const copyElement = copyObj.shift();
        //将对象放入已访问对象数组中
        visitedCurrent.push(currentElement);
        visitedCopy.push(copyElement);
        for (const key in currentElement) {
            //非对象直接赋值
            if (currentElement[key] === null || typeof currentElement[key] !== 'object') {
                copyElement[key] = currentElement[key];
            } else {
                // 判断是否有环，以防死循环
                if (visitedCurrent.findIndex(item => item === currentElement[key]) >= 0) {
                    copyElement[key] = currentElement[key];
                } else {
                    //将对象放入待复制目标对象数组中
                    currentObj.push(currentElement[key]); //创建空的对象
                    copyElement[key] = currentElement[key].constructor();
                    //将空对象放入待填充的目标数组中
                    copyObj.push(copyElement[key]);
                }
            }
        }
    }
    return newObj;
}