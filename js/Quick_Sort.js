/**
 * @file 一维数组, 二维数组快速排序
 * @see https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F#JavaScript
 */

class Range {
    constructor(s = 0, e = 0) {
        this.start = s;
        this.end = e;
    }
}

/**
 * 对一维数组降序排序, 会改变传入数组
 * @param {Array.<number>} arr
 */
function quick_sort_descending(arr) {
    // r[]模擬堆疊,p為數量,r[p++]為push,r[--p]為pop且取得元素
    let r = new Array(arr.length);
    let p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        const range = r[--p];
        if (range.start >= range.end)
            continue;
        const mid = arr[range.end];
        let left = range.start;
        let right = range.end - 1;
        while (left < right) {
            while (arr[left] > mid && left < right) left++;
            while (arr[right] <= mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left] <= arr[range.end])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

/**
 * 对一维数组升序排序, 会改变传入数组
 * @param {Array.<number>} arr
 */
function quick_sort_ascending(arr) {
    let r = new Array(arr.length);
    let p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        const range = r[--p];
        if (range.start >= range.end)
            continue;
        const mid = arr[range.end];
        let left = range.start;
        let right = range.end - 1;
        while (left < right) {
            while (arr[left] < mid && left < right) left++;
            while (arr[right] >= mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left] >= arr[range.end])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

/**
 * 对二维数组某一列降序排序, 会改变传入数组
 * @param {Array.<Array>} arr - 需要排序的列必须为number类型
 * @param {number} compare_Column - 需要排序的列
 */
function quick_sort_expand_descending(arr, compare_Column) {
    let r = new Array(arr.length);
    let p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        const range = r[--p];
        if (range.start >= range.end)
            continue;
        const mid = arr[range.end][compare_Column];
        let left = range.start;
        let right = range.end - 1;
        while (left < right) {
            while (arr[left][compare_Column] >= mid && left < right) left++;
            while (arr[right][compare_Column] < mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left][compare_Column] < arr[range.end][compare_Column])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

/**
 * 对二维数组某一列升序排序, 会改变传入数组
 * @param {Array.<Array>} arr - 需要排序的列必须为number类型
 * @param {number} compare_Column - 需要排序的列
 */
function quick_sort_expand_ascending(arr, compare_Column) {
    let r = new Array(arr.length);
    let p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        const range = r[--p];
        if (range.start >= range.end)
            continue;
        const mid = arr[range.end][compare_Column];
        let left = range.start;
        let right = range.end - 1;
        while (left < right) {
            while (arr[left][compare_Column] <= mid && left < right) left++;
            while (arr[right][compare_Column] > mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left][compare_Column] > arr[range.end][compare_Column])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

/**
 * 专门用于对二维数组的关卡名称一列升序排序, 会改变传入数组
 * @param {Array.<Array.<string>>} arr - 关卡列必须为string类型
 * @param {number} Mission_Column - 关卡列
 */
function quick_sort_expand_ascending_missionName(arr, Mission_Column) {
    let r = new Array(arr.length);
    let p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        const range = r[--p];
        if (range.start >= range.end)
            continue;
        const mid = parseInt(arr[range.end][Mission_Column].replace(/[^0-9]/ig, ""));
        let left = range.start;
        let right = range.end - 1;
        while (left < right) {
            while (parseInt(arr[left][Mission_Column].replace(/[^0-9]/ig, "")) < mid && left < right) left++;
            while (parseInt(arr[right][Mission_Column].replace(/[^0-9]/ig, "")) >= mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (parseInt(arr[left][Mission_Column].replace(/[^0-9]/ig, "")) >= parseInt(arr[range.end][Mission_Column].replace(/[^0-9]/ig, "")))
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}