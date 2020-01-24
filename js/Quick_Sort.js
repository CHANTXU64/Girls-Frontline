//https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F#JavaScript
class Range {
    constructor(s = 0, e = 0) {
        this.start = s;
        this.end = e;
    }
}

function quick_sort_descending(arr) {
    // r[]模擬堆疊,p為數量,r[p++]為push,r[--p]為pop且取得元素
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) 
            continue;
        var mid = arr[range.end];
        var left = range.start;
        var right = range.end - 1;
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

function quick_sort_ascending(arr) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) 
            continue;
        var mid = arr[range.end];
        var left = range.start;
        var right = range.end - 1;
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

function quick_sort_expand_descending(arr, compare_Column) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) 
            continue;
        var mid = arr[range.end][compare_Column];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left][compare_Column] > mid && left < right) left++;
            while (arr[right][compare_Column] <= mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left][compare_Column] <= arr[range.end][compare_Column])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else 
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

function quick_sort_expand_ascending(arr, compare_Column) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) 
            continue;
        var mid = arr[range.end][compare_Column];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left][compare_Column] < mid && left < right) left++;
            while (arr[right][compare_Column] >= mid && left < right) right--;
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
        if (arr[left][compare_Column] >= arr[range.end][compare_Column])
            [arr[left], arr[range.end]] = [arr[range.end], arr[left]];
        else 
            left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}