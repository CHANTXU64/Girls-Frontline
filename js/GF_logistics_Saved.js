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
        if (this._saved.length >= 99) {
            alert(language.JS.Saved_alert2);
            return ;
        }

        let name = prompt(language.JS.plzInputPlanName, language.JS.planDefaultName);
        if (name == null)
            return ;
        if (name == "")
            name = language.JS.planDefaultName;

        let newData = {};
        newData.name = name;
        newData.GSRate = Input_getGreatSuccessRate();
        newData.is_UP = IsGreatSuccessRateUp();
        newData.Chapter = Input_getSelectChapter();
        let ShownTab = getShownTab();
        newData.TabName = ShownTab.name;
        newData.TabCustom = ShownTab.getSavedCustom();
        newData.Missions = MissionsDetails.getSelectedMissions();
        newData.startTime = Input_getStartTime();

        this._saved.push(newData);
        storageSetItem("Saved", this._saved);
        this._printLastSaved();
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
        if (row !== 0)
            $("#SavedTable_down_" + (row - 1)).removeAttr("disabled");
    }

    /**
     * 获取Saved某行的HTML
     * @param {number} row - 打印的行数
     * @param {Saved._saved} allSaved - 所有的Saved数据
     * @private
     */
    static _getSavedRowHTML(row, allSaved = this._saved) {
        let HTML = '<tr id="SavedTable_row_' + row + '"';
        HTML += '><td><button type="button" class="btn btn-default"id="SavedTable_apply_' + row + '" title="' + language.HTMLJS.SavedTable_apply + '" style="background-color: #88E063;">';
        HTML += '<span class="glyphicon glyphicon-ok"style="top: 2px;" /></button></td><td><div class="form-group input-group" style="margin-bottom: 0;">';
        HTML += '<input type="text" class="form-control" style="min-width: 140px;"id="SavedTable_name_' + row + '" placeholder="' + language.HTMLJS.SavedTable_name + '"';
        HTML += 'value="' + allSaved[row].name + '"readonly="readonly">';
        HTML += '<div class="input-group-btn"><button type="button" class="btn btn-default"id="SavedTable_rename_' + row + '" title="' + language.HTMLJS.SavedTable_rename + '"><span class="glyphicon glyphicon-pencil"style="top: 2px;" /></button></div>';
        HTML += '</div></td>';
        HTML += '<td><div class="btn-group" style="min-width: 80px;"><button type="button" class="btn btn-default"id="SavedTable_up_' + row + '"" title="' + language.HTMLJS.SavedTable_up + '"';
        if (row === 0)
            HTML += 'disabled="disabled"';
        HTML += '>';
        HTML += '<span class="glyphicon glyphicon-arrow-up"style="top: 2px;" /></button>';
        HTML += '<button type="button" class="btn btn-default"id="SavedTable_down_' + row + '" title="' + language.HTMLJS.SavedTable_down + '"';
        if (row === allSaved.length - 1)
            HTML += 'disabled="disabled"';
        HTML +='><span class="glyphicon glyphicon-arrow-down"style="top: 2px;" /></button></div></td>';
        HTML += '<td><button type="button" class="btn btn-default"id="SavedTable_export_' + row + '" title="' + language.HTMLJS.SavedTable_export + '"><span class="glyphicon glyphicon-export"style="top: 2px;" /></button></td>';
        HTML += '<td><button type="button" class="btn btn-default"id="SavedTable_delete_' + row + '" title="' + language.HTMLJS.SavedTable_delete + '" style="background-color: #F48380;"><span class="glyphicon glyphicon-trash"style="top: 2px;" /></button></td></tr>';
        return HTML;
    }

    /**
     * 应用某行的方案
     * @param {number} row
     * @public
     */
    static apply(row) {
        const data = this._saved[row];
        const tabName = data.TabName;
        ChangeTab(tabName);
        Input_setGreatSuccessRate(data.GSRate);
        Input_setGreatSuccessUpRate(data.is_UP);
        Input_setSelectChapter(data.Chapter);
        let ShownTab = getTabByName(tabName);
        ShownTab.applySavedCustom(data.TabCustom);
        MissionsDetails.setSelectedMissions(data.Missions);
        Input_setStartTime(data.startTime);

        delete_rankingResults();
        HTML_AllowRankingInput();
        MissionsDetails.print();
        printPlanDetails();
    }

    /**
     * 重命名某行Saved
     * @param {string} newName
     * @param {number} row
     * @public
     */
    static rename(newName, row) {
        this._saved[row].name = newName;
        storageSetItem("Saved", this._saved);
    }

    /**
     * 将Saved的Row行往上移动一行
     * @param {number} row 
     * @public
     */
    static upThisRow(row) {
        $("#SavedTable_name_" + row).val(this._saved[row - 1].name);
        $("#SavedTable_name_" + (row - 1)).val(this._saved[row].name);
        [this._saved[row], this._saved[row - 1]] = [this._saved[row - 1], this._saved[row]];
        storageSetItem("Saved", this._saved);
    }

    /**
     * 将Saved的Row行往下移动一行
     * @param {number} row
     * @public
     */
    static downThisRow(row) {
        $("#SavedTable_name_" + row).val(this._saved[row + 1].name);
        $("#SavedTable_name_" + (row + 1)).val(this._saved[row].name);
        [this._saved[row], this._saved[row + 1]] = [this._saved[row + 1], this._saved[row]];
        storageSetItem("Saved", this._saved);
    }

    /**
     * 将Saved的Row行数据导出
     * @param {number} row
     * @public
     */
    static export(row) {
        const data = this._saved[row];
        const MD5 = md5(JSON.stringify(data));
        const exportData = {data: data, MD5: MD5};
        let exportText = JSON.stringify(exportData);
        exportText = LZString.compressToEncodedURIComponent(exportText);
        let export_elem = document.getElementById("importSaved_input");
        export_elem.value = exportText;
        export_elem.select();
    }

    /**
     * 将Saved的Row行删除
     * @param {number} row
     * @public
     */
    static deleteThisRow(row) {
        //如果不确认删除, 跳过
        const name = this._saved[row].name;
        const warning = language.JS.deleteSavedWarning_1 + '"' + name + '"' + language.JS.deleteSavedWarning_2;
        let flag = confirm(warning);
        if (!flag)
            return ;

        for (let i = row; i < this._saved.length - 1; i++) {
            $("#SavedTable_name_" + i).val(this._saved[i + 1].name);
        }
        const elem_remove = document.getElementById("SavedTable_row_" + (this._saved.length - 1));
        document.getElementById("Saved_Body").removeChild(elem_remove);
        this._saved.splice(row, 1);
        if (this._saved.length !== 0) {
            $("#SavedTable_up_0").attr("disabled", "true");
            $("#SavedTable_down_" + (this._saved.length - 1)).attr("disabled", "true");
        }
        else
            document.getElementById("NoSaved").style.display = "";
    }

    /**
     * 导入数据到Saved最后(会进行MD5校验), 并打印最后一行
     * @param {string} inputText - 导入的数据
     */
    static import(inputText) {
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
            alert(language.JS.Saved_alert);
    }

    /**
     * 导入数据并覆盖Saved, 并打印全部Saved
     * @param {Saved._saved} newSaved - 新的Saved数据
     * @returns {boolean} 是否导入成功
     */
    static setSaved(newSaved) {
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
}

/**
 * [名称-计算方式-大成功概率-是否UP-关卡解锁-计算方式的详情-选择的关卡-开始时间]
 * @type {Array.<{name: string, TabName: string, GSRate: number, is_UP: boolean, Chapter: number, TabCustom: Array, Missions: Array.<string>, startTime: number}>}
 * @private
 */
Saved._saved = [];