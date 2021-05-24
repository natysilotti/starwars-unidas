import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Results } from 'src/app/models/Results';
import { ApiStarwarsService } from 'src/app/service/api/api-starwars.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  characters!: Results[];
  subscription!: Subscription;
  forSearch: Results[] = [];
  search: Results[] = []; 
  isSearch = false;
  status = 0; 

  constructor(
    private apiStarwars: ApiStarwarsService,
    private message: MessageService,
    public router: Router) {

      this.subscription = this.message.getMessage().subscribe((message) => {  
        if(message === "BACK"){
          this.back();
          return;
        }
        else   
          this.filter(message);
      });
     
  }

  async ngOnInit(): Promise<void> {
    let result = await this.apiStarwars.getPeople();
    this.status = result.status;
    this.characters = result.data.results;
    this.forSearch = result.data.results;
  }

  characterDetails(name: string){  
    this.router.navigate(['/details'], { queryParams: { character: name} });
  }

  back(){
    this.isSearch = false;
    this.characters = this.forSearch;
  }

  filter(value: string){
    this.isSearch = true;
    let name = value.toLocaleLowerCase();
    for (let x = 0; x < this.forSearch.length; x++) {
      if (this.forSearch[x].name.toLocaleLowerCase().includes(name)) { 
        this.search.push(this.forSearch[x]);
      } 
    }
    this.characters = this.search;
    this.search = [];
  }
}
