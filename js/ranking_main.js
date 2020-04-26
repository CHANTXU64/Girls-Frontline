/**
 * QValid的最大长度, 用于第一次标准化计算限制QValid,
 * 使第一次计算的计算时间减少. 由于只是使用未标准化的目标值来
 * 排除无用关卡, 不太准确, 不建议太小的值.
 */
const QValidMaxLength_firstCalc = 44;

/**
 * Qvalid的最大长度, 用于第一次标准化归一化计算后限制Qvalid,
 * 使第二次计算和微调时计算时间更少. 由于微调功能会改变目标值,
 * 可能导致目标值改变太大, 因此不建议过小的值排除太多关卡
 * 要小于QValidMaxLength_firstCalc, 否则可能导致bug
 */
const QValidMaxLength_secondCalc = 34;

//test
/**排除的关卡 */
let testDelete = [];
//End test

/**
 * 主排序函数
 */
function start_ranking() {
    //test
    testDelete = [];
    console.time("ranking");
    //End test
    let ShownTab = getShownTab();

    //plan计算需要已经设置好的Qvalid的ShownTab
    ShownTab.setQValid();

    //调整目标值, 标准化归一化----
    let plan_Stdzn = new Plan_Stdzn(ShownTab, 8, QValidMaxLength_firstCalc, QValidMaxLength_secondCalc);
    plan_Stdzn.ranking();

    let targetValue_Stdzn = plan_Stdzn.getStdznTargetValue();
    let targetValue_StdznAndNorm = new Array(8);
    let currentValueMax = ShownTab.getCurrentValueMax();
    for (let i = 0; i < 8; i++) {
        targetValue_StdznAndNorm[i] = Math.min(1, targetValue_Stdzn[i] / currentValueMax[i]);
        targetValue_StdznAndNorm[i] = Math.max(targetValue_StdznAndNorm[i], 0);
    }
    ShownTab.normalizedQValid();
    //------------------------
    FineTuning.setFineTuning(targetValue_StdznAndNorm, ShownTab);

    let plan = new Plan(ShownTab, 16, targetValue_StdznAndNorm);
    plan.ranking();
    plan.print();
    HTML_DisableRankingInput();
    //test
    console.timeEnd("ranking");
    console.log(testDelete);
    //End test
}

/**
 * 对目标值修改, 开始重新排序
 * @param {number} Operator - 操作(减或加), 减为-1, 否则为1
 * @param {string} ID - 修改的某一Target的名称
 * @public
 */
function fineTuning_rank(Operator, ID) {
    //test
    console.time("FineTuning");
    //End test
    FineTuning.changeTargetValue(Operator, ID);
    let ShownTab = FineTuning.getShownTab();
    let TargetValue = FineTuning.getTargetValue();
    let plan = new Plan(ShownTab, 16, TargetValue);
    plan.ranking();
    plan.print(ResultsPlan.getLastSortBy());
    //test
    console.timeEnd("FineTuning");
    //End test
}
