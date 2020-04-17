/**
 * 在原日期上增加天数
 * @param {string} date - 原日期
 * @param {number} days
 * @return {string}
 */
function addDate(date, days){
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    let m = d.getMonth() + 1;
    if ((m + "").length < 2)
        m = "0" + m;
    let day = d.getDate();
    if ((day + "").length < 2)
        day = "0" + day;
    return d.getFullYear() + '-' + m + '-' + day;
}

/**
 * 计算两日期差
 * @param {string} startDate
 * @param {string} engDate
 * @return {number}
 */
function calcDaysBetween2Dates(startDate, endDate) {
    let startTime = new Date(startDate);
    let endTime = new Date(endDate);
    let days = (endTime - startTime) / (1000 * 60 * 60 * 24);
    return days;
}
