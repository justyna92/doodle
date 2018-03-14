package pl.myprojects.drawingpictures.controller;


import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pl.myprojects.drawingpictures.model.AjaxResponseBody;
import pl.myprojects.drawingpictures.model.Picture;
import pl.myprojects.drawingpictures.service.PictureService;

@RestController
public class PictureController {
	
	@Autowired
	private PictureService pictureService;
	
	@PostMapping(value="/getpicturesfromrange")
	public ResponseEntity<?> getPicturesInRange(@RequestParam(value = "clickedPageNumber", required = true) int clickedPageNumber,
			@RequestParam(value = "rowsPerPage", required = true) int rowsPerPage, @RequestParam(value = "select", required = true) String select) {
		
		int count = pictureService.getNumberOfRows();
		int from = count - (clickedPageNumber * rowsPerPage);
		int to = from + rowsPerPage;
		
		AjaxResponseBody<Picture> result = new AjaxResponseBody<Picture>();
		List<Picture> pictures = pictureService.getPicturesInRange(from, to, select); 
		result.setResult(pictures);
		result.setMsg("success");
		return ResponseEntity.ok(result);
	}

	@GetMapping(value="/countrows")
	public ResponseEntity<?> getNumberOfRows() {
		
		AjaxResponseBody<String> result = new AjaxResponseBody<String>();
		List<String> numberOfRows = new ArrayList<String>();
		numberOfRows.add(Integer.toString(pictureService.getNumberOfRows()));
		result.setResult(numberOfRows);
		result.setMsg("success");
		return ResponseEntity.ok(result);
	}
	
	/*@PostMapping(value="/allpictures")
	public ResponseEntity<?> getAllPicturesViaAjax() {
		
		AjaxResponseBody result = new AjaxResponseBody();
		
		result.setResult(pictureService.getAllPictures());
		long size = result.getResult().size();
		if(size > 0)
			result.setMsg(size +" pictures found");
		else if(size == 0)
			result.setMsg("no pictures found");
		else
			result.setMsg("Problem with database. Try again...");
		System.out.println(result.getResult());
		System.out.println(result.getResult().size());
		System.out.println(result.getMsg());
		
		return ResponseEntity.ok(result);
	}*/
	
	@PostMapping(value="/sendpicture")
	public ResponseEntity<?> sendPictureToDatabase(@RequestBody Picture p, BindingResult br) throws IOException {
		System.out.println("*errors*: " + br);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		//Get current date time
		LocalDateTime time = LocalDateTime.now();
		String formatDateTime = time.format(formatter);
		p.setDate(formatDateTime);
		pictureService.savePicture(p);
		AjaxResponseBody<String> result = new AjaxResponseBody<String>();
		result.setMsg("Saved");
		result.setResult(null);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="/getauthors")
	public ResponseEntity<?> getAuthors() {
		
		AjaxResponseBody<String> result = new AjaxResponseBody<String>();
		result.setMsg("success");
		result.setResult(pictureService.getAuthors());
		return ResponseEntity.ok(result);
	}
}
