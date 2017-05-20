// 전역변수 영역
var confirm_delete_pop={};

new (Board.extend({
    onload:function() {
        _this = this;

        $("#boardName").html($("#BOARD_TITLE").val());


    }, event:function() {
        //--- define event action ---//

        /***************************************************************************************************************
         * ***********************************************  Button Control *********************************************
         ****************************************************************************************************************/
        // 팝업 닫기 버튼 클릭시
        this.addEvent('#btnCancle, .btn_popclose, .btn_style1', 'click', function(){
            close_smartPop();
        });

        // 삭제 버튼 클릭시
        this.addEvent('#btnDel', 'click', function(){
            parent.board_mody.deleteAct();
            close_smartPop();
        });



    }
}))();
