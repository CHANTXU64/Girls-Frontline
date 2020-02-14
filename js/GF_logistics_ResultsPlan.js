class ResultsPlan {
    /**
     * 清除ResultsPlan
     * @public
     */
    static clear() {
        this._lastResultsPlan = [];
        this._lastSortBy = "Ranking";
        //test
        console.log("Results Plan Clear");
        //End test
    }

    /**
     * 不安全地返回上次的resultsPlan
     * 
     * 0Ranking序号-1关卡1-2关卡2-3关卡3-4关卡4-5~12 8种资源契约-自定义内容...
     * @returns {Array.<Array>}
     * @public
     */
    static getLastResultsPlan() {
        return this._lastResultsPlan;
    }

    /**
     * 返回上次的排序方式
     * @public
     */
    static getLastSortBy() {
        return this._lastSortBy;
    }

    /**
     * 打印方案结果列表, 包括微调工具.
     * @param {Array.<Array>} result_plan - 需要打印的方案, 默认按上次的方案打印
     * @param {string} sortBy - 根据哪种方式进行排序, 默认按上次排序方式排序
     * @public
     */
    static print(result_plan = this._lastResultsPlan, sortBy = this._lastSortBy) {
        //隐藏"开始排序"提示
        document.getElementById("start_ranking_html").style.display = "none";

        //若没有方案, 则打印"没有方案"
        if (result_plan.length === 0) {
            document.getElementById("Plan_Table").innerHTML = language.JS.NoPlan;
            this.clear();
        }
        else {
            //保存Plan Table横向位置, 用于点击排序后或微调后恢复位置
            let table_scrollLeft = 0;
            const table_elem = document.getElementById("result_plan_table");
            if (table_elem !== null)
                table_scrollLeft = table_elem.scrollLeft;

            //根据sortBy对result_plan排序
            const sorted_result_plan = this.sortResultPlan(result_plan, sortBy);

            //开始打印
            const Table = document.getElementById("Plan_Table");
            Table.innerHTML = this._getPrintHtml(sorted_result_plan);

            //点击排序后或微调后恢复位置
            if (table_scrollLeft != 0)
                table_elem.scrollLeft = table_scrollLeft;

            //保存此次打印用的方案与排序方式
            this._lastResultsPlan = sorted_result_plan;
            this._lastSortBy = sortBy;
        }
    }//End print

    /**
    * 对方案排序
    * @param {Array.<Array>} result_plan - 需要排序的方案
    * @param {string} sortBy - 排序方式
    * @returns {Array.<Array>} 排序后的方案
    * @public
    */
    static sortResultPlan(result_plan, sortBy) {
        let sorted_result_plan = result_plan.slice();
        switch (sortBy) {
            case "Ranking":
                quick_sort_expand_ascending(sorted_result_plan, 0); break;
            case "Manp":
                quick_sort_expand_descending(sorted_result_plan, 5); break;
            case "Ammu":
                quick_sort_expand_descending(sorted_result_plan, 6); break;
            case "Rati":
                quick_sort_expand_descending(sorted_result_plan, 7); break;
            case "Part":
                quick_sort_expand_descending(sorted_result_plan, 8); break;
            case "TPro":
                quick_sort_expand_descending(sorted_result_plan, 9); break;
            case "Equi":
                quick_sort_expand_descending(sorted_result_plan, 10); break;
            case "QPro":
                quick_sort_expand_descending(sorted_result_plan, 11); break;
            case "QRes":
                quick_sort_expand_descending(sorted_result_plan, 12); break;
        }
        return sorted_result_plan;
    }

    /**
     * @param {Array.<Array>} sorted_result_plan - 需要打印的方案
     * @returns {string} 打印的html
     * @private
     */
    static _getPrintHtml(sorted_result_plan) {
        let tab = "";
        tab += '<div class="table-responsive" id="result_plan_table">';
        tab += '<table class="table table-striped table-hover table-responsive text-nowrap" style="margin-bottom: 0; text-align: center; border: 0;">';
        let ShownTab = getShownTab();
        tab += (ShownTab.printPlanTableTitle() + '<tbody>');

        //所有资源契约值单位都为/min, 需要Minutes计算显示值
        let Minutes = 60;
        if (!is_CalculateByHour())
            Minutes = ShownTab.getTotalTime(false);

        for (let i = 0; i < sorted_result_plan.length; i++) {
            tab += "<tr tabindex='0' id='print_result_plan_tr_" + i + "'>";
            for (let ii = 0; ii < 4; ii++) { //关卡
                tab += "<td style='width: 5%;'>";
                tab += "" + sorted_result_plan[i][ii + 1];
                tab += "</td>";
            }
            for (let ii = 4; ii < 8; ii++) { //资源, 保留两位小数
                tab += "<td style='width:" + ShownTab.PlanTableResourceAndContractWidth + "'>";
                tab += "" + Math.round(sorted_result_plan[i][ii + 1] * Minutes * 10) / 10;
                tab += "</td>";
            }
            for (let ii = 8; ii < 12; ii++) { //契约, 保留两位小数
                tab += "<td style='width:" + ShownTab.PlanTableResourceAndContractWidth + ";'>";
                tab += "" + Math.round(sorted_result_plan[i][ii + 1] * Minutes * 100) / 100;
                tab += "</td>";
            }

            //Tab自定义内容
            const one_plan_length = sorted_result_plan[0].length;
            for (let ii = 13; ii < one_plan_length; ii++) {
                tab += "<td style='width:" + ShownTab.PlanTableResourceAndContractWidth + ";'>";
                tab += sorted_result_plan[i][ii];
                tab += "</td>";
            }

            tab += "</tr>";
        }
        tab += '</tbody>';
        return tab;
    }//End getPrintHtml
}

/**
 * 上次打印时所用的结果方案
 * 
 * 0Ranking序号-1关卡1-2关卡2-3关卡3-4关卡4-5~12 8种资源契约-自定义内容...
 * @type {Array.<Array.<number|string>>}
 * @private
 */
ResultsPlan._lastResultsPlan = [];

/**
 * 上次的排序方式
 * @type {string}
 * @private
 */
ResultsPlan._lastSortBy;

/**
 * 是否有排序结果?
 * @returns {boolean}
 */
function hasResultPlan() {
    const Plan_Table_innerHTML = document.getElementById("Plan_Table").innerHTML;
    return Plan_Table_innerHTML !== "" && Plan_Table_innerHTML !== language.JS.NoPlan;
}