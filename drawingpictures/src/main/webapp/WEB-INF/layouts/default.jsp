<!-- The template for gathering all tiles -->

<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="<c:url value="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />" />
<link rel="stylesheet" href="<c:url value="/resources/static/css/main.css" />" />
<link href="https://fonts.googleapis.com/css?family=Boogaloo" rel="stylesheet"> 
<title><tiles:insertAttribute name="title" /></title>

</head>
<body>

	<tiles:insertAttribute name="header" />
	<br>
	<tiles:insertAttribute name="content" />
	<br>
	<tiles:insertAttribute name="footer" />

<script type="text/javascript" src="<c:url value="/webjars/jquery/2.2.4/jquery.min.js" />" ></script>
<script type="text/javascript" src="<c:url value="/resources/static/js/main.js" />" ></script>
</body>
</html>