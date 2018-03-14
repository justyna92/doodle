<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="color-section">
	<div id="sliders" class="flex-container flex-direction-col">
	  	<div id="red-slider" class="flex-item">
	  		<span>Red</span>
	  		<input id="redRange" type="range" min="0" max="255" value="0" class="slider-control">
	  	</div>
	  	<div id="green-slider" class="flex-item">
	  		<span>Green</span>
	  		<input id="greenRange" type="range" min="0" max="255" value="0" class="slider-control">
	  	</div>
	  	<div id="blue-slider" class="flex-item">
	  		<span>Blue</span>
	  		<input id="blueRange" type="range" min="0" max="255" value="0" class="slider-control">
		</div>
	</div>
  	<div id="rgbColor">
		<p></p>
	</div>
</div>

<div id="tools-section" class="flex-container flex-wrap">
			<div class="flex-item">
					<span>Shape of line</span>
					<div>
						<label class="radio-container">Rectangle
						<input id="rectangle" type="radio" name="tool" value="rectangle" checked="checked">
						<span class="checkmark"></span>
						</label>
					</div>
					<div>
						<label class="radio-container">Circle
						<input id="circle" type="radio" name="tool" value="circle">
						<span class="checkmark"></span>
						</label>
					</div>
			</div>
			<div class="flex-item">
					<span>Flling line</span>
					<div>
						<label class="radio-container">Filling
						<input id="filling" type="radio" name="toolOption" value="rectangle" checked="checked">
						<span class="checkmark"></span>
						</label>
					</div>
					<div>
						<label class="radio-container">No filling
						<input id="noFilling" type="radio" name="toolOption" value="circle">
						<span class="checkmark"></span>
						</label>
					</div>
			</div>
			<div class="flex-item">
					<span>Tool size</span>
					<div>
					<select id="toolSize" class="selecting-option"></select>
					</div>
			</div>
			<div class="flex-item">
					<span>Color Picker</span>
					<div>
					<label class="switch">
					<input id="colorPicker" type="checkbox">
					<span class="slider round"></span>
					</label>
					</div>
			</div>
			<div class="flex-item">
					<span>Clear canvas</span>
					<div>
					<label class="btn-container">
					<button id="clearCanvas" type="button"></button>
					<span class="b-button">Clear canvas</span>
					</label>
					</div>
			</div>
</div>

<div>
	<canvas id="canvas"></canvas>
</div>


<div id="database-section" class="flex-container direction-col">
	<div>
		<input id="name-input" type="text" placeholder="name" autocomplete="on" ></input>
		<input id="author-input" type="text" placeholder="author" autocomplete="on" ></input>
		<label class="btn-container">
			<button id="save-picture" type="button"></button>
			<span class="b-button">Save picture</span>
		</label>
	</div>	
	<div id="info">
		<p></p>
	</div>
	<div>
		<span>Filter by </span>
		<select id="list-of-authors">
	  		<option value="all">all</option>
		</select>
		<label class="btn-container">
			<button id="searchingByAuthor" type="button"></button>
			<span class="b-button">OK</span>
		</label>
	</div>
</div>

<table id="table-section" class="elementWidth">
	<tbody id="table-body">
		<tr>
			<th>no.</th>
		    <th>name</th>
		    <th>author</th>
		    <th>created date</th>
		    <th>miniature</th>
		</tr>
	</tbody>
</table>
<div id="pagination-section">
	<a id="lastPage">prev</a>
	<a id="pageNumber"></a>
	<a id="nextPage">next</a>
</div>

