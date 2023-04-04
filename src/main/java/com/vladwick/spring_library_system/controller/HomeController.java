package com.vladwick.spring_library_system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin(origins = "*")
public class HomeController {

	@GetMapping("")
	public ModelAndView home() {
		ModelAndView mav=new ModelAndView("index");
		return mav;
	}

	@RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}" })
	public String getIndex(HttpServletRequest request) {
		return "index";
	}


}
