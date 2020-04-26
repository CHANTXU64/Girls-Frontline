/**
 * QValid的最大长度, 用于第一次标准化计算限制QValid,
 * 使第一次计算的计算时间减少. 由于只是使用未标准化的目标值来
 * 排除无用关卡, 不太准确, 不建议太小的值.
 */
const PC_QValidMaxLength_firstCalc = 48;

/**
 * Qvalid的最大长度, 用于第一次标准化归一化计算后限制Qvalid,
 * 使第二次计算和微调时计算时间更少. 由于微调功能会改变目标值,
 * 可能导致目标值改变太大, 因此不建议过小的值排除太多关卡
 * 要小于QValidMaxLength_firstCalc, 否则可能导致bug
 */
const PC_QValidMaxLength_secondCalc = 38;

function PC_start_ranking() {
    let demandValue = Input_getPC_demand(true);
    if ("" + demandValue === "0,0,0,0,0,0,0,0") {
        Modal.alert(language.JS.TargetValue0_alert);
        throw "Warning: TargetValue cannot all be 0!";
    }
    let a = new PC_ranking(PC_LogisticsPlan.rankingGetPlans(), demandValue);
    a.ranking();
}

class PC_ranking {
    constructor(LogisticsPlanData, demandValue) {
        this.original_demandValue = demandValue;
        this.allPlan = [];
        let plans_number = LogisticsPlanData.length;
        this.plans_number = plans_number;
        //计算所有方案的资源契约最大值, 用于归一化计算方案贡献占比
        let reAndcoValue_MaxMax = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < plans_number; ++i) {
            this.allPlan.push(new _PC_ranking_planData(LogisticsPlanData[i], demandValue));
            let reAndcoValue_Max = this.allPlan[i].reAndcoValue_Max;
            for (let ii = 0; ii < 8; ++ii) {
                reAndcoValue_MaxMax[ii] = Math.max(reAndcoValue_MaxMax[ii], reAndcoValue_Max[ii]);
            }
        }
        this.reAndcoValue_MaxMax = reAndcoValue_MaxMax;
        for (let i = 0; i < plans_number; ++i) {
            this.allPlan[i].resetReAndCoValueMax(this.reAndcoValue_MaxMax.slice());
        }
    }

    ranking() {
        //第一次
        let planValue_total = 0;
        for (let i = 0; i < this.plans_number; ++i) {
            let thisPlan = this.allPlan[i];
            let demandValue = this.original_demandValue;
            thisPlan.ranking(demandValue);
            planValue_total += thisPlan.planValue;
        }
        this.sortPlanByPlanValue();

        //第二次
        let demandValue = this.original_demandValue.slice();
        let reAndcoValue_Norm_sum = [0, 0, 0, 0, 0, 0, 0, 0];
        let reAndcoValue_sum = [0, 0, 0, 0, 0, 0, 0, 0];
        let planValue_sum = 0;
        for (let i = 0; i < this.plans_number; ++i) {
            let thisPlan = this.allPlan[i];
            planValue_sum += thisPlan.planValue;
            thisPlan.ranking(demandValue);
            //为下个plan ranking的demandvalue准备
            for (let ii = 0; ii < 8; ++ii) {
                reAndcoValue_Norm_sum[ii] += thisPlan.reAndcoValue_Norm[ii];
                reAndcoValue_sum[ii] += thisPlan.reAndcoValue[ii] * thisPlan.days;
            }
            let proportion = planValue_sum / planValue_total;
            let maxIndex = ArrayMaxIndex(reAndcoValue_Norm_sum);
            let a = reAndcoValue_sum[maxIndex] / proportion;
            for (let ii = 0; ii < 8; ++ii) {
                demandValue[ii] = this.original_demandValue[ii] * a;
                demandValue[ii] -= reAndcoValue_sum[ii];
                if (demandValue[ii] < 0)
                    demandValue[ii] = 0;
            }
        }

        //第三次
        let demandValue_0 = this.original_demandValue.slice();
        let maxIndex = ArrayMaxIndex(reAndcoValue_Norm_sum);
        let a = reAndcoValue_sum[maxIndex] / demandValue_0[maxIndex];
        for (let i = 0; i < 8; ++i) {
            if (demandValue_0[i] !== 0)
                demandValue_0[i] = ((demandValue_0[i] * a - reAndcoValue_sum[i]) / reAndcoValue_sum[i] * 0.9 + 1) * demandValue_0[i];
        }
        demandValue = this.original_demandValue.slice();
        reAndcoValue_Norm_sum = [0, 0, 0, 0, 0, 0, 0, 0];
        reAndcoValue_sum = [0, 0, 0, 0, 0, 0, 0, 0];
        planValue_total = planValue_sum;//??????
        planValue_sum = 0;
        for (let i = 0; i < this.plans_number; ++i) {
            let thisPlan = this.allPlan[i];
            planValue_sum += thisPlan.planValue;
            if (i === 0)
                thisPlan.ranking(demandValue_0);
            else
                thisPlan.ranking(demandValue);
            //为下个plan ranking的demandvalue准备
            for (let ii = 0; ii < 8; ++ii) {
                reAndcoValue_Norm_sum[ii] += thisPlan.reAndcoValue_Norm[ii];
                reAndcoValue_sum[ii] += thisPlan.reAndcoValue[ii] * thisPlan.days;
            }
            let proportion = planValue_sum / planValue_total;
            let maxIndex = ArrayMaxIndex(reAndcoValue_Norm_sum);
            let a = reAndcoValue_sum[maxIndex] / proportion;
            for (let ii = 0; ii < 8; ++ii) {
                demandValue[ii] = this.original_demandValue[ii] * a;
                demandValue[ii] -= reAndcoValue_sum[ii];
                if (demandValue[ii] < 0)
                    demandValue[ii] = 0;
            }
        }

        for (let i = 0; i < this.plans_number; ++i) {
            this.allPlan[i].applyToLogisticsPlanData();
        }
        PC_LogisticsPlan._plansHasChanged();
    }

    sortPlanByPlanValue() {
        this.allPlan.sort(sortByPlanValue);
    }
}

