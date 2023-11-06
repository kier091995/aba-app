import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { Location } from "@angular/common";
declare var $: any;

@Component({
	selector: 'app-profile-edit',
	templateUrl: './profile-edit.page.html',
	styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
	type: string;
	maxyr: number;
	stype: string;
	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private location: Location,
	) { }

	ngOnInit() {
		this.type = localStorage.getItem("UTYPE");
		this.maxyr = new Date().getFullYear()+5;
		if(localStorage.getItem("UTYPE") == 'Supervisors')
		{
			this.stype = localStorage.getItem("SUB");
		}
		else
		{
			this.stype = 'RBT';
		}
		this.fetchDetails();
	}

	fetchDetails(){
		return new Promise(resolve => {
			let body = {
				action: 'fetchDetails',
				ucode: localStorage.getItem("UCODE")
			};

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
				if (data['status'] == "success") {
					// this.openToasts('<center>Success!</center>');
					$('#fn').val(data['fname']);
					$('#mn').val(data['mname']);
					$('#ln').val(data['lname']);
					$('#phone').val(data['contact']);
					$('#add1').val(data['address']);
					$('#add2').val(data['address1']);
					$('#city').val(data['city']);
					$('#state').val(data['state']);
					$('#zip').val(data['zipcode']);
					$('#supid').val(data['supid']);
					$('#cert').val(data['cert']);
					$('#certdate').val(data['certdate']);
					$('#recertdate').val(data['recertdate']);
					$('#quali').val(data['quali']);
					$('#dquali').val(data['dquali']);
					$('#dsuper').val(data['dsuper']);
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

	backButton(){
		this.location.back();
	}

	update(){
		return new Promise(resolve => {
			let body = {
				action: 'updateProfile',
				fname: $('#fn').val(),
				mname: $('#mn').val(),
				lname: $('#ln').val(),
				email: $('#email').val(),
				contact: $('#phone').val(),
				address: $('#add1').val(),
				address1: $('#add2').val(),
				city: $('#city').val(),
				state: $('#state').val(),
				zipcode: $('#zip').val(),
				supid: $('#supid').val(),
				cert: $('#cert').val(),
				certdate: $('#certdate').val(),
				recertdate: $('#recertdate').val(),
				quali: $('#quali').val(),
				dquali: $('#dquali').val(),
				dsuper: $('#dsuper').val(),
				ucode: localStorage.getItem('UCODE')
			}

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data=> {
				if(data['status'] == 'success'){
					this.openToasts('<center>Details has been updated!</center>');
					if(data['name'])
					{
						localStorage.setItem("NAME", data['name']);
					}
					console.log(data['data']);
				}
				else {
					this.openToaste('<center>Error occured!</center>');
				}
			})
		})
	}

}
