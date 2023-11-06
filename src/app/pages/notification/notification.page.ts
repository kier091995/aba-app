import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostProviderService } from '../../providers/post-provider.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
declare var $: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  
  users:any = [];
  dataType:any [];
  constructor(private http: HttpClient, private postPvd: PostProviderService) { }

  subject:string;
  content:string;
  ucode: string;


  utype: string;
	ionViewWillEnter(): void {
		this.utype = localStorage.getItem("UTYPE");
		this.ucode = localStorage.getItem("UCODE");
    this.reloadNotif();

	}
  ngOnInit() {
    localStorage.setItem("HOMELINK", 'https://www.abacompliancetracker.com/aba/RBTApp/');
  }

  
  reloadNotif(){
    let body = {
      action: "NewNotification",
      ucode: localStorage.getItem('UCODE'),
      utype: localStorage.getItem('UTYPE')
      // rbt
    };
    this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {

        console.log(localStorage.getItem('UCODE'));
        this.users = data["status"];
        this.dataType = data['utype'];

  
    
  });
  }

}
