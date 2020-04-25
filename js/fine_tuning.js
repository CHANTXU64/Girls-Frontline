//微调工具在排序之后才能够使用
//使用start_ranking()最后计算的已经标准化归一化的目标值计算
//且Qvalid的length也已经被限制, 确保能够更快地计算出结果

window.FineTuning_JS = true;

class FineTuning {
    /**
     * 清除FineTuning
     * @public
     */
    static clear() {
        this._TargetValue_Original = [0, 0, 0, 0, 0, 0, 0, 0];
        this._TargetValue = [0, 0, 0, 0, 0, 0, 0, 0];
        this._ShownTab = -1;
    }

    /**
     * 设置FineTuning
     * @param {Array.<number>} TargetValue
     * @param {Tab|Tab_Anytime|Tab_Timetable} ShownTab
     * @public
     */
    static setFineTuning(TargetValue, ShownTab) {
        this._TargetValue_Original = TargetValue.slice();
        this._TargetValue = TargetValue.slice();
        this._ShownTab = ShownTab;
    }

    /**
     * 获取目标值
     * @public
     */
    static getTargetValue() {
        return this._TargetValue.slice();
    }

    /**
     * 获取ShownTab对象
     * @public
     */
    static getShownTab() {
        return this._ShownTab;
    }

    /**
     * 对某一TargetValue进行修改
     * @param {number} Operator - 操作(减或加), 减为-1, 否则为1
     * @param {string} ID - 修改的某一Target的名称
     * @public
     */
    static changeTargetValue(Operator, ID) {
        const TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
        const IDIndex = TargetName.indexOf(ID);
        if (Operator === -1)
            this._TargetValue[IDIndex] -= this._TargetValue_Original[IDIndex] / 50;
        else
            this._TargetValue[IDIndex] += this._TargetValue_Original[IDIndex] / 50;
    }

    static print() {
        //若没有方案结果, 则跳过
        if (!hasResultPlan())
            return ;

        let Tool = document.getElementById("FineTuning");
        const TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];

        //如果已存在FineTuning, 不再重新打印, 只进行更新
        if (Tool.innerHTML !== "") {
            for (let i = 0; i < 8; i++) {
                let Target_0 = this._TargetValue_Original[i];
                let Target = this._TargetValue[i];
                if (Target_0 === 0 || Target - Target_0 / 50 <= 0 || Target - Target_0 / 50 < Target_0 * 0.8) {
                    let minus_elem = $("#FineTuning_minus_" + TargetName[i]);
                    if (minus_elem.attr("disabled") !== "disabled")
                        minus_elem.attr("disabled", "disabled");
                }
                else {
                    let minus_elem = $("#FineTuning_minus_" + TargetName[i]);
                    if (minus_elem.attr("disabled") === "disabled")
                        minus_elem.removeAttr("disabled");
                }
                if (Target_0 === 0 || Target + Target_0 / 50 >= 1 || Target + Target_0 / 50 > Target_0 * 1.2) {
                    let plus_elem = $("#FineTuning_plus_" + TargetName[i]);
                    if (plus_elem.attr("disabled") !== "disabled")
                        plus_elem.attr("disabled", "disabled");
                }
                else {
                    let plus_elem = $("#FineTuning_plus_" + TargetName[i]);
                    if (plus_elem.attr("disabled") === "disabled")
                        plus_elem.removeAttr("disabled");
                }
            }
            return ;
        }

        const lang = language.JS;
        const TargetHTMLText = [lang.FineTuningManp, lang.FineTuningAmmu, lang.FineTuningRati, lang.FineTuningPart, lang.FineTuningTPro, lang.FineTuningEqui, lang.FineTuningQPro, lang.FineTuningQRes];
        let HTML = '<div class="card" style="margin-bottom:5px">';
        HTML += '<div class="card-header">';
        HTML += '<a data-toggle="collapse" id="FineTuningTool_panelTitle" href="#FineTuningTool" class="collapsed">' + lang.FineTuningTool + '</a></div>';
        HTML += '<div id="FineTuningTool" class="collapse"';
        if (IsMobile())
            HTML += 'style="transition: none;"';
        HTML += '>';
        HTML += '<div class="card-body row" style="padding: 10px 5px; margin: 0; text-aligh: center;">';
        for (let i = 0; i < 8; i++) {
            if (i === 0)
                HTML += '<div class="col-lg-6 col-md-6 col-sm-6" style="padding-left: 5px; padding-right: 5px;">';
            if (i === 4)
                HTML += '</div> <div class="col-lg-6 col-md-6 col-sm-6" style="padding-left: 5px; padding-right: 5px;">';
            HTML += '<div class="input-group" style="margin-bottom: 10px; width: 100%;">';
            HTML += '<span class="input-group-text input-group-span FineTuning-span" style="font-size: 14px;" id="FineTuningTool_' + TargetName[i] + '">' + TargetHTMLText[i] + '</span>';
            HTML += '<button class="btn btn-outline-dark input-group-btn btn-bolder FineTuning-button" style="display:block;" type="button" id="FineTuning_minus_' + TargetName[i] + '"';
            let Target_0 = this._TargetValue_Original[i];
            let Target = this._TargetValue[i];
            if (Target_0 === 0 || Target - Target_0 / 50 <= 0 || Target - Target_0 / 50 < Target_0 * 0.9)
                HTML += 'disabled="disabled"';
            HTML += 'title="' + language.HTMLJS.FineTuning_minus + '">-</button>';
            HTML += '<button class="btn btn-outline-dark input-group-btn btn-bolder FineTuning-button" style="display: block;" type="button" id="FineTuning_plus_' + TargetName[i] + '"';
            if (Target_0 === 0 || Target + Target_0 / 50 >= 1 || Target + Target_0 / 50 > Target_0 * 1.14)
                HTML += 'disabled="disabled"';
            HTML += 'title="' + language.HTMLJS.FineTuning_plus + '">+</button>';
            HTML += '</div>';
        }
        HTML += '</div></div></div></div>';
        Tool.innerHTML = HTML;
    }
}

/**
 * 上次主排序留下的原始目标值
 * @type {Array.<number>}
 * @private
 */
FineTuning._TargetValue_Original = [];

/**
 * 微调后的目标值
 * @type {Array.<number>}
 * @private
 */
FineTuning._TargetValue = [];

/**
 * 上次主排序留下的原始ShownTab
 * @type {Tab|Tab_Anytime|Tab_Timetable}
 * @private
 */
FineTuning._ShownTab = -1;
