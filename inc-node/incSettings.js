
var _KR_InstanceType = "developing";
var _KG_Debug = true;
var _gServers = [];
_gServers[0] = {
    KS_Host: "",
    KS_Name: "",
    KS_User: "",
    KS_Pswd: ''
};

if (_KR_InstanceType == "developing") {
    _gServers[0] = {
        KS_Host: "localhost",
        KS_Name: "", // Nombre de la base
        KS_User: "root",
        KS_Pswd: 'root'
    };
} else

if (_KR_InstanceType == "production") {
    _KG_Debug = false;
} 

export const KS_AppName = "Dashboard";
export const KSVN_Version = "01.00.00";
export const KSVN_VDate = "2025 / 01 / 01";
export const KR_InstanceType = _KR_InstanceType;
export const KG_Debug = _KG_Debug;
export const gServers = _gServers;