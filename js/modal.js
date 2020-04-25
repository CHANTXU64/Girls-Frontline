//使用bootstrap的modal替换alert, confirm, prompt.

class Modal {
    /**
     * @param {string=} message - 内容, 默认为空
     * @param {string=} title - 标题, 默认为"警告"
     * @public
     */
    static alert(message = "", title = language.JS.alertTitle_warning) {
        this._insertModalQueue("alert", [message, title]);
    }

    /**
     * @param {string=} message - 内容, 默认为空
     * @param {Function=} func_ok - 点击ok触发的函数, 默认为空
     * @param {Function=} func_cancel - 点击cancel或关闭modal触发的函数, 默认为空
     * @param {string=} title - 标题, 默认为"警告"
     * @public
     */
    static confirm(message = "", func_ok = function() {}, func_cancel = function() {}, title = language.JS.alertTitle_warning) {
        this._insertModalQueue("confirm", [message, func_ok, func_cancel, title]);
    }

    /**
     * @param {string=} message - 内容, 默认为""
     * @param {string=} title - 标题, 默认为""
     * @param {Function=} func_ok - 点击ok触发的函数, 将会传入input, 默认为function (i) {}
     * @param {Function=} func_cancel - 点击cancel或关闭modal触发的函数, 默认为function () {}
     * @param {string=} inputType - 输入框type类型, 默认"text"
     * @param {string=} defaultInput - 输入框默认值, 默认为""
     * @param {Function=} checkValidFunc - 检查输入有效函数, 应返回bool值(valid返回true, 否则false), 默认为undefined
     * @param {Function=} validFeedbackFunc - 根据有效输入值返回feedback的函数, 必须提供checkValidFunc, 默认为function (input) {return "";}
     * @param {Function=} invalidFeedbackFunc - 根据无效输入值返回feedback的函数, 必须提供checkValidFunc, 默认为function (input) {return "";}
     * @public
     * @example
     * function extendGreetings(greetings, name) {Modal.alert(greetings + name)};
     * function checkValidFunc(name) {if (name !== "" && name.length <= 50) return true; else return false;};
     * function validFeedbackFunc(name) {return "ok"};
     * function invalidFeedbackFunc(name) {if (name === "") return "Please provide your name."; else return "The name is too long."};
     * Modal.prompt("Your name: ", "Input", function(input) {extendGreetings("Hello, ", input)}, function(){}, "text", "", checkValidFunc, validFeedbackFunc, invalidFeedbackFunc);
     */
    static prompt(message = "", title = "", func_ok = function (i) {}, func_cancel = function () {},
                    inputType = "text", defaultInput = "", checkValidFunc = undefined,
                    validFeedbackFunc = function (input) {return "";},
                    invalidFeedbackFunc = function (input) {return "";}) {
        this._insertModalQueue("prompt", [message, title, func_ok, func_cancel, inputType, defaultInput, checkValidFunc, validFeedbackFunc, invalidFeedbackFunc]);
    }

    /**
     * 防止同时显示多个modal, 使用队列依次显示
     * @param {string} modalType - modal类型
     * @param {Array} param - 所有参数
     * @private
     */
    static _insertModalQueue(modalType, param) {
        let element = {type: modalType, param: param};
        if (this._queque.push(element) === 1)
            this._runFirstModal();
    }

    /**
     * 运行modal队列中第一个modal
     * @private
     */
    static _runFirstModal() {
        if (!this._queque[0])
            return ;
        let modal = this._queque[0];
        let param = modal.param;
        switch (modal.type) {
            case "alert":
                this._alert_main(param[0], param[1]);
                break;
            case "confirm":
                this._fonfirm_main(param[0], param[1], param[2], param[3]);
                break;
            case "prompt":
                this._prompt_main(param[0], param[1], param[2], param[3], param[4], param[5], param[6], param[7], param[8]);
                break;
        }
    }

    /**@private */
    static _alert_main(message, title) {
        this._setBody(message);
        this._setTitle(title);
        this._html_cancelButton.addClass("d-none");
        this._lastModal = "alert";
        this._show();
    }

    /**@private */
    static _fonfirm_main(message, func_ok, func_cancel, title) {
        this._setBody(message);
        this._setTitle(title);
        this._html_okButton.on("click", func_ok);
        this._html_cancelButton.on("click", func_cancel);
        this._html_close.on("click", func_cancel);
        this._lastModal = "confirm";
        this._show();
    }

