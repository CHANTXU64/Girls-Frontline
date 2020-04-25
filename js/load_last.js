window.onload = function () {
    $("#Notransition").remove();

    let script1 = document.createElement("script");
    script1.src = "https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/src/sha1.min.js";
    document.body.appendChild(script1);
    let script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/npm/js-md5@0.7.3/src/md5.min.js";
    document.body.appendChild(script2);
    let script3 = document.createElement("script");
    script3.src = "https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js";
    script3.integrity = "sha256-nRoO8HoupfqozUr7YKBRgHXmdx40Hl/04OSBzv7e7L8=";
    script3.crossOrigin = "anonymous";
    document.body.appendChild(script3);
    let script4 = document.createElement("script");
    script4.src = "https://cdn.jsdelivr.net/npm/echarts@4.6.0/dist/echarts.min.js";
    script4.integrity = "sha256-9TvhGliyfFW2O8SvloAhdFQbfjluHQ+vQ7WWWX5Z7oM=";
    script4.crossOrigin = "anonymous";
    document.body.appendChild(script4);
    let script5 = document.createElement("script");
    script5.src = "https://cdn.jsdelivr.net/npm/es6-promise@4.2.8/dist/es6-promise.auto.min.js";
    script5.integrity = "sha256-Xxrdry6fWSKu1j2ALyuK/gHFQ+2Bp76ZrR6f3QXI47Y=";
    script5.crossOrigin = "anonymous";
    document.body.appendChild(script5);
    let script6 = document.createElement("script");
    script6.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.1/dist/html2canvas.min.js";
    script6.integrity = "sha256-uacRffSSMP9qpvNWhVmYLykBv9YKMA1d/VSIN1AmfyQ=";
    script6.crossOrigin = "anonymous";
    document.body.appendChild(script6);

    cheackLoadedAndLoadLast();
    setTimeout(loadBackupJS, 6000);
}

/**
 * 检查第三方js是否加载完成
 * @returns {boolean}
 */
function cheackScriptLoad() {
    if (!!window.sha1 && !!window.md5 && !!window.LZString && !!window.echarts && !!window.ES6Promise && !!window.html2canvas)
        return true;
    else
        return false;
}

/**
 * 每200ms检查第三方js是否加载完成, 加载完成则渲染最后的页面
 */
function cheackLoadedAndLoadLast() {
    if (cheackScriptLoad())
        loadLast();
    else
        setTimeout(cheackLoadedAndLoadLast, 100);
}

/**
 * 渲染最后的页面
 */
function loadLast() {
    $("#Config_importInput").removeAttr("disabled");
    $("#Config_importButton").removeAttr("disabled");
    $("#Config_export").removeAttr("disabled");
    $("#importSaved_input").removeAttr("disabled");
    $("#importSaved_importButton").removeAttr("disabled");
    $("#Capture").removeAttr("disabled");
    $("#page_loading").remove();
    $("#PlanCombinationSwitch").removeAttr("disabled");
    plan_combination_init("LocalStorage");
}

//Backup vendor js !python
/**
 * 如果使用cdn加载的js还未加载完成, 则使用备用的js
 */
function loadBackupJS() {
    if (!window.sha1) {
        let script = document.createElement("script");
        script.src = "../vendor/js-sha1/sha1.min.js";
        document.body.appendChild(script);
    }
    if (!window.md5) {
        let script = document.createElement("script");
        script.src = "../vendor/js-md5/md5.min.js";
        document.body.appendChild(script);
    }
    if (!window.LZString) {
        let script = document.createElement("script");
        script.src = "../vendor/lz-string/lz-string.min.js";
        document.body.appendChild(script);
    }
    if (!window.echarts) {
        let script = document.createElement("script");
        script.src = "../vendor/echarts/echarts.min.js";
        document.body.appendChild(script);
    }
    if (!window.ES6Promise) {
        let script = document.createElement("script");
        script.src = "../vendor/es6-promise/es6_promise.auto.min.js";
        document.body.appendChild(script);
    }
    if (!window.html2canvas) {
        let script = document.createElement("script");
        script.src = "../vendor/html2canvas/html2canvas.min.js";
        document.body.appendChild(script);
    }
}
//End Backup vendor js !python
