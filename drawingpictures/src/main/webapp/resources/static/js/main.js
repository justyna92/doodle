var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.canvas.width = 1300;
context.canvas.height = 500; 
drawWhiteBackground();

var painting = false;
var lastX = 0;
var lastY = 0;
var mouseX;
var mouseY;
var toolSize;

var rowsPerPage = 10;
var clickedPageNumber = 1;
var numberOfRowsInDatabase;
var databaseContentPerPage;
var lastNumberOfPages = 1;
var noOfPages = 0;
var authorsList;
var select = "all";
var paintbrushSizeBegin = 2;
var paintbrushSizeStep = 2;
var paintbrushSizeEnd = 20;

canvas.onmousedown = function(event) {
	drawPoint(event,this);
}

canvas.onmousemove = function(event) {
	drawSequenceOfPoints(event,this);
}

canvas.onmouseup = function() {
	stopDrawing();
}

$(document).ready(getRgbColor(), getToolSize(), showDatabaseContent(), setPage(), createPaintbrushSizesList());

$("#redRange, #greenRange, #blueRange").mousemove(() => {
	getRgbColor();
});

$("#toolSize").mousedown(() => {
	getToolSize();
	
});

$("#clearCanvas").click(() => {
	clearCanvas();
});

$("#colorPicker").on('change', () => {
	if($("#colorPicker").is(":checked")) {
		$("input[type=radio]").attr("disabled",true);
		$("input[type=radio] label").addClass("mark-text-as-disabled");
		canvas.onmousedown = function(event) {
			useColorPicker(event,this);
		}
	} else {
		$("input[type=radio]").attr("disabled",false);
		$("input[type=radio] label").removeClass("mark-text-as-disabled");
		canvas.onmousedown = function(event) {
			drawPoint(event,this);
		}
	}
});


$("#save-picture").click(() => {
	if(!$("#name-input").val() || !$("#author-input").val() ) {
		$("#info p").html("fill in the blanks and click 'save'");
	} else {
		savePicture().then(showDatabaseContent); //"then" is the method from ajax object which savePicture() returns 
	}
});

$("#lastPage").click(() => {
	getPrevPage();
	checkNumberOfPagesAndDrawPagination();
	getItemsForPage().then(drawRows);
});

$("#nextPage").click(() => {
	getNextPage();
	checkNumberOfPagesAndDrawPagination();
	getItemsForPage().then(drawRows);
});

$("#table-body").on('click','button', event => {
	setPictureOnCanvas(event);
});

$("#searchingByAuthor").on('click', () => {
	select = $("#list-of-authors").find(":selected").val();
	showDatabaseContent(); //tu wersja funkcji bez ponownego pobierania liczby wierszy z bazy
});

function drawPoint(event,canvasObject) {
	painting = true;
	lastX = event.pageX - canvasObject.offsetLeft;
	lastY = event.pageY - canvasObject.offsetTop;
	setToolToPainting();
}

function drawSequenceOfPoints(event,canvasObject) {
	if(painting) {
		setToolToPainting();
		mouseX = event.pageX - canvasObject.offsetLeft;
        mouseY = event.pageY - canvasObject.offsetTop;
		lastX = mouseX;
		lastY = mouseY;
	}
}

function stopDrawing() {
	painting = false;
}

function useColorPicker(event,canvasObject) {
		
		mouseX = event.pageX - canvasObject.offsetLeft;
	    mouseY = event.pageY - canvasObject.offsetTop;
	    
	    //get color of pixel from clicking
	    var point = context.getImageData(mouseX, mouseY, 1, 1).data;
	    
	    //set colors on the sliders
	    $("#redRange").val(point[0]);
	    $("#greenRange").val(point[1]);
	    $("#blueRange").val(point[2]);
	    
	    //put color on the paintbrush
	    getRgbColor(); 
}

function createPaintbrushSizesList() {
	for(i = paintbrushSizeBegin; i <= paintbrushSizeEnd; i += paintbrushSizeStep) {
		$("#toolSize").append("<option value="+i+">"+i+"</option>");
	}
	if(!toolSize)
		toolSize = paintbrushSizeBegin;
}

function getAuthorsList() {
	return $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/getauthors",
        cache: false,
        timeout: 600000,
        success: function (data) {
            authorsList = data.result;
        },
        error: function (e) {
        	$("#info p").text("Problem to get the authors list: "+e);
        }
    });
}

function fillInDropDownList() {
	$("#list-of-authors").find("option[value!='all']").remove();
	$.each(authorsList, function(index, object) {
		$("#list-of-authors").children().first().after(
				"<option value="+object+">"+object+"</option>"
		);
	});
}

function setPictureOnCanvas(event) {
	var image = new Image();
	image.src = $("#"+event.target.id).parent().siblings().attr('src');
	context.drawImage(image, 0, 0);
}

function setRgbValue(value) {
	return $(value).val();
}

function getRgbColor() {
	var red = parseInt(setRgbValue("#redRange"));
	var green = parseInt(setRgbValue("#greenRange"));
	var blue = parseInt(setRgbValue("#blueRange"));
	var sum = red+green+blue;

	$("#rgbColor").css("background-color","rgb("+red+","+green+","+blue+")");
	$("#rgbColor").children().first().text("rgb("+red+","+green+","+blue+")");
	if(sum < 370)
		$("#rgbColor").css("color","#ffffff");
	else
		$("#rgbColor").css("color","black");
}

