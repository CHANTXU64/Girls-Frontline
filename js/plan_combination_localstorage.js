const LOCAL_STORAGE_KEY_PC = "GF_Logistics_PC_v" + VERSION.slice(0, VERSION.indexOf(".")) + ".x.x";

function PC_storageSetItem(Key, Value) {
    if (CAN_STORAGE_WORK) {
        let storageValue = localStorage.getItem(LOCAL_STORAGE_KEY_PC);
        try {
            let Value = JSON.parse(storageValue);
            storageValue = Value;
        } catch (ex) {
            console.error("storageGetItem, storage: " + storageValue);
            storageValue = {};
        }
        if (storageValue === null)
            storageValue = {};
        storageValue[Key] = Value;
        storageValue.version = VERSION;
        storageValue = JSON.stringify(storageValue);
        localStorage.setItem(LOCAL_STORAGE_KEY_PC, storageValue);
    }
}

function PC_storageGetItem(Key) {
    if (CAN_STORAGE_WORK) {
        let storageValue = localStorage.getItem(LOCAL_STORAGE_KEY_PC);
        if (storageValue === null)
            return "noStorage";
        else {
            try {
                let Value = JSON.parse(storageValue);
                storageValue = Value;
            } catch (ex) {
                console.error("storageGetItem, storage: " + storageValue);
                storageValue = {};
            }
            let Value = storageValue[Key];
            if (Value === undefined)
                return "noStorage";
            else
                return Value;
        }
    }
    else
        return "noStorage";
}