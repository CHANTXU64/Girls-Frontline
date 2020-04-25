class Plan_Original {
    /**
     * @param {Tab|Tab_Anytime|Tab_Timetable} ShownTab
     * @param {number} list_length
     */
    constructor(ShownTab, list_length) {
        /**
         * 方案列表
         * @type {Array.<Array.<number>>}
         */
        this.List = this._setList(list_length);
        this.List_length = list_length;
        this.List_lastIndex = list_length - 1;

        this.ShownTab = ShownTab;
    }
    /**
     * @param {number} list_length
     * @private
     */
    _setList(list_length) {
        let List = new Array(list_length);
        for (let i = 0; i < list_length; i++) {
            List[i] = new Array(13);
        }
        return List;
    }

    /**
     * 开始排序
     * @public
     */
    ranking() {
        const Q_Valid_length = this.ShownTab.getQValidLength();
        const n1_max = Q_Valid_length - 3;
        const n2_max = Q_Valid_length - 2;
        const n3_max = Q_Valid_length - 1;
        const n4_max = Q_Valid_length;
        for (let n1 = 0; n1 < n1_max; ++n1) {
            for (let n2 = n1 + 1; n2 < n2_max; ++n2) {
                for (let n3 = n2 + 1; n3 < n3_max; ++n3) {
                    for (let n4 = n3 + 1; n4 < n4_max; ++n4) {
                        this._calculateAndPushIntoList(n1, n2, n3, n4);
                    }
                }
            }
        }
    }

    /**
     * 将方案插入方案列表中, 方案价值越大越好
     * @param {number} Mission_1
     * @param {number} Mission_2
     * @param {number} Mission_3
     * @param {number} Mission_4
     * @param {number} planValue - 方案价值, 越大代表方案越好
     * @param {Array.<number>} currentValue - 方案的资源契约值(/min)
     * @private
     */
    _pushIntoList(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue) {
        if (!(0 in this.List[this.List_lastIndex]))
            this._pushIntoFirstEmpty(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
        else
            this._push(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
    }
    _pushIntoFirstEmpty(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue) {
        let row = this.List_lastIndex;
        while (row !== 0 && !(0 in this.List[row - 1]))
            row--;
        this._pushIntoThisRow(row, Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
        this._sortList(row, planValue);
    }
    _push(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue) {
        let listLastIndex = this.List_lastIndex;
        if (planValue <= this.List[listLastIndex][12])
            return ;
        this._pushIntoThisRow(listLastIndex, Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
        this._sortList(listLastIndex, planValue);
    }
    _pushIntoThisRow(row, Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue) {
        this.List[row] = [Mission_1, Mission_2, Mission_3, Mission_4, currentValue[0], currentValue[1], currentValue[2], currentValue[3], currentValue[4], currentValue[5], currentValue[6], currentValue[7], planValue];
    }
    _sortList(row, planValue) {
        for (let i = row - 1; i >= 0; i--) {
            if (planValue > this.List[i][12])
                [this.List[i + 1], this.List[i]] = [this.List[i], this.List[i + 1]];
            else
                break;
        }
    }
    //End pushIntoList()
}

/**
 * 正式排序前为标准化归一化而进行的一次大致排序
 * @class
 */
class Plan_Stdzn extends Plan_Original {
    /**
     * QValidMaxLength限制是为正式排序做准备, 减少无用关卡以加快计算速度
     * @param {Tab|Tab_Anytime|Tab_Timetable} ShownTab - 已经setQValid的ShownTab
     * @param {number} list_length
     * @param {number} QValidMaxLength_firstCalc - 用于这次限制QValid长度加快计算
     * @param {number} QValidMaxLength_secondCalc - 用于正式计算, 若QValid.length大于, 则还需进行更详细的关卡价值计算
     * @param {Array.<number>=} - 用于plan combination
     */
    constructor(ShownTab, list_length, QValidMaxLength_firstCalc, QValidMaxLength_secondCalc, targetValue) {
        super(ShownTab, list_length);

        let QValid_length = this.ShownTab.getQValidLength();
        this.QValidMaxLength_1 = Math.min(QValidMaxLength_firstCalc, QValid_length);
        this.QValidMaxLength_2 = Math.min(QValidMaxLength_secondCalc, QValid_length);

        //如果Qvalid大于第二次计算最大限制长度, 将再计算关卡价值以便排除无用的关卡
        if (QValid_length > QValidMaxLength_secondCalc) {
            this._calculateAndPushIntoList = this._calculateAndPushIntoList_andCalculateMissionsValue;

            //用来记录关卡价值
            let Qvalid_missionValue = new Array(this.QValidMaxLength_1);
            Qvalid_missionValue.fill(0);
            this.Qvalid_missionValue = Qvalid_missionValue;
        }
        else
            this._calculateAndPushIntoList = this._calculateAndPushIntoList_normal;

        if (targetValue) {
            this.targetValue_html = targetValue;
            this.targetValue = targetValue;
        }
        else {
            this.targetValue_html = this._correctTargetValueHTML();
            this.targetValue = this._correctTargetValue();
        }
        this._norm_target = this._getNorm(this.targetValue);
    }
    /**
     * 取得页面上的TargetValue, 并防止资源(或契约)之间之比过大(最大5000倍)
     * @returns {Array.<number>}
     */
    _correctTargetValueHTML() {
        let targetValue_html = Input_getTarget_Correct();
        let ResourceValue = targetValue_html.slice(0, 4);
        let ContractValue = targetValue_html.slice(4, 8);
        ResourceValue = this._correctTargetValueHTML_main(ResourceValue);
        ContractValue = this._correctTargetValueHTML_main(ContractValue);
        targetValue_html = ResourceValue.concat(ContractValue);
        Input_setTarget(targetValue_html);
        return targetValue_html;
    }
    /** @param {Array.<number>} Array4 - 资源或契约数组, 长度为4 */
    _correctTargetValueHTML_main(Array4) {
        const MaxValue = ArrayMax(Array4);
        const MinValue = Math.round(MaxValue / 5000 * 100) / 100;
        for (let i = 0; i < 4; i++) {
            if (Array4[i] !== 0)
                Array4[i] = Math.max(MinValue, Array4[i]);
        }
        return Array4;
    }
    _correctTargetValue() {
        let ResourceValue = this._correctResourceValue();
        let ContractValue = this._correctContractValue();
        let TargetValue = ResourceValue.concat(ContractValue);
        if ("" + TargetValue === "0,0,0,0,0,0,0,0") {
            Modal.alert(language.JS.TargetValue0_alert);
            throw "Warning: TargetValue cannot all be 0!";
        }
        return TargetValue;
    }
    _correctResourceValue() {
        let ResourceValue = this.targetValue_html.slice(0, 4);
        const Resource_CalibrationValue = 100 - Input_getContractWeight();
        if (this._valuesNotAll0(ResourceValue))
            this._correctValue(ResourceValue, Resource_CalibrationValue);
        return ResourceValue;
    }
    _correctContractValue() {
        let ContractValue = this.targetValue_html.slice(4, 8);
        const Contract_CalibrationValue = Input_getContractWeight();
        if (this._valuesNotAll0(ContractValue))
            this._correctValue(ContractValue, Contract_CalibrationValue);
        return ContractValue;
    }
    _valuesNotAll0(Values) {
        for (let i = 0; i < Values.length; i++) {
            if (Values[i] !== 0)
                return true;
        }
        return false;
    }
    /**
     * @param {Array.<number>} Values
     * @param {number} CalibrationValue
     */
    _correctValue(Values, CalibrationValue) {
        const CorrectionRate = CalibrationValue / ArrayMax(Values);
        for (let i = 0; i < Values.length; i++) {
            Values[i] *= CorrectionRate;
        }
    }
    //End constructor

    /**
     * 取得向量(数组)的模
     * @param {Array.<number>} vector - 8维向量
     * @returns {number} 模
     * @private
     */
    _getNorm(vector) {
        let sumOfSquares = 0;
        for (let i = 0; i < 8; i++) {
            sumOfSquares += Math.pow(vector[i], 2);
        }
        return Math.pow(sumOfSquares, 0.5);
    }

    /**
     * 开始排序
     * @public
     */
    ranking() {
        this.ShownTab.deleteUselessMissions(this.QValidMaxLength_1, this.targetValue);
        super.ranking();
        if (this.ShownTab.getQValidLength() > this.QValidMaxLength_2)
            this.ShownTab.deleteUselessMissions(this.QValidMaxLength_2, this.targetValue, this.Qvalid_missionValue);
    }

    /**
     * 由四个关卡计算出方案, 并添加进方案列表中, 并计算关卡价值
     * @param {number} Mission_1
     * @param {number} Mission_2
     * @param {number} Mission_3
     * @param {number} Mission_4
     * @private
     */
    _calculateAndPushIntoList_andCalculateMissionsValue(Mission_1, Mission_2, Mission_3, Mission_4) {
        let currentValue = this.ShownTab.calculateCurrentValue(Mission_1, Mission_2, Mission_3, Mission_4);

        //ShownTab的计算现值函数返回全为-1的数组, 说明由于某些原因该组合不可用
        if (currentValue[0] === -1)
            return ;

        let planValue = this._calculateValue(currentValue);

        //计算关卡价值, 将该方案价值加入该方案的所有关卡价值中
        let Qvalid_missionValue = this.Qvalid_missionValue;
        Qvalid_missionValue[Mission_1] += planValue;
        Qvalid_missionValue[Mission_2] += planValue;
        Qvalid_missionValue[Mission_3] += planValue;
        Qvalid_missionValue[Mission_4] += planValue;

        this._pushIntoList(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
    }

    /**
     * 由四个关卡计算出方案, 并添加进方案列表中
     * @param {number} Mission_1
     * @param {number} Mission_2
     * @param {number} Mission_3
     * @param {number} Mission_4
     * @private
     */
    _calculateAndPushIntoList_normal(Mission_1, Mission_2, Mission_3, Mission_4) {
        let currentValue = this.ShownTab.calculateCurrentValue(Mission_1, Mission_2, Mission_3, Mission_4);

        //ShownTab的计算现值函数返回全为-1的数组, 说明由于某些原因该组合不可用
        if (currentValue[0] === -1)
            return ;

        let planValue = this._calculateValue(currentValue);
        this._pushIntoList(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
    }

    /**
     * 方案价值算法 目标向量与现值向量的点积与余弦相似度的乘积
     * @param {Array.<number>} _currentValue
     * @private
     */
    _calculateValue(_currentValue) {
        let targetValue = this.targetValue;

        //因为这种计算方案价值算法考虑了目标向量与现值向量的余弦相似度
        //当某一目标值为0, 对应现值也应计为0, 否则会由于余弦相似度减小导致方案价值变小
        let currentValue = [0, 0, 0, 0, 0, 0, 0, 0];
        if (targetValue[0] !== 0) currentValue[0] = _currentValue[0];
        if (targetValue[1] !== 0) currentValue[1] = _currentValue[1];
        if (targetValue[2] !== 0) currentValue[2] = _currentValue[2];
        if (targetValue[3] !== 0) currentValue[3] = _currentValue[3];
        if (targetValue[4] !== 0) currentValue[4] = _currentValue[4] * 500;
        if (targetValue[5] !== 0) currentValue[5] = _currentValue[5] * 500;
        if (targetValue[6] !== 0) currentValue[6] = _currentValue[6] * 500;
        if (targetValue[7] !== 0) currentValue[7] = _currentValue[7] * 500;

        const norm_current = this._getNorm(currentValue);
        if (norm_current === 0)
            return 0;
        const dotProduct = this._getDotProduct(currentValue, targetValue);
        const currentScalarProjection = dotProduct / this._norm_target;
        const COStheta = currentScalarProjection / norm_current;

        //acos近似算法
        const theta_ = (-0.698131700797732 * COStheta * COStheta - 0.872664625997164) * COStheta + 1.57079632679489;
        const theta = 0 < theta_ ? theta_ : 0;

        const cosineSimilarity_ = 1 - 0.5 * theta;
        const cosineSimilarity = cosineSimilarity_ * cosineSimilarity_;
        return currentScalarProjection * cosineSimilarity;
    }

    /**
     * 计算两个8维向量(数组)的点积
     * @param {Array.<number>} vector1 - 数组长度为8
     * @param {Array.<number>} vector2 - 数组长度为8
     * @private
     */
    _getDotProduct(vector1, vector2) {
        let dotProduct = 0;
        for (let i = 0; i < 8; i++) { //vector1 == vector2 == 8
            dotProduct += (vector1[i] * vector2[i]);
        }
        return dotProduct;
    }

    /**
     * 在ranking之后可计算标准化的TargetValue
     * @returns {Array.<number>} 已标准化的targetValue
     * @public
     */
    getStdznTargetValue(PlanCombinationString) {
        let targetValue = this._getAvgCurrentByList();
        let target_Resource = targetValue.slice(0, 4);
        target_Resource.class = "Resource";
        let target_Contract = targetValue.slice(4, 8);
        target_Contract.class = "Contract";
        let Resource_CalibrationValue = this._getCalibration(target_Resource);
        let Contract_CalibrationValue;
        if (PlanCombinationString === "PlanCombination" && Resource_CalibrationValue !== 0) {
            Resource_CalibrationValue *= 0.8;
            Contract_CalibrationValue = Resource_CalibrationValue;
        }
        else
            Contract_CalibrationValue = this._getCalibration(target_Contract);
        for (let i = 0; i < 4; i++) {
            if (Resource_CalibrationValue !== 0)
                targetValue[i] = this.targetValue_html[i] / Resource_CalibrationValue;
            else
                targetValue[i] = 0;
        }
        for (let i = 4; i < 8; i++) {
            if (Contract_CalibrationValue !== 0)
                targetValue[i] = this.targetValue_html[i] / Contract_CalibrationValue;
            else
                targetValue[i] = 0;
        }
        return targetValue;
    }
    /**
     * 由List的实际能获取到的资源契约来假定targetValue
     * @returns {Array.<number>} 每种资源契约在所有方案中平均(不计入0)获取到的值
     * @private
     */
    _getAvgCurrentByList() {
        let avgCurrentValue = [0, 0, 0, 0, 0, 0, 0, 0];
        let validLength = new Array(8);
        let list = this.List;
        validLength.fill(this.List_length);
        for (let i = 0; i < 8; i++) {
            for (let ii = 0; ii < this.List_length; ii++) {
                avgCurrentValue[i] += list[ii][i + 4];
                if (list[ii][i + 4] === 0)
                    validLength[i]--;
            }
        }
        for (let i = 0; i < 8; i++) {
            if (validLength[i] === 0)
                avgCurrentValue[i] = 0;
            else
                avgCurrentValue[i] /= validLength[i];
        }
        return avgCurrentValue;
    }
    /**
     * @param {Array.<number>} target_0 - 资源或契约目标值(4数组)
     * @private
     */
    _getCalibration(target_0) {
        let target_0_html = this._getTarget0Html(target_0.class);
        let current_0_max = this._getCurrent0Max(target_0.class);
        let calibration = 0;
        let validLength = target_0.length;
        for (let i = 0; i < target_0.length; i++) {
            if (target_0[i] !== 0) {
                calibration += (target_0_html[i] / target_0[i]);
                if (target_0_html[i] === 0)
                    validLength--;
            }
            else
                validLength--;
        }
        if (calibration !== 0)
            calibration /= validLength;
        else {
            let Current_0_AMAX = 0;
            let validLength = target_0.length;
            for (let i = 0; i < target_0.length; i++) {
                if (current_0_max[i] !== 0)
                    Current_0_AMAX += current_0_max[i];
                else
                    validLength--;
            }
            if (validLength === 0)
                Current_0_AMAX = 0;
            else
                Current_0_AMAX /= validLength;
            let Target_0_html_MAX = ArrayMax(target_0_html);
            calibration = Target_0_html_MAX / Current_0_AMAX;
        }
        return calibration;
    }
    /**
     * @param {string} target_0_class
     * @returns {Array.<number>}
     * @private
     */
    _getTarget0Html(target_0_class) {
        let target_0_html = new Array(4);
        if (target_0_class === "Resource")
            target_0_html = this.targetValue_html.slice(0, 4);
        else
            target_0_html = this.targetValue_html.slice(4, 8);
        return target_0_html;
    }
    /**
     * @param {string} target_0_class
     * @returns {Array.<number>}
     * @private
     */
    _getCurrent0Max(target_0_class) {
        let current_0_max = new Array(4);
        if (target_0_class === "Resource")
            current_0_max = this.ShownTab.getCurrentValueMax().slice(0, 4);
        else
            current_0_max = this.ShownTab.getCurrentValueMax().slice(4, 8);
        return current_0_max;
    }
}

/**
 * 正式排序, 在此之前需要标准化归一化数据
 * @class
 */
class Plan extends Plan_Original {
    /**
     * @param {Tab|Tab_Anytime|Tab_Timetable} ShownTab - 已经setQValid的ShownTab
     * @param {number} list_length
     * @param {Array.<number>} targetValue_StandardizationAndNormalization - 资源契约目标值(已进行标准化归一化的值)
     */
    constructor(ShownTab, list_length, targetValue_StandardizationAndNormalization) {
        super(ShownTab, list_length);
        this.targetValue = targetValue_StandardizationAndNormalization;

        //由于已标准化归一化, 当方案的现值小于目标值一半可以直接跳过
        this.targetValue_half = this.targetValue.slice();
        for (let i = 0; i < 8; i++) {
            this.targetValue_half[i] = this.targetValue_half[i] * 0.5;
        }
    }

    /**
     * 由四个关卡计算出方案, 并添加进方案列表中
     * @param {number} Mission_1
     * @param {number} Mission_2
     * @param {number} Mission_3
     * @param {number} Mission_4
     * @private
     */
    _calculateAndPushIntoList(Mission_1, Mission_2, Mission_3, Mission_4) {
        let currentValue = this.ShownTab.calculateCurrentValue(Mission_1, Mission_2, Mission_3, Mission_4);

        //ShownTab的计算现值函数返回全为-1的数组, 说明由于某些原因该组合不可用
        if (currentValue[0] === -1)
            return ;

        for (let i = 0; i < 8; i++) {
            if (currentValue[i] < this.targetValue_half[i])
                return ;
        }

        let planValue = this._calculateValue(currentValue);
        this._pushIntoList(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
    }

    /**
     * 计算方案价值
     * @param {Array.<number>} currentValue
     * @private
     */
    _calculateValue(currentValue) {
        let value = 0;
        let minval = 99999999999;
        let targetValue = this.targetValue;
        for (let i = 0; i < 8; i++) {
            if (targetValue[i] !== 0)
                minval = Math.min(minval, currentValue[i] / targetValue[i]);
        }
        for (let i = 0; i < 8; i++) {
            value += this._calculateValue_main(targetValue[i], currentValue[i], minval);
        }
        return value;
    }
    /**
     * @param {number} target
     * @param {number} current
     * @param {number} minval
     * @private
     */
    _calculateValue_main(target, current, minval) {
        if (target === 0)
            return 0;
        return 0.5 * (Math.min(current, target) + Math.min(current, 1.5 * target * minval));
    }

    getResult() {
        let ShownTab = this.ShownTab;
        let QValid = ShownTab.getQValid(true);
        let currentValue_MAX = ShownTab.getCurrentValueMax();
        let result_plan = [];

        for (let i = 0; i < this.List_length; i++) {
            const List_i_row = this.List[i];
            if (!(0 in List_i_row))
                break;

            /**
             * 0Ranking序号-1关卡1-2关卡2-3关卡3-4关卡4-5~12 8种资源契约-自定义内容...
             * @type {Array.<number|string>}
             */
            let one_plan = [];

            one_plan.push(i);
            let MissionsNumber = new Array(4);
            for (let ii = 0; ii < 4; ii++) {
                MissionsNumber[ii] = QValid[List_i_row[ii]][0];
            }
            MissionsNumber = MissionsNumber.sort(sortStringNumber);
            for (let ii = 0; ii < 4; ii++) {
                one_plan.push(MissionsNumber[ii]);
            }
            for (let ii = 0; ii < 8; ii++) {
                one_plan.push(List_i_row[ii + 4] * currentValue_MAX[ii]);
            }
            const customPrint = this.ShownTab.printTableCustomize(List_i_row[0], List_i_row[1], List_i_row[2], List_i_row[3]);
            for (let ii = 0; ii < customPrint.length; ii++) {
                one_plan.push(customPrint[ii]);
            }
            result_plan.push(one_plan);
        }

        return result_plan;
    }

    /**
     * 打印方案
     * @param {string} sortBy - 排序方式, 默认为Ranking
     * @public
     */
    print(sortBy = "Ranking") {
        let result_plan = this.getResult();
        printResultsPlan(result_plan, sortBy);
    }
}
