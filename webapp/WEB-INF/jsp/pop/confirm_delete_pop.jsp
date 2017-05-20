<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2017-05-20
  Time: 오후 3:42
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html;charset=utf-8" %>

<!DOCTYPE html>
<html lang="ko" xml:lang="ko">
<head>
    <%@include file="/WEB-INF/jsp/inc/inc_board_header.jsp"%>
    <script type="text/javascript" src="/js/pop/confirm_delete_pop.js?<%=verSion%>"></script>
</head>

<body>
    <form id="frm" method="post">
        <input type="hidden" id="BOARD_TITLE" 		name="BOARD_TITLE" 	 value="<%=request.getParameter("BOARD_TITLE")%>"	    />
    </form>

<div class="pop_wrap">

    <!-- 팝업 헤더 -->
    <div class="pop_header">
        <h1>해당 게시글을 삭제 하시겠습니까?</h1>
        <a href="#none" id="btn_close" class="btn_popclose"><img src="/img/btn_popclose.gif" alt="popup close"></a>
    </div>
    <!-- //팝업 헤더 -->

    <!-- 팝업 컨텐츠 -->
    <div class="pop_container">

        <!-- caution -->
        <div class="caution_box" style="padding:0 0 10px;">
            <span class="caution_box_thumb icon1"></span>
			<span class="caution_box_txt txt1">
				<strong>제목 : <span id="boardName"></span></strong>
			</span>
        </div>
        <!-- //caution -->

        <!-- 하단버튼 -->
        <div class="tac">
            <a href="#none" id="btnDel" class="btn_style1_b"><span>Confirm</span></a>
            <a href="#none" id="btnCancle" class="btn_style1"><span>Cancel</span></a>
        </div>
        <!-- //하단버튼 -->

    </div>
    <!-- //팝업 컨텐츠 -->
</div>

</body>
</html>
