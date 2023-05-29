package com.projet.artisan.services;

import com.projet.artisan.models.Artisan;
import com.projet.artisan.repository.ArtisanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtisanServiceImpl implements ArtisanService {
    @Autowired
     private  ArtisanRepository artisanRepository;
    @Override
    public String AjouterArtisan(Artisan artisan) {
           artisanRepository.save(artisan);
        return "artisan bien ajouter";
    }

    @Override
    public List<Artisan> getAllArtisan() {
        return  artisanRepository.findAll();
    }

    @Override
    public Artisan getArtisanById(Long id) {
       return  artisanRepository.findById(id).get();

    }

    @Override
    public String deleteArtisan(Long id) {
         artisanRepository.deleteById(id);
       return "artisan bien supprimer";
    }
}
