<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2017-04-28
  Time: 오전 11:04
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html;charset=utf-8" %>

<!DOCTYPE html>
<html lang="ko" xml:lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="No-Cache">
    <meta http-equiv="Pragma" content="No-Cache">
    <%@include file="/WEB-INF/jsp/inc/inc_board_header.jsp"%>
    <script type="text/javascript" src="/js/view/board_list.js?<%=verSion%>"></script>
</head>

<body class="lnb_bg">

<!-- wrap -->
<div class="wrap">
    <%@include file="/WEB-INF/jsp/inc/inc_board_left.jsp"%>
    <form id="frm" method="post">
        <input type="hidden" id="BOARD_NO" 		name="BOARD_NO" 		/>
    </form>
    <!-- container -->
    <div class="container" >

        <div class="content">
            <div class="content_wrap">
                <!-- 타이틀 영역 -->
                <div class="tit_wrap">
                    <h1>게시판</h1>
                </div>
                <!-- //타이틀 영역 -->

                <!-- 테이블 영역 -->
                <div class="table_layout2">
                    <div class="tbl_result">
                        <table summary="">
                            <caption></caption>
                            <colgroup>
                                <col style="width:50px;">
                                <col style="width:200px;">
                                <col style="width:500px;">
                                <col style="width:170px;">
                                <col style="width:50px;">
                                <col style="width:100px;">
                            </colgroup>
                            <thead>
                            <tr>
                                <th><div class="t_center">No</div></th>
                                <th><div>제목</div></th>
                                <th><div>내용</div></th>
                                <th><div>등록일자</div></th>
                                <th><div>조회수</div></th>
                                <th><div class="t_center">첨부파일</div></th>
                            </tr>
                            </thead>
                            <tbody id="TABLE_RESULT">

                            	<c:forEach items= "${result}" var="item">
                            	<tr>
	                                <td><div class="t_center">${ item.num }</div></td>
	                                <td><div><a href="#none">${ item.title } </a></div></td>
                                    <td><div><a href="#none">${ item.content } </a></div></td>
                                    <td><div><a href="#none">${ item.regDate } </a></div></td>
                                    <td><div><a href="#none">${ item.viewCnt } </a></div></td>
	                                <td><div class="t_center"><a href="#none"><img src="/img/btn_addfile.png" alt="첨부파일"></a></div></td>
                           		</tr>
                            	</c:forEach>
                          
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- //테이블 영역 -->

                <!-- Paging wrap -->
                <div class="paging_wrap">
                    <div class="combo_wrap">
                        <div class="combo_style">
                            <a href="#none" class="btn_style btn_combo_down"><span>15</span></a>
                            <ul style="display:;">
                                <li><a href="#none">15개</a></li>
                                <li><a href="#none">20개</a></li>
                                <li><a href="#none">30개</a></li>
                                <li><a href="#none">50개</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- pagination -->
                    <div class="paging"><!-- 비활성상태는 on class 제거 -->
                        <a href="#none" class="btn_pag_cntr first"><span class="blind">first</span></a><a href="#none" class="btn_pag_cntr prev"><span class="blind">previous</span></a>
						<span class="pag_num">
							<a href="#none" class="on">1</a><a href="#none">2</a><a href="#none">3</a><a href="#none">4</a><a href="#none">5</a><a href="#none">6</a><a href="#none">7</a><a href="#none">8</a><a href="#none">9</a><a href="#none">10</a>
						</span>
                        <a href="#none" class="btn_pag_cntr next on"><span class="blind">next</span></a><a href="#none" class="btn_pag_cntr last on"><span class="blind">last</span></a>
                    </div>
                    <!-- //pagination -->
                </div>
                <!-- //Paging wrap -->
            </div>
        </div>

    </div>
    <!-- //container -->

</div>
<!-- //wrap -->
<%@include file="/WEB-INF/jsp/inc/inc_board_footer.jsp"%>
</body>
</html>