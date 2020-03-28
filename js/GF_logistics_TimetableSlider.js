/**
 * 时间表数组, 不包括0和结束时间
 * @type {Array.<number>}
 */
let Tab_Timetable_TIMELIST = [];

/**
 * 由于改变总时间改变时间表的总时间提示
 */
function Tab_Timetable_changeSliderTotalTime() {
    let TotalTime = Input_getTimetableTotalTime();
    if (TotalTime > 4320) {
        TotalTime = 4320;
        Input_setTimetableTotalTime(4320);
    }
    document.getElementById('Tab_Timetable_range_tooltip_0_value').innerHTML = TimeFormat(TotalTime);
    MissionsDetails.print();
    printPlanDetails();
}

/**
 * 添加一个时间点
 * @param {number} time - 新添加的时间
 */
function Tab_Timetable_AddNewTimePoint(time) {
    //将此时间点添加进数组
    Tab_Timetable_TIMELIST.push(time);
    quick_sort_ascending(Tab_Timetable_TIMELIST);

    const maxTime = Input_getTimetableTotalTime();
    const timeList_length = Tab_Timetable_TIMELIST.length;

    const index = Tab_Timetable_TIMELIST.indexOf(time);
    //若在最后面添加时间点, 则直接添加
    //否则由于要考虑提示位置需要改变之后点的提示位置, 全部重新设置
    if (index === timeList_length - 1) {
        const position = (time / maxTime) * 100 + '%';
        let newPointHTML = _Tab_Timetable_getNewThumb(time, position);
        newPointHTML += _Tab_Timetable_getNewTooltip(time, position, index);
        $("#Tab_Timetable_range").append(newPointHTML);
    }
    else {
        let TimetableRange_HTML = _Tab_Timetable_getSliderAndAllPointsHTML(maxTime, Tab_Timetable_TIMELIST);
        document.getElementById("Tab_Timetable_range").innerHTML = TimetableRange_HTML;
    }
}

/**
 * 重新设置全部时间表
 * @param {Array.<number>} timeList - 新的时间表
 */
function Tab_Timetable_setTimePoints(timeList) {
    Tab_Timetable_TIMELIST = timeList;
    if (timeList.length === 0)
        Tab_Timetable_InputTotalTime_enable();
    else
        Tab_Timetable_InputTotalTime_disable();

    const maxTime = Input_getTimetableTotalTime();
    let TimetableRange_HTML = _Tab_Timetable_getSliderAndAllPointsHTML(maxTime, timeList);
    document.getElementById("Tab_Timetable_range").innerHTML = TimetableRange_HTML;
}

/**
 * 获得时间表slider的原始HTML
 * @param {number} totalTime - 后勤总时间
 */
function _Tab_Timetable_getSliderHTML(totalTime) {
    let sliderHTML = '<div inverse-left style="width:70%;"></div><div inverse-right style="width:70%;"></div><div range style="left:0%;right:0%; background-color:#dee2e6;"></div>';
    sliderHTML += '<span thumb id="Tab_Timetable_range_thumb"style="left:100%; background-color:rgb(221, 155, 155); cursor:default;"></span>';
    sliderHTML += '<div id="Tab_Timetable_range_tooltip"class="tooltip right custom-tooltip"style="right: -69px; top:-9px;">';
    sliderHTML += '<div class="tooltip-arrow" style="top: 7px;"></div><div id="Tab_Timetable_range_tooltip_0_value"class="tooltip-inner">';
    sliderHTML += TimeFormat(totalTime) + '</div></div>';
    return sliderHTML;
}

/**
 * 获取时间表slider和所有时间点HTML
 * @param {number} totalTime - 后勤总时间
 * @param {Array.<number>} timeList - 时间表
 */
