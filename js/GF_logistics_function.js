/**
 * 返回字符串最后一个"_"字符后面的内容
 * @param {string} str - 字符串
 * @param {number=} end - End index
 */ 
function stringSliceFromLast_(str, end) {
    const start = str.lastIndexOf("_");
    if (end === undefined)
        return str.slice(start + 1);
    else
        return str.slice(start + 1, end);
}

/**
 * 适用于非负数
 *
 * 当数大于100, 返回不保留小数.
 * 当数大于10, 返回保留一位小数.
 * 当数小于10, 返回两位小数.
 * @param {number} number
 */
function NumberAutoExact(number) {
    let newNumber;
    if (number > 100)
        newNumber = Math.round(number);
    else if (number > 10)
        newNumber = Math.round(number * 10) / 10;
    else
        newNumber = Math.round(number * 100) / 100;
    return newNumber;
}

/**
 * 将总分钟数转换为HH:mm格式, 没有上限
 * @param {number} Minutes - 总分钟数
 */
function TimeFormat(Minutes) {
    Minutes = Math.round(Minutes);
    let hours = parseInt(Minutes / 60);
    let minutes = Minutes % 60;
    if ((minutes + "").length < 2)
        minutes = "0" + minutes;
    return hours + ':' + minutes;
}

/**
 * 将总分钟数转换为HH:mm格式, 最大为23:59
 * @param {number} Minutes - 总分钟数
 */
function TimeFormat_Day(Minutes) {
    Minutes = Math.round(Minutes);
    let TotalMinutes = Minutes % 1440;
    return TimeFormat(TotalMinutes);
}

/**
 * 判断x是否为非正数(或0)
 * 
 * 是, 返回false. 否, 返回true
 */
function is_NonPositiveNumberOrInfinity(x) {
    if (x === "" || isNaN(x) || x < 0 || x === "Infinity")
        return true;
    else
        return false;
}

/**
 * 从JQ_selector取得非负数. 如果不为非负数, 返回0, 且由NeedCorrection决定是否修改JQ_selector为0
 * @param {Object} JQ_selector - Jquery选择器
 * @param {boolean=} NeedCorrection - 默认为falsen
 */
function getPositiveValueFromHTML(JQ_selector, NeedCorrection = false) {
    let Value;
    if (is_NonPositiveNumberOrInfinity(JQ_selector.val()))
        Value = 0;
    else
        Value = parseFloat(JQ_selector.val());
    if (NeedCorrection)
        JQ_selector.val(Value);
    return Value;
}

//移除数组中值为val的所有元素
Array.prototype.remove = function(val) {
    let i = 0;
    while (i < this.length) {
        if (this[i] === val)
            this.splice(i, 1);
        else
            i++;
    }
};

//移除数组中值为val的第一个元素
Array.prototype.remove_First = function(val) {
    let i = 0;
    while (i < this.length) {
        if (this[i] === val) {
            this.splice(i, 1);
            break;
        }
        else
            i++;
    }
};

/**
 * 计算数组中的最大值
 * @param {Array.<number>} Arr
 * @returns {number} 数组最大值
 */
function ArrayMax(Arr) {
    let max = 0;
    let Arr_length = Arr.length;
    for (let i = 0; i < Arr_length; i++) {
        max = max > Arr[i] ? max : Arr[i];
    }
    return max;
}

/**
 * 计算数组中的最小值
 * @param {Array.<number>} Arr
 * @returns {number} 数组最小值
 */
function ArrayMin(Arr) {
    //test
    if (Arr.length === 0)
        throw "error";
    //End
    let min = Arr[0];
    let Arr_length = Arr.length;
    for (let i = 0; i < Arr_length; i++) {
        min = min < Arr[i] ? min : Arr[i];
    }
    return min;
}

/**
 * sort()方法, 数字按升序排序
 * @param {number} a
 * @param {number} b
 */
function sortNumber(a, b) {
    return a - b;
}

/**
 * sort()方法, 将关卡字符串按升序排序
 * @param {string} a
 * @param {string} b
 */
function sortStringNumber(a, b) {
    let aa, bb;
    aa = parseInt(a.replace(/[^0-9]/ig,""));
    bb = parseInt(b.replace(/[^0-9]/ig,""));
    return aa - bb;
}

/**
 * 判断设备是否是移动设备
 * @return {boolean}
 */
function IsMobile(){
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "KFAPWI"];
    let flag = false;
    for (let i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) !== -1) {
            flag = true;
            break;
        }
    }
    return flag;
}