<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="container">
		<div class="starter-template">
			<p class="title">Applied technologies</p>
			<div class="horizontal-box">
				<h2>Application rendering</h2>
				<ul class="list">
					<c:forEach items="${renderingApp}" var="item">
					<li>${item}</li>
					</c:forEach>
				</ul>
			</div>
			<div class="horizontal-box">
				<h2>Database layer</h2>
				<ul class="list">
					<c:forEach items="${databaseLayer}" var="item">
					<li>${item}</li>
					</c:forEach>
				</ul>
			</div>
			<div class="horizontal-box">
				<h2>Interface layer</h2>
				<ul class="list">
					<c:forEach items="${viewLayer}" var="item">
					<li>${item}</li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>


