package pl.myprojects.drawingpictures.controller;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	
	private static final String[] renderingApp = {"Spring Boot with REST", "Apache Tiles 3", "JSP (with JSTL)", "Maven"};
	private static final String[] databaseLayer = {"MySQL", "HikariCP", "Hibernate Annotation", "Spring Data (with JPQL)"};
	private static final String[] viewLayer = {"JavaScript", "jQuery", "jQuery.ajax()", "HTML", "CSS"};
	
	@RequestMapping("/")
	String home() {
		return "home";
	}
	
	@RequestMapping("/technologies")
	String showTechnologies(Model model) {
		
		model.addAttribute("renderingApp", renderingApp);
		model.addAttribute("databaseLayer", databaseLayer);
		model.addAttribute("viewLayer", viewLayer);
		
		return "technologies";
	}
	
}
