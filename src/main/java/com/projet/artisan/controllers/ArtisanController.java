package com.projet.artisan.controllers;

import com.projet.artisan.models.Artisan;
import com.projet.artisan.services.ArtisanServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200/")

@RestController
public class ArtisanController {
    @Autowired
    private ArtisanServiceImpl artisanServiceImpl;

    @PostMapping("/")
    public String AddArtisan(  @RequestBody Artisan artisan){
        artisanServiceImpl.AjouterArtisan(artisan);
        return "artisan bien enregistrer";
    }
    @GetMapping("/artisans")
    public List<Artisan> getAll(){
        return artisanServiceImpl.getAllArtisan();

    }
    @GetMapping("/artisans/{id}")
     public Artisan getArtisanById(  @PathVariable Long id){
       return  artisanServiceImpl.getArtisanById(id);

    }


}
