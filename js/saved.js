class Saved {
    /**
     * @public
     */
    static getSaved() {
        return this._saved.slice();
    }

    /**
     * 保存方案
     * @public
     */
    static saveThisPlan() {
        if (this._saved.length >= 99)
            Modal.alert(language.JS.Saved_alert2);
        else
            Modal.prompt(language.JS.plzInputPlanName,
                            language.JS.Saved_prompt_title,
                            Saved._saveThisPlan_ok, function () {}, "text",
                            language.JS.planDefaultName, Saved.checkNameValid,
                            function (i) {return "";},
                            Saved.invalidNameFeedback);
    }

    /**
     * 确认保存方案, 供Modal调用
     * @param {string} validName
     * @public
     */
    static _saveThisPlan_ok(validName) {
        let newData = Saved.getSavedDataFromPage(validName);
        Saved._saved.push(newData);
        storageSetItem("Saved", Saved._saved);
        Saved._printLastSaved();
    }

    static getSavedDataFromPage(savedName) {
        let newData = {};
        newData.name = savedName;
        newData.GSRate = Input_getGreatSuccessRate();
        newData.is_UP = IsGreatSuccessRateUp();
        newData.Chapter = Input_getSelectChapter();
        let ShownTab = getShownTab();
        newData.TabName = ShownTab.name;
        newData.TabCustom = ShownTab.getSavedCustom();
        newData.Missions = MissionsDetails.getSelectedMissions();
        newData.startTime = Input_getStartTime();
        return newData;
    }

    /**
     * 检查名字是否合法
     * @param {string} name
     * @returns {boolean}
     * @public
     */
    static checkNameValid(name) {
        if (name !== "" && name.length <= 30)
            return true;
        else
            return false;
    }

    /**
     * 根据无效名字返回feedback
     * @param {string} invalidName
     * @returns {string}
     * @public
     */
    static invalidNameFeedback(invalidName) {
        if (invalidName === "")
            return language.JS.Saved_invalidNameFeedback1;
        if (invalidName.length >= 30)
            return language.JS.Saved_invalidNameFeedback2;
        return "";
    }

    /**
     * 打印最后一个方案(用于刚刚添加了一个方案)
     * @private
     */
    static _printLastSaved() {
        const row = this._saved.length - 1;
        if (row === 0)
            document.getElementById("NoSaved").style.display = "none";
        let HTML = this._getSavedRowHTML(row);
        $("#Saved_Body").append(HTML);

        //之前已选中最后一个方案,
        if (this._selectRow !== -1 && this._selectRow === this._saved.length - 2)
            $("#moveSaved_down").removeAttr("disabled");
    }

    /**
     * 获取Saved某行的HTML
     * @param {number} row - 打印的行数
     * @param {Saved._saved} allSaved - 所有的Saved数据
     * @private
     */
    static _getSavedRowHTML(row, allSaved = this._saved) {
        let HTML = '<a class="list-group-item list-group-item-action" tabindex="0" id="SavedTable_row_' + row + '">';
        HTML += this._getSavedRowHTML_main(row, allSaved);
        HTML += '</a>';
        return HTML;
    }

    /**
     * 获取Saved某行的HTML(main)
     * @param {number} row - 打印的行数
     * @param {Saved._saved} allSaved - 所有的Saved数据
     * @private
     */
    static _getSavedRowHTML_main(row, allSaved = this._saved) {
        let HTML = '<span class="Saved-Name" title="' + allSaved[row].name + '">' + allSaved[row].name + '</span>';
        HTML += '<div class="Saved-Overview">';
        let tab = getTabByName(allSaved[row].TabName);
        let TotalTime = tab.getTotalTimeFromSavedCustom(allSaved[row].TabCustom);
        HTML += '<div>' + tab.displayName + '<br>' + TimeFormat(TotalTime) + '</div>';
        let Missions = allSaved[row].Missions.slice();
        for (let i = 0; i < 4; ++i) {
            if (Missions[i] === undefined)
                Missions[i] = "";
        }
        HTML += '<div>' + Missions[0] + '<br>' + Missions[1] + '</div>';
        HTML += '<div>' + Missions[2] + '<br>' + Missions[3] + '</div>';
        let resources = this.getReAndCoBySaved(allSaved[row], is_CalculateByHour()).slice(0, 4);
        HTML += '<div class="Saved-Overview-resources">' + Math.round(resources[0]) + '<br>' + Math.round(resources[2]) + '</div>';
        HTML += '<div class="Saved-Overview-resources">' + Math.round(resources[1]) + '<br>' + Math.round(resources[3]) + '</div>';
        HTML += '</div>';
        return HTML;
    }

    static getReAndCoBySaved(savedData, is_hourly) {
        let tab = this.creatTabBySaved(savedData);
        let QValid = tab.getQValid(false);
        let time = tab.getTotalTime(false);
        if (is_hourly)
            time = 60;
        quick_sort_expand_ascending_missionName(QValid, 0);
        let reAndco = [0, 0, 0, 0, 0, 0, 0, 0];
        let QValid_length = QValid.length;
        let selectMission = savedData.Missions;
        for (let i = 0; i < QValid_length; ++i) {
            if (selectMission.indexOf(QValid[i][0]) !== -1) {
                reAndco[0] += QValid[i][1] * time;
                reAndco[1] += QValid[i][2] * time;
                reAndco[2] += QValid[i][3] * time;
                reAndco[3] += QValid[i][4] * time;
                reAndco[4] += QValid[i][5] * time;
                reAndco[5] += QValid[i][6] * time;
                reAndco[6] += QValid[i][7] * time;
                reAndco[7] += QValid[i][8] * time;
            }
        }
        return reAndco;
    }

    static creatTabBySaved(savedData) {
        let tabName = savedData.TabName;
        let BaseData = [savedData.Chapter, savedData.GSRate, savedData.is_UP, savedData.TabCustom.slice()];
        let tab = getTabByName(tabName, BaseData);
        return tab;
    }

    /**
     * 点击某行的事件
     * @param {number} row - 选中的行数
     * @public
     */
    static clickThisRow(row) {
        const thisRow_JQselector = $("#SavedTable_row_" + row);
        if (thisRow_JQselector.hasClass("list-group-item-success"))
            this._cancelSelectThisRow(row);
        else
            this._selectThisRow(row);
    }

    /**
     * 取消选择某行
     * @param {number} row - 选中的行数
     * @private
     */
    static _cancelSelectThisRow(row) {
        this._selectRow = -1;
        const thisRow_JQselector = $("#SavedTable_row_" + row);
        thisRow_JQselector.removeClass("list-group-item-success");
        $("#exportSaved_button").attr("disabled", "true");
        $("#renameSaved_button").attr("disabled", "true");
        $("#moveSaved_up").attr("disabled", "true");
        $("#moveSaved_down").attr("disabled", "true");
        $("#deleteSaved").attr("disabled", "true");
    }

    /**
     * 选择某行
     * @param {number} row - 选中的行数
     * @private
     */
    static _selectThisRow(row) {
        if (this._selectRow !== -1) {
            $("#SavedTable_row_" + this._selectRow).removeClass("list-group-item-success");
        }
        else {
            if ((!!window.md5) && (!!window.LZString))
                $("#exportSaved_button").removeAttr("disabled");
            $("#renameSaved_button").removeAttr("disabled");
            $("#deleteSaved").removeAttr("disabled");
        }
        this._selectRow = row;
        const thisRow_JQselector = $("#SavedTable_row_" + row);
        thisRow_JQselector.addClass("list-group-item-success");
        if (row !== 0)
            $("#moveSaved_up").removeAttr("disabled");
        else
            $("#moveSaved_up").attr("disabled", "true");
        if (row !== this._saved.length - 1)
            $("#moveSaved_down").removeAttr("disabled");
        else
            $("#moveSaved_down").attr("disabled", "true");
        this.apply(this._saved[row]);
    }

    /**
     * 应用SavedData
     * @public
     */
    static apply(data) {
        const tabName = data.TabName;
        ChangeTab(tabName);
        Input_setGreatSuccessRate(data.GSRate);
        Input_setGreatSuccessUpRate(data.is_UP);
        Input_setSelectChapter(data.Chapter);
        let ShownTab = getTabByName(tabName);
        ShownTab.applySavedCustom(data.TabCustom.slice());
        MissionsDetails.setSelectedMissions(data.Missions.slice());
        Input_setStartTime(data.startTime);

        delete_rankingResults();
        HTML_AllowRankingInput();
        MissionsDetails.print();
        printPlanDetails();
    }

    /**
     * 获取选中已保存方案的名称
     * @returns {string}
     * @public
     */
    static getSelectedName() {
        //test
        if (this._selectRow === -1)
            throw ("Error Saved get name");
        //End test
        return this._saved[this._selectRow].name;
    }

    /**
     * 重命名选中行Saved
     * @public
     */
    static renameSelected() {
        const row = this._selectRow;
        const newName = $("#renameSaved_input").val();
        this._saved[row].name = newName;
        $("#SavedTable_row_" + row).html(this._getSavedRowHTML_main(row));
        storageSetItem("Saved", this._saved);
    }

    /**
     * 将Saved的选中行往上移动一行
     * @public
     */
    static moveSelected_up() {
        let row = this._selectRow;
        $("#SavedTable_row_" + row).removeClass("list-group-item-success");
        $("#SavedTable_row_" + (row - 1)).addClass("list-group-item-success");
        $("#SavedTable_row_" + row).html(this._getSavedRowHTML_main(row - 1));
        $("#SavedTable_row_" + (row - 1)).html(this._getSavedRowHTML_main(row));
        [this._saved[row], this._saved[row - 1]] = [this._saved[row - 1], this._saved[row]];
        this._selectRow--;
        $("#moveSaved_down").removeAttr("disabled");
        if (this._selectRow === 0)
            $("#moveSaved_up").attr("disabled", "true");
        storageSetItem("Saved", this._saved);
    }

    /**
     * 将Saved的选中行往下移动一行
     * @public
     */
    static moveSelected_down() {
        let row = this._selectRow;
        $("#SavedTable_row_" + row).removeClass("list-group-item-success");
        $("#SavedTable_row_" + (row + 1)).addClass("list-group-item-success");
        $("#SavedTable_row_" + row).html(this._getSavedRowHTML_main(row + 1));
        $("#SavedTable_row_" + (row + 1)).html(this._getSavedRowHTML_main(row));
        [this._saved[row], this._saved[row + 1]] = [this._saved[row + 1], this._saved[row]];
        this._selectRow++;
        $("#moveSaved_up").removeAttr("disabled");
        if (this._selectRow === this._saved.length - 1)
            $("#moveSaved_down").attr("disabled", "true");
        storageSetItem("Saved", this._saved);
    }

    /**
     * 将Saved选中的某行数据导出
     * @public
     */
    static exportSelected() {
        const row = this._selectRow;
        const data = this._saved[row];
        const MD5 = md5(JSON.stringify(data));
        const exportData = {
            data: data,
            MD5: MD5
        };
        let exportText = JSON.stringify(exportData);
        exportText = LZString.compressToEncodedURIComponent(exportText);
        $("#exportSaved_input").val(exportText);
    }

    /**
     * 将Saved选中行删除
     * @public
     */
    static deleteSelected() {
        const row = this._selectRow;
        const name = this._saved[row].name;
        const warning = language.JS.deleteSavedWarning_1 + '"' + name + '"' + language.JS.deleteSavedWarning_2;
        Modal.confirm(warning, function () {Saved._deleteSelected_ok(row)});
    }

    /**
     * 确认将Saved选中行删除
     * @param {number} row
     * @private
     */
    static _deleteSelected_ok(row) {
        this._cancelSelectThisRow(row);
        for (let i = row; i < this._saved.length - 1; i++) {
            $("#SavedTable_row_" + i).html(this._getSavedRowHTML_main(i + 1));
        }
        const elem_remove = document.getElementById("SavedTable_row_" + (this._saved.length - 1));
        document.getElementById("Saved_Body").removeChild(elem_remove);
        this._saved.splice(row, 1);
        if (this._saved.length === 0)
            document.getElementById("NoSaved").style.display = "";
    }

    /**
     * 导入数据到Saved最后(会进行MD5校验), 并打印最后一行
     * @param {string} inputText - 导入的数据
     */
    static import(inputText) {
        if (this._saved.length >= 9) {
            Modal.alert(language.JS.Saved_alert2);
            return ;
        }
        const inputData = LZString.decompressFromEncodedURIComponent(inputText);
        try {
            var saved = JSON.parse(inputData);
            let MD5 = md5(JSON.stringify(saved.data));
            var result = MD5 === saved.MD5;
        } catch (ex) {}
        if (result) {
            this._saved.push(saved.data);
            storageSetItem("Saved", this._saved);
            this._printLastSaved();
        }
        else
            Modal.alert(language.JS.Saved_alert);
    }

    /**
     * 导入数据并覆盖Saved, 并打印全部Saved
     * @param {Saved._saved} newSaved - 新的Saved数据
     * @returns {boolean} 是否导入成功
     */
    static setSaved(newSaved) {
        this.cancelSelected();
        this._saved = newSaved;
        if (newSaved.length === 0) {
            document.getElementById("NoSaved").style.display = "";
            document.getElementById("Saved_Body").innerHTML = "";
        }
        else {
            document.getElementById("NoSaved").style.display = "none";
            let HTML = "";
            for (let i = 0; i < this._saved.length; i++) {
                HTML += this._getSavedRowHTML(i);
            }
            document.getElementById("Saved_Body").innerHTML = HTML;
        }
        storageSetItem("Saved", this._saved);
        return true;
    }

    /**
     * 取消选择项
     * @public
     */
    static cancelSelected() {
        let row = this._selectRow;
        if (row !== -1)
            this._cancelSelectThisRow(row);
    }
}

/**
 * [名称-计算方式-大成功概率-是否UP-关卡解锁-计算方式的详情-选择的关卡-开始时间]
 * @type {Array.<{name: string, TabName: string, GSRate: number, is_UP: boolean, Chapter: number, TabCustom: Array, Missions: Array.<string>, startTime: number}>}
 * @private
 */
Saved._saved = [];

/**
 * 选中的行数
 * @type {number}
 * @private
 */
Saved._selectRow = -1;
