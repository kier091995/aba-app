import { Component, OnInit, ViewChild } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, Platform, IonInput } from '@ionic/angular';
import { Location } from "@angular/common";
import { ThrowStmt } from '@angular/compiler';
declare var $: any;

@Component({
	selector: 'app-attach-company',
	templateUrl: './attach-company.page.html',
	styleUrls: ['./attach-company.page.scss'],
})
export class AttachCompanyPage implements OnInit {

	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private location: Location,
		private plt: Platform, 
	) { }
	companies:any;
	company:any;
	disabledButton:boolean = false;
	ngOnInit() {
		this.getCompanies();
	}
	backButton(){
		this.router.navigate(['/profile']);
	}

	getCompanies(){
		return new Promise(resolve => {
			let body = {
				action: 'fetchCompanytoattach',
				ucode: localStorage.getItem("UCODE"),
				utype: localStorage.getItem("UTYPE"),
			};

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
				if (data['status'] == "ok") {
					// console.log(data);
					this.company = data['companies']
				}
				else {
					this.openToaste('<center>Error Occured!</center>');
				}
			})
		});
	}

	async openToasts(msg: any) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2000,
			color: 'success',

		});
		toast.present();
	}

	async openToaste(msg: string) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2000,
			color: 'danger',
		});
		toast.present();
	}

	create(){
		if(this.companies)
		{
			this.disabledButton = true;
			if (this.plt.is('ios')) {
				var ptname = 'ios';
			}
			else if(this.plt.is('android')) {
				var ptname = 'android';
			}
			else{
				var ptname = 'APP';
			}

			return new Promise(resolve => {
				let body = {
					action: 'attachCompany',
					ucode: localStorage.getItem('UCODE'),
					compcode: this.companies,
					utype: localStorage.getItem('UTYPE'),
					ptname: ptname,
				};
				
				this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
					if (data['status'] == "ok") {
						this.openToasts('<center>Company successfully attached.<center>');
						this.disabledButton = false;

						$('ion-select').val('');
						this.getCompanies();
			
					}
					else {
						this.disabledButton = false;
						this.openToaste('<center>Error occured!<center>');
					}
				})
			})
		}
		else
		{
			this.disabledButton = false;
			this.openToaste('<center>Please indicate a company!<center>');
		}
	}
}