function setToolToPainting() {
	if($("#rectangle").is(":checked")) {
		context.beginPath();
		if($("#filling").is(":checked")) {
			context.fillStyle = $("#rgbColor").css("background-color");
			context.fillRect(lastX,lastY,toolSize,toolSize);
		} else {
			context.rect(lastX,lastY,toolSize,toolSize);
			context.strokeStyle = $("#rgbColor").css("background-color");
			context.stroke();
		}
	} else {
		context.beginPath();
		context.arc(lastX,lastY,toolSize,0*Math.PI,2*Math.PI);
		if($("#filling").is(":checked")) {
			context.fillStyle = $("#rgbColor").css("background-color");
			context.fill();
			context.closePath();
		} else {
			context.strokeStyle = $("#rgbColor").css("background-color");
			context.stroke();
			context.closePath();
		}
	}
	
}

function getToolSize() {
	toolSize = $("#toolSize option:selected").val();
}

function clearCanvas() {
	context.clearRect(0,0, this.canvas.width, this.canvas.height);
	drawWhiteBackground();
}

function drawWhiteBackground() {
	context.fillStyle = "#ffffff";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function savePicture() {
	
	var img = context.canvas.toDataURL('image/jpeg');
	var obj = {
			name: $("#name-input").val(),
			author: $("#author-input").val(),
			date: "",
			content: img
	};
	
	var json = JSON.stringify(obj);
	return $.ajax({
        type: "POST",
        url: "/sendpicture",
        data: json,
        processData: false,
        contentType: 'application/json',
        cache: false,
        timeout: 600000,
        success: function (data) {            
           $("#info p").text("Saved");
        },
        error: function (e) {
        	$("#info p").text("No saved");
        }
    });
	
}



function showDatabaseContent() {
	console.log("1. showDatabaseContent");
	if(select === "all") {
	getNumberOfRowsFromDatabase().then(checkNumberOfPagesAndDrawPagination).then(getItemsForPage).then(drawRows);
	} else {
		checkNumberOfPagesAndDrawPagination();
		getItemsForPage().then(drawRows);
	}
	
	getAuthorsList().then(fillInDropDownList);
		
}

function getNumberOfRowsFromDatabase() {
	console.log("2. getNumberOfRowsFromDatabase");
	
	return $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/countrows",
        cache: false,
        timeout: 600000,
        success: function (data) {
            numberOfRowsInDatabase = data.result; 
        },
        error: function (e) {
        	$("#info p").text("Problem with a request: "+e);
        }
    });
	
}

function setPage() {
	$("#lastPage").attr("href","javascript:"+getPrevPage());
	$("#lastPage").attr("href","javascript:"+getNextPage());
}

function getPrevPage() {
	if(clickedPageNumber > 1) {
		clickedPageNumber--;
	}
}

function getNextPage() {

	if(clickedPageNumber < noOfPages) {
		clickedPageNumber++;
	}
}

function checkNumberOfPagesAndDrawPagination() {
	console.log("3. checkNumberOfPagesAndDrawPagination");
	// old number of pages
	tmp = noOfPages;
	// get a number of pages
	noOfPages = Math.ceil(numberOfRowsInDatabase / rowsPerPage);
	// draw the pagination
	if(((tmp < noOfPages) || (tmp > noOfPages)) && noOfPages > 1) {
		$("#pagination-section").show();
		$("#pageNumber").html(clickedPageNumber + " / " + noOfPages);
	} else {
		$("#pagination-section").hide();
	}
		
}

function getItemsForPage() {
	
	console.log("4. getItemsForPage");
	
	
	return $.ajax({
        type: "POST",
        url: "/getpicturesfromrange",
        data: {
        	clickedPageNumber: clickedPageNumber,
        	rowsPerPage: rowsPerPage,
        	select: select
        },
        cache: false,
        timeout: 600000,
        success: function (data) {            
           $("#info p").text(data.msg);
           databaseContentPerPage = data.result;
        },
        error: function (e) {

        }
    });
}

function drawRows() {
	
	console.log("5. drawRows");
	$("#table-body tr").has("td").remove();
	var number;
	
	$.each(databaseContentPerPage, function(index, object){
		number = ((clickedPageNumber != 1) ? (index+1+(clickedPageNumber*rowsPerPage-rowsPerPage)) : (index+1));
 	   	$("#table-body tr:nth-child("+(index+1)+")").after(
 			   		
 				    "<tr>" +
 				    	"<td>"+ number + "</td>" +
 				    	"<td>"+ object.name + "</td>" +
 				    	"<td>"+ object.author + "</td>" +
 				    	"<td>"+ object.date + "</td>" +
 				    	"<td>"+ "<img src="+object.content+" border='15' />" + 
	 				    	"<label class='btn-container'>" +
	 							"<button id=no"+number+" type='button'></button>" +
	 							"<span class='b-button'>show</span>" +
	 						"</label>" +
 				    	"</td>" +
 				    "</tr>"
 	   	);
    });
}