function _Tab_Timetable_getSliderAndAllPointsHTML(totalTime, timeList) {
    let HTML = _Tab_Timetable_getSliderHTML(totalTime);
    const timeList_length = timeList.length;
    for (let i = 0; i < timeList_length; i++) {
        const position = (timeList[i] / totalTime) * 100 + '%';
        let pointHTML = _Tab_Timetable_getNewThumb(timeList[i], position);
        pointHTML += _Tab_Timetable_getNewTooltip(timeList[i], position, i);
        HTML += pointHTML;
    }
    return HTML;
}

/**
 * 返回点的HTML
 * @param {number} time - 时间
 * @param {string} position - 时间点的位置(%), 如60%
 */
function _Tab_Timetable_getNewThumb(time, position) {
    let HTML = '<button class="slider-button" id="Tab_Timetable_range_thumb_' + time + '"';
    HTML += 'style="left:' + position + ';" title="' + language.HTMLJS.Timetable_deletePoint + '">';
    HTML += '<span class="glyphicon glyphicon-remove-circle" style="font-size: 22px;"></span></button>';
    return HTML;
}

/**
 * 返回点的提示的HTML, 由该时间在总时间的索引来判断提示在上还是在下
 * @param {number} time - 时间
 * @param {string} position - 时间点的位置(%), 如60%
 * @param {number} pointIndex - 该时间在总时间表的索引
 */
function _Tab_Timetable_getNewTooltip(time, position, pointIndex) {
    let HTML = '<div id="Tab_Timetable_range_tooltip_' + time + '"';
    if (pointIndex % 2 === 0)
        HTML += 'class="slider-Tooltip-top tooltip top custom-tooltip"';
    else
        HTML += 'class="slider-Tooltip-bottom tooltip bottom custom-tooltip"';
    HTML += 'style="left:' + position + ';">';
    HTML += '<div class="tooltip-arrow"></div><div class="tooltip-inner">';
    HTML += TimeFormat(time) + '</div></div>';
    return HTML;
}

/**
 * 删除一个时间点
 * @param {number} time - 要删除的时间
 */
function Tab_Timetable_DeleteThisTimePoint(time) {
    const index = Tab_Timetable_TIMELIST.indexOf(time);
    //如果删除最后一个时间点, 则直接删除
    //否则要考虑在此之后的时间点的提示位置, 需要重新设置时间表
    if (index === Tab_Timetable_TIMELIST.length - 1) {
        const thumb_id = "Tab_Timetable_range_thumb_" + time;
        const tooltip_id = "Tab_Timetable_range_tooltip_" + time;
        const thumb_obj = document.getElementById(thumb_id);
        const tooltip_obj = document.getElementById(tooltip_id);
        const parent_obj = document.getElementById('Tab_Timetable_range');
        parent_obj.removeChild(thumb_obj);
        parent_obj.removeChild(tooltip_obj);
        Tab_Timetable_TIMELIST.remove_First(time);
    }
    else {
        Tab_Timetable_TIMELIST.remove_First(time);
        Tab_Timetable_setTimePoints(Tab_Timetable_TIMELIST);
    }
    if (Tab_Timetable_TIMELIST.length === 0)
        Tab_Timetable_InputTotalTime_enable();
}

/**
 * 删除全部时间点
 */
function Tab_Timetable_DeleteAllTimePoint() {
    if (Tab_Timetable_TIMELIST.length === 0)
        return ;
    Tab_Timetable_TIMELIST = [];
    const maxTime = Input_getTimetableTotalTime();
    let TimetableRange_HTML = _Tab_Timetable_getSliderHTML(maxTime);
    document.getElementById("Tab_Timetable_range").innerHTML = TimetableRange_HTML;
    Tab_Timetable_InputTotalTime_enable();
}

/**
 * 启用总时间输入
 */
function Tab_Timetable_InputTotalTime_enable() {
    $("#Time_Timetable_hours").removeAttr("disabled");
    $("#Time_Timetable_minutes").removeAttr("disabled");
}

/**
 * 在存在时间点时禁用总时间输入.
 */
function Tab_Timetable_InputTotalTime_disable() {
    $("#Time_Timetable_hours").attr('disabled', "true");
    $("#Time_Timetable_minutes").attr('disabled', "true");
}
