// 전역변수 영역
var board_mody={};

new (Board.extend({
    onload:function() {
        _this = this;

        // jQuery 발리데이션 체크
        $("#frm").validationEngine();

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
            var boardSubmit = new common.board.BoardSubmit();
            boardSubmit.setUrl("/deletePost.do");
            boardSubmit.addParam("BOARD_NO",  $("#BOARD_NO"	).val());
            boardSubmit.submit();
        });
        
        // '쓰기' 버튼 클릭시
        this.addEvent('#btn_writePost', 'click', function(){
            $("#TITL_DIV").html('<input type="text" style="width:100%;" id="TITLE" name="TITLE" class="validate[custom[maxbyte,notNull,htmlTag]]" Length="500" maxlength="500">');
            $("#CONT_DIV").html('<textarea style="border:0;width:100%;height:148px;" id="CONTENT" name="CONTENT"></textarea>')
            
            $("#TITLE").val($("#BOARD_TITLE").val());
            $("#CONTENT").val($("#BOARD_CONTENT").val());
            setCaretAtEnd($("#CONTENT")); // 마지막 글자에 focus 맞추기
            
            // '쓰기' 버튼은 '취소' 버튼으로 바뀜
            $("#btn_writePost").hide();
            $("#btn_cancelPost").show();
        });

        // '취소' 버튼 클릭시
        this.addEvent('#btn_cancelPost', 'click', function(){
            $("#TITL_DIV").html($("#BOARD_TITLE").val());
            $("#CONT_DIV").html($("#BOARD_CONTENT").val());
            // '취소' 버튼은 '쓰기' 버튼으로 바뀜
            $("#btn_writePost").show();
            $("#btn_cancelPost").hide();
        });

        // '수정' 버튼 클릭시
        this.addEvent('#btn_modyfyPost', 'click', function(){
            if($("#btn_writePost").css('display') != 'none'){
                common.board.info("'쓰기' 버튼을 통해 수정해주세요.")
                return;
            }
            if($("#frm").valCheck()){
                var boardSubmit = new common.board.BoardSubmit("frm");
                boardSubmit.setUrl("/modify.do"); // 게시글 수정하기
                boardSubmit.submit();
            }
        });

        // 게시자 링크 클릭시
        this.addEvent('#whoPosted', 'click', function(){
            board_mody.whoPosted();
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