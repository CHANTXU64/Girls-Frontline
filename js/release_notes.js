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
    Modal.alert(getReleaseNotesHTML(0, release_notes_length - 1), language.JS.release_notes_title);
}

function getReleaseNotesHTML(previous_version_index, current_version_index) {
    let html = "";
    for (let i = previous_version_index; i <= current_version_index; ++i) {
        let release_note = release_notes[i];
        html += '<h5>';
        html += release_note.version[0];
        if (release_note.version[1] !== undefined) {
            html += ' / ' + release_note.version[1];
        }
        html += '</h5>';
        let notes = release_note.notes[language.version_note_lang];
        for (let ii = 0; ii < notes.length; ++ii) {
            html += ' - ' + notes[ii] + '<br>';
        }
        html += '<br>';
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
            zh_CN: [
                "正式发布"
            ],
            zh_TW: [
                "正式發布"
            ],
            en: [
                "Official release"
            ]
        }
    },
    {
        version: [
            "1.0.1",
            "1.0.1-offline"
        ],
        notes: {
            zh_CN: [
                "修复错误并提升性能"
            ],
            zh_TW: [
                "修復錯誤並提升性能"
            ],
            en: [
                "Fix bugs and improve performance"
            ]
        }
    },
    {
        version: [
            "1.0.2",
            "1.0.2-offline"
        ],
        notes: {
            zh_CN: [
                "无"
            ],
            zh_TW: [
                "無"
            ],
            en: [
                "None"
            ]
        }
    },
    {
        version: [
            "1.0.3",
            "1.0.3-offline"
        ],
        notes: {
            zh_CN: [
                "无"
            ],
            zh_TW: [
                "無"
            ],
            en: [
                "None"
            ]
        }
    },
    {
        version: [
            "1.1.0-rc"
        ],
        notes: {
            zh_CN: [
                "更改样式",
                "修复错误并提升性能"
            ],
            zh_TW: [
                "更改樣式",
                "修復錯誤並提升性能"
            ],
            en: [
                "Change style",
                "Fix bugs and improve performance"
            ]
        }
    },
    {
        version: [
            "1.2.0-rc"
        ],
        notes: {
            zh_CN: [
                "方案组合模式"
            ],
            zh_TW: [
                "方案組合模式"
            ],
            en: [
                "Plan combination mode"
            ]
        }
    },
    {
        version: [
            "1.2.0-rc1"
        ],
        notes: {
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
            en: [
                "Chart highlighting",
                "Click revenue and expenditure plan to apply",
                "Fix bugs"
            ]
        }
    },
    {
        version: [
            "1.2.0-rc2"
        ],
        notes: {
            zh_CN: [
                "修复错误"
            ],
            zh_TW: [
                "修復錯誤"
            ],
            en: [
                "Fix bug"
            ]
        }
    },
    {
        version: [
            "1.2.0",
            "1.2.0-offline"
        ],
        notes: {
            zh_CN: [
                "修复错误"
            ],
            zh_TW: [
                "修復錯誤"
            ],
            en: [
                "Fix some bugs"
            ]
        }
    },
    {
        version: [
            "1.2.1",
            "1.2.1-offline"
        ],
        notes: {
            zh_CN: [
                "更新13章"
            ],
            zh_TW: [
                "更新13章"
            ],
            en: [
                "Update Chapter 13"
            ]
        }
    }
]
