var common;
if (!common) common = {};

if(!common.board) {
    common.board = {};


    /*
     * Null 체크 함수
     */
    common.board.isNull = function(str) {
        if (str == null) return true;
        if (str == "NaN") return true;
        if (new String(str).valueOf() == "undefined") return true;
        var chkStr = new String(str);
        if (chkStr.valueOf() == "undefined") return true;
        if (chkStr == null) return true;
        if (chkStr.toString().length == 0 ) return true;
        return false;
    }
    /*
     * 공통 Form submit 함수
     */
    common.board.BoardSubmit = function(opt_formId) {
        this.formId = isNull(opt_formId) == true ? "commonForm" : opt_formId;
        this.url = "";

        if(this.formId == "commonForm"){
            $("#commonForm")[0].reset();
        }
        this.setUrl = function setUrl(url){
            this.url = url;
        };
        this.addParam = function addParam(key, value){
            $("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"' >"));
        };

        this.submit = function submit(){
            var frm = $("#"+this.formId)[0];
            frm.action = this.url;
            frm.method = "post";
            frm.submit();
        };
    }
    /*
     * jQuery Toast Message
     */
    common.board.getFullMsg = function(obj, msg){
        var fullMsg = "";
        var code = "";

        if(typeof(obj) == "object") {
            code = obj.COMMON_HEAD["CODE"];
            msg = obj.COMMON_HEAD["MESSAGE"];

            fullMsg = msg;
        }
        else {
            code = obj;

            fullMsg = code;
        }

        return fullMsg;
    };
    common.board.error = function(obj, msg){
        if(typeof(parent.toastr) != "undefined") {
            parent.toastr.error(common.board.getFullMsg(obj, msg));
        }
        else {
            toastr.error(common.board.getFullMsg(obj, msg));
        }

        $.unblockUI();
    };

    common.board.info = function(obj, msg){
        if(typeof(parent.toastr) != "undefined") {
            parent.toastr.info(common.board.getFullMsg(obj, msg));
        }
        else {
            toastr.info(common.board.getFullMsg(obj, msg));
        }
        $.unblockUI();
    };

    common.board.warning = function(obj, msg){
        if(typeof(parent.toastr) != "undefined") {
            parent.toastr.warning(common.board.getFullMsg(obj, msg));
        }
        else {
            toastr.warning(common.board.getFullMsg(obj, msg));
        }

        $.unblockUI();
    };

    common.board.success = function(obj, msg){
        if(typeof(parent.toastr) != "undefined") {
            parent.toastr.success(common.board.getFullMsg(obj, msg));
        }
        else {
            toastr.success(common.board.getFullMsg(obj, msg));
        }

        $.unblockUI();
    };


}


/**
 * smartPopup Open 함수
 * @param option
 * @return
 */
function open_smartPop(opt){
    var doc;
    try {
        doc = window.parent;
        doc.smartOpenPop( opt );
    }catch(e){
        smartOpenPop( opt );
    }
}

/**
 * smartPopUp Close 함수
 * @param clllback 리턴받을 함수
 * @param data     리턴함수에 전달한 JSON DATA
 * */
function close_smartPop(callbackFn, data){
    var doc;
    try{
        doc = window.parent;
        doc.smartClosePop(callbackFn , data);
    }catch(e){

        //window.close();
        smartClosePop(callbackFn , data); //smartClosePop
    }
}

function smartOpenPop(option){
    var isIE  = !$.support.opacity && !$.support.style; // IE7 & IE8
    var isIE6 = isIE && !window.XMLHttpRequest; // IE6
    var element = document.createElement("div");
    $(element).attr({id: "colorbox", 'class': isIE ? "smartPop" + (isIE6 ? 'IE6' : 'IE') : ''}).hide();
    var smartPop = $(element).smartPop(option);
    _popList.push(smartPop);
}

function smartClosePop(callbackFn , data){
    if(_popList.length > 0){
        var targetDocument = _popList[_popList.length-1].getSettings().target;
        _popList[_popList.length-1].completeClose();
        _popList.pop();
        if(targetDocument != undefined || targetDocument != null){
            if(callbackFn != undefined || callbackFn != null){
                var callbackFn = targetDocument[callbackFn];
                if($.isFunction(callbackFn)){
                    callbackFn(data);
                }
            }
        }

        if(_popList.length > 0){
            //_popList[_popList.length-1].iframeTouch();
        }
    }
}
