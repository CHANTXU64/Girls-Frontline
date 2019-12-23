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

$(function (){
    $("#GreatSuccessRate").on('input propertychange',function() {
        var UpRate;
        var GreatSuccessRate = $("#GreatSuccessRate");
        var Rate;
        if (is_Non_positive_number(GreatSuccessRate.val()) || GreatSuccessRate.val() < 15) {
            Rate = 15;
            UpRate = "" + 15;
        }
        else if (GreatSuccessRate.val() > 69) {
            Rate = 60;
            UpRate = "" + 30;
        }
        else {
            var Rate = Math.round(GreatSuccessRate.val());
            UpRate = Array_GreatSuccessRate[Rate];
        }
        if (IsGreatSuccessRateUp()) {
            document.getElementById('Display_UPRate').innerHTML = ("+" + UpRate);
        }
        UpRate = parseInt(UpRate.substr(0, 2));
        setQContract(Rate + UpRate);
    });
    $('#GreatSuccessRateUp').on('click', function() {
        var TotalRate = getTotalGreatSuccessRate();
        setQContract(TotalRate);
    });
})
var Array_GreatSuccessRate = [
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15",
 "15 / 16",
 "15 / 16",
 "16",
 "16",
 "16 / 17",
 "17",
 "17 / 18",
 "17 / 18",
 "17 / 18",
 "18 / 19",
 "18 / 19",
 "19",
 "19",
 "19 / 20",
 "20",
 "20 / 21",
 "20 / 21",
 "20 / 21",
 "21 / 22",
 "21 / 22",
 "22",
 "22",
 "22 / 23",
 "23",
 "23 / 24",
 "23 / 24",
 "23 / 24",
 "24 / 25",
 "24 / 25",
 "25",
 "25",
 "25 / 26",
 "26",
 "26 / 27",
 "26 / 27",
 "26 / 27",
 "27 / 28",
 "27 / 28",
 "28",
 "28",
 "28 / 29",
 "29",
 "29 / 30",
 "29 / 30",
 "29 / 30",
 "30 / 31",
 "30 / 31",
 "31",
 "31",
 "31 / 21",
 "32",
 "32 / 33",
 "32 / 33",
 "32",
 "31"
]
