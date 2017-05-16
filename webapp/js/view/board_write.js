// 전역변수 영역
var board_write={};

new (Board.extend({
    onload:function() {
        _this = this;



    }, event:function() {
        //--- define event action ---//

        // jQuery 발리데이션 체크
        $("#frm").validationEngine();

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

        // '게시하기' 버튼 클릭시
        this.addEvent('#registerPost', 'click', function(){
            if($("#frm").valCheck()){
                // 게시글 게시하기
                var boardSubmit = new common.board.BoardSubmit("frm");
                boardSubmit.setUrl("/register.do");
                boardSubmit.submit();
            }
        });


    }
}))();

