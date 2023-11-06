import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { Location } from "@angular/common";
declare var $: any;

@Component({
	selector: 'app-update-password',
	templateUrl: './update-password.page.html',
	styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {

	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private location: Location,
	) { }

	ngOnInit() {
	}

	update(){
		return new Promise(resolve => {
			let body = {
				action: 'updatePW',
				cp: $('#cp').val(),
				np: $('#np2').val(),
				ucode: localStorage.getItem('UCODE')
			}

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data=> {
				if(data['status'] == 'ok'){
				this.openToasts('<center>Password has been updated!</center>');
				setTimeout(()=>{
					$('#confirmDiv').hide();
					$('ion-input').val('');
				}, 3000);
				}
				else {
				this.openToaste('<center>Current password is incorrect!</center>');
				console.log(data['pw'])
				}
			})
		})
	}

	passCheck(){
		var pass1 = $("#np1").val();
		var pass2 = $("#np2").val();
		if(pass1 != "" && pass2 != "")
		{
			if(pass1 == pass2){
				$("#confirmDiv").show();
			}
			else{
				$("#confirmDiv").hide();
				this.openToaste("Password mismatch!");
			}
		}
		else{
			$("#confirmDiv").hide();
		}
	}

	backButton(){
	this.location.back();
	}



	async openToasts(msg: any) {
		const toast = await this.toastController.create({
			message: '<center>'+msg+'</center>',
			duration: 2000,
		color: 'success',

		});
		toast.present();
	}

	async openToaste(msg: string) {
		const toast = await this.toastController.create({
			message: '<center>'+msg+'</center>',
			duration: 2000,
		color: 'danger',
		});
		toast.present();
	}

}
