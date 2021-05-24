import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})

export class ApiStarwarsService {

  api!: AxiosInstance;

  constructor() {
    this.buildAPIRequest();
  }

  public buildAPIRequest() {
    this.api = axios.create({
      baseURL: "https://swapi.dev/api/",
    });
  } 
    
  public async getPeople() {
    return this.api.get('people/');
  }

  public async getData(url: string) {
    return axios.get(url);
  }

}
