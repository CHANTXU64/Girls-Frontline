//捕获错误信息
window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
    console.error("错误信息：" + errorMessage + ", 出错文件：" + scriptURI +
        ", 出错文件：" + scriptURI + ", 出错行号：" + lineNumber +
        ", 出错列号：" + columnNumber + ", 错误详情：" + errorObj);
}
