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
    return d.getFullYear() + '-' + m + '-' + d.getDate();
}
