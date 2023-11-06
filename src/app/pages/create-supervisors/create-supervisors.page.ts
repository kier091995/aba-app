import { Component, OnInit, ViewChild } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, Platform, IonInput } from '@ionic/angular';
import { Location } from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-create-supervisors',
  templateUrl: './create-supervisors.page.html',
  styleUrls: ['./create-supervisors.page.scss'],
})
export class CreateSupervisorsPage implements OnInit {
	@ViewChild('fn')  thisInputfn: IonInput;
	@ViewChild('ln')  thisInputln: IonInput;
	@ViewChild('pn')  thisInputpn: IonInput;
	@ViewChild('email')  thisInputemail: IonInput;
	thisInput: any;
	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private location: Location,
		private plt: Platform,
	) { }

	ngOnInit() {
		
	}

	ngAfterViewInit(){
	}
	disabledCreatesuper:boolean = false;
	ptname: string;
	create(){
		this.disabledCreatesuper = true;
		var count = 0;
		var ths = [];
		var thsr = [];
		$('.required').each(function(){
			if($(this).val() == "")
			{
				count++;
				ths.push($(this).siblings('ion-label').text())
				thsr.push($(this).attr('id'))
			}
		});

		if(count == 0)
		{
			if (this.plt.is('ios')) {
				this.ptname = 'ios';
			}
			else if(this.plt.is('android')) {
				this.ptname = 'android';
			}
			else{
				this.ptname = 'APP';
			}

			return new Promise(resolve => {
				let body = {
					action: 'createVisor',
					ucode: localStorage.getItem('UCODE'),
					fn: $('#fn').val(),
					ln: $('#ln').val(),
					pn: $('#pn').val(),
					email: $('#email').val(),
					plt: this.ptname,
				};
				console.log(localStorage.getItem("HOMELINK"));
				this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
					if (data['status'] == "ok") {
						this.openToasts('<center>Supervisor created successfully.<center>');
						this.disabledCreatesuper = false;
						$('ion-input').val('');
						
					}
					else {
						this.disabledCreatesuper = false;
						this.openToaste('<center>Company name is existing!<center>');
					}
				})
			})
		}
		else{
			this.disabledCreatesuper = false;
			this.openToaste('<center>'+ths[0]+' field is required.</center>');
			console.log(thsr[0].toString())
			// thsr[0].addClass('has-focus');
			// thsr[0].attr('style', "--border-color: 'var(--ion-color-danger, #f1453d) !important;'")
			// this.thisAny = thsr[0];
			this['thisInput'+thsr[0]].setFocus();
		}
	}

	async openToasts(msg) {
		const toast = await this.toastController.create({
			message: '<center>'+msg+'</center>',
			duration: 2000,
      		color: 'success',
		});
		toast.present();
	}

 	async openToaste(msg) {
		const toast = await this.toastController.create({
			message: '<center>'+msg+'</center>',
			duration: 2000,
      		color: 'danger',
		});
		toast.present();
	}

	backButton(){
		this.router.navigate(['/profile']);
	}


	createSupervisor(){
		this.disabledCreatesuper = true;
		if (this.plt.is('ios')) {
			var ptname = 'ios';
		}
		else if(this.plt.is('android')) {
			var ptname = 'android';
		}
		else{
			var ptname = 'APP';
		}

		$('#createSupervisor').attr('disabled', 'true');
		var count = 0;
		var ths = [];
		var thsr = [];
		$('.requiredsuper').each(function(){
			if($(this).val() == "")
			{
				count++;
				ths.push($(this).siblings('ion-label').text())
				thsr.push($(this).attr('id'))
			}
		});

		console.log(count)
		if(count == 0)
		{
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'WithEmails/CreateSupervisor';

			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'save',
					'ucode': localStorage.getItem('UCODE'),
					'fn': $('#fn').val(),
					'ln': $('#ln').val(),
					'pn': $('#pn').val(),
					'email': $('#email').val(),
					'plt': ptname,
				},
				success: function(data)
				{
					
					if (data['status'] == "ok") {
						
						jsopenToasts('<center>Supervisor created successfully.<center>');
						this.disabledCreatesuper = false;
						setTimeout(function(){
							$('ion-input').val('');
							$('#createSupervisor').removeAttr('disabled')
						},3000);
					}
					else
					{
						this.disabledCreatesuper = false;
						jsopenToaste('<center>Supervisor email already exist!<center>');
						$('#createSupervisor').removeAttr('disabled')
					}
				}
			});
		}
		else{
			this.disabledCreatesuper = false;
			$('#createSupervisor').removeAttr('disabled')
			jsopenToaste('<center>All fields(*) are required.</center>');
			// this['thisInput'+thsr[0]].setFocus();
			// setTimeout(function(){
			// 	this['thisInput'+thsr[0]].removeAttr('style');
			// },5000);
		}

		async function jsopenToasts(msg) {
			const toast = document.createElement('ion-toast');
			toast.message = '<center>'+msg+'</center>';
			toast.duration = 2000;
			toast.color = 'success';
			document.body.appendChild(toast);
			return toast.present();
		}

		async function jsopenToaste(msg) {
			const toast = document.createElement('ion-toast');
			toast.message = '<center>'+msg+'</center>';
			toast.duration = 2000;
			toast.color = 'danger';
			document.body.appendChild(toast);
			return toast.present();
		}
	}
}
