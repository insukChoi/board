<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2017-05-15
  Time: 오후 19:16
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html;charset=utf-8" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@include file="/WEB-INF/jsp/inc/inc_board_header.jsp"%>
    <script type="text/javascript" src="/js/view/board_mody.js?<%=verSion%>"></script>
</head>

<body class="lnb_bg">

<!-- wrap -->
<div class="wrap">
    <%@include file="/WEB-INF/jsp/inc/inc_board_left.jsp"%>
    <form id="frm" method="post">
        <input type="hidden" id="BOARD_NO" 		name="BOARD_NO" 	value="${BOARD.num}"	/>

    <!-- container -->
    <div class="container" >

        <div class="content">
            <div class="content_wrap">
                <!-- 타이틀 영역 -->
                <div class="tit_wrap">
                    <h1>공지사항</h1>
                </div>
                <!-- //타이틀 영역 -->

                <!-- 버튼영역 -->
                <div class="btn_wrap">
                    <a href="#none" class="btn_sty" id="toList"><span>목록</span></a>
                    <a href="#none" class="btn_sty" id="modyfyPost"><span>수정</span></a>
                    <a href="#none" class="btn_sty" id="deletePost"><span>삭제</span></a>
                    <a href="#none" class="btn_sty"><span>쓰기</span></a>
                </div>
                <!-- //버튼영역 -->

                <!-- 테이블 영역 -->
                <div class="tbl_input mgb11">
                    <table summary="">
                        <caption></caption>
                        <colgroup><col style="width:15%;"><col ><col style="width:15%;"><col ></colgroup>
                        <tbody>
                        <tr>
                            <th><div>제목</div></th>
                            <td colspan="3"><div>${BOARD.title}</div></td>
                        </tr>
                        <tr>
                            <th><div>게시자</div></th>
                            <td><div><a href="#none" id="whoPosted" name="whoPosted">${BOARD.userId}</a></div></td>
                            <th><div>등록일</div></th>
                            <td><div>${BOARD.regDate}</div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- //테이블 영역 -->

                <!-- editbox -->
                <div class="editbox" style="height:150px;">
                    ${BOARD.content}
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
                                <a href="#none" class="add_file">첨부파일</a>
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