package com.example.hotel_management.Config;
import org.springframework.context.annotation.Bean;
import com.cloudinary.*;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;


@Configuration
public class CloudinaryConfig {
    private final String CLOUD_NAME = "dudsvbobp";
    private final String API_KEY = "481721939951427";
    private final String API_SECRET = "7TORsie__T1pcUudxkU6kFWlH2M";

//    @Bean
//    public Cloudinary getCloudinary(){
//        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
//                "cloud_name", CLOUD_NAME,
//                "api_key", API_KEY,
//                "api_secret", API_SECRET));
//        return cloudinary;
//    }

    @Bean
    public Cloudinary getCloudinary(){
        Map config = new HashMap();
        config.put("cloud_name", CLOUD_NAME);
        config.put("api_key", API_KEY);
        config.put("api_secret", API_SECRET);

        return new Cloudinary(config);
    }

}
