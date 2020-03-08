class MissionsDetails {
    /**
     * 返回已选择的关卡名称, 已按关卡名称排序
     * @param {boolean} NeedSort - 是否需要按关卡名称排序, 默认是
     * @public
     */
    static getSelectedMissions(NeedSort = true) {
        let selectedMissions = this._selectedMissions.slice();
        if (NeedSort)
            return selectedMissions.sort(sortStringNumber);
        else
            return selectedMissions;
    }

    /**
     * 重新设置selectedMissions数组
     * @param {Array.<string>} new_selectedMissions - 新的选择关卡
     */
    static setSelectedMissions(new_selectedMissions) {
        //test
        if (new_selectedMissions.length > 4)
            throw "error";
        //End test
        this._selectedMissions = new_selectedMissions;
    }

    /**
     * 选中某一关卡, 添加进selectedMissions
     * @param {string} missionName - 增加的关卡的名称
     * @public
     */
    static selectMission(missionName) {
        //test
        if (this._selectedMissions.indexOf(missionName) !== -1)
            throw "error";
        //End test
        this._selectedMissions.push(missionName);
    }

    /**
     * 删去一个已选择的关卡
     * @param {string=} missionName - 删除关卡的名称, 默认值为数组中第一个关卡
     * @public
     */
    static deleteSelectedMission(missionName = this._selectedMissions[0]) {
        this._selectedMissions.remove_First(missionName);
    }

    /**
     * 返回已选择的关卡详情, 已按关卡名称排序
     * @public
     */
    static getSelectedMissionsDetails() {
        let selectedMissionsDetails = [];
        const selectedMissions = this.getSelectedMissions();
        const mission_table = this._missionsTable;
        for (let i = 0; i < selectedMissions.length; i++) {
            const rowIndex = this.getMissionsTableRowIndex(selectedMissions[i]);
            selectedMissionsDetails.push(mission_table[rowIndex]);
        }
        return selectedMissionsDetails;
    }

    /**
     * 依据获取方式返回MissionsTable, 获取方式:
     * 
     * "default": 返回MissionsTable.slice()
     * 
     * "quick": 快速获取, 直接返回, 可能会修改MissionsTable, 不安全
     * 
     * "missionSort": 返回按方案名称排序的MissionsTable.slice()
     * @param {string=} method - 获取方式
     * @public
     */
    static getMissionsTable(method = "default") {
        switch (method) {
            case "default":
                return this._missionsTable.slice();
            case "quick":
                return this._missionsTable;
            case "missionSort":
                let missionsTable = this._missionsTable.slice();
                quick_sort_expand_ascending_missionName(missionsTable, 0);
                return missionsTable;
        }
    }

    /**
     * 由关卡名称返回MissionsTable的行索引
     * @param {string} missionName - 关卡名称
     */
    static getMissionsTableRowIndex(missionName) {
        let rowIndex = -1;
        const missionsTable_length = this._missionsTable.length;
        for (let i = 0; i < missionsTable_length; i++) {
            if (missionName === this._missionsTable[i][0]) {
                rowIndex = i;
                break;
            }
        }
        //test
        if (rowIndex === -1)
            throw "-1";
        //End test
        return rowIndex;
    }

    /**
     * 设置私有变量_missionsTable, 按关卡排序
     * @public
     */
    static setMissionsTable() {
        let ShownTab = getShownTab();
        this._missionsTable = ShownTab.getQValid(false);

        //Tab_Anytime为快速计算最小间隔, 不按关卡排序, 所以还得重新排序
        this._sortMissionsTable("Mission");
    }

    /**
     * 对missionsTable排序
     * @param {string} sortBy - 排序依据
     * @private
     */
    static _sortMissionsTable(sortBy) {
        switch (sortBy) {
            case "Mission":
                quick_sort_expand_ascending_missionName(this._missionsTable, 0);
                break;
            case "Manp":
                quick_sort_expand_descending(this._missionsTable, 1);
                break;
            case "Ammu":
                quick_sort_expand_descending(this._missionsTable, 2);
                break;
            case "Rati":
                quick_sort_expand_descending(this._missionsTable, 3);
                break;
            case "Part":
                quick_sort_expand_descending(this._missionsTable, 4);
                break;
            case "TPro":
                quick_sort_expand_descending(this._missionsTable, 5);
                break;
            case "Equi":
                quick_sort_expand_descending(this._missionsTable, 6);
                break;
            case "QPro":
                quick_sort_expand_descending(this._missionsTable, 7);
                break;
            case "QRes":
                quick_sort_expand_descending(this._missionsTable, 8);
                break;
            case "Time":
                quick_sort_expand_ascending(this._missionsTable, 9);
                break;
            //test
            default:
                throw "error";
            //End test
        }
    }

    /**
     * 打印方案详情, 第一次打印(或重新打印)必须以关卡排序, 不需要输入排序方式 
     * 若输入排序方式, 则不再重新计算MissionsTable
     * @param {string=} sortBy - 排序方式
     * @public
     */
    static print(sortBy) {
        //第一次打印, 设置MissionsTable, 否则设置sortBy
        if (sortBy !== undefined)
            this._sortMissionsTable(sortBy);
        else
            this.setMissionsTable();

        const missionsTable = this._missionsTable;
        const missionsTable_length = missionsTable.length;
        let selectedMissions = this.getSelectedMissions();

        //显示资源契约的值所需的分钟数
        let time_calculate = 60;
        if (!is_CalculateByHour()) {
            let ShownTab = getShownTab();
            time_calculate = ShownTab.getTotalTime(false);
        }

        //main
        let tab = "";
        for (let i = 0; i < missionsTable_length; i++) {
            tab += '<tr id="MissionTable_' + i + '" tabindex="0"';
            for (let ii = 0; ii < selectedMissions.length; ii++) {
                if (selectedMissions[ii] === missionsTable[i][0]) {
                    selectedMissions.splice(ii, 1);
                    tab += 'class="table-success"';
                    break;
                }
            }
            tab += '><td>' + missionsTable[i][0] + '</td>';
            for (let ii = 1; ii < 9; ii++) {
                tab += '<td>' + NumberAutoExact(missionsTable[i][ii] * time_calculate) + '</td>';
            }
            tab += '<td>' + TimeFormat(missionsTable[i][9]) + '</td>';
            tab += '</tr>';
        }

        //当重新打印关卡详情时, 可能导致原先选择的关卡不再显示, 于是需要删除这些关卡
        for (let i = 0; i < selectedMissions.length; i++) {
            this._selectedMissions.remove_First(selectedMissions[i]);
        }

        if (missionsTable_length === 0)
            tab = '<tr><td colspan="10">' + language.JS.NoMission + '</td></tr>';

        document.getElementById("MissionTable_tbody").innerHTML = tab;
    } //End print
}

/**
 * 关卡详情列表, 不一定按方案名称排序
 * @type {Array.<Array.<string|number>>}
 * @private
 */
MissionsDetails._missionsTable = [];

/**
 * 选择的关卡名称, 最多4个, 不一定按方案名称排序
 * @type {Array.<string>}
 * @private
 */
MissionsDetails._selectedMissions = [];