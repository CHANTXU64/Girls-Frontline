/**
 * 加载填写需求量的页面
 */
function loadHTML_Target() {
    let HTML = '';
    HTML += '<button type="button" class="btn btn-outline-dark btn-regular"id="setTarget_HG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-outline-dark btn-regular"id="setTarget_SMG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-outline-dark btn-regular"id="setTarget_RF" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-outline-dark btn-regular"id="setTarget_AR" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-outline-dark btn-regular"id="setTarget_MG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-outline-dark btn-regular"id="setTarget_SG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-outline-dark btn-regular"id="setTarget_2221" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-danger btn-regular"id="setTarget_Clear" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    document.getElementById("setTargetButton").innerHTML = HTML;
    HTML = '';
    const TargetName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    const Target = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    for (let i = 0; i < 4; i++) {
        HTML += '<div class="input-group input-group-regular" style="margin-bottom: 10px;"><span class="input-group-span input-group-text"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><button class="btn btn-outline-dark input-group-btn btn-bolder"type="button"id="Target_minus_100_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '&minus;</button><button class="btn btn-outline-dark input-group-btn target-btn-hidden"type="button"id="Target_minus_10_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '&minus;</button><input type="number" min="0"class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onfocus="this.select();"style="border-left-width:0"><button class="btn btn-outline-dark input-group-btn target-btn-hidden"type="button"id="Target_plus_10_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-outline-dark input-group-btn btn-bolder"type="button"id="Target_plus_100_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '&plus;</button></div>';
    }
    for (let i = 4; i < 8; i++) {
        HTML += '<div class="input-group input-group-regular" style="margin-bottom: 10px;"><span class="input-group-span input-group-text"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><button class="btn btn-outline-dark input-group-btn btn-bolder"id="Target_minus_1_' + Target[i] + '"type="button"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '&minus;</button><button class="btn btn-outline-dark input-group-btn target-btn-hidden"type="button"id="Target_minus_01_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '&minus;</button><input type="number" min="0" step="0.01" class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onfocus="this.select();"style="border-left-width:0"><button class="btn btn-outline-dark input-group-btn target-btn-hidden"type="button"id="Target_plus_01_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-outline-dark input-group-btn btn-bolder"type="button"id="Target_plus_1_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '&plus;</button></div>';
    }
    document.getElementById("setTargetInput").innerHTML = HTML;
}

/**解锁章节中的可选择的最小章节 */
const MIN_CHAPTER = 6;

/**
 * 加载解锁章节, 默认选择最大章节
 */
function loadHTML_ChapterLimit() {
    //test
    if (Q.length % 4 !== 0)
        throw "haha";
    //End test
    let MaxChapter = (Q.length - 4) / 4;
    let tab = "";
    for (let i = MIN_CHAPTER; i <= MaxChapter; i++) {
        if (i === MaxChapter)
            tab += "<option value=" + i + " id=\"chapter_" + i + "\" selected></option>";
        else
            tab += "<option value=" + i + " id=\"chapter_" + i + "\"></option>";
    }
    document.getElementById("ChapterLimit").innerHTML = tab;
}

/**
 * 加载全部语言内容
 */
function loadHTML_language() {
    let language_HTML = language.HTML;
    let language_HTMLJS = language.HTMLJS;
    let language_JS = language.JS;
    let language_CSS = language.CSS;

    document.documentElement.lang = language.lang;
    document.title = language.title;

    //normal------------
    for (let i in language_HTML) {
        document.getElementById(i).innerHTML = language_HTML[i];
    }
    for (let i in language_HTMLJS.placeholder) {
        document.getElementById(i).placeholder = language_HTMLJS.placeholder[i];
    }
    for (let i in language_HTMLJS.title) {
        document.getElementById(i).title = language_HTMLJS.title[i];
    }
    //------------------

    //ResultPlan--------
    delete_rankingResults();
    HTML_AllowRankingInput();

    //ChapterLimit------
    let MaxChapter = (Q.length - 4) / 4;
    for (let i = MIN_CHAPTER; i <= MaxChapter; i++) {
        document.getElementById("chapter_" + i).innerHTML = language_JS.chapter_start + language_JS.number(i) + language_JS.chapter_end;
    }

    //Timetable---------
    $("button[id^=Tab_Timetable_range_thumb_]").attr("title", language_HTMLJS.Timetable_deletePoint);

    //PlanDetails-------
    let ShownTab = getShownTab();
    PlanDetails.printShownTab(ShownTab.name);
    PlanDetails.printTotalTime(ShownTab.getTotalTime(false));
    PlanDetails.printGreatSuccessRate(Input_getTotalGreatSuccessRate());
    PlanDetails.printExecutionTimes(Input_getExecutionTimes());
    $("#PlanDetails_PerHour_title").html(language_JS.PerHour);
    $("#PlanDetails_Total_title").html(language_JS.Total);
    $("#PlanDetails_TabCustom_Title").html(ShownTab.planDetailsCustom_Title());
    //------------------

    //demand title------
    if (is_CalculateByHour())
        $("#Demand").html(language_HTMLJS.Demand_hour);
    else
        $("#Demand").html(language_HTMLJS.Demand_total);

    //style-------------
    document.getElementById("Manp").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("Ammu").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("Rati").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("Part").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("TPro").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("Equi").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("QPro").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("QRes").style.width = language_CSS.TargetValueSpan_Width;
    //------------------
} //End loadHTML_language()