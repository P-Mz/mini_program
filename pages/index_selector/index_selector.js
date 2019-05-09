
const pinyin = require('../../utils/pinyin');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        wordsArr: Array(26).fill('').map((v, i) => String.fromCharCode(i + 65)),
        wordsIndex: 0,
    },

    __change(e) {
        let { index } = e.detail;
        this.setData({ wordsIndex: index });
    },

    // 按 字母升序
    _dataSortToSortArr(sortArr, data, key) {
        let ret = [];
        let dataWrap = sortArr.map(item => ({ letter: item, data: [] }));

        data.forEach(item => {
            let firstLetter = pinyin(item[key]).slice(0, 1).toUpperCase();
            let index = sortArr.indexOf(firstLetter);
            if (index === -1) {
                dataWrap[0].data.push(item);
            } else {
                dataWrap[index].data.push(item);
            }
        });
        return ret;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})