import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild("search") search: ElementRef | undefined; 

  isDetailsPage!: boolean;
  
  constructor(
    private router: Router,
    private message: MessageService) { }

  ngOnInit(): void {
    
    if(this.router.url.includes("/details")){
      this.isDetailsPage = true; 
    }
    else{
      this.isDetailsPage = false; 
    }
  }

  sendSearch() {
    this.message.sendMessage(this.search?.nativeElement.value);    
  }

  back(){
    this.message.sendMessage("BACK");  
  }


}
