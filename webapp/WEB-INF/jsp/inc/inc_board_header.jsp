<%@page contentType="text/html;charset=utf-8"%>

<%@ taglib prefix = "c" uri = "http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%
    // VERSION
    String verSion = "1.2";

    // Current Page
    String strCurPage = request.getRequestURL().substring(request.getRequestURL().lastIndexOf("/")+1);
%>


<!-- common CSS -->
<link rel="stylesheet" type="text/css" href="/css/reset.css?<%=verSion%>">
<link rel="stylesheet" type="text/css" href="/css/content.css?<%=verSion%>">
<link rel="stylesheet" type="text/css" href="/css/toastr.css?<%=verSion%>">

<!-- board core js -->
<script type="text/javascript" src="/js/comm/board.core.js?<%=verSion%>"></script>

<!-- common Js -->
<script type="text/javascript" src="/js/comm/common.js?<%=verSion%>"></script>
<script type="text/javascript" src="/js/comm/util.page.js?<%=verSion%>"></script>
<script type="text/javascript" src="/js/comm/util.date.js?<%=verSion%>"></script>

<!-- jQuery Library -->
<script type="text/javascript" src="/js/lib/jquery-1.8.3.js?<%=verSion%>"></script>
<script type="text/javascript" src="/js/lib/jquery-ui-1.10.4.min.js?<%=verSion%>"></script>
<script type="text/javascript" src="/js/lib/jquery.blockUI.js?<%=verSion%>"></script>
<script type="text/javascript" src="/js/lib/jquery.cookie.js?<%=verSion%>"></script>

<!-- toast Message -->
<script type="text/javascript" src="/js/lib/toastr.js?<%=verSion%>"></script>

<!-- smart Library -->
<script type="text/javascript" src="/js/smart/datepicker.js?<%=verSion%>"></script>
<script type="text/javascript" src="/js/smart/smart.excel.js?<%=verSion%>"></script>
<script type="text/javascript" src="/js/smart/smart.grid.js?<%=verSion%>"></script>
<script type="text/javascript" src="/js/smart/smart.popup.js?<%=verSion%>"></script>