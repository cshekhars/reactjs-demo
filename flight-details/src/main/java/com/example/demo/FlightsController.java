package com.example.demo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FlightsController {
	
	@GetMapping("/flights")
	public List getAllFlights(){
		List<Map<String, String>> flights = new ArrayList<>();
		Map<String, String> flight1 = new HashMap<>();
		flight1.put("id", "AA431");
		flight1.put("name", "American Airlines. From Denver to Delhi");
		flights.add(flight1);
		
		Map<String, String> flight2 = new HashMap<>();
		flight2.put("id", "UA101");
		flight2.put("name", "United Airlines. From Denver to SFO");
		flights.add(flight2);
		
		return flights;
	}

}
