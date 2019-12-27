function stringSliceFromLast_(str, end) {
    var start = str.lastIndexOf("_");
    if (end === undefined)
        return str.slice(start + 1);
    else
        return str.slice(start + 1, end);
}

function NumberAutoExact(number) {
    if (number > 100)
        return Math.round(number);
    else if (number > 10)
        return Math.round(number * 10) / 10;
    else
        return Math.round(number * 100) / 100;
}

function TimeFormat(Minutes) {
    var hours = parseInt(Minutes / 60);
    var minutes = Minutes % 60;
    if ((minutes + "").length < 2)
        minutes = "0" + minutes;
    return hours + ':' + minutes;
}

function is_NonPositiveNumberOrInfinity(x) {
    if (x === "" || isNaN(x) || x < 0 || x === "Infinity")
        return true;
    else
        return false;
}