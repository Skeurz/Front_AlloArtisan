package com.projet.artisan.repository;

import com.projet.artisan.models.Artisan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtisanRepository extends JpaRepository<Artisan,Long> {

}
