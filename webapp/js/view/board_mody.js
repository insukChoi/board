// 전역변수 영역
var board_mody={};

new (Board.extend({
    onload:function() {
        _this = this;



    }, event:function() {
        //--- define event action ---//

        /***************************************************************************************************************
         * ***********************************************  Button Control *********************************************
         ****************************************************************************************************************/
        // '목록' 버튼 클릭시
        this.addEvent('#toList', 'click', function(){
            // 메인 화면으로 이동
            var boardSubmit = new common.board.BoardSubmit();
            boardSubmit.setUrl("/list.do");
            boardSubmit.submit();
        });

        // '삭제' 버튼 클릭시
        this.addEvent('#deletePost', 'click', function(){
            // 메인 화면으로 이동
            var boardSubmit = new common.board.BoardSubmit();
            boardSubmit.setUrl("/deletePost.do");
            boardSubmit.addParam("BOARD_NO",  $("#BOARD_NO"	).val());
            boardSubmit.submit();
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