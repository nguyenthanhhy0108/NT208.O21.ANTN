package com.example.hotel_management.Repository;

import com.example.hotel_management.Model.Hotel;
import com.example.hotel_management.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, String>{
    @Query(value= "SELECT * FROM Room checking_rooms WHERE checking_rooms.room_id " +
            "NOT IN (select room_id from booking " +
            "WHERE hotelID = ?1 AND num_people = ?2 NOT (check_in_date > ?4 AND check_out_date < ?3)) invalid_rooms " +
            "WHERE checking_rooms.num_people = ?2 AND checking_rooms.HotelID = ?1", nativeQuery=true)
    List<Room> findAvailableRoomForBooking(String hotelID, int num_people, String checkingDate, String checkoutDate);
}