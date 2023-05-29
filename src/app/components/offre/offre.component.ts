import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/modeles/post';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit{
  @Input() service!:Post;
  ngOnInit(): void {
  
  }
 
}
