function is_Non_positive_number(x) {
    if (x === "" || isNaN(x) || x < 0 || x === "Infinity")
        return true;
    else
        return false;
}

function getPositiveValueFromHTML(HTMLValue) {
    if (Array.isArray(HTMLValue))
        return _getPositiveValueFromHTML_array(HTMLValue);
    else
        return _getPositiveValueFromHTML_one(HTMLValue);
}
function _getPositiveValueFromHTML_one(HTMLNumber) {
    if (is_Non_positive_number(HTMLNumber.val()))
        HTMLNumber.val(0);
    return parseFloat(HTMLNumber.val());
}
function _getPositiveValueFromHTML_array(HTMLArr) {
    var Arr = new Array(HTMLArr.length);
    for (var i = 0; i < HTMLArr.length; i++) {
        if (is_Non_positive_number(HTMLArr[i].val()))
            HTMLArr[i].val(0);
        Arr[i] = parseFloat(HTMLArr[i].val());
    }
    return Arr;
}

function IsGreatSuccessRateUp() {
    if (document.getElementById('GreatSuccessRateUp').checked)
        return 1;
    else
        return 0;
}

function CheckDataLegalityAndCorrect_GreatSuccessRate() {
    var Rate = $("#GreatSuccessRate");
    if (is_Non_positive_number(Rate.val()) || Rate.val() < 15)
        Rate.val(15);
    if (Rate.val() > 69)
        Rate.val(69);
    Rate.val(Math.round(Rate.val()));
}

function getTotalGreatSuccessRate() {
    var GreatSuccessRate_UP = parseInt(Function_GreatSuccessRateUP().substr(0, 2));
    var GreatSuccessRate = parseInt($("#GreatSuccessRate").val());
    return GreatSuccessRate_UP + GreatSuccessRate;
}

function Function_GreatSuccessRateUP() {
    CheckDataLegalityAndCorrect_GreatSuccessRate();
    var UpRate = 0;
    if (IsGreatSuccessRateUp()) {
        UpRate = Array_GreatSuccessRate[Math.round($("#GreatSuccessRate").val())];
        document.getElementById('Display_UPRate').innerHTML = ("+" + UpRate);
        return "" + UpRate;
    }
    else {
        document.getElementById('Display_UPRate').innerHTML = "";
        return "" + UpRate;
    }
}
