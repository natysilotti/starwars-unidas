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
   
    let response = await this.apiStarwars.getData(this.detailsCharacters[0].homeworld); 
    this.homeworld = response.data.name;

    this.films = this.detailsCharacters[0].films;
    for(let x = 0; x < this.films.length; x++){
      let response = await this.apiStarwars.getData(this.films[x]);
      this.resultFilms.push(response.data.title); 
    }
  
    this.species = this.detailsCharacters[0].species;
    for(let x = 0; x < this.species.length; x++){
      let response = await this.apiStarwars.getData(this.species[x]);
      this.resultSpecies.push(response.data.name);  
    }
    
    this.vehicles = this.detailsCharacters[0].vehicles;
    for(let x = 0; x < this.vehicles.length; x++){
      let response = await this.apiStarwars.getData(this.vehicles[x]);
      this.resultVehicles.push(response.data.name);  
    }

    this.starships = this.detailsCharacters[0].starships;
    for(let x = 0; x < this.starships.length; x++){
      let response = await this.apiStarwars.getData(this.starships[x]);
      this.resultStarshios.push(response.data.name);  
    }

    this.status = 200;
  
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
