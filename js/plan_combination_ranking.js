/**
 * QValid的最大长度, 用于计算限制QValid,
 * 使计算时间减少. 不太准确, 不建议太小的值.
 */
const PC_QValidMaxLength = 48;

let PC_ranking_object;

function PC_start_ranking() {
    let demandValue = pc_get_demand();
    PC_ranking_object = new PC_ranking(PC_LogisticsPlan.rankingGetPlans(), demandValue);
    if (PC_ranking_object.allPlan.length === 0) {
        Modal.alert(language.JS.PC_ranking_add_alert);
        return ;
    }
    PC_ranking_object.ranking();
}

function pc_get_demand() {
    let demand = Array(8);
    let current = Input_getPC_current(true);
    let target = Input_getPC_target(true);
    for (let i = 0; i < 8; ++i) {
        demand[i] = target[i] - current[i];
    }
    return demand.slice();
}

class PC_ranking {
    constructor(LogisticsPlanData, demandValue) {
        this.original_demandValue = demandValue;
        /**@type Array.<_PC_ranking_planData> */
        this.allPlan = [];
        let plans_number = LogisticsPlanData.length;
        this.plans_number = plans_number;
        //计算所有方案的资源契约最大值, 用于归一化计算方案贡献占比
        let reAndcoValue_MaxMax = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < plans_number; ++i) {
            this.allPlan.push(new _PC_ranking_planData(LogisticsPlanData[i]));
            let reAndcoValue_Max = this.allPlan[i].reAndcoValue_Max;
            for (let ii = 0; ii < 8; ++ii) {
                reAndcoValue_MaxMax[ii] = Math.max(reAndcoValue_MaxMax[ii], reAndcoValue_Max[ii]);
            }
        }
        this.reAndcoValue_MaxMax = reAndcoValue_MaxMax;
        for (let i = 0; i < 8; ++i) {
            this.original_demandValue[i] /= reAndcoValue_MaxMax[i];
        }
        for (let i = 0; i < plans_number; ++i) {
            this.allPlan[i].setOriginalDemandValue(this.original_demandValue.slice());
            this.allPlan[i].resetReAndCoValueMax(this.reAndcoValue_MaxMax.slice());
        }
    }

    //由于要刷新progress, 需要使用setTimeout, 代码结构有调整 -- v1.2.0-rc2
    ranking(RankIndex = 0) {
        //第一次
        if (RankIndex === 0) {
            this._planValue_total = 0;
            Modal.progress();
            this._noPlan = 0;
        }
        if (RankIndex < this.allPlan.length) {
            let i = RankIndex;
            let thisPlan = this.allPlan[i];
            let demandValue = this.original_demandValue;
            thisPlan.ranking(demandValue);
            this._planValue_total += thisPlan.planValue;
        }
        if (RankIndex === this.allPlan.length - 1) {
            this.sortPlanByPlanValue();
            if (this._planValue_total === 0) {
                Modal.alert(language.JS.PC_ranking_alert2);
                Modal.progress_close();
                return ;
            }
        }

        //第二次
        if (RankIndex === this.allPlan.length) {
            this._demandValue = this.original_demandValue.slice();
            this._reAndcoValue_Norm_sum = [0, 0, 0, 0, 0, 0, 0, 0];
            this._reAndcoValue_sum = [0, 0, 0, 0, 0, 0, 0, 0];
            this._planValue_sum = 0;
        }
        //第三次
        if (RankIndex === this.allPlan.length * 2) {
            this._demandValue_0 = this.original_demandValue.slice();
            let demandValue_0 = this._demandValue_0;
            let a = 0;
            for (let i = 0; i < 8; ++i) {
                let maxIndex = ArrayMaxIndex(this._reAndcoValue_Norm_sum);
                if (demandValue_0[maxIndex] === 0) {
                    this._reAndcoValue_Norm_sum[maxIndex] = 0;
                    continue;
                }
                else {
                    a = this._reAndcoValue_sum[maxIndex] / demandValue_0[maxIndex];
                    break;
                }
            }
            if (a === 0)
                this._demandValue_0 = this.original_demandValue.slice();
            for (let i = 0; i < 8; ++i) {
                if (demandValue_0[i] !== 0 && this._reAndcoValue_sum[i] !== 0)
                    demandValue_0[i] = ((demandValue_0[i] * a - this._reAndcoValue_sum[i]) / this._reAndcoValue_sum[i] * 0.9 + 1) * demandValue_0[i];
            }
            this._demandValue = this.original_demandValue.slice();
            this._reAndcoValue_Norm_sum = [0, 0, 0, 0, 0, 0, 0, 0];
            this._reAndcoValue_sum = [0, 0, 0, 0, 0, 0, 0, 0];
            this._planValue_total = this._planValue_sum;
            this._planValue_sum = 0;
        }
        if (RankIndex >= this.allPlan.length && RankIndex < this.allPlan.length * 3) {
            let i = RankIndex % this.allPlan.length;
            let thisPlan = this.allPlan[i];
            this._planValue_sum += thisPlan.planValue;
            if (RankIndex === this.allPlan.length * 2)
                thisPlan.ranking(this._demandValue_0);
            else
                thisPlan.ranking(this._demandValue);
            //为下个plan ranking的demandvalue准备
            if (thisPlan.planValue !== 0) {
                for (let ii = 0; ii < 8; ++ii) {
                    this._reAndcoValue_Norm_sum[ii] += thisPlan.reAndcoValue_Norm[ii];
                    this._reAndcoValue_sum[ii] += thisPlan.reAndcoValue[ii] * thisPlan.days;
                }
                let proportion = this._planValue_sum / this._planValue_total;
                let maxIndex = ArrayMaxIndex(this._reAndcoValue_Norm_sum);
                let a = this._reAndcoValue_sum[maxIndex] / proportion;
                for (let ii = 0; ii < 8; ++ii) {
                    this._demandValue[ii] = this.original_demandValue[ii] * a;
                    this._demandValue[ii] -= this._reAndcoValue_sum[ii];
                    if (this._demandValue[ii] < 0)
                        this._demandValue[ii] = 0;
                }
            }
            else {
                //计数 - 没有结果
                if (RankIndex >= this.allPlan.length * 2 && RankIndex < this.allPlan.length * 3) {
                    this._noPlan++;
                }
            }
        }

        let width = 100 * (RankIndex + 1) / this.allPlan.length / 3 + '%';
        Modal.progress_setWidth(width);
        // document.getElementById("ranking_progress").style.width = width;
        if (RankIndex === this.allPlan.length * 3 - 1) {
            for (let i = 0; i < this.plans_number; ++i) {
                this.allPlan[i].applyToLogisticsPlanData();
            }
            PC_LogisticsPlan._plansHasChanged();
            let done = language.JS.PC_ranking_done;
            if (this._noPlan !== 0) {
                done += language.JS.PC_ranking_alert3_1 + this._noPlan + language.JS.PC_ranking_alert3_2;
            }
            Modal.alert(done);
            Modal.progress_close();
        }
        else {
            setTimeout(function () {PC_ranking_object.ranking(++RankIndex)}, 1);
        }
    }

    sortPlanByPlanValue() {
        this.allPlan.sort(sortByPlanValue);
    }
}