    /**@private */
    static _prompt_main(message, title, func_ok, func_cancel, inputType, defaultInput, checkValidFunc, validFeedbackFunc, invalidFeedbackFunc) {
        this._setTitle(title);
        let body = '<div class="form-group"><label for="modal_input">' + message;
        body += '</label><input type="' + inputType + '" class="form-control" id="modal_input" value="' + defaultInput;
        body += '" onfocus="this.select()" required><div id="modal_feedback"></div></div>';
        this._setBody(body);
        this._html_okButton.on("click", function () {func_ok($("#modal_input").val());});
        this._html_cancelButton.on("click", func_cancel);
        this._html_close.on("click", func_cancel);
        if (checkValidFunc !== undefined) {
            if (checkValidFunc(defaultInput)) {
                $("#modal_input").addClass("is-valid");
                $("#modal_feedback").addClass("valid-feedback");
                $("#modal_feedback").html(validFeedbackFunc(defaultInput));
            }
            else {
                $("#modal_input").addClass("is-invalid");
                $("#modal_feedback").addClass("invalid-feedback");
                $("#modal_feedback").html(invalidFeedbackFunc(defaultInput));
            }
            $("#modal_input").on("keyup", function (e) {
                let input_JQ = $("#modal_input");
                let input = input_JQ.val();
                if (e.which == 13) {
                    if (checkValidFunc(input))
                        Modal._html_okButton.click();
                    return ;
                }
            });
            $("#modal_input").on("input propertychange", function () {
                let input_JQ = $("#modal_input");
                let feedback_JQ = $("#modal_feedback");
                let input = input_JQ.val();
                if (checkValidFunc(input)) {
                    input_JQ.addClass("is-valid");
                    input_JQ.removeClass("is-invalid");
                    feedback_JQ.addClass("valid-feedback");
                    feedback_JQ.removeClass("invalid-feedback");
                    feedback_JQ.html(validFeedbackFunc(input));
                    Modal._html_okButton.removeAttr("disabled");
                }
                else {
                    input_JQ.addClass("is-invalid");
                    input_JQ.removeClass("is-valid");
                    feedback_JQ.addClass("invalid-feedback");
                    feedback_JQ.removeClass("valid-feedback");
                    feedback_JQ.html(invalidFeedbackFunc(input));
                    Modal._html_okButton.attr("disabled", "true");
                }
            });
        }
        this._lastModal = "prompt";
        this._show();
    }

    /**
     * 设置标题
     * @param {string} title - 标题
     * @private
     */
    static _setTitle(title) {
        this._html_title.html(title);
    }

    /**
     * 设置内容
     * @param {string} body - 内容
     * @private
     */
    static _setBody(body) {
        this._html_body.html(body);
    }

    /**
     * 显示modal
     * @private
     */
    static _show() {
        this._html_modal.modal("show");
    }
}

/**
 * 刚刚调用的Modal类型
 * @type {string}
 * @private
 */
Modal._lastModal = "";

/**
 * 存储需要依次显示的modal, 防止同时出现多个Modal
 * @type {Array.<{type: string, param: Array}>}
 * @private
 */
Modal._queque = [];

Modal._html_modal = $("#Modal");
Modal._html_title = $("#Modal_title");
Modal._html_close = $("#Modal_closeButton");
Modal._html_body = $("#Modal_body");
Modal._html_footer = $("#Modal_footer");
Modal._html_okButton = $("#Modal_footer_button_ok");
Modal._html_cancelButton = $("#Modal_footer_button_cancel");

Modal._html_modal.on("show.bs.modal", function () {
    //由于该组件不会阻塞js, 所以需要在显示modal前失去焦点且禁止滚动, 避免再操作
    document.activeElement.blur();
    document.documentElement.style.overflowY="hidden";
});

Modal._html_modal.on("shown.bs.modal", function () {
    switch (Modal._lastModal) {
        case "alert":
            Modal._html_okButton.focus();
            break;
        case "confirm":
            Modal._html_cancelButton.focus();
            break;
        case "prompt":
            $("#modal_input").focus();
            break;
    }
});

Modal._html_modal.on("hide.bs.modal", function () {
    switch (Modal._lastModal) {
        case "confirm":
            Modal._html_close.off();
            Modal._html_okButton.off();
            Modal._html_cancelButton.off();
            break;
        case "prompt":
            Modal._html_close.off();
            Modal._html_okButton.off();
            Modal._html_cancelButton.off();
            $("#modal_input").off();
            break;
    }
    Modal._queque.shift();
});

Modal._html_modal.on("hidden.bs.modal", function () {
    switch (Modal._lastModal) {
        case "alert":
            Modal._html_cancelButton.removeClass("d-none");
            break;
        case "prompt":
            Modal._html_okButton.removeAttr("disabled");
            break;
    }
    Modal._runFirstModal();
    //恢复滚动
    document.documentElement.style.overflowY="auto";
})
