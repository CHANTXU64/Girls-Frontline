let PREVIOUS_VERSION;
function setPreviousVersion() {
    PREVIOUS_VERSION = storageGetItem("version");
}

function showReleaseNotes() {
    //test
    if (PREVIOUS_VERSION === "Develop.x.x")
        return ;
    //End test
    if (PREVIOUS_VERSION === "noStorage")
        return ;
    let release_notes_length = release_notes.length;
    if (release_notes[release_notes_length - 1].version.indexOf(VERSION) === -1) {
        try {
            console.log("version error");
        } catch (ex) {}
        return ;
    }
    let previous_version_index = -1;
    for (let i = 0; i < release_notes_length; ++i) {
        if (release_notes[i].version.indexOf(PREVIOUS_VERSION) !== -1) {
            previous_version_index = i;
            break;
        }
    }
    if (previous_version_index === -1) {
        showAllReleaseNotes();
        return ;
    }
    if (previous_version_index === release_notes_length - 1)
        return ;
    Modal.alert(getReleaseNotesHTML(previous_version_index, release_notes_length - 1), language.JS.release_notes_title);
}

function showAllReleaseNotes() {
    let release_notes_length = release_notes.length;
    Modal.alert(getReleaseNotesHTML(-1, release_notes_length - 1), language.JS.release_notes_title);
}

function getReleaseNotesHTML(previous_version_index, current_version_index) {
    let html = "";
    for (let i = previous_version_index + 1; i <= current_version_index; ++i) {
        let release_note = release_notes[i];
        html += '<h5>';
        html += release_note.version[0];
        if (release_note.version[1] !== undefined) {
            html += ' / ' + release_note.version[1];
        }
        html += '</h5>';
        html += '<ul style="padding-left: 25px; margin-bottom: 1.5rem;">';
        let notes = release_note.notes[language.version_note_lang];
        if (notes === undefined)
            notes = release_note.notes["en"];
        for (let ii = 0; ii < notes.length; ++ii) {
            html += '<li>' + notes[ii] + '</li>';
        }
        html += '</ul>';
    }
    return html;
}

const release_notes = [
    {
        version: [
            "1.0.0",
            "1.0.0-offline"
        ],
        notes: {
            en: [
                "Official release"
            ],
            zh_CN: [
                "正式发布"
            ],
            zh_TW: [
                "正式發布"
            ],
        }
    },
    {
        version: [
            "1.0.1",
            "1.0.1-offline"
        ],
        notes: {
            en: [
                "Fix bugs and improve performance"
            ],
            zh_CN: [
                "修复错误并提升性能"
            ],
            zh_TW: [
                "修復錯誤並提升性能"
            ],
        }
    },
    {
        version: [
            "1.0.2",
            "1.0.2-offline"
        ],
        notes: {
            en: [
                "None"
            ],
            zh_CN: [
                "无"
            ],
            zh_TW: [
                "無"
            ],
        }
    },
    {
        version: [
            "1.0.3",
            "1.0.3-offline"
        ],
        notes: {
            en: [
                "None"
            ],
            zh_CN: [
                "无"
            ],
            zh_TW: [
                "無"
            ],
        }
    },
    {
        version: [
            "1.1.0-rc"
        ],
        notes: {
            en: [
                "Change style",
                "Fix bugs and improve performance"
            ],
            zh_CN: [
                "更改样式",
                "修复错误并提升性能"
            ],
            zh_TW: [
                "更改樣式",
                "修復錯誤並提升性能"
            ],
        }
    },
    {
        version: [
            "1.2.0-rc"
        ],
        notes: {
            en: [
                "Plan combination mode"
            ],
            zh_CN: [
                "方案组合模式"
            ],
            zh_TW: [
                "方案組合模式"
            ],
        }
    },
    {
        version: [
            "1.2.0-rc1"
        ],
        notes: {
            en: [
                "Chart highlighting",
                "Click revenue and expenditure plan to apply",
                "Fix bugs"
            ],
            zh_CN: [
                "图表选中高亮",
                "点击其他收支方案以应用",
                "修复错误"
            ],
            zh_TW: [
                "圖表選中高亮",
                "點擊其他收支方案以應用",
                "修復錯誤"
            ],
        }
    },
    {
        version: [
            "1.2.0-rc2"
        ],
        notes: {
            en: [
                "Fix bug"
            ],
            zh_CN: [
                "修复错误"
            ],
            zh_TW: [
                "修復錯誤"
            ],
        }
    },
    {
        version: [
            "1.2.0",
            "1.2.0-offline"
        ],
        notes: {
            en: [
                "Fix some bugs"
            ],
            zh_CN: [
                "修复错误"
            ],
            zh_TW: [
                "修復錯誤"
            ],
        }
    },
    {
        version: [
            "1.2.1",
            "1.2.1-offline"
        ],
        notes: {
            en: [
                "Update Chapter 13"
            ],
            zh_CN: [
                "更新13章"
            ],
            zh_TW: [
                "更新13章"
            ],
        }
    },
    {
        version: [
            "1.3.0-rc",
        ],
        notes: {
            en: [
                "Plan combination mode - easy to change date",
                "Update contract data",
                "Add release notes",
                "Various optimizations",
                "Fix bug"
            ],
            zh_CN: [
                "后勤组合排序模式 - 更方便地修改开始结束日期",
                "更新契约数据",
                "增加版本更新通知",
                "各种优化",
                "修复错误"
            ],
            zh_TW: [
                "後勤組合排序模式 - 更方便地修改開始結束日期",
                "更新契約數據",
                "增加版本更新通知",
                "各種優化",
                "修復錯誤"
            ],
        }
    },
    {
        version: [
            "1.3.0",
            "1.3.0-offline"
        ],
        notes: {
            en: [
                "Save demand",
                "Save revenue and expenditure value",
                "No longer compatible with IE or other outdated browsers",
                "Various optimizations",
                "Fix bug"
            ],
            zh_CN: [
                "保存需求量",
                "保存其他收支值",
                "不再兼容IE或其他过时浏览器",
                "各种优化",
                "修复错误"
            ],
            zh_TW: [
                "保存需求量",
                "保存其他收支值",
                "不再兼容IE或其他過時瀏覽器",
                "各種優化",
                "修復錯誤"
            ],
        }
    },
    {
        version: [
            "1.3.1",
            "1.3.1-offline"
        ],
        notes: {
            en: [
                "Change URL: chantx.net, the original URL will automatically jump to the new URL",
                "Fix bug"
            ],
            zh_CN: [
                "更改网址: chantx.net, 原有网址由于某些原因可能很难访问",
                "修复错误"
            ],
            zh_TW: [
                "更改網址: chantx.net, 原網址將會自動跳轉到新網址",
                "修復錯誤"
            ],
        }
    },
]