function sortByPlanValue(a, b) {
    return b.planValue - a.planValue;
}

class _PC_ranking_planData {
    constructor(LogisticsPlanData) {
        this.LogisticsPlanData = LogisticsPlanData;
        let tab = Saved.creatTabBySaved(LogisticsPlanData.saved);
        this.totalTime = tab.getTotalTime();
        tab.setQValid();
        this.reAndcoValue_Max = tab.getCurrentValueMax();
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

    setOriginalDemandValue(original_demandValue) {
        this.original_demandValue = original_demandValue.slice();
    }

    resetReAndCoValueMax(reAndcoValue_Max) {
        this.reAndcoValue_Max = reAndcoValue_Max.slice();
    }

    ranking(demandValue) {
        let tab = Saved.creatTabBySaved(this.LogisticsPlanData.saved);
        //plan计算需要已经设置好的Qvalid的ShownTab
        tab.setQValid();
        tab.deleteUselessMissions(PC_QValidMaxLength, demandValue);
        tab.setCurrentMax(this.reAndcoValue_Max);
        tab.normalizedQValid();

        let plan = new Plan(tab, 3, demandValue);
        plan.ranking();
        let result = plan.getResult();

        let reAndco = [];
        if (result.length !== 0) {
            let totalTime = this.totalTime;
            for (let i = 0; i < 8; ++i) {
                reAndco.push(result[0][i + 5] * totalTime);
            }
            this.missions = result[0].slice(1, 5);
        }
        else {
            reAndco = [0, 0, 0, 0, 0, 0, 0, 0];
            this.missions = [];
        }
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
