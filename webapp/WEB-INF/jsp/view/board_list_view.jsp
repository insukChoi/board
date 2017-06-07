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
    <%@include file="../inc/inc_board_header.jsp"%>
    <script type="text/javascript" src="/js/view/board_list.js?<%=verSion%>"></script>
</head>

<body class="lnb_bg">

<!-- wrap -->
<div class="wrap">
    <%@include file="../inc/inc_board_left.jsp"%>
    <form id="frm" method="post">
        <input type="hidden" id="BOARD_NO" 		name="BOARD_NO" 		                        />   <!-- Temp 게시글 시퀀스 번호    -->
        <input type="hidden" id="PROCESS_CODE" 	name="PROCESS_CODE" value="${PROCESS_CODE}"		/>   <!-- C: 등록, U: 수정, D: 삭제  -->
        <input type="hidden" id="CNT" 	        name="CNT"          value="${COUNT}"		    />   <!-- 총 카운트                  -->
        <input type="hidden" id="PAGE_NO" 	    name="PAGE_NO"      value="${PAGE_NO}"		    />   <!-- 현재 페이지 넘버            -->
    </form>
    <!-- container -->
    <div class="container" >

        <div class="content">
            <div class="content_wrap">
                <!-- 타이틀 영역 -->
                <div class="tit_wrap">
                    <div class="left">
                        <h1>게시판</h1>
                    </div>
                </div>
                <!-- //타이틀 영역 -->

                <div class="editbtn_top_box" style="height: 30px; position: relative;">
                    <div style="left: 0px; top: 20px; display: block; position:absolute;">
                        <span>
                            <strong>전체 게시글</strong> : <strong>${COUNT} 개</strong>
                        </span>
                    </div>
                    <div class="right" style="top:15px; position: absolute;">
                        <div class="input_box">
                            <input type="text" id="searchText" value="${SEARCH_TEXT}">
                            <a href="#none" id="btn_search">
                                <img alt="조회" src="/img/btn_topsearch.gif">
                            </a>
                        </div>
                    </div>
                </div>

                <!-- 테이블 영역 -->
                <div class="table_layout2">
                    <div class="tbl_result">
                        <table summary="">
                            <caption></caption>
                            <colgroup>
                                <col style="width:50px;">
                                <col style="width:200px;">
                                <col style="width:500px;">
                                <col style="width:180px;">
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

                            	<c:forEach items= "${RESULT}" var="item">
                            	<tr boardNum="${ item.num }">
	                                <td><div class="t_center">${ item.rowNum }</div></td>
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
                        <div class="combo_style" id="paging_size">
                            <a href="#none" class="btn_style btn_combo_down" id="PAGE_SZ"><span>15</span></a>
                            <ul style="display:none;">
                                <li><a href="#none">15</a></li>
                                <li><a href="#none">20</a></li>
                                <li><a href="#none">30</a></li>
                                <li><a href="#none">50</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- pagination -->
                    <div class="paging" id="CREATE_PG_LINK"><!-- 비활성상태는 on class 제거 -->
                        <%--<a href="#none" class="btn_pag_cntr first"><span class="blind">first</span></a><a href="#none" class="btn_pag_cntr prev"><span class="blind">previous</span></a>
						<span class="pag_num">
							<a href="#none" class="on">1</a><a href="#none">2</a><a href="#none">3</a><a href="#none">4</a><a href="#none">5</a><a href="#none">6</a><a href="#none">7</a><a href="#none">8</a><a href="#none">9</a><a href="#none">10</a>
						</span>
                        <a href="#none" class="btn_pag_cntr next on"><span class="blind">next</span></a><a href="#none" class="btn_pag_cntr last on"><span class="blind">last</span></a>--%>
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
<%@include file="../inc/inc_board_footer.jsp"%>
</body>
</html>