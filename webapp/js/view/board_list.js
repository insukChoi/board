// 전역변수 영역
var board_list={};

new (Board.extend({
    onload:function() {
        _this = this;

        switch ($("#PROCESS_CODE").val()) {
            case "C" :
                common.board.success("정상적으로 등록되었습니다.");
                break;
            case "U" :
                common.board.success("성공적으로 수정되었습니다.");
                break;
            case "D" :
                common.board.success("삭제 완료 되었습니다.");
                break;
            default  :
                break;
        }

        // init 함수
        board_list.init();


    }, event:function() {
        //--- define event action ---//

        /***************************************************************************************************************
         * ***********************************************  Table Control *********************************************
         ****************************************************************************************************************/
        // Tr 클릭시
        this.addEvent('#TABLE_RESULT tr', 'click', function(){
            board_list.toModyPostView($(this).attr("boardNum"));
        });


    }
}))();

/*
 * init 초기화 함수
 */
board_list.init = function(){

    // 페이징 처리
    var input;
    if (!input) input = {};

    // 페이지 사이즈 쿠키값 셋팅
    if($.cookie("PAGE_SIZE")){
        $("#PAGE_SZ").find("span").text($.cookie("PAGE_SIZE"));
    }
    // 페이지 넘버 셋팅
    if($("#PAGE_NO").val()){
        input["PAGE_NO"] = $("#PAGE_NO").val();
    }
    if (common.board.isNull(input["PAGE_NO"])) input["PAGE_NO"] = "1";

    common.board.drawTablePaing("CREATE_PG_LINK", board_list.fillTable, input["PAGE_NO"], $("#CNT").val(), $("#PAGE_SZ").text());
};
/*
 * 목록 조회
 */
board_list.fillTable = function(input){

    if (!input) input = {};
    if (common.board.isNull(input["PAGE_NO"])) input["PAGE_NO"] = "1";

    var boardSubmit = new common.board.BoardSubmit();
    boardSubmit.setUrl("/list.do");
    boardSubmit.addParam("PAGE_NO", input["PAGE_NO"]);
    boardSubmit.addParam("PAGE_SZ", $("#PAGE_SZ").text());
    boardSubmit.submit();
};
/*
 * 수정화면으로 이동
 */
board_list.toModyPostView = function (boardNo) {
    $("#BOARD_NO"	).val(	boardNo		);

    // 메인 화면으로 이동
    var boardSubmit = new common.board.BoardSubmit();
    boardSubmit.setUrl("/modyPosting.do");
    boardSubmit.addParam("BOARD_NO",  $("#BOARD_NO"	).val());
    boardSubmit.submit();
};