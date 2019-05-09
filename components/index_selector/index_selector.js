
/*
    <index-selector
        wordsArr="" 选填
        bindchange="__change"
    />
 */

// 节流
function throttle(fn, wait) {
    let prev = Date.now();
    return function () {
        let now = Date.now(), args = arguments;
        if (now - prev >= wait) {
            fn.apply(this, args);
            prev = Date.now();
        }
    }
}

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        wordsArr: {
            type: Array,
            value: Array(26).fill('').map((v, i) => String.fromCharCode(i + 65))
        }
    },

    pageLifetimes: {
        show() {
            const { windowHeight } = wx.getSystemInfoSync();
            let { wordsArr } = this.data;
            this._queryEl('.words-wrap', (res) => {
                let { height } = res;
                // 换算 包裹元素的高度 和 每一个元素的高度
                this.setData({ 
                    wordsWrapTop: Math.ceil((windowHeight - height) / 2),
                    wordsItemHeight: parseInt(height / wordsArr.length)
                });
            });
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        wordsWrapTop: 0,
        wordsItemHeight: 0,
        wordsAction: 0,
        showActionWords: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 获取元素方法
        _queryEl(name, fn) {
            const query = wx.createSelectorQuery().in(this);
            query.select(name).boundingClientRect((res) => {
                fn && fn(res);
            }).exec();
        },

        // 范围值
        _scopeNumber(max, min, value) {
            value = Math.max(value, min);
            value = Math.min(value, max);
            return value;
        },

        handleTouchStart(e) {
            let { wordsWrapTop, wordsItemHeight } = this.data;
            let pageY = parseInt(e.changedTouches[0].pageY - wordsWrapTop);

            this.setData({ 
                showActionWords: true,
                wordsAction: parseInt(pageY / wordsItemHeight)
            });
        },

        handleTouchMove: throttle(function (e) {
            let { wordsWrapTop, wordsItemHeight, wordsArr } = this.data;
            let pageY = parseInt(e.changedTouches[0].pageY - wordsWrapTop);
            // 值 范围限制
            let wordsAction = this._scopeNumber(wordsArr.length - 1, 0, parseInt(pageY / wordsItemHeight));
            this.setData({ wordsAction });
            this.triggerEvent('change', {
                words: wordsArr[wordsAction],
                index: wordsAction
            });
        }, 100),
        handleTouchEnd() {
            this.setData({ showActionWords: false });
        },
        // 防止 touchend 不触发
        handleTouchCancel (){
            this.setData({ showActionWords: false });
        }
    }
})
