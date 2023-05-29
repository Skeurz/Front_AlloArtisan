package com.projet.artisan.models;

import javax.persistence.*;

@Entity

@Table(name="user")

public class User {
    @Id
    @GeneratedValue
    @Column(name="Id")
    private Long id;
    @Column(name="NOM")
    private String nom;
    @Column(name="prenom")
    private String prenom;
    @Column(name="ville")
    private String ville;
    @Column(name="artisant")
    private String artisant;
    @Column(name="Email")
    private String email;
    @Column(name="imageUrl")
    private String imageUrl;
    public User() {
    }

    public User (String nom,String prenom,String ville,String artisant,String email,String imageUrl) {
        this.nom=nom;
        this.prenom=prenom;
        this.ville=ville;
        this.artisant= artisant;
        this.email=email;
        this.imageUrl=imageUrl;


    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getArtisant() {
        return artisant;
    }

    public void setArtisant(String artisant) {
        this.artisant = artisant;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}




