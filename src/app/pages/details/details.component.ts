import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SuperPage } from '../../pages/superpage/super-page.component';
import { ApiStarwarsService } from '../../service/api/api-starwars.service';
import { Results } from '../../models/Results';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends SuperPage implements OnInit {

  character!: Results[]; 
  detailsCharacters: Results[] = [];
  url: any;
  films = [];
  resultFilms: Array<String> = [];
  species = [];
  resultSpecies: Array<String> = [];
  vehicles = [];
  resultVehicles: Array<String> = [];
  starships = [];
  resultStarshios: Array<String> = [];
  homeworld!: String;
  status = 0;
  
  constructor(
    private apiStarwars: ApiStarwarsService, 
    public location: Location,
    public activatedRoute: ActivatedRoute) {
      super(location, activatedRoute);
     }

  async ngOnInit(): Promise<void> {
    let result = await this.apiStarwars.getPeople();
    this.character = result.data.results;

    for (let x = 0; x < this.character.length; x++) {
      if (this.character[x].name.includes(this.parameters.character)) { 
        this.detailsCharacters.push(this.character[x]);  
      } 
    }

    this.getHomeWorld()

    this.getFilms();

    this.getSpecies();

    this.getVehicles();
    
    this.getStarships();

    this.status = 200;
  
  }

  async getHomeWorld(){   
    if(this.detailsCharacters[0].homeworld.includes("http")){
      this.url = this.detailsCharacters[0].homeworld.replace("http","https");
    }
    let response = await this.apiStarwars.getData(this.detailsCharacters[0].homeworld); 
    this.homeworld = response.data.name;
  }

  getFilms(){
    this.films = this.detailsCharacters[0].films;
    this.films.forEach(async (item) => {
      let data = new URL(item);
      this.url = data.href.replace("http", "https");
      let response = await this.apiStarwars.getData(this.url);
      this.resultFilms.push(response.data.title); 
    });   
  }

  getSpecies(){
    this.species = this.detailsCharacters[0].species;
    this.species.forEach(async item => {
      let data = new URL(item);
      this.url = data.href.replace("http", "https");
      let response = await this.apiStarwars.getData(this.url);
      this.resultSpecies.push(response.data.name); 
    });
  }

  getVehicles(){
    this.vehicles = this.detailsCharacters[0].vehicles;
    this.vehicles.forEach(async item => {
      let data = new URL(item);
      this.url = data.href.replace("http", "https");
      let response = await this.apiStarwars.getData(this.url);
      this.resultVehicles.push(response.data.name); 
    });
  }

  getStarships(){
    this.starships = this.detailsCharacters[0].starships;
    this.starships.forEach(async item => {
      let data = new URL(item);
      this.url = data.href.replace("http", "https");
      let response = await this.apiStarwars.getData(this.url);
      this.resultStarshios.push(response.data.name); 
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
