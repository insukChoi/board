var common;
if (!common) common = {};

var contentId = location.search.split("=")[1];

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
        this.formId = common.board.isNull(opt_formId) == true ? "commonForm" : opt_formId;
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


    /**
     * 페이징처리
     * @param  div_id		페이징 표시할 요소 id
     * @param  callback		페이징 표시 후 실행될 함수
     * @param  curPageNo	현재페이지 번호
     * @param  totPage		전체페이지 번호
     */
    common.board.drawTablePaing = function( div_id, callback, curPageNo, totRec/*totPage*/, recPerPage/*input_page_size*/) {
        var page_size = 10; //표시할 페이지 수
        var totPage = Math.ceil(totRec/recPerPage);
        var currentPage  = (curPageNo)?curPageNo:1;
        if(parseInt(currentPage) < 1) currentPage = 1;
        if(parseInt(currentPage) > parseInt(totPage)) currentPage = totPage;
        var lastBlock    = Math.ceil(totPage/page_size);
        var currentBlock = Math.ceil(currentPage/page_size);
        var firstPage     = currentBlock*page_size-page_size+1;
        var lastPage      = currentBlock*page_size;


        $("#"+div_id).children().remove();
        $("#"+div_id).prev(".combo_wrap").show();
        if(totPage > 0){

            var firstHtml = "<a id='paging_first' href='javascript:' class='btn_pag_cntr first'><span class='blind'>first</span></a>";
            var prevHtml  = "<a id='paging_pre' href='javascript:' class='btn_pag_cntr prev'><span class='blind'>previous</span></a>";
            var nextHtml  = "<a id='paging_next' href='javascript:' class='btn_pag_cntr next'><span class='blind'>next</span></a>";
            var lastHtml  = "<a id='paging_last' href='javascript:' class='btn_pag_cntr last'><span class='blind'>last</span></a>";
            var pageHtml  = "<span class='pag_num'>";
            var countNum=0;

            for(var i = firstPage; i <= lastPage && i <= totPage;  i++){
                if(currentPage == i){
                    pageHtml += "<a class='on'>"+i+"</a>";
                }else{
                    pageHtml += "<a>"+i+"</a>";
                }
            }
            pageHtml += " </span>";

            $("#"+div_id).append(firstHtml);
            $("#"+div_id).append(prevHtml);
            $("#"+div_id).append(pageHtml);
            $("#"+div_id).append(nextHtml);
            $("#"+div_id).append(lastHtml);

            if(currentPage != 1){
                $("#paging_first").addClass("on");
            }

            if(currentPage != totPage){
                $("#paging_last").addClass("on");
            }

            if(currentBlock != 1){
                $("#paging_pre"  ).addClass("on");
            }

            if(currentBlock != lastBlock){
                $("#paging_next").addClass("on");
            }

        }else{
            $("#"+div_id).prev(".combo_wrap").hide();
        }


        var input = {};
        $("#"+div_id).find("#paging_first").click(function(){

            if($(this).hasClass("on")==false){ return false;}

            if($.isFunction(callback)){
                input["PG_NO"] = 1;
                input["PAGE_NO"] = 1;
                callback(input);
            }
        });
        $("#"+div_id).find("#paging_pre").click(function(){

            if($(this).hasClass("on")==false){ return false;}

            currentBlock--;
            currentPage = currentBlock*page_size-page_size+1;

            //currentPage--;

            if(currentPage < 0) currentPage = 1;
            if($.isFunction(callback)){
                input["PG_NO"] = currentPage;
                input["PAGE_NO"] = currentPage;
                callback(input);
            }
        });
        $("#"+div_id).find("#paging_next").click(function(){

            if($(this).hasClass("on")==false){ return false;}
            currentBlock++;
            currentPage = currentBlock*page_size-page_size+1;

            //currentPage++;

            if(currentPage > totPage){
                currentPage = totPage;
            }

            if($.isFunction(callback)){
                input["PG_NO"] = currentPage;
                input["PAGE_NO"] = currentPage;
                callback(input);
            }
        });
        $("#"+div_id).find("#paging_last").click(function(){

            if($(this).hasClass("on")==false){ return false;}

            if($.isFunction(callback)){
                input["PG_NO"] = totPage;
                input["PAGE_NO"] = totPage;
                callback(input);
            }
        });
        $("#"+div_id).find(".pag_num a").click(function(){

            if($(this).hasClass("on")==true){ return false;}

            currentPage = $(this).html();

            if($.isFunction(callback)){
                input["PG_NO"] = currentPage;
                input["PAGE_NO"] = currentPage;
                callback(input);
            }
        });

        $("#"+div_id).prev(".combo_wrap").find(".combo_style").click(function(e){
            $(this).find("ul").toggle();
            //Keeps the rest of the handlers from being executed
            e.stopImmediatePropagation();
        });

        $("#"+div_id).prev(".combo_wrap").find("ul li").click(function(e){
            $("#"+div_id).parents(".paging_wrap").find(".combo_style ul").hide();
            if($(".paging_wrap").find(".btn_combo_down span").text() != $(this).text()){
                $(".paging_wrap").find(".btn_combo_down span").text($(this).text());

                $.cookie("PAGE_SIZE", Number($.trim($(this).text()).replace(/[^0-9]/gi, '')) ,{expires:20*365});
                callback();
            }
            e.stopImmediatePropagation();
        });

        $("body").click(function(e){
            var _target = $(e.target);
            if(!_target.parents().is('.combo_wrap') && !_target.is('.btn_combo_down')){
                $("#"+div_id).parents(".paging_wrap").find(".combo_style ul").hide();
            }
        });
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
