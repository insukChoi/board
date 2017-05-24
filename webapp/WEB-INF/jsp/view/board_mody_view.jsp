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
        <input type="hidden" id="BOARD_NO" 		  name="BOARD_NO" 	     value="${BOARD.num}"	    />
        <input type="hidden" id="BOARD_TITLE" 	  name="BOARD_TITLE"     value="${BOARD.title}"	    />
        <input type="hidden" id="BOARD_CONTENT"   name="BOARD_CONTENT"   value="${BOARD.content}"	/>
        <input type="hidden" id="PROCESS_CODE" 	  name="PROCESS_CODE"    value="${PROCESS_CODE}"	/>   <!-- C: 등록, U: 수정, D: 삭제  -->
        <input type="hidden" id="TEMP_REPLY_NO"   name="TEMP_REPLY_NO"   value=""	                />   <!-- 댓글 삭제,수정시 이용       -->
        <input type="hidden" id="TEMP_REPLY_CONT" name="TEMP_REPLY_CONT" value=""	                />   <!-- 댓글 삭제,수정시 이용       -->

    <!-- container -->
    <div class="container" >

        <div class="content">
            <div class="content_wrap">
                <!-- 타이틀 영역 -->
                <div class="tit_wrap">
                    <h1>게시글 상세</h1>
                </div>
                <!-- //타이틀 영역 -->

                <!-- 버튼영역 -->
                <div class="btn_wrap">
                    <a href="#none" class="btn_sty" id="btn_toList"><span>목록</span></a>
                    <a href="#none" class="btn_sty" id="btn_deletePost"><span>삭제</span></a>
                    <a href="#none" class="btn_sty" id="btn_modyfyPost"><span>수정</span></a>
                    <a href="#none" class="btn_sty" id="btn_modyConfirmPost" style="display: none"><span>완료</span></a>
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
                            <td colspan="3"><div id="TITL_DIV">${BOARD.title}</div></td>
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
                <div class="editbox" style="height:150px;" id="CONT_DIV">
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

                <!-- 댓글 -->
                <div class="n_h_style_reply">
                    <h4>댓글 <span id="commtCnt">0</span>개</h4>
                </div>
                <div class="n_reply_writebox" id="commtBox">
                    <textarea id="commtCntn" name="commtCntn" rows="5" cols="3"></textarea>
                    <div class="btnwrap">
                        <a class="btn_write" id="addReply">작성하기</a>
                    </div>
                </div>
                <div class="n_reply_box" id="replyList">



                </div>
                <!-- //댓글 -->
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