<%@page contentType="text/html;charset=utf-8"%>

<%@ taglib prefix = "c" uri = "http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="contextPath" value="<%= request.getContextPath()%>"></c:set>
<%
    // VERSION
    String verSion = "1.2";

    // Current Page
    String strCurPage = request.getRequestURL().substring(request.getRequestURL().lastIndexOf("/")+1);
%>

<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">

<!-- common CSS -->
<link rel="stylesheet" type="text/css" href="${contextPath}/css/reset.css?<%=verSion%>">
<link rel="stylesheet" type="text/css" href="${contextPath}/css/content.css?<%=verSion%>">
<link rel="stylesheet" type="text/css" href="${contextPath}/css/toastr.css?<%=verSion%>">
<link rel="stylesheet" type="text/css" href="${contextPath}/css/validationEngine.jquery.css?<%=verSion%>">

<!-- board core js -->
<script type="text/javascript" src="${contextPath}/js/comm/board.core.js?<%=verSion%>"></script>

<!-- common Js -->
<script type="text/javascript" src="${contextPath}/js/comm/common.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/comm/util.page.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/comm/util.date.js?<%=verSion%>"></script>

<!-- jQuery Library -->
<script type="text/javascript" src="${contextPath}/js/lib/jquery-1.8.3.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/lib/jquery-ui-1.10.4.min.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/lib/jquery.blockUI.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/lib/jquery.cookie.js?<%=verSion%>"></script>

<!-- toast Message -->
<script type="text/javascript" src="${contextPath}/js/lib/toastr.js?<%=verSion%>"></script>

<!-- smart Library -->
<script type="text/javascript" src="${contextPath}/js/smart/datepicker.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/smart/smart.excel.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/smart/smart.grid.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/smart/smart.popup.js?<%=verSion%>"></script>

<!-- validation Engine Library -->
<script type="text/javascript" src="${contextPath}/js/validationEngine/validationEngine.js?<%=verSion%>"></script>
<script type="text/javascript" src="${contextPath}/js/validationEngine/validationEngine-ko.js?<%=verSion%>"></script>