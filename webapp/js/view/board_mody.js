// 전역변수 영역
var board_mody={};

new (Board.extend({
    onload:function() {
        _this = this;

        // jQuery 발리데이션 체크
        $("#frm").validationEngine();

        // Callback alert 창
        common.board.callbackAlert($("#PROCESS_CODE").val());

        // 댓글 가져오기
        common.board.ajax("json", "/replyList.do", $("#frm"), board_mody.makeReplyHtml);

    }, event:function() {
        //--- define event action ---//

        /***************************************************************************************************************
         * ***********************************************  Button Control *********************************************
         ****************************************************************************************************************/
        // '목록' 버튼 클릭시
        this.addEvent('#btn_toList', 'click', function(){
            var boardSubmit = new common.board.BoardSubmit();
            boardSubmit.setUrl("/list.do"); // 메인 화면으로 이동
            boardSubmit.submit();
        });

        // '삭제' 버튼 클릭시
        this.addEvent('#btn_deletePost', 'click', function(){
            open_smartPop({href: "/confirm_del_pop.do", width: 420, height: 220, scrolling : false , target : window, frm:$("#frm")});
        });

        // '완료' 버튼 클릭시
        this.addEvent('#btn_modyConfirmPost', 'click', function(){
            if($("#frm").valCheck()){
                var boardSubmit = new common.board.BoardSubmitUsingGet("frm");
                boardSubmit.setUrl("/modify.do"); // 게시글 수정하기
                boardSubmit.submit();
            }
        });

        // '수정' 버튼 클릭시
        this.addEvent('#btn_modyfyPost', 'click', function(){+
            $("#TITL_DIV").html('<input type="text" style="width:100%;" id="TITLE" name="TITLE" class="validate[custom[maxbyte,notNull,htmlTag]]" Length="500" maxlength="500">');
            $("#CONT_DIV").html('<textarea style="border:0;width:100%;height:148px;" id="CONTENT" name="CONTENT"></textarea>')

            $("#TITLE").val($("#BOARD_TITLE").val());
            $("#CONTENT").val($("#BOARD_CONTENT").val());
            setCaretAtEnd($("#CONTENT")); // 마지막 글자에 focus 맞추기

            // '수정' 버튼은 '취소' 버튼으로 바뀜
            $("#btn_modyfyPost").hide();
            $("#btn_modyConfirmPost").show();
        });

        // 게시자 링크 클릭시
        this.addEvent('#whoPosted', 'click', function(){
            board_mody.whoPosted(); // 등록자 상세정보 팝업
        });
        
        // 댓글 추가
        this.addEvent('#addReply', 'click', function () {
            if($("#commtCntn").val() == ""){
                common.board.warning("댓글을 입력하세요.");
                return;
            }
            common.board.ajax("json", "/addReply.do", $("#frm"), board_mody.doneAddReply);
        });

        // 댓글 삭제
        $( document ).on("click", "a[name=commtDel]", function(e){
            $("#TEMP_REPLY_NO").val($(this).closest(".reply_li").attr("replyNum"));
            common.board.ajax("json", "/removeReply.do", $("#frm"), board_mody.doneRemoveReply);
        });

        // 댓글 수정
        $( document ).on("click", "a[name=commtMod]", function(e){
            $(this).attr("name","commtModCancel"); // 수정 취소 버튼으로 변경

            var modyHtml = "";
            modyHtml += "<div style='margin-top: 3px;' name='commtModDiv'>";
            modyHtml += "	<textarea name='modCntn' cols='3' rows='5' style='background: rgb(255, 255, 255); border: 1px solid rgb(220, 220, 220); width: 98.5%; height: 68px; margin-top: 3px; margin-bottom: 5px; display: block; position: relative; resize: none;'>"+$(this).closest(".reply_li").find("dd[name='commt']").attr("content")+"</textarea>";
            modyHtml += "	<div class='btnwrap'>";
            modyHtml += "		<a href='#none' class='btn_write' name='commtModReg'>작성하기</a>&nbsp;";
            modyHtml += "	</div>";
            modyHtml += "</div>";
            $(this).closest(".reply_li").find("dd[name='commt']:first").html(modyHtml);
        });

        // 댓글 수정 취소
        $( document ).on("click", "a[name=commtModCancel]", function(e){
            $(this).attr("name","commtMod"); // 수정 버튼으로 변경
            $(this).closest(".reply_li").find("dd[name='commt']").html($(this).closest(".reply_li").find("dd[name='commt']").attr("content"));
        });

        // 댓글 수정 완료
        $( document ).on("click", "a[name=commtModReg]", function(e){
            $("#TEMP_REPLY_NO").val($(this).closest(".reply_li").attr("replyNum"));
            $("#TEMP_REPLY_CONT").val($(this).closest(".reply_li").find("div[name='commtModDiv']").find("textarea").val());
            common.board.ajax("json", "/modifyReply.do", $("#frm"), board_mody.doneModifyReply);
        });








    }
}))();