function sortByPlanValue(a, b) {
    return b.planValue - a.planValue;
}

class _PC_ranking_planData {
    constructor(LogisticsPlanData, original_demandValue) {
        this.LogisticsPlanData = LogisticsPlanData;
        let tab = Saved.creatTabBySaved(LogisticsPlanData.saved);
        this.totalTime = tab.getTotalTime();
        tab.setQValid();
        this.reAndcoValue_Max = tab.getCurrentValueMax();
        this.original_demandValue = original_demandValue;
        this.days = this.calcDays();
    }

    calcDays() {
        let timePeriod = this.LogisticsPlanData.timePeriod;
        let days = 0;
        for (let i = 0; i < timePeriod.length; ++i) {
            days = days + timePeriod[i][1] - timePeriod[i][0];
        }
        return days;
    }

    resetReAndCoValueMax(reAndcoValue_Max) {
        this.reAndcoValue_Max = reAndcoValue_Max;
    }

    ranking(demandValue) {
        let tab = Saved.creatTabBySaved(this.LogisticsPlanData.saved);
        //plan计算需要已经设置好的Qvalid的ShownTab
        tab.setQValid();

        let plan_Stdzn = new Plan_Stdzn(tab, 8, PC_QValidMaxLength_firstCalc, PC_QValidMaxLength_secondCalc, demandValue);
        plan_Stdzn.ranking();
        let targetValue_Stdzn = plan_Stdzn.getStdznTargetValue("PlanCombination");
        let targetValue_StdznAndNorm = new Array(8);
        let currentValueMax = tab.getCurrentValueMax();
        for (let i = 0; i < 8; i++) {
            targetValue_StdznAndNorm[i] = Math.min(1, targetValue_Stdzn[i] / currentValueMax[i]);
            targetValue_StdznAndNorm[i] = Math.max(targetValue_StdznAndNorm[i], 0);
        }
        tab.normalizedQValid();
        let plan = new Plan(tab, 3, targetValue_StdznAndNorm);
        plan.ranking();
        let result = plan.getResult();

        let reAndco = [];
        if (result.length !== 0) {
            let totalTime = this.totalTime;
            for (let i = 0; i < 8; ++i) {
                reAndco.push(result[0][i + 5] * totalTime);
            }
        }
        else {
            reAndco = [0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.missions = result[0].slice(1, 5);
        this.reAndcoValue = reAndco;
        this.reAndcoValue_Norm = this.normReAndCo(this.reAndcoValue);
        this.planValue = this.calcPlanValue(this.reAndcoValue_Norm);
    }

    normReAndCo(reAndcoValue) {
        let reAndcoValue_Max = this.reAndcoValue_Max;
        let reAndcoValue_Norm = [];
        let days = this.days;
        for (let i = 0; i < 8; ++i) {
            reAndcoValue_Norm.push(days * reAndcoValue[i] / reAndcoValue_Max[i]);
        }
        return reAndcoValue_Norm;
    }

    calcPlanValue(reAndcoValue_Norm) {
        let planValue = 0;
        for (let i = 0; i < 8; ++i) {
            planValue += reAndcoValue_Norm[i];
        }
        return planValue;
    }

    applyToLogisticsPlanData() {
        this.LogisticsPlanData.saved.Missions = this.missions;
        this.LogisticsPlanData.reAndco = this.reAndcoValue;
    }
}
