<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2017-04-28
  Time: 오전 11:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title></title>
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="No-Cache">
    <meta http-equiv="Pragma" content="No-Cache">
    <link rel="stylesheet" type="text/css" href="/css/reset.css">
    <link rel="stylesheet" type="text/css" href="/css/content.css">
    <script type="text/javascript" src="/js/view/board_list.js"></script>
</head>

<body class="lnb_bg">

<!-- wrap -->
<div class="wrap">
    <!-- lnb box -->
    <div class="lnb_box">
        <!-- lnb top -->
        <div class="lnb_top">
            <!-- user view -->
            <div class="user_view">
                <div class="user_r_side">
                    <p class="icon_user"><strong>홍길동</strong> 님</p>
                </div>
            </div>
            <!-- //user view -->
        </div>
        <!-- //lnb top -->

        <!-- lnb_cont -->
        <div class="lnb_cont">
            <dl>
                <dt class="on"><h2><a href="#none">공지사항1</a></h2></dt><!-- 활성화클래스 on -->
                <dd>
                    <ul>
                        <li class="on"><a href="#none">공지사항1-1</a></li><!-- 활성화클래스 on -->
                        <li><a href="#none">공지사항1-2</a></li>
                    </ul>
                </dd>
            </dl>
            <dl>
                <dt><h2><a href="#none">공지사항2</a></h2></dt>
                <dd>
                    <ul>
                        <li><a href="#none">공지사항2-1</a></li>
                        <li><a href="#none">공지사항2-2</a></li>
                        <li><a href="#none">공지사항2-3</a></li>
                    </ul>
                </dd>
            </dl>
        </div>
        <!-- //lnb_cont -->
    </div>
    <!-- //lnb box -->

    <!-- container -->
    <div class="container" >

        <div class="content">
            <div class="content_wrap">
                <!-- 타이틀 영역 -->
                <div class="tit_wrap">
                    <h1>공지사항</h1>
                </div>
                <!-- //타이틀 영역 -->

                <!-- 테이블 영역 -->
                <div class="table_layout2">
                    <div class="tbl_result">
                        <table summary="">
                            <caption></caption>
                            <colgroup>
                                <col style="width:50px;"><col ><col style="width:100px;">
                            </colgroup>
                            <thead>
                            <tr>
                                <th><div class="t_center">No</div></th>
                                <th><div>제목</div></th>
                                <th><div class="t_center">첨부파일</div></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><div class="t_center">1</div></td>
                                <td><div><a href="#none">제목 1</a></div></td>
                                <td><div class="t_center"><a href="#none"><img src="/img/btn_addfile.png" alt="첨부파일"></a></div></td>
                            </tr>
                            <tr>
                                <td><div class="t_center">2</div></td>
                                <td><div><a href="#none">제목 2</a></div></td>
                                <td><div class="t_center"><a href="#none"><img src="/img/btn_addfile.png" alt="첨부파일"></a></div></td>
                            </tr>
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

</body>
</html>