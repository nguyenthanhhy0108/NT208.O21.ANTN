package com.example.hotel_management.Model;

import com.example.hotel_management.Model.ID.AuthoritiesID;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "AUTHORITIES")
@IdClass(AuthoritiesID.class)
public class Authorities {
    @Id
    @Column(name = "Username")
    private String username;
    @Id
    @Column(name = "Authority")
    private String authority;

    @ManyToOne(cascade = {
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.PERSIST,
            CascadeType.REFRESH
    })
    @JoinColumn(name = "Username", insertable = false, updatable = false)
    private Users users;

    public Authorities() {
    }

    public Authorities(String username, String authority) {
        this.username = username;
        this.authority = authority;
    }
}