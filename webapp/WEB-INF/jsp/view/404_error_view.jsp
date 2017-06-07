<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2017-04-28
  Time: 오전 11:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta http-equiv="Cache-Control" content="No-Cache" />
    <meta http-equiv="Pragma" content="No-Cache" />
    <!-- 스타일 시트 -->
    <!-- <link rel="stylesheet" href="../../css/iTMSstyle.css" type="text/css" /> -->
    <!--// 스타일 시트 -->
    <title></title>
    <style type="text/css">
        * {margin:0; padding:0;}
        body {font-family:Dotum,'돋움',Arial,sans-serif;font-size:14px;line-height:22px;color:#555;}
        div, p {margin:0; padding:0;}
        .page_none_wrap {margin:130px auto 20px;width:704px;}
        .page_none_wrap h1 {margin-bottom:15px;font-size:0; line-height:0;}
        .page_none_cont {padding:49px 0 40px; border:1px solid #ddd;}
        .page_none_cont .inner {margin:0 auto;width:440px;text-align:center;}
        .page_none_cont .inner .img_page_none {margin-bottom:22px;}
        .page_none_cont .inner .txt_page_none {margin-bottom:14px;color:#444;}
        .page_none_cont .inner .gray_bx {padding:18px 0 15px;color:#666;background-color:#f4f4f4;}
        @media screen and (-webkit-min-device-pixel-ratio:0) {
            .page_none_cont .inner .gray_bx {padding:17px 0 16px;}
        }
    </style>
</head>

<body>
<div class="page_none_wrap">
    <h1><img src="${contextPath}/img/board.png" alt="BOARD" /></h1>
    <div class="page_none_cont">
        <div class="inner">
            <div class="txt_page_none">
                방문하시려는 페이지의 주소가 잘못되었습니다.<br>
                뒤로 가기를 누르시거나, 다른 주소로 접속해주세요.<br>
                홈페이지 이용에 불편을 드려 대단히 죄송합니다.
            </div>
            <div class="gray_bx">
                <strong>돌아가기</strong> <a href="/list.do">게시판 목록 보기</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>