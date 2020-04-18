class Tab {
    /**
     * @param {Array=} BaseData - Tab计算需要的数据，通过这些数据就能不获取其他数据（从HTML中获取）完成所有函数。例如，在当前版本（2020-04-17），saved需要显示该方案的资源值，就可以在不点击方案的情况下直接传入BaseData来计算。
     * BaseData: [Chapter,GSRate,is_UP,TabCustom]
     */
    constructor(BaseData) {
        this._title = '<thead class="disable-selected-text"><tr style="cursor:pointer;"><th style="width:20%;" colspan="4" tabindex="0" id="resultPlan_Mission">' + language.JS.Mission + '</th>';
        this._titleEnd = '</tr></thead>';
        this._totalTime = 0;

        /**
         * Tab的名称
         * @public
         */
        this.name = "";

        /**
         * Tab的显示名称
         * @public
         */
        this.displayName = "";

        /**
         * 用于getTotalTime()调用, 当计算过TotalTime后将不再计算一遍
         * @private
         */
        this._setTimeFlag = false;

        /**
         * 用于getQValid()调用, 当计算过QValid后将不再重新计算
         * @private
         */
        this._setQValidFlag = false;

        /**
         * 用于getCurrentMax()调用, 当计算过CurrentMax后将不再重新计算
         * @private
         */
        this._setCurrentMaxFlag = false;

        /**
         * @private
         */
        this._baseData = undefined;
        if (BaseData)
            this._baseData = BaseData.slice();

        /**
         * 方案(4个关卡)的8项资源契约最大值, 用于归一化
         * @type {Array.<number>}
         * @private
         */
        this._currentValueMax = [];

        /**
         * 根据不同的计算方式计算出各个关卡的资源契约值, 同时根据一些条件排除不要的关卡, 加快计算速度
         *
         * 0后勤战役编号-1人力-2弹药-3口粮-4零件-5人形-6装备-7快建-8快修-9时间-10收取后勤时间表
         * @type {Array.<[string, number, number, number, number, number, number, number, number, number, Array.<number>]>}
         * @private
         */
        this._QValid = [];
    }

    /**
     * 该页面是否正在显示(展开)?
     * @returns {boolean}
     * @public
     */
    static isThisTabShow() {}

    /**
     * 设置后勤总时间以及其他时间
     * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入
     * @private
     */
    _setTime(NeedCorrection) {
        if (this._setTimeFlag === true)
            return ;
        this._setTimeFlag = true;
    }

    /**
     * 返回后勤总时间, 如果之前已经调用过, 将不会再计算一遍TotalTime, 也不会再修正
     * @param {boolean=} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为true
     * @public
     */
    getTotalTime(NeedCorrection = true) {
        if (!this._setTimeFlag)
            this._setTime(NeedCorrection);
        return this._totalTime;
    }

    _calcTotalGSRate(NeedCorrection) {
        let totalGreatSuccessRate;
        if (this._baseData) {
            let UPRate = Input_getGreatSuccessUpRate(this._baseData[1], this._baseData[2]);
            totalGreatSuccessRate = this._baseData[1] + UPRate;
        }
        else
            totalGreatSuccessRate = Input_getTotalGreatSuccessRate(NeedCorrection);
        return totalGreatSuccessRate;
    }

    /**
     * 设置QValid
     * @param {boolean=} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为true
     * @public
     */
    setQValid(NeedCorrection = true) {
        if (this._setQValidFlag === true)
            return ;
        this._setQValidFlag = true;
    }
    /**
     * 获取需要排除的后勤
     * @return {Array.<number>}
     * @private
     */
    _getUnableLogistic() {
        let Unable_0 = this._setUnableLogistic();
        let Unable_1 = this._setUnableLogisticCustomize(Unable_0);
        return Unable_1;
    }
    /**
     * 根据最大解锁的后勤排除后勤
     * @private
     */
    _setUnableLogistic() {
        let ChapterLimit;
        if (this._baseData)
            ChapterLimit = this._baseData[0];
        else
            ChapterLimit= Input_getSelectChapter();
        //test
        //考虑到第零战役的解锁条件, 设定可选择的最小后勤数为6
        if (ChapterLimit < 6)
            throw "haha";
        //End test
        let index = 4 * (ChapterLimit + 1);
        let UnableNumber = [];
        const Q_MaxIndex = Q.length - 1;
        while (index <= Q_MaxIndex)
            UnableNumber.push(index++);
        return UnableNumber;
    }
    /**
     * 排除超时后勤
     * @param {Array.<number>} UnableLogistic - 之前排除的后勤
     * @private
     */
    _setUnableLogisticCustomize(UnableLogistic) {
        for (let i = 0; i < Q.length; i++) {
            if (Q[i][9] > this._totalTime) {
                if (UnableLogistic.indexOf(i) === -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    /**
     * 返回QValid
     *
     * 0后勤战役编号-1人力-2弹药-3口粮-4零件-5人形-6装备-7快建-8快修-9时间-10收取后勤时间表
     * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入
     * @public
     */
    getQValid(NeedCorrection) {
        if (!this._setQValidFlag === true)
            this.setQValid(NeedCorrection);
        return this._QValid.slice();
    }

    /**
     * 返回QValid长度
     * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为false
     * @public
     */
    getQValidLength(NeedCorrection = false) {
        if (!this._setQValidFlag === true)
            this.setQValid(NeedCorrection);
        return this._QValid.length;
    }

    /**
     * 设置各个资源契约的最大值CurrentValue_MAX,
     * 在此之前需要先设置QValid
     * @private
     */
    _setCurrentMax() {
        //test
        if (this._setQValidFlag === false)
            throw "error";
        //End test
        if (this._setCurrentMaxFlag === true)
            return ;
        let currentValueMax = [0, 0, 0, 0, 0, 0, 0, 0];
        const Qvalid_length = this._QValid.length;
        for (let i = 0; i < 8; i++) {
            let CurrentValueMax_0 = new Array(Qvalid_length);
            for (let ii = 0; ii < Qvalid_length; ii++) {
                CurrentValueMax_0[ii] = this._QValid[ii][i + 1];
            }
            quick_sort_descending(CurrentValueMax_0);
            currentValueMax[i] = CurrentValueMax_0[0] + CurrentValueMax_0[1] + CurrentValueMax_0[2] + CurrentValueMax_0[3];
        }
        this._currentValueMax = currentValueMax;
        this._setCurrentMaxFlag = true;
    }

    /**
     * 获取方案(4个关卡)各个资源契约的最大值
     * @public
     */
    getCurrentValueMax() {
        //test
        if (this._setQValidFlag === false)
            throw "error";
        //End test
        if (!this._setCurrentMaxFlag === true)
            this._setCurrentMax();
        return this._currentValueMax;
    }

    /**
     * 删除价值低的关卡
     *
     * 由于关卡太多导致计算缓慢, 可通过关卡价值删去价值低的关卡, 来提高计算速度
     * @param {number} QValid_MaxLength - 最后剩余的总关卡数
     * @param {Array.<number>} targetValue - 目标值
     * @param {Array.<number>=} missionValue - 其他方法计算的关卡价值
     * @public
     */
    deleteUselessMissions(QValid_MaxLength, targetValue, missionValue) {
        if (this._QValid.length <= QValid_MaxLength)
            return ;

        if (missionValue === undefined)
            missionValue = this._calculateMissionValue(targetValue);
        else {
            let missionValue_1 = missionValue;
            let missionValue_2 = this._calculateMissionValue(targetValue);
            missionValue = this._pulsMissionValue(missionValue_1, missionValue_2);
        }

        //创建一个Qvalid关卡价值数组, 删除价值低的关卡
        let Qvalid_length = this._QValid.length;
        let Qvalid_missionValue = new Array(Qvalid_length);
        for (let i = 0; i < Qvalid_length; i++) {
            Qvalid_missionValue[i] = [i, missionValue[i]];
        }
        quick_sort_expand_descending(Qvalid_missionValue, 1);
        Qvalid_missionValue.splice(0, QValid_MaxLength);
        //必须倒序, 才不会在删除对应Qvalid出错
        quick_sort_expand_descending(Qvalid_missionValue, 0);

        //删除对应的Qvalid
        for (let i = 0; i < Qvalid_missionValue.length; i++) {
            //test
            testDelete.push([this._QValid[Qvalid_missionValue[i][0]][0], 0])
            //End test
            this._QValid.splice(Qvalid_missionValue[i][0], 1);
        }
    }
    /**
     * 根据目标需求计算关卡价值, 为资源契约乘对应的需求量
     * @param {Array.<number>} targetRatio - 目标资源契约的比值(8数组)
     * @private
     */
    _calculateMissionValue(targetRatio) {
        //计算各个资源契约最大值
        let currentValueMax = [0, 0, 0, 0, 0, 0, 0, 0];
        let QValid_length = this._QValid.length;
        for (let i = 0; i < 8; i++) {
            for (let ii = 0; ii < QValid_length; ii++) {
                currentValueMax[i] = Math.max(currentValueMax[i], this._QValid[ii][i + 1]);
            }
        }

        //由于需要归一化, 先除最大值以便后续计算
        let ratioDividedByCurrentMax = [];
        for (let i = 0; i < 8; i++) {
            if (currentValueMax[i] !== 0)
                ratioDividedByCurrentMax.push(targetRatio[i] / currentValueMax[i]);
            else
                ratioDividedByCurrentMax.push(0);
        }

        //计算关卡价值
        let missionValue = [];
        for (let i = 0; i < QValid_length; i++) {
            let value = 0;
            let QValid_iRow = this._QValid[i];
            for (let ii = 0; ii < 8; ii++) {
                value += QValid_iRow[ii + 1] * ratioDividedByCurrentMax[ii];
            }
            missionValue.push(value);
        }
        return missionValue;
    }
    /**
     * 综合两种方案价值
     * @param {Array.<number>} value_1 - 第一种方案价值
     * @param {Array.<number>} value_2 - 第二种方案价值
     * @returns {Array.<number>}
     * @private
     */
    _pulsMissionValue(value_1, value_2) {
        //test
        if (value_1.length !== value_2.length)
            throw "error";
        //End test
        let length = value_1.length;

        //归一化第一种方案价值
        let value_1_min = ArrayMin(value_1);
        let value_1_relative = ArrayMax(value_1) - value_1_min;
        if (value_1_relative !== 0) {
            for (let i = 0; i < length; i++) {
                value_1[i] = (value_1[i] - value_1_min) / value_1_relative;
            }
        }

        //归一化第二种方案价值
        let value_2_min = ArrayMin(value_2);
        let value_2_relative = ArrayMax(value_2) - value_2_min;
        if (value_2_relative !== 0) {
            for (let i = 0; i < length; i++) {
                value_2[i] = (value_2[i] - value_2_min) / value_2_relative;
            }
        }

        let value = new Array(length);
        for (let i = 0; i < length; i++) {
            value[i] = value_1[i] + value_2[i];
        }
        return value;
    }

    /**
     * 归一化QValid
     * @public
     */
    normalizedQValid() {
        const currentValueMAX = this.getCurrentValueMax();
        const Qvalid_length = this._QValid.length;
        for (let i = 0; i < Qvalid_length; i++) {
            for (let ii = 0; ii < 8; ii++) {
                if (currentValueMAX[ii] !== 0)
                    this._QValid[i][ii + 1] /= currentValueMAX[ii];
            }
        }
    }

    /**
     * 根据输入的关卡返回8项资源契约的总计值
     * @param {number} Mission_n1 关卡1
     * @param {number} Mission_n2 关卡2
     * @param {number} Mission_n3 关卡3
     * @param {number} Mission_n4 关卡4
     * @public
     */
    calculateCurrentValue(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
        let CurrentValue = [0, 0, 0, 0, 0, 0, 0, 0];
        const Qvalid = this._QValid;
        const n1 = Qvalid[Mission_n1];
        const n2 = Qvalid[Mission_n2];
        const n3 = Qvalid[Mission_n3];
        const n4 = Qvalid[Mission_n4];
        for (let i = 0; i < 8; i++) {
            CurrentValue[i] = n1[i + 1] + n2[i + 1] + n3[i + 1] + n4[i + 1];
        }
        return CurrentValue;
    }

    /**
     * 输出排序结果的自定义项的表头
     * @returns {string}
     * @public
     */
    printPlanTableTitle() {}

    /**
     * 输出排序结果的自定义项
     * @param {number} Mission_n1 关卡1
     * @param {number} Mission_n2 关卡2
     * @param {number} Mission_n3 关卡3
     * @param {number} Mission_n4 关卡4
     * @returns {Array.<string>}
     * @public
     */
    printTableCustomize(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
        return [];
    }

    /**
     * 已保存方案需要保存后勤总时间等其他Tab数据
     * @returns {Array} 已保存的方案中的自定义部分
     * @public
     */
    getSavedCustom() {
        return [];
    }

    /**
     * 应用已保存的方案中的自定义部分
     * @param {Array} Saved_Custom - 已保存的方案中的自定义部分
     * @public
     */
    applySavedCustom(Saved_Custom) {}

    /**
     * 从数据中返回后勤总时间
     * @param {Array} Saved_Custom - 已保存的方案中的自定义部分
     * @public
     */
    getTotalTimeFromSavedCustom(Saved_Custom) {
        return Saved_Custom[0];
    }

    /**
     * 打印方案详情自定义内容的标题
     * @public
     */
    planDetailsCustom_Title() {
        return "";
    }

    /**
     * 根据传入的方案打印方案详情自定义内容的内容, 关卡数量小于等于4
     * @param {Array.<string>} Missions - 需要打印的关卡们的名称
     * @public
     */
    planDetailsCustom_Content(Missions) {
        return "";
    }
}

/**
 * @extends Tab
 */
class Tab_Anytime extends Tab {
    constructor(BaseData) {
        super(BaseData);
        this.name = "Anytime";
        this.displayName = language.HTML.Tab_Anytime_name;
        this.PlanTableResourceAndContractWidth = "8.88%";
        /**
         * 存储方案用时, 用于计算最小间隔时间时加快寻找速度
         * @type {Array.<number>}
         */
        this.Qvalid_Time = [];
        this.MinimumIntervalTime = 0;
    }

    /**
     * 该页面是否正在显示(展开)?
     * @returns {boolean}
     * @public
     */
    static isThisTabShow() {
        return !!$("#Tab_Anytime").hasClass("active");
    }

    /**
     * 设置后勤总时间以及最小间隔时间
     * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入
     * @private
     */
    _setTime(NeedCorrection) {
        if (this._setTimeFlag === true)
            return ;
        if (this._baseData)
            this._totalTime = this._baseData[3][0];
        else
            this._totalTime = Input_getAnytimeTotalTime(NeedCorrection);
        if (NeedCorrection) {
            if (this._totalTime === 0) {
                Modal.alert(language.JS.tab_Anytime_alert1);
                throw "Warning: Total time cannot be 0!";
            }
        }
        if (this._baseData)
            this.MinimumIntervalTime = this._baseData[3][1];
        else
            this.MinimumIntervalTime = Input_getAnytimeMinimumIntervalTime(NeedCorrection);
        this._setTimeFlag = true;
    }

    /**
     * @param {boolean=} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为true
     * @public
     */
    setQValid(NeedCorrection = true) {
        if (this._setQValidFlag === true)
            return ;

        //该函数需要使用this._totalTime
        this._setTime(NeedCorrection);

        let totalGreatSuccessRate = this._calcTotalGSRate(NeedCorrection);
        let resourceIncreasingRate = 1 + totalGreatSuccessRate / 200;

        const UnableLogistic = this._getUnableLogistic();
        for (let i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) === -1) {
                //this.Qvalid 的一行
                let newrow = [];
                newrow.push(Q[i][0]);

                //该关卡在后勤总时间内可执行次数
                let times = 0;
                while ((++times + 1) * Q[i][9] <= this._totalTime);

                for (let ii = 1; ii < 5; ii++) {
                    newrow.push(Q[i][ii] * times * resourceIncreasingRate / this._totalTime);
                }
                let contractSumValue = Q[i][5] + Q[i][6] + Q[i][7] + Q[i][8];
                for (let ii = 5; ii < 9; ii++) {
                    newrow.push(calcContractValue(Q[i][ii], contractSumValue, totalGreatSuccessRate) * times / this._totalTime);
                }
                newrow.push(Q[i][9]);
                let CollectTimetable = [];
                for (let ii = 1; ii <= times; ii++) {
                    CollectTimetable.push(Q[i][9] * ii);
                }
                newrow.push(CollectTimetable);
                this._QValid.push(newrow);
                this.Qvalid_Time.push(Q[i][9]);
            }
        }
        //为优化后面计算最小间隔时间做准备, 计算最小间隔时间的函数的传入时间Time_Arr必须从小到大
        quick_sort_expand_ascending(this._QValid, 9);
        quick_sort_ascending(this.Qvalid_Time);
        this._setQValidFlag = true;
        //test
        //之前的代码有bug, 在排除无用关卡前就设置了currentMax, 导致归一化的max值过大
        //现在在排除后再计算currentMax, 准确归一化.
        //启用这行代码应该能让排序结果与以前一致
        // this._setCurrentMax();
        //End test
    } //End setValidQAndReturnLengthAndSetCurrentMax()
    /**
     * 排除超时后勤以及在总时间内的时间间隔小于最小间隔时间的关卡(等于0的除外)
     * @param {Array.<number>} UnableLogistic - 之前排除的后勤
     * @private
     */
    _setUnableLogisticCustomize(UnableLogistic) {
        for (let i = 0; i < Q.length; i++) {
            if (Q[i][9] > this._totalTime || Q[i][9] < this.MinimumIntervalTime) {
                if (UnableLogistic.indexOf(i) === -1) {
                    UnableLogistic.push(i);
                }
            }
            let IntervalTime_lastTimeToTotalTime = this._totalTime % Q[i][9];
            if (IntervalTime_lastTimeToTotalTime < this.MinimumIntervalTime && IntervalTime_lastTimeToTotalTime !== 0) {
                if (UnableLogistic.indexOf(i) === -1) {
                    UnableLogistic.push(i);
                }
            }
        }
        return UnableLogistic;
    }

    /**
     * 根据输入的关卡返回8项资源契约的总计值, 若最小间隔时间小于设置的最小间隔时间,
     * 返回[-1, -1, -1, -1, -1, -1, -1, -1]
     * @param {number} Mission_n1 关卡1
     * @param {number} Mission_n2 关卡2
     * @param {number} Mission_n3 关卡3
     * @param {number} Mission_n4 关卡4
     * @public
     */
    calculateCurrentValue(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
        const Qvalid_Time = this.Qvalid_Time;
        const MinimumIntervalTime = this.MinimumIntervalTime;
        //当设置的最小后勤时间为0时, 跳过计算最小间隔时间
        if (MinimumIntervalTime) {
            const Time = [Qvalid_Time[Mission_n1], Qvalid_Time[Mission_n2], Qvalid_Time[Mission_n3], Qvalid_Time[Mission_n4]];

            //若各个关卡在第一次部署后的间隔时间已经小于设置的最小间隔时间, 不必再精确计算最小间隔时间, 直接返回
            let IntervalTime = Math.min((Time[1] - Time[0]) === 0 ? MinimumIntervalTime : Time[1] - Time[0], (Time[2] - Time[1]) === 0 ? MinimumIntervalTime : Time[2] - Time[1], (Time[3] - Time[2]) === 0 ? MinimumIntervalTime : Time[3] - Time[2]);
            if (IntervalTime < MinimumIntervalTime)
                return [-1, -1, -1, -1, -1, -1, -1, -1];

            IntervalTime = calculateIntervalTimeMin(Time, this._totalTime);
            if (IntervalTime < MinimumIntervalTime)
                return [-1, -1, -1, -1, -1, -1, -1, -1];
        }
        return super.calculateCurrentValue(Mission_n1, Mission_n2, Mission_n3, Mission_n4);
    }

    /**
     * 删除价值低的关卡
     *
     * 由于关卡太多导致计算缓慢, 可通过关卡价值删去价值低的关卡, 来提高计算速度
     * @param {number} Qvalid_MaxLength - 最后剩余的总关卡数
     * @param {Array.<number>} targetValue - 目标值
     * @param {Array.<number>=} missionValue - 关卡价值
     * @public
     */
    deleteUselessMissions(Qvalid_MaxLength, targetValue, missionValue) {
        super.deleteUselessMissions(Qvalid_MaxLength, targetValue, missionValue);

        //还需重新设置对应的QValid_Time
        let Qvalid_length = this._QValid.length;
        let Qvalid_Time = [];
        for (let i = 0; i < Qvalid_length; i++) {
            Qvalid_Time.push(this._QValid[i][9]);
        }
        this.Qvalid_Time = Qvalid_Time;
    }

    /**
     * 输出排序结果的自定义项的表头
     * @public
     */
    printPlanTableTitle() {
        let title = "";
        if (is_CalculateByHour())
            title = this._title + '<th style="width:8.88%;" tabindex="0" id="resultPlan_Manp">' + language.JS.Manp + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Ammu">' + language.JS.Ammu + '/h</th><th style="width:8.88%;"tabindex="0" id="resultPlan_Rati">' + language.JS.Rati + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Part">' + language.JS.Part + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_TPro">' + language.JS.TPro + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Equi">' + language.JS.Equi + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_QPro">' + language.JS.QPro + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_QRes">' + language.JS.QRes + '/h</th><th style="width:8.88%;cursor:default;">' + language.JS.MinIntervalTime + '</th>' + this._titleEnd;
        else
            title = this._title + '<th style="width:8.88%;" tabindex="0" id="resultPlan_Manp">' + language.JS.Manp + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Ammu">' + language.JS.Ammu + '</th><th style="width:8.88%;"tabindex="0" id="resultPlan_Rati">' + language.JS.Rati + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Part">' + language.JS.Part + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_TPro">' + language.JS.TPro + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Equi">' + language.JS.Equi + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_QPro">' + language.JS.QPro + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_QRes">' + language.JS.QRes + '</th><th style="width:8.88%;cursor:default;">' + language.JS.MinIntervalTime + '</th>' + this._titleEnd;
        return title;
    }

    /**
     * 输出排序结果的自定义项, 最小间隔时间
     * @param {number} Mission_n1 关卡1
     * @param {number} Mission_n2 关卡2
     * @param {number} Mission_n3 关卡3
     * @param {number} Mission_n4 关卡4
     * @public
     */
    printTableCustomize(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
        let tab = [];
        const NumberTime = [this.Qvalid_Time[Mission_n1], this.Qvalid_Time[Mission_n2], this.Qvalid_Time[Mission_n3], this.Qvalid_Time[Mission_n4]];
        tab.push(calculateIntervalTimeMin(NumberTime, this._totalTime) + "m");
        return tab;
    }

    /**
     * 已保存方案需要保存后勤总时间等其他Tab数据
     * @return {Array.<number>} 后勤总时间与最小间隔时间
     * @public
     */
    getSavedCustom() {
        //this._baseData 中也使用了该格式的数据
        let Saved_Custom = [];
        let TotalTime;
        if (this._baseData)
            TotalTime = this._baseData[3][0];
        else
            TotalTime = Input_getAnytimeTotalTime();
        Saved_Custom.push(TotalTime);
        let MinimumIntervalTime;
        if (this._baseData)
            MinimumIntervalTime = this._baseData[3][1];
        else
            MinimumIntervalTime = Input_getAnytimeMinimumIntervalTime();
        Saved_Custom.push(MinimumIntervalTime);
        return Saved_Custom.slice();
    }

    /**
     * 应用已保存的方案中的自定义部分,
     * 包括后勤总时间与最小间隔时间
     * @param {Array.<number>} Saved_Custom - 已保存的方案中的自定义部分
     * @public
     */
    applySavedCustom(Saved_Custom) {
        const data = Saved_Custom.slice();
        const TotalTime = data[0];
        const MinimumIntervalTime = data[1];
        Input_setAnytimeTotalTime(TotalTime);
        Input_setAnytimeMinimumIntervalTime(MinimumIntervalTime);
        storageSetItem("TabAnytimeCustom", data);
    }

    /**
     * 打印方案详情自定义的标题 - 最小时间间隔
     * @public
     */
    planDetailsCustom_Title() {
        return language.JS.MinIntervalTime;
    }

    /**
     * 根据传入的方案打印方案详情自定义内容的内容(最小时间间隔), 关卡数量小于等于4
     * @param {Array.<string>} Missions - 需要打印的关卡们的名称
     * @public
     */
    planDetailsCustom_Content(Missions) {
        let MissionTime = [];
        const TotalMinutes = this.getTotalTime(false);
        for (let i = 0; i < Missions.length; i++) {
            for (let ii = 0; ii < Q.length; ii++) {
                if (Q[ii][0] === Missions[i]) {
                    MissionTime.push(Q[ii][9]);
                    break;
                }
            }
        }

        //若关卡数量不足4, 将剩下的空填入TotalMinutes
        //且升序排序, 以使calculateIntervalTimeMin()能够正常工作
        for (let i = Missions.length; i < 4; i++) {
            MissionTime.push(TotalMinutes);
        }
        quick_sort_ascending(MissionTime);

        const MinIntervalTime = calculateIntervalTimeMin(MissionTime, TotalMinutes);
        return TimeFormat(MinIntervalTime);
    }
}
/**
 * 依据四个关卡时间和后勤总时间计算最小时间间隔
 *
 * 会改变Time_Arr!!!
 *
 * Time_Arr必须从小到大排序!!!
 * @param {Array.<number>} Time_Arr - 四个关卡的时间
 * @param {number} Total_Time - 后勤总时间
 */
function calculateIntervalTimeMin(Time_Arr, Total_Time) {
    let minIntervalTime = Time_Arr[0];

    //首先计算所有关卡最后一次完成后到后勤总时间结束的间隔, 计算出最小时间间隔
    //由于在if (Time_Arr_length === 1)会直接返回计算的最小时间间隔, 所以必须先计算这个
    for (let i = 0; i < 4; i++) {
        const IntervalTime_lastTimeToTotalTime = Total_Time % Time_Arr[i];
        if (IntervalTime_lastTimeToTotalTime !== 0)
            minIntervalTime = minIntervalTime < IntervalTime_lastTimeToTotalTime ? minIntervalTime : IntervalTime_lastTimeToTotalTime;
    }

    //保存各个关卡时间, Time_Arr之后会用于保存各个关卡后勤的下一次结束时间
    const t0 = Time_Arr[0];
    const t1 = Time_Arr[1];
    const t2 = Time_Arr[2];
    const t3 = Time_Arr[3];

    //为简化计算, 显然当a关卡的时间为b关卡的时间的因数时, 只可考虑a关卡, 不必再计算b关卡
    //将b关卡的时间设置为后勤总时间, 或直接设置Time_Arr_length来减少计算
    let Time_Arr_length = 4;
    if (t3 % t2 === 0 || t3 % t1 === 0 || t3 % t0 === 0) {
        Time_Arr_length--;
    }
    if (t2 % t1 === 0 || t2 % t0 === 0) {
        if (Time_Arr_length === 3)
            Time_Arr_length--;
        else
            Time_Arr[2] = Total_Time;
    }
    if (t1 % t0 === 0) {
        if (Time_Arr_length === 2)
            Time_Arr_length--;
        else
            Time_Arr[1] = Total_Time;
    }

    if (Time_Arr_length === 1)
        return minIntervalTime;

    //上次Time_Arr的最小值
    let Time_Arr_min_0 = t0;

    while (Time_Arr_min_0 < Total_Time) {
        //找出Time_Arr(各个关卡后勤的下一次结束时间)的最小值并将此项加上对应的关卡时间
        let Time_Arr_min = Total_Time;
        let ii = 0;
        let i = -1;
        while (++i < Time_Arr_length) {
            if (Time_Arr[i] <= Time_Arr_min) {
                Time_Arr_min = Time_Arr[i];
                ii = i;
            }
        }
        switch (ii) {
            case 0:
                Time_Arr[0] += t0; break;
            case 1:
                Time_Arr[1] += t1; break;
            case 2:
                Time_Arr[2] += t2; break;
            case 3:
                Time_Arr[3] += t3; break;
        }

        const IntervalTime = Time_Arr_min - Time_Arr_min_0;
        if (IntervalTime === 0)
            continue;
        Time_Arr_min_0 = Time_Arr_min;
        minIntervalTime = minIntervalTime < IntervalTime ? minIntervalTime : IntervalTime;
    }
    return minIntervalTime;
} //End calculateIntervalTimeMin()

/**
 * @extends Tab
 */
class Tab_Timetable extends Tab {
    constructor(BaseData) {
        super(BaseData);
        this.name = "Timetable";
        this.displayName = language.HTML.Tab_Timetable_name;
        this._QValid = [];
        /**
         * 时间表
         * @type {Array.<number>}
         * @private
         */
        this.TimeList = [];
        this.PlanTableResourceAndContractWidth = "10%";
    }

    /**
     * 该页面是否正在显示(展开)?
     * @returns {boolean}
     * @public
     */
    static isThisTabShow() {
        return !!$("#Tab_Timetable").hasClass("active");
    }

    /**
     * 设置后勤总时间以及时间表时间
     * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入
     * @private
     */
    _setTime(NeedCorrection) {
        if (this._setTimeFlag === true)
            return ;
        if (this._baseData)
            this.TimeList = this._baseData[3][1].slice();
        else
            this.TimeList = Tab_Timetable_TIMELIST.slice().sort(sortNumber);
        this.TimeList.unshift(0);
        if (this._baseData)
            this._totalTime = this._baseData[3][0];
        else
            this._totalTime = Input_getTimetableTotalTime(NeedCorrection);
        if (NeedCorrection) {
            if (this._totalTime === 0) {
                Modal.alert(language.JS.tab_Timetable_alert4);
                HTML_AllowRankingInput();
                throw "Warning: Total time cannot be 0!";
            }
        }
        this.TimeList.push(this._totalTime);
        this._setTimeFlag = true;
    }

    /**
     * @param {boolean=} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为true
     * @public
     */
    setQValid(NeedCorrection = true) {
        if (this._setQValidFlag === true)
            return ;

        //该函数需要使用时间有关的变量
        this._setTime(NeedCorrection);

        let totalGreatSuccessRate = this._calcTotalGSRate(NeedCorrection);
        let resourceIncreasingRate = 1 + totalGreatSuccessRate / 200;

        const UnableLogistic = this._getUnableLogistic();
        for (let i = 0; i < Q.length; i++) {
            if (UnableLogistic.indexOf(i) === -1) {
                let newrow = [];
                newrow.push(Q[i][0]);

                //该关卡在后勤总时间内可执行次数, 和关卡每个结束时间
                let times = 0;
                let CollectTimetable = [];
                let ii0 = 0;
                for (let ii = 1; ii < this.TimeList.length; ii++) {
                    if (Q[i][9] <= this.TimeList[ii] - this.TimeList[ii0]) {
                        times++;
                        CollectTimetable.push(this.TimeList[ii0] + Q[i][9]);
                        ii0 = ii;
                    }
                }

                for (let ii = 1; ii < 5; ii++) {
                    newrow.push(Q[i][ii] * times * resourceIncreasingRate / this._totalTime);
                }
                let contractSumValue = Q[i][5] + Q[i][6] + Q[i][7] + Q[i][8];
                for (let ii = 5; ii < 9; ii++) {
                    newrow.push(calcContractValue(Q[i][ii], contractSumValue, totalGreatSuccessRate) * times / this._totalTime);
                }
                newrow.push(Q[i][9]);
                newrow.push(CollectTimetable);
                this._QValid.push(newrow);
            }
        }
        this._setQValidFlag = true;
    }

    /**
     * 输出排序结果的自定义项的表头
     * @public
     */
    printPlanTableTitle() {
        let title = "";
        if (is_CalculateByHour())
            title = this._title + '<th style="width:10%;" tabindex="0" id="resultPlan_Manp">' + language.JS.Manp + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_Ammu">' + language.JS.Ammu + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_Rati">' + language.JS.Rati + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_Part">' + language.JS.Part + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_TPro">' + language.JS.TPro + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_Equi">' + language.JS.Equi + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_QPro">' + language.JS.QPro + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_QRes">' + language.JS.QRes + '/h</th>' + this._titleEnd;
        else
            title = this._title + '<th style="width:10%;" tabindex="0" id="resultPlan_Manp">' + language.JS.Manp + '</th><th style="width:10%;" tabindex="0" id="resultPlan_Ammu">' + language.JS.Ammu + '</th><th style="width:10%;" tabindex="0" id="resultPlan_Rati">' + language.JS.Rati + '</th><th style="width:10%;" tabindex="0" id="resultPlan_Part">' + language.JS.Part + '</th><th style="width:10%;" tabindex="0" id="resultPlan_TPro">' + language.JS.TPro + '</th><th style="width:10%;" tabindex="0" id="resultPlan_Equi">' + language.JS.Equi + '</th><th style="width:10%;" tabindex="0" id="resultPlan_QPro">' + language.JS.QPro + '</th><th style="width:10%;" tabindex="0" id="resultPlan_QRes">' + language.JS.QRes + '</th>' + this._titleEnd;
        return title;
    }

    /**
     * 已保存方案需要保存后勤总时间等其他Tab数据
     * @return {[number, Array.<number>]} 后勤总时间和时间表
     * @public
     */
    getSavedCustom() {
        //this._baseData 中也使用了该格式的数据
        let Saved_Custom = [];
        let TotalTime;
        if (this._baseData)
            TotalTime = this._baseData[3][0];
        else
            TotalTime = Input_getTimetableTotalTime();
        Saved_Custom.push(TotalTime);
        let Timetable;
        if (this._baseData)
            Timetable = this._baseData[3][1].slice();
        else
            Timetable = Tab_Timetable_TIMELIST.slice();
        Saved_Custom.push(Timetable);
        return Saved_Custom.slice();
    }

    /**
     * 应用已保存的方案中的自定义部分,
     * 包括后勤总时间与时间表时间
     * @param {[number, Array.<number>]} Saved_Custom - 已保存的方案中的自定义部分
     * @public
     */
    applySavedCustom(Saved_Custom) {
        const data = Saved_Custom.slice();
        const TotalTime = data[0];
        Input_setTimetableTotalTime(TotalTime);
        const Timetable = data[1].slice();
        Input_setTimetableTimetable(Timetable);
        storageSetItem("TabTimetableCustom", data);
    }
}

/**
 * 获取当前的Tab
 *
 * 不会返回Tab类型, 为保证注释能够符合不同子类, 将父类放入首位
 * @return {Tab|Tab_Anytime|Tab_Timetable}
 */
function getShownTab() {
    let ShownTab;
    if (Tab_Anytime.isThisTabShow())
        ShownTab = new Tab_Anytime;
    else if (Tab_Timetable.isThisTabShow())
        ShownTab = new Tab_Timetable;
    return ShownTab;
}

/**
 * 由Tab的名称返回Tab类型
 *
 * 不会返回{Tab}类型, 为保证注释能够符合不同子类, 将父类放入首位
 * @param {string} tab_name - Tab名称
 * @param {Array=} BaseData
 * @return {Tab|Tab_Anytime|Tab_Timetable}
 */
function getTabByName(tab_name, BaseData) {
    let tab;
    switch (tab_name) {
        case "Anytime":
            tab = new Tab_Anytime(BaseData);
            break;
        case "Timetable":
            tab = new Tab_Timetable(BaseData);
            break;
    }
    return tab;
}
