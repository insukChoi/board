// 전역변수 영역
var board_write={};

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

        // '게시하기' 버튼 클릭시
        this.addEvent('#btn_registerPost', 'click', function(){
            if($("#frm").valCheck()){
                var boardSubmit = new common.board.BoardSubmit("frm");
                boardSubmit.setUrl("/register.do"); // 게시글 게시하기
                boardSubmit.submit();
            }
        });


    }
}))();

