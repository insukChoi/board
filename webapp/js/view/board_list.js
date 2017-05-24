// 전역변수 영역
var board_list={};

new (Board.extend({
    onload:function() {
        _this = this;

        // Callback alert 창
        common.board.callbackAlert($("#PROCESS_CODE").val());

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

        /***************************************************************************************************************
         * ***********************************************  Button Control *********************************************
         ****************************************************************************************************************/
        // 조회버튼 클릭시
        this.addEvent('#btn_search', 'click', function(){
            board_list.fillTable();
        });
        
        // 검색창 엔터시
        this.addEvent('#searchText', 'keypress', function(e){
            if (e.keyCode == 13){
                board_list.fillTable();
            }
        });

        // 뒤로가기 방지
        $(document).on("keydown", function (e) {
            if (e.which === 8 && !$(e.target).is("input, textarea")) {
                e.preventDefault();
            }
        });


    }
}))();

/*
 * init 초기화 함수
 */
board_list.init = function(){

    // 페이지 사이즈 쿠키값 셋팅
    if($.cookie("PAGE_SIZE")){
        $("#PAGE_SZ").find("span").text($.cookie("PAGE_SIZE"));
    }

    // 페이징 처리
    var input;
    if (!input) input = {};

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

    var boardSubmit = new common.board.BoardSubmitUsingGet();
    boardSubmit.setUrl("/list.do");
    boardSubmit.addParam("PAGE_NO"      , input["PAGE_NO"]       );
    boardSubmit.addParam("PAGE_SZ"      , $("#PAGE_SZ").text()   );
    boardSubmit.addParam("SEARCH_TEXT"  , $("#searchText").val() );
    boardSubmit.submit();
};
/*
 * 수정화면으로 이동
 */
board_list.toModyPostView = function (boardNo) {
    $("#BOARD_NO"	).val(	boardNo		);

    // 메인 화면으로 이동
    var boardSubmit = new common.board.BoardSubmitUsingGet();
    boardSubmit.setUrl("/modyPosting.do");
    boardSubmit.addParam("BOARD_NO",  $("#BOARD_NO"	).val());
    boardSubmit.submit();
};