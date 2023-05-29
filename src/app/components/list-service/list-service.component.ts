import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';import { Post } from 'src/app/core/modeles/post';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  service$!:Observable<Post[]>;

  constructor(private listService :ListArtisanService){ }


  ngOnInit(): void {
    this.service$=this.listService.getAllService();

  }

}
