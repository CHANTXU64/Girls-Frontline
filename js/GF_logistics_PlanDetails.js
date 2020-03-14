class PlanDetails {
    /**
     * 打印计算方式
     * @param {string} HTML_TAB - 目前显示的Tab
     */
    static printShownTab(HTML_TAB) {
        let ShownTab_Name = "";
        switch (HTML_TAB) {
            case "Anytime":
                ShownTab_Name = language.HTML.Tab_Anytime_name;
                break;
            case "Timetable":
                ShownTab_Name = language.HTML.Tab_Timetable_name;
                break;
        }
        document.getElementById("PlanDetails_ShownTab").innerHTML = language.JS.PlanDetails_calculateMethod + ': ' + ShownTab_Name;
    }

    /**
     * 打印总时长
     * @param {number} TotalMinutes - 后勤总分钟数
     */
    static printTotalTime(TotalMinutes) {
        document.getElementById("PlanDetails_TotalTime").innerHTML = language.JS.total_time + ": " + TimeFormat(TotalMinutes);
    }

    /**
     * 打印总大成功概率
     * @param {number} TotalGreatSuccessRate - 总大成功概率, 单位%, 范围0~100
     */
    static printGreatSuccessRate(TotalGreatSuccessRate) {
        document.getElementById("PlanDetails_GreatSuccessRate").innerHTML = language.JS.total_greatSuccessRate + ": " + TotalGreatSuccessRate + "%";
    }

    /**
     * 打印后勤执行次数
     * @param {number} ExecutionTimes - 后勤执行次数
     */
    static printExecutionTimes(ExecutionTimes) {
        document.getElementById("PlanDetails_ExecutionTimes").innerHTML = language.JS.ExecutionTimes + ": " + ExecutionTimes;
    }

    /**
     * 打印关卡详情, 关卡数量小于等于4
     * @param {Array.<Array.<string|number>>} missionsDetails - 需要打印的关卡们的详情, 0关卡名称-1~8资源契约-9关卡时间
     */
    static printMissions(missionsDetails) {
        for (let i = 0; i < missionsDetails.length; i++) {
            let tab = "<td>" + missionsDetails[i][0] + "</td>";
            for (let ii = 1; ii < 9; ii++) {
                tab += "<td>";
                tab += NumberAutoExact(missionsDetails[i][ii] * 60);
                tab += "</td>";
            }
            tab += "<td>" + TimeFormat(missionsDetails[i][9]) + "</td>";
            document.getElementById("PlanDetails_Mission_" + (i + 1)).innerHTML = tab;
        }
        for (let i = missionsDetails.length; i < 4; i++) {
            document.getElementById("PlanDetails_Mission_" + (i + 1)).innerHTML = "";
        }
    }

    /**
     * 打印所有关卡资源契约Hourly, 关卡数量小于等于4, 最后一列打印Tab自定义标题
     * @param {Array.<Array.<number>>} missionsDetails - 需要打印的关卡们的详情, 1~8资源契约
     * @param {string} HTML_TAB - 目前显示的Tab
     */
    static printMissionsHourly(missionsDetails, HTML_TAB) {
        //如果关卡数为0, 则内容为空
        if (missionsDetails.length === 0) {
            document.getElementById("PlanDetails_PerHour").innerHTML = "";
            return ;
        }

        let tab = "<td id='PlanDetails_PerHour_title'>" + language.JS.PerHour + "</td>";
        for (let i = 1; i < 9; i++) {
            tab += "<td>";
            let ResourceContractValue = 0;
            for (let ii = 0; ii < missionsDetails.length; ii++) {
                ResourceContractValue += missionsDetails[ii][i];
            }
            tab += NumberAutoExact(ResourceContractValue * 60);
            tab += "</td>";
        }

        //Tab自定义的标题
        tab += "<td id='PlanDetails_TabCustom_Title'>";
        let ShownTab = getTabByName(HTML_TAB);
        tab += ShownTab.planDetailsCustom_Title();
        tab += "</td>";

        document.getElementById("PlanDetails_PerHour").innerHTML = tab;
    }

    /**
     * 打印所有关卡资源契约Hourly, 关卡数量小于等于4, 最后一列打印Tab自定义内容(除数字不要有其他语言, 否则在更改语言时还需调用该函数)
     * @param {Array.<Array.<number>>} missionsDetails - 需要打印的关卡们的详情, 0关卡名称-1~8资源契约-9关卡时间
     * @param {number} TotalMinutes - 后勤总分钟数
     * @param {number} ExecutionTimes - 后勤执行次数
     * @param {string} HTML_TAB - 目前显示的Tab
     */
    static printMissionsTotal(missionsDetails, TotalMinutes, ExecutionTimes, HTML_TAB) {
        //如果关卡数为0, 则内容为空
        if (missionsDetails.length === 0) {
            document.getElementById("PlanDetails_Total").innerHTML = "";
            return ;
        }

        let tab = "<td id='PlanDetails_Total_title'>" + language.JS.Total + "</td>";
        for (let i = 1; i < 9; i++) {
            tab += "<td>";
            let ResourceContractValue = 0;
            for (let ii = 0; ii < missionsDetails.length; ii++) {
                ResourceContractValue += missionsDetails[ii][i];
            }
            tab += NumberAutoExact(ResourceContractValue * TotalMinutes * ExecutionTimes);
            tab += "</td>";
        }

        //Tab自定义的内容
        let MissionsName = [];
        for (let i = 0; i < missionsDetails.length; i++) {
            MissionsName.push(missionsDetails[i][0]);
        }
        let ShownTab = getTabByName(HTML_TAB);
        tab += "<td>";
        tab += ShownTab.planDetailsCustom_Content(MissionsName) + "</td>";

        document.getElementById("PlanDetails_Total").innerHTML = tab;
    }

    /**
     * 打印关卡完成时间表的图表
     * @param {Array.<Array.<number>>} missionsDetails - 需要打印的关卡们的详情, 0关卡名称-9关卡时间-10关卡完成时间表
     * @param {number} TotalMinutes - 后勤总分钟数
     * @param {number} startTime - 后勤开始时间, 换算成从零点开始的总分钟数
     */
    static printChart(missionsDetails, TotalMinutes, startTime) {
        //当echarts还未加载时, 显示loading, 每1000ms重试
        if (this._loadingChart.length !== 0) {
            clearTimeout(this._loadingChart[0]);
            this._loadingChart.shift();
        }
        if (!window.echarts) {
            if (!window.chart_loading)
                document.getElementById("PlanDetails_Chart").innerHTML = '<div class="spinner-border" id="chart_loading" role="status"><span class="sr-only">Loading...</span></div>';
            let id = setTimeout(function () {PlanDetails.printChart(missionsDetails, TotalMinutes, startTime)}, 1000);
            this._loadingChart.push(id);
            return ;
        }

        //若这次参数与上次参数一致, 则可以跳过这次完全一样的打印
        let lastParam = this._chartLastParam;
        if (missionsDetails.length === lastParam.missionsName.length) {
            if (TotalMinutes === lastParam.totalTime && startTime === lastParam.startTIme) {
                let length = missionsDetails.length;
                let flag = true;
                for (let i = 0; i < length; i++) {
                    if (missionsDetails[i][0] !== lastParam.missionsName[i] || "" + missionsDetails[i][10] !== lastParam.collectTimetable[i])
                        flag = false;
                }
                if (flag === true)
                    return ;
            }
        }

        const Chart_elem = document.getElementById("PlanDetails_Chart");

        //判断打印之前是否已存在图表, 若存在选择更新或销毁(关卡数组为空), 否则添加图表
        let Chart; //图表实例
        if (Chart_elem.getAttribute("_echarts_instance_") === "" || Chart_elem.getAttribute("_echarts_instance_") === null) {
            if (missionsDetails.length === 0) //跳过打印图表
                return ;
            Chart_elem.style.cssText = "width: 610px; height: 120px;";
            Chart = echarts.init(Chart_elem);
        }
        else {
            Chart = echarts.getInstanceByDom(Chart_elem);
            if (missionsDetails.length === 0) { //销毁实例
                Chart.dispose();
                Chart_elem.style.cssText = "";
                return ;
            }
        }

        let missions_name = [];
        let missions_time = [];
        let missions_CollectTimetable = [];
        let dataCount = [];
        let types = [];
        let color = ['#A1C0FF', '#FF8C8A', '#75d874', '#FFDA93'];
        for (let i = missionsDetails.length - 1; i >= 0; i--) {
            missions_name.push(missionsDetails[i][0]);
            missions_time.push(missionsDetails[i][9]);
            missions_CollectTimetable.push(missionsDetails[i][10]);
            dataCount.push(missionsDetails[i][10].length);
            types.push({name: missionsDetails[i][0], color: color[i]});
        }

        let data = [];
        const categories = ['0', '1', '2', '3'];

        //优化x坐标标签间隔
        let xAxis_interval;
        if (TotalMinutes <= 960)
            xAxis_interval = 60;
        else if (TotalMinutes <= 1920)
            xAxis_interval = 120;
        else if (TotalMinutes <= 2880)
            xAxis_interval = 180;
        else if (TotalMinutes <= 3840)
            xAxis_interval = 240;
        else
            xAxis_interval = 300;

        let animation = false;
        if (!IsMobile())
            animation = true;

        // Generate mock data
        echarts.util.each(categories, function (category, index) {
            let baseTime;
            for (let i = 0; i < dataCount[category]; i++) {
                let typeItem = types[category];
                let duration = missions_time[category];
                data.push({
                    name: typeItem.name,
                    value: [
                        index,
                        baseTime = missions_CollectTimetable[category][i] - duration,
                        baseTime += duration - 1,
                        duration - 1
                    ],
                    itemStyle: {
                        normal: {
                            color: typeItem.color
                        }
                    }
                });
                data.push({
                    name: 'none',
                    value: [
                        index,
                        baseTime = missions_CollectTimetable[category][i] - 1,
                        baseTime += 1,
                        1
                    ],
                    itemStyle: {
                        normal: {
                            color: '#000000'
                        }
                    }
                });
            }
        });

        let option = {
            title: {
                show: false
            },
            grid: {
                left: 35,
                right: 20,
                top: 5,
                bottom: 20,
                height: 'auto'
            },
            xAxis: {
                min: 0,
                scale: true,
                axisLabel: {
                    formatter: function (val) {
                        return TimeFormat_Day(val + startTime);
                    },
                },
                max: TotalMinutes,
                interval: xAxis_interval,
            },
            yAxis: {
                data: missions_name
            },
            series: [{
                type: 'custom',
                renderItem: renderItem,
                itemStyle: {
                    normal: {
                        opacity: 0.8
                    }
                },
                encode: {
                    x: [1, 2],
                    y: 0
                },
                data: data
            }],
            animation: animation,
            backgroundColor: "#FFFFFF"
        };

        Chart.setOption(option);

        //保存这次的参数
        lastParam.startTIme = startTime;
        lastParam.totalTime = TotalMinutes;
        let missions_length = missionsDetails.length;
        let missionsName = [];
        let collectTimetable = [];
        for (let i = 0; i < missions_length; i++) {
            missionsName.push(missionsDetails[i][0]);
            collectTimetable.push("" + missionsDetails[i][10]);
        }
        lastParam.missionsName = missionsName;
        lastParam.collectTimetable = collectTimetable;
    } //End printChart()

    /**
     * 打印完整的方案详情
     * @param {string} HTML_TAB - 目前显示的Tab
     * @param {number} TotalMinutes - 后勤总分钟数
     * @param {number} TotalGreatSuccessRate - 总大成功概率, 单位%, 范围0~100
     * @param {number} ExecutionTimes - 后勤执行次数
     * @param {Array.<Array.<number>>} MissionsDetails - 需要打印的关卡们的详情, 0关卡名称-1~8资源契约-9关卡时间-10关卡完成时间表
     * @param {number} startTime - 后勤开始时间, 换算成从零点开始的总分钟数
     */
    static printAll(HTML_TAB, TotalMinutes, TotalGreatSuccessRate, ExecutionTimes, MissionsDetails, startTime) {
        this.printShownTab(HTML_TAB);
        this.printTotalTime(TotalMinutes);
        this.printGreatSuccessRate(TotalGreatSuccessRate);
        this.printExecutionTimes(ExecutionTimes);
        this.printMissions(MissionsDetails);
        this.printMissionsHourly(MissionsDetails, HTML_TAB);
        this.printMissionsTotal(MissionsDetails, TotalMinutes, ExecutionTimes, HTML_TAB);
        this.printChart(MissionsDetails, TotalMinutes, startTime);
    }
}

