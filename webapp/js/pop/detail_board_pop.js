// 전역변수 영역
var detail_board_pop={};

new (Board.extend({
    onload:function() {
        _this = this;



    }, event:function() {
        //--- define event action ---//

        /***************************************************************************************************************
         * ***********************************************  Button Control *********************************************
         ****************************************************************************************************************/
        // 팝업 닫기 버튼 클릭시
        this.addEvent('.btn_popclose, .btn_style1', 'click', function(){
            close_smartPop();
        });


    }
}))();
