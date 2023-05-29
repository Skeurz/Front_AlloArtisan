package com.projet.artisan.services;

import com.projet.artisan.models.Artisan;

import java.util.List;

public interface ArtisanService {
    public String AjouterArtisan( Artisan artisan);
    public List<Artisan> getAllArtisan();
    public Artisan getArtisanById(Long id);
    public String deleteArtisan(Long id);
}