/**
 * 用于保存上次打印chart的参数, 若这次参数一致则意味着chart没有改变, 可跳过打印
 * @type {{missionsName: Array.<string>, collectTimetable: Array.<string>, totalTime: number, startTIme: number}}
 * @private
 */
PlanDetails._chartLastParam = {
    missionsName: [],
    collectTimetable: [],
    totalTime: -1,
    startTIme: -1
};

/**
 * 由于echarts还未加载, 等待加载中的图标的执行函数ID
 * @type {Array.<number>}
 * @private
 */
PlanDetails._loadingChart = [];

/**绘图Fun */
function renderItem(params, api) {
    let categoryIndex = api.value(0);
    let start = api.coord([api.value(1), categoryIndex]);
    let end = api.coord([api.value(2), categoryIndex]);
    let height = api.size([0, 1])[1] * 0.5;
    let rectShape = echarts.graphic.clipRectByRect({
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
    }, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
    });
    return rectShape && {
        type: 'rect',
        shape: rectShape,
        style: api.style()
    };
}

/**打印方案详情 */
function printPlanDetails() {
    let ShownTab = getShownTab();
    const TotalMinutes = ShownTab.getTotalTime(false);
    const TotalGreatSuccessRate = Input_getTotalGreatSuccessRate();
    const ExecutionTimes = Input_getExecutionTimes();
    const StartTime = Input_getStartTime();
    PlanDetails.printAll(ShownTab.name, TotalMinutes, TotalGreatSuccessRate, ExecutionTimes, MissionsDetails.getSelectedMissionsDetails(), StartTime);
}