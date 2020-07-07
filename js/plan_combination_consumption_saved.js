class ConsumptionSaved {
    static save() {
        if (this._saved.length >= 36)
            Modal.alert(language.JS.Saved_alert2);
        else
            Modal.prompt(language.JS.plzInputConsumptionName,
                            language.JS.ConsumptionSaved_prompt_title,
                            ConsumptionSaved._saveThisPlan_ok, function () {}, "text",
                            language.JS.planDefaultName, ConsumptionSaved.checkNameValid,
                            function (i) {return "";},
                            ConsumptionSaved.invalidNameFeedback);
    }

    static _saveThisPlan_ok(validName) {
        let saved = {};
        saved.name = validName;
        saved.data = Input_getPC_Consumption_reAndco().slice();
        saved.data.push(Input_getPC_Consumption_times());
        ConsumptionSaved._saved.push(saved);
        PC_storageSetItem("ConsumptionSaved", ConsumptionSaved._saved);
        ConsumptionSaved._printLastSaved();
    }

    static _printLastSaved() {
        const row = this._saved.length - 1;
        if (row === 0)
            document.getElementById("consumption_noSaved").style.display = "none";
        let HTML = this._getSavedRowHTML(row);
        $("#consumption_saved").append(HTML);
    }

    static _getSavedRowHTML(row, allSaved = this._saved) {
        let HTML = '<a class="dropdown-item dropdown-item-regular" id="consumption_saved_row_';
        HTML += row + '"><span class="dropdown-item-span" id="consumption_span_row_';
        HTML += row + '" title="';
        HTML += allSaved[row].name + '">';
        HTML += allSaved[row].name;
        HTML += '</span><button class="close" id="consumption_close_row_';
        HTML += row + '">×</button></a>';
        return HTML;
    }

    static checkNameValid(name) {
        if (name !== "" && name.length <= 30)
            return true;
        else
            return false;
    }

    static invalidNameFeedback(invalidName) {
        if (invalidName === "")
            return language.JS.TargetSaved_invalidNameFeedback1;
        if (invalidName.length >= 30)
            return language.JS.TargetSaved_invalidNameFeedback2;
        return "";
    }

    static click(row) {
        if (this._deleteFlag === true) {
            this._deleteFlag = false;
            return ;
        }
        let data = this._saved[row].data;
        Input_setPC_Consumption_reAndco(data.slice(0, 8));
        Input_setPC_Consumption_times(data[8]);
    }

    static delete(row) {
        for (let i = row; i < this._saved.length - 1; i++) {
            let span = $("#consumption_span_row_" + i);
            span.html(this._saved[i + 1].name);
            span.attr("title", this._saved[i + 1].name);
        }
        const elem_remove = document.getElementById("consumption_saved_row_" + (this._saved.length - 1));
        document.getElementById("consumption_saved").removeChild(elem_remove);
        this._saved.splice(row, 1);
        if (this._saved.length === 0)
            document.getElementById("consumption_noSaved").style.display = "";
        PC_storageSetItem("ConsumptionSaved", this._saved);

        this._deleteFlag = true;
        setTimeout(function () {$("#consumption_saved_dropdown").dropdown('show')}, 0);
    }

    static setSaved(newSaved) {
        this._saved = newSaved;
        if (newSaved.length === 0) {
            document.getElementById("consumption_noSaved").style.display = "";
            document.getElementById("consumption_saved").innerHTML = "";
        }
        else {
            document.getElementById("consumption_noSaved").style.display = "none";
            let HTML = "";
            for (let i = 0; i < this._saved.length; i++) {
                HTML += this._getSavedRowHTML(i);
            }
            document.getElementById("consumption_saved").innerHTML = HTML;
        }
        PC_storageSetItem("ConsumptionSaved", this._saved);
        return true;
    }
}

ConsumptionSaved._saved = [];

/**
 * 当点击'x'delete时, 也会触发click()来apply, 所以使用flag来检测是否是点击了'x'
 */
ConsumptionSaved._deleteFlag = false;
