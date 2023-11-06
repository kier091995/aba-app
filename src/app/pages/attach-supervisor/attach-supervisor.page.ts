import { Component, OnInit, ViewChild } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, Platform, IonInput } from '@ionic/angular';
import { Location } from "@angular/common";
import { ThrowStmt } from '@angular/compiler';
declare var $: any;

@Component({
	selector: 'app-attach-supervisor',
	templateUrl: './attach-supervisor.page.html',
	styleUrls: ['./attach-supervisor.page.scss'],
})
export class AttachSupervisorPage implements OnInit {

	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private location: Location,
		private plt: Platform, 
	) { }
	supervisor:any;
	supervisors:any;
	disabledAttachsuper:boolean = false;
	ngOnInit() {
		this.getSupervisors();
	}
	backButton(){
		this.router.navigate(['/profile']);
	}

	getSupervisors(){
		return new Promise(resolve => {
			let body = {
				action: 'fetchSupervisortoattach',
				ucode: localStorage.getItem("UCODE"),
				utype: localStorage.getItem("UTYPE"),
			};

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
				if (data['status'] == "ok") {
					console.log(data);
					this.supervisors = data['supervisors']
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
		if(this.supervisor)
		{
			this.disabledAttachsuper = true;
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
					action: 'attachSupervisor',
					ucode: localStorage.getItem('UCODE'),
					supcode: this.supervisor,
					utype: localStorage.getItem('UTYPE'),
					ptname: ptname,
				};
				console.log(body);
				this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
					if (data['status'] == "ok") {
						this.openToasts('<center>Supervisor successfully attached.<center>');
						$('ion-select').val('');
						this.disabledAttachsuper = false;
						this.getSupervisors();
					}
					else {
						this.disabledAttachsuper = false;
						this.openToaste('<center>Error occured!<center>');
					}
				})
			})
		}
		else
		{
			this.disabledAttachsuper = false;
			this.openToaste('<center>Please select a supervisor!<center>');
		}
	}

}