/***************************************************************************************************************
 * ***********************************************  User Define Function ****************************************
 ****************************************************************************************************************/
/*
 *  게시자 상세정보 팝업
 */
board_mody.whoPosted = function () {
    open_smartPop({href: "/detail_pop.do", width: 420, height: 654, scrolling : false , target : window, frm:$("#frm")});
};

/*
 * 게시글 삭제
 */
board_mody.deleteAct = function () {
    var boardSubmit = new common.board.BoardSubmit();
    boardSubmit.setUrl("/deletePost.do");
    boardSubmit.addParam("BOARD_NO",  $("#BOARD_NO"	).val());
    boardSubmit.submit();
};

/*
 * 댓글 HTML 만들기
 */
board_mody.makeReplyHtml = function (response) {
    $("#commtCntn").val("");  // 댓글 text 초기화
    $("#replyList").html(""); // 댓글 초기화
    $("#commtCnt").html(response.length); // 댓글 갯수

    var data = JSON.parse(JSON.stringify(response));
    var bHtml = "";
    for(var i=0; i < data.length; i++){
        bHtml += "<div class='reply_li' replyNum="+data[i].num+">                                                  ";
        bHtml += "    <dl name='commtDl'>                                                                          ";
        bHtml += "        <dt>                                                                                     ";
        bHtml += "            <a class='info_close'><strong>최인석</strong></a>                                    ";
        bHtml += "            <span class='date'>"+data[i].regDate+"</span>                                        ";
        bHtml += "            <div class='r_btn_box'>                                                              ";
        bHtml += "                <span>                                                                           ";
        bHtml += "                    <a name='commtMod' href='#none'>                                             ";
        bHtml += "                        <img alt='수정' src='/img/btn_icowrite.png'>                             ";
        bHtml += "                    </a>                                                                         ";
        bHtml += "                </span>                                                                          ";
        bHtml += "                <span>                                                                           ";
        bHtml += "                    <a name='commtDel' href='#none'>                                             ";
        bHtml += "                        <img alt='삭제' src='/img/btn_icodel.png'>                               ";
        bHtml += "                    </a>                                                                         ";
        bHtml += "                </span>                                                                          ";
        bHtml += "            </div>                                                                               ";
        bHtml += "        </dt>                                                                                    ";
        bHtml += "        <dd style='-ms-word-break: break-all !important;' name='commt' content="+data[i].content+">"+data[i].content+"</dd>  ";
        bHtml += "    </dl>                                                                                        ";
        bHtml += "</div>                                                                                           ";
    }

    $("#replyList").html(bHtml);
};

/*
 * 댓글 달기 Callback 함수
 */
board_mody.doneAddReply = function () {
    common.board.success("댓글이 추가됐습니다.");
    common.board.ajax("json", "/replyList.do", $("#frm"), board_mody.makeReplyHtml);
};

/*
 * 댓글 삭제 Callback 함수
 */
board_mody.doneRemoveReply = function () {
    common.board.success("댓글이 삭제되었습니다.");
    common.board.ajax("json", "/replyList.do", $("#frm"), board_mody.makeReplyHtml);
};

/*
 * 댓글 수정 Callback 함수
 */
board_mody.doneModifyReply = function () {
    common.board.success("댓글이 수정되었습니다.");
    common.board.ajax("json", "/replyList.do", $("#frm"), board_mody.makeReplyHtml);
};
