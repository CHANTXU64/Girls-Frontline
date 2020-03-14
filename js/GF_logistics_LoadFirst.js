checkLocalStorageWork();
updateLocalStorage();

setLanguage();

loadHTML_Target();
loadHTML_ChapterLimit();

setPageByLocalStorage();

//设置契约值(必要)
let TotalGreatSuccessRate = Input_getTotalGreatSuccessRate(true);
setQContract(TotalGreatSuccessRate);

MissionsDetails.print();
let ShownTab = getShownTab();
PlanDetails.printShownTab(ShownTab.name);
PlanDetails.printTotalTime(ShownTab.getTotalTime(false));
PlanDetails.printGreatSuccessRate(TotalGreatSuccessRate);
PlanDetails.printExecutionTimes(Input_getExecutionTimes());

loadHTML_language();

//根据移动设备或PC设备更改样式
MobilePCDevice();

//用于checkLocalStorageWork()中检测是否由于localstorage不正确的数据导致浏览器崩溃
if (CAN_STORAGE_WORK)
    sessionStorage.setItem("GF_Logistics_windowOnload", "success");

$("#lang-zh").removeAttr("disabled");
$("#lang-en").removeAttr("disabled");
$("#Tab_Anytime_name").attr("data-toggle", "tab");
$("#Tab_Anytime_name").attr("href", "#Tab_Anytime");
$("#Tab_Timetable_name").attr("data-toggle", "tab");
$("#Tab_Timetable_name").attr("href", "#Tab_Timetable");
$("#Time_Anytime_hours").removeAttr("disabled");
$("#Time_Anytime_minutes").removeAttr("disabled");
$("#Tab_Anytime_MinimumIntervalTime_minutes").removeAttr("disabled");
$("#Time_Timetable_hours").removeAttr("disabled");
$("#Time_Timetable_minutes").removeAttr("disabled");
$("#GreatSuccessRate").removeAttr("disabled");
$("#ContractWeight").removeAttr("disabled");
$("#PlanDetails_InputStartTime").removeAttr("disabled");
$("#PlanDetails_InputExecutionTimes").removeAttr("disabled");