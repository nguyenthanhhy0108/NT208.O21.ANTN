package com.example.hotel_management.Controller;

import com.example.hotel_management.Model.Hotel;
import com.example.hotel_management.Model.HotelDetails;
import com.example.hotel_management.Service.HotelDetailsServices;
import com.example.hotel_management.Service.HotelServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
public class SearchController {

    private final HotelDetailsServices hotelDetailsServices;
    private final HotelServices hotelServices;

    @Autowired
    public SearchController(HotelDetailsServices hotelDetailsServices,
                            HotelServices hotelServices) {
        this.hotelDetailsServices = hotelDetailsServices;
        this.hotelServices = hotelServices;
    }

    @GetMapping("/suggest")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> suggestNames() {

        HashMap<String, Object> response = new HashMap<>();

        List<String> allName = hotelDetailsServices.findAllHotelName();
        List<String> allID = hotelDetailsServices.findAllHotelID();

        response.put("allName", allName);
        response.put("allID", allID);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public String searchHotel(@RequestParam("name") String typedName) {

        List<String> allName = hotelDetailsServices.findAllHotelName();
        if (allName.contains(typedName)) {
            String id = hotelDetailsServices.findByName(typedName).get(0).getHotelID();
            return "redirect:/hotel-detail?hotel_id=" + id;
        }

        List<String> countries = Arrays.asList( "abc",
                "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina",
                "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
                "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
                "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria",
                "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands",
                "Central African Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands",
                "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic",
                "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
                "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands",
                "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia",
                "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam",
                "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong",
                "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel",
                "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo",
                "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
                "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi",
                "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
                "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat",
                "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
                "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria",
                "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
                "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
                "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon",
                "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
                "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
                "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
                "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland",
                "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
                "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey",
                "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
                "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
                "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"
        );

        if(!countries.contains(typedName)){
            return "redirect:/first-page?not_exist=true";
        }

        return "redirect:/home?country=" + typedName + "&page=1";
    }

    @GetMapping("/get-sorted-hotels-details")
    @ResponseBody
    public ResponseEntity<Map<String, List<Object>>> getSixHotelDetails(@RequestParam String country) {
        HashMap<String, List<Object>> map = new HashMap<>();

        List<Object> allHotelDetailsName = new ArrayList<>();

        allHotelDetailsName = hotelDetailsServices.getHotelNameSortedByBookingCount(country);

        map.put("names", allHotelDetailsName);

        return ResponseEntity.ok(map);
    }
}