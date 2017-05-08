// 전역변수 영역
var board_list={};

new (Board.extend({
    onload:function() {
        _this = this;

      

    }, event:function() {
        //--- define event action ---//

        /***************************************************************************************************************
         * ***********************************************  Table Control *********************************************
         ****************************************************************************************************************/
        // Tr 클릭시
        this.addEvent('#TABLE_RESULT tr', 'click', function(){
            board_list.isUserDetailFn();
        });


    }
}))();


board_list.isUserDetailFn = function (boardNo,clphNo, clphNtnlCd, userNm,bizNm,ptlId,chnlId,useInttId,regUserId,deptNm,emailAdr) {
    $("#BOARD_NO"	).val(	boardNo		);
    open_smartPop({href: "/detail_pop.do", width: 420, height: 654, scrolling : false , target : window, frm:$("#frm")});
};