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
    for (let i = 0; i < 8; i++) {
        HTML += '<div class="input-group input-group-regular" style="margin-bottom: 10px;"><label for="';
        HTML += Target[i];
        HTML += '" class="' + TargetName[i] + ' input-group-span input-group-text"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</label><button class="btn btn-outline-dark input-group-btn btn-bolder"type="button"id="Target_minus_1';
        if (i < 4)
            HTML += '00';
        HTML += '_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '&minus;</button><button class="btn btn-outline-dark input-group-btn target-btn-hidden"type="button"id="Target_minus_';
        if (i < 4)
            HTML += '10';
        else
            HTML += '01';
        HTML += '_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '&minus;</button><input type="number" min="0"';
        if (i >= 4)
            HTML += 'step="0.01"'
        HTML += 'class="form-control ' + TargetName[i] + '_placeholder" id="';
        HTML += Target[i];
        HTML += '"value=0 onfocus="this.select();"style="border-left-width:0"><button class="btn btn-outline-dark input-group-btn target-btn-hidden"type="button"id="Target_plus_';
        if (i < 4)
            HTML += '10';
        else
            HTML += '01';
        HTML += '_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-outline-dark input-group-btn btn-bolder"type="button"id="Target_plus_1';
        if (i < 4)
            HTML += '00';
        HTML += '_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
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
    //先判断是否存在元素以防出现bug, 已知bug为alert点击"X"(不再显示)后会将元素删除, 若此时切换语言会导致bug
    for (let i in language_HTML) {
        if (document.getElementById(i) !== null)
            document.getElementById(i).innerHTML = language_HTML[i];
    }
    for (let i in language_HTMLJS.placeholder) {
        if (document.getElementById(i) !== null)
            document.getElementById(i).placeholder = language_HTMLJS.placeholder[i];
    }
    for (let i in language_HTMLJS.title) {
        if (document.getElementById(i) !== null)
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
    let targetSpanWidth = language_CSS.TargetValueSpan_Width;
    document.getElementById("Manp").style.width = targetSpanWidth;
    document.getElementById("Ammu").style.width = targetSpanWidth;
    document.getElementById("Rati").style.width = targetSpanWidth;
    document.getElementById("Part").style.width = targetSpanWidth;
    document.getElementById("TPro").style.width = targetSpanWidth;
    document.getElementById("Equi").style.width = targetSpanWidth;
    document.getElementById("QPro").style.width = targetSpanWidth;
    document.getElementById("QRes").style.width = targetSpanWidth;
    // document.getElementById("PC_MT_label").style.width = targetSpanWidth;
    // document.getElementById("PC_AT_label").style.width = targetSpanWidth;
    // document.getElementById("PC_RT_label").style.width = targetSpanWidth;
    // document.getElementById("PC_PT_label").style.width = targetSpanWidth;
    // document.getElementById("PC_TT_label").style.width = targetSpanWidth;
    // document.getElementById("PC_ET_label").style.width = targetSpanWidth;
    // document.getElementById("PC_QPT_label").style.width = targetSpanWidth;
    // document.getElementById("PC_QRT_label").style.width = targetSpanWidth;
    //------------------
    
    //class
    let language_htmlclass = language.html_class;
    for (let class_name in language_htmlclass) {
        $("." + class_name).html(language_htmlclass[class_name]);
    }
    let language_placeholderclass = language.placeholder_class;
    for (let class_name in language_placeholderclass) {
        $("." + class_name).attr("placeholder", language_placeholderclass[class_name]);
    }
} //End loadHTML_language()
