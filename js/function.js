/**
 * 根据概率计算单次后勤获得的契约值
 * @param {number} BaseValue - 在0%大成功概率时获取该契约的概率(单位 %, 0~100)
 * @param {number} SumValue - 该后勤能获得的所有契约的BaseValue之和(单位 %, 0~100)
 * @param {number} TotalRate - 目前的总大成功概率(0~100)
 * @return {number} 进行一次后勤获得的契约数量
 * @example calculateContractValue(50, 100, 0.6)
 */
function calcContractValue(BaseValue, SumValue, TotalRate) {
    //test
    if (SumValue > 100)
        throw "Error";
    //End test
    if (BaseValue === 0)
        return 0;
    else
        return BaseValue / 100 + (BaseValue / SumValue - BaseValue / 100) * TotalRate / 100;
}

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
 * 当数(绝对值)大于100, 返回不保留小数.
 * 当数(绝对值)大于10, 返回保留一位小数.
 * 当数(绝对值)小于10, 返回两位小数.
 * @param {number} number
 */
function NumberAutoExact(number) {
    let newNumber;
    if (number > 100 || number < -100)
        newNumber = Math.round(number);
    else if (number > 10 || number < -10)
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

function getPositiveIntegerFromHTML(JQ_selector, NeedCorrection = false) {
    let posInt;
    if (is_NonPositiveNumberOrInfinity(JQ_selector.val()))
        posInt = 0;
    else
        posInt = parseInt(JQ_selector.val());
    if (NeedCorrection)
        JQ_selector.val(posInt);
    return posInt;
}

function is_NonNumberOrInfinity(x) {
    if (x === "" || isNaN(x) || x === "Infinity")
        return true;
    else
        return false;
}

function getNumberFromHTML(JQ_selector, NeedCorrection = false) {
    let number;
    if (is_NonNumberOrInfinity(JQ_selector.val()))
        number = 0;
    else
        number = parseFloat(JQ_selector.val());
    if (NeedCorrection)
        JQ_selector.val(number);
    return number;
}

//移除数组中值为val的所有元素
Array.prototype.remove = function (val) {
    let i = 0;
    while (i < this.length) {
        if (this[i] === val)
            this.splice(i, 1);
        else
            i++;
    }
};

//移除数组中值为val的第一个元素
Array.prototype.remove_First = function (val) {
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
    //End test
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
    aa = parseInt(a.replace(/[^0-9]/ig, ""));
    bb = parseInt(b.replace(/[^0-9]/ig, ""));
    return aa - bb;
}

/**
 * 判断设备是否是移动设备
 * @return {boolean}
 */
function IsMobile() {
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

//重写console方法, 获取控制台信息
let CONSOLE = "";
if (console) {
    var _console = {
        log: console.log,
        info: console.info,
        debug: console.debug,
        warn: console.warn,
        error: console.error,
    };
    console.log = function (data) {
        let date = new Date;
        let CONSOLE_ = date.toLocaleString() + " log: " + JSON.stringify(data) + "\n";
        CONSOLE = CONSOLE + CONSOLE_;
        CONSOLE = limitCONSOLELength(CONSOLE);
        try {
            CONSOLE_ = sessionStorage.getItem("GF_Logistics_console") + CONSOLE_;
            CONSOLE_ = limitCONSOLELength(CONSOLE_);
            sessionStorage.setItem("GF_Logistics_console", CONSOLE_);
        } catch (ex) {}
        _console.log.apply(this, Array.prototype.slice.call(arguments, 0));
    };
    console.warn = function (a) {
        let date = new Date;
        let CONSOLE_ = date.toLocaleString() + " warn: " + JSON.stringify(data) + "\n";
        CONSOLE = CONSOLE + CONSOLE_;
        CONSOLE = limitCONSOLELength(CONSOLE);
        try {
            CONSOLE_ = sessionStorage.getItem("GF_Logistics_console") + CONSOLE_;
            CONSOLE_ = limitCONSOLELength(CONSOLE_);
            sessionStorage.setItem("GF_Logistics_console", CONSOLE_);
        } catch (ex) {}
        _console.warn.apply(this, Array.prototype.slice.call(arguments, 0));
    };
    console.error = function (a) {
        let date = new Date;
        let CONSOLE_ = date.toLocaleString() + " error: " + JSON.stringify(a) + "\n";
        CONSOLE = CONSOLE + CONSOLE_;
        CONSOLE = limitCONSOLELength(CONSOLE);
        try {
            CONSOLE_ = sessionStorage.getItem("GF_Logistics_console") + CONSOLE_;
            CONSOLE_ = limitCONSOLELength(CONSOLE_);
            sessionStorage.setItem("GF_Logistics_console", CONSOLE_);
        } catch (ex) {}
        _console.error.apply(this, Array.prototype.slice.call(arguments, 0));
    };
}
/**限制CONSOLE长度 */
function limitCONSOLELength(console_string) {
    let maxLength = 10000;
    let length = console_string.length;
    if (length > maxLength)
        return console_string.slice(length - maxLength);
    else
        return console_string;
}

function runError() {
    let a = 0;
    return a.getItem();
}

//run on IE 11
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function (value) {

            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            var O = Object(this);

            // Steps 3-5.
            var len = O.length >>> 0;

            // Steps 6-7.
            var start = arguments[1];
            var relativeStart = start >> 0;

            // Step 8.
            var k = relativeStart < 0 ?
                Math.max(len + relativeStart, 0) :
                Math.min(relativeStart, len);

            // Steps 9-10.
            var end = arguments[2];
            var relativeEnd = end === undefined ?
                len : end >> 0;

            // Step 11.
            var final = relativeEnd < 0 ?
                Math.max(len + relativeEnd, 0) :
                Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
                O[k] = value;
                k++;
            }

            // Step 13.
            return O;
        }
    });
}

function html_waiting() {
    document.body.style.pointerEvents = "none";
    //bug
    $(".custom-control-input").attr("disabled", "true");
}

function html_waiting_cancel() {
    document.body.style.pointerEvents = "";
    //bug
    $(".custom-control-input").removeAttr("disabled");
}
