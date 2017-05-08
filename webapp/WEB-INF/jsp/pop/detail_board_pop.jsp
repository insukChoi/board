<%@page contentType="text/html;charset=utf-8" %>

<!DOCTYPE html>
<html lang="ko" xml:lang="ko">
<head>
    <%@include file="/WEB-INF/jsp/inc/inc_board_header.jsp"%>
    <script type="text/javascript" src="/js/pop/detail_board_pop.js?<%=verSion%>"></script>
</head>

<body style="width:420px;">
<form id="frm">
    <input type="hidden" 	name="USER_NO" 			id="USER_NO" 		value="<%=request.getParameter("USER_NO") %>" />
</form>

<div class="pop_wrap">

    <!-- 팝업 헤더 -->
    <div class="pop_header">
        <h1>Detail of Card User</h1>
        <a href="#none" class="btn_popclose"><img src="/img/btn_popclose.gif" alt="popup close"></a>
    </div>
    <!-- //팝업 헤더 -->

    <!-- 팝업 컨텐츠 -->
    <div class="pop_container">

        <!-- title -->
        <div class="ly2_pop_title_wrap">
            <div class="left"><h2 class="bul_2">User</h2></div>
        </div>
        <!-- //title -->

        <!-- membinfo_wrap -->
        <div class="membinfo_wrap mgb10">

            <!-- 사진,회사명,이름 -->
            <div class="baseinfo_wrap">
                <!-- 사용자사진 -->
                <div class="photo_box">
                    <div class="photo_box_fix">
                        <span class="bg"></span>
                        <img id="PRFL_PHTG" src="/img/user.png" alt="">
                        <a href="#none" class="heart on" title=""></a> <!-- class="on,off" 있음 -->
                    </div>
                </div>
                <!-- //사용자사진 -->
                <!-- 기본정보 -->
                <dl>
                    <dt class="txt_b" id="BSNN_NM"></dt>
                    <dd><label id="DVSN_NM"></label>&nbsp;|&nbsp;<label id="JBCL_NM"></label></dd>
                    <dd class="name" id="FLNM"></dd>
                </dl>
                <!-- //기본정보 -->
            </div>
            <!-- //사진,회사명,이름 -->
            <!-- (추가)(PARK)20160704 -->
            <!-- 전화,메일,주소 -->
            <div class="telmailadd_wrap">
                <ul class="w_both">
                    <li class="icon_mobi"></li>
                    <li class="icon_tel"></li>
                </ul>
                <ul>
                    <li class="icon_mail"></li>
                    <li class="icon_addr"></li>
                </ul>
            </div>
            <!-- //전화,메일,주소 -->
            <!-- //(추가)(PARK)20160704 -->
        </div>
        <!-- //membinfo_wrap -->

        <!-- title -->
        <div class="ly2_pop_title_wrap">
            <div class="left"><h2 class="bul_2">Card Information</h2></div>
        </div>
        <!-- //title -->

        <div class = "card_list_div" style="max-height: 280px;overflow: auto;">
        </div>

        <!-- title -->
        <div class="ly2_pop_title_wrap">
            <div class="left"><h2 class="bul_2">History</h2></div>
        </div>
        <!-- //title -->

        <!-- 정보박스(4) -->
        <div class="info_box4 mgb15">
            <table summary="">
                <caption></caption>
                <colgroup>
                    <col style="width:100px;">
                    <col>
                <tbody>
                </tbody>
            </table>
        </div>
        <!-- //정보박스(4) -->

        <!-- 하단버튼 -->
        <div class="tac">
            <a href="#none" class="btn_style1" style="cursor: pointer;"><span>Close</span></a>
        </div>
        <!-- //하단버튼 -->

    </div>
    <!-- //팝업 컨텐츠 -->
</div>
</body>
</html>
