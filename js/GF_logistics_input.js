function getPositiveValueFromHTML(HTMLValue) {
    if (Array.isArray(HTMLValue))
        return _getPositiveValueFromHTML_array(HTMLValue);
    else
        return _getPositiveValueFromHTML_one(HTMLValue);
}
function _getPositiveValueFromHTML_one(HTMLNumber) {
    if (is_NonPositiveNumberOrInfinity(HTMLNumber.val()))
        HTMLNumber.val(0);
    return parseFloat(HTMLNumber.val());
}
function _getPositiveValueFromHTML_array(HTMLArr) {
    var Arr = new Array(HTMLArr.length);
    for (var i = 0; i < HTMLArr.length; i++) {
        if (is_NonPositiveNumberOrInfinity(HTMLArr[i].val()))
            HTMLArr[i].val(0);
        Arr[i] = parseFloat(HTMLArr[i].val());
    }
    return Arr;
}

function Input_getGreatSuccessRate(NeedCorrection = false) {
    var Rate_elem = $("#GreatSuccessRate");
    var Rate = Rate_elem.val();
    if (is_NonPositiveNumberOrInfinity(Rate) || Rate < 15)
        Rate = 15;
    else if (Rate > 69)
        Rate = 69;
    else
        Rate = Math.round(Rate);
    if (NeedCorrection)
        Rate_elem.val(Rate);
    return Rate;
}

function IsGreatSuccessRateUp() {
    if (document.getElementById('GreatSuccessRateUp').checked)
        return true;
    else
        return false;
}

function Input_getGreatSuccessUpRate(GreatSuccessRate) {
    if (IsGreatSuccessRateUp())
        return parseInt(Array_GreatSuccessRate[GreatSuccessRate].substr(0, 2));
    else
        return 0;
}

function Input_getTotalGreatSuccessRate(NeedCorrection = false) {
    var BaseRate = Input_getGreatSuccessRate(NeedCorrection);
    var UpRate = Input_getGreatSuccessUpRate(BaseRate);
    return BaseRate + UpRate;
}

function Input_setGreatSuccessUpRate(is_RateUP) {
    var checkbox_elem = document.getElementById("GreatSuccessRateUp");
    var UpRateText_elem = document.getElementById("Display_UPRate");
    if (is_RateUP === false) {
        checkbox_elem.checked = false;
        UpRateText_elem.innerHTML = "";
    }
    else {
        checkbox_elem.checked = true;
        var BaseRate = Input_getGreatSuccessRate(true);
        UpRateText_elem.innerHTML = "+" + Array_GreatSuccessRate[BaseRate];
    }
}

$(function (){
    $("#GreatSuccessRate").on('input propertychange',function() {
        var Rate = Input_getGreatSuccessRate();
        var is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP);
        var TotalRate = Rate + Input_getGreatSuccessUpRate(Rate);
        setQContract(TotalRate);
        PrintMissionTable();
        PrintPlanDetails();
    });
    $('#GreatSuccessRateUp').on('click', function() {
        var is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP);
        var TotalRate = Input_getTotalGreatSuccessRate(true);
        setQContract(TotalRate);
        PrintMissionTable();
        PrintPlanDetails();
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
