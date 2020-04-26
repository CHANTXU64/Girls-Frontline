checkLocalStorageWork();
updateLocalStorage();

setLanguage();

loadHTML_Target();
loadHTML_ChapterLimit();
plan_combination_load();
Consumption_load();
Consumption_load_preset_select();

setPageByLocalStorage();

MissionsDetails.print();
let ShownTab = getShownTab();
PlanDetails.printShownTab(ShownTab.name);
PlanDetails.printTotalTime(ShownTab.getTotalTime(false));
let TotalGreatSuccessRate = Input_getTotalGreatSuccessRate(true);
PlanDetails.printGreatSuccessRate(TotalGreatSuccessRate);
PlanDetails.printExecutionTimes(Input_getExecutionTimes());

loadHTML_language();

//根据移动设备或PC设备更改样式
MobilePCDevice();

//用于checkLocalStorageWork()中检测是否由于localstorage不正确的数据导致浏览器崩溃
if (CAN_STORAGE_WORK)
    sessionStorage.setItem("GF_Logistics_windowOnload", "success");

$("#set_lang").removeAttr("disabled");
$("#neverShowAgain_description").removeAttr("disabled");
$("#neverShowAgain_localstorageWarning").removeAttr("disabled");
$("#Tab_Anytime_name").attr("data-toggle", "tab");
$("#Tab_Anytime_name").attr("href", "#Tab_Anytime");
$("#Tab_Timetable_name").attr("data-toggle", "tab");
$("#Tab_Timetable_name").attr("href", "#Tab_Timetable");
$("#Time_Anytime_hours").removeAttr("disabled");
$("#Time_Anytime_minutes").removeAttr("disabled");
$("#Tab_Anytime_MinimumIntervalTime_minutes").removeAttr("disabled");
if (Tab_Timetable_TIMELIST.length === 0) {
    $("#Time_Timetable_hours").removeAttr("disabled");
    $("#Time_Timetable_minutes").removeAttr("disabled");
}
$("#GreatSuccessRate").removeAttr("disabled");
$("#GreatSuccessRateUp_btn").removeClass("disabled");
$("#ContractWeight").removeAttr("disabled");
$("#PlanDetails_InputStartTime").removeAttr("disabled");
$("#PlanDetails_InputExecutionTimes").removeAttr("disabled");
$("#version").html("version: " + VERSION);
