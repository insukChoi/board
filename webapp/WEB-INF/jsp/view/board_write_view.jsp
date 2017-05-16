<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2017-05-15
  Time: 오후 14:49
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html;charset=utf-8" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="/WEB-INF/jsp/inc/inc_board_header.jsp"%>
    <script type="text/javascript" src="/js/view/board_write.js?<%=verSion%>"></script>
</head>

<body class="lnb_bg">

<!-- wrap -->
<div class="wrap">
    <%@include file="/WEB-INF/jsp/inc/inc_board_left.jsp"%>
    <form id="frm" method="post">
        <input type="hidden" id="BOARD_NO" 		name="BOARD_NO" 		/>
    <!-- container -->
    <div class="container" >

        <div class="content">
            <div class="content_wrap">
                <!-- 타이틀 영역 -->
                <div class="tit_wrap">
                    <h1>게시글 등록</h1>
                </div>
                <!-- //타이틀 영역 -->

                <!-- 버튼영역 -->
                <div class="btn_wrap">
                    <a href="#none" class="btn_sty" id="toList"><span>목록</span></a>
                    <a href="#none" class="btn_sty" id="registerPost"><span>게시하기</span></a>
                </div>
                <!-- //버튼영역 -->

                <!-- 테이블 영역 -->
                <div class="tbl_input ipt mgb10"><!-- 입력시 ipt 클래스 추가 -->
                    <table summary="">
                        <caption></caption>
                        <colgroup><col style="width:15%;"><col ><col style="width:15%;"><col ></colgroup>
                        <tbody>
                        <tr>
                            <th><div>제목</div></th>
                            <td colspan="3"><div>
                                <input type="text" style="width:100%;" id="TITLE" name="TITLE" class="validate[custom[maxbyte,notNull,htmlTag]]" Length="500" maxlength="500">
                            </div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- //테이블 영역 -->

                <!-- editbox -->
                <div class="editbox" style="height:150px;">
                    <textarea style="border:0;width:100%;height:148px;" id="CONTENT" name="CONTENT"></textarea>
                </div>
                <!-- //editbox -->

                <!-- 파일첨부 -->
                <div class="tbl_input mgb10">
                    <table summary="">
                        <caption></caption>
                        <colgroup><col style="width:15%;"><col ><col style="width:15%;"><col ></colgroup>
                        <tbody>
                        <tr>
                            <th><div>파일첨부</div></th>
                            <td colspan="3"><div>
                                <div class="c_both">
                                    <div class="f_left">
                                        <select style="width:100%;height:50px;" multiple="multiple">
                                            <option>파일1</option>
                                        </select>
                                    </div>
                                    <div class="f_right">
                                        <p class="mgb5"><a href="#none" class="btn_sty_s"><span>첨부</span></a></p>
                                        <p class=""><a href="#none" class="btn_sty_s"><span>삭제</span></a></p>
                                    </div>
                                </div>
                            </div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- //파일첨부 -->
            </div>
        </div>

    </div>
    <!-- //container -->
    </form>
</div>
<!-- //wrap -->
<%@include file="/WEB-INF/jsp/inc/inc_board_footer.jsp"%>
</body>
</html>