import { Component, OnInit, Input } from '@angular/core';
import { PostProviderService } from '../../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController, Platform  } from '@ionic/angular';
declare var $: any;

@Component({
	selector: 'app-supervision-request-create',
	templateUrl: './supervision-request-create.page.html',
	styleUrls: ['./supervision-request-create.page.scss'],
})
export class SupervisionRequestCreatePage implements OnInit {
	@Input() code: any;
	@Input() thisDay: any;
	@Input() companyname: any;
	@Input() arrays: any;

	note: any;
	ptname: string;
	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private modalController: ModalController,
		private actionSheetController: ActionSheetController,
		private plt: Platform,
	) { }

	ngOnInit() {
		console.log(this.arrays[0])
	}

	async openToaste(msg: string) {
		const toast = await this.toastController.create({
			message: '<center>'+msg+'</center>',
			duration: 2000,
			color: 'danger',
		});
		toast.present();
	}

	async openToasts(msg: any) {
		const toast = await this.toastController.create({
			message: '<center>'+msg+'</center>',
			duration: 2000,
			color: 'success',

		});
		toast.present();
	}

	backButton(){
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	submit(){
		// console.log(this.note)
		if (this.plt.is('ios')) {
			this.ptname = 'ios';
		}
		else if(this.plt.is('android')) {
			this.ptname = 'android';
		}
		else{
			this.ptname = 'APP';
		}
		var arrck = [];
		var ckcount = 0;
		$('.ckboxes').each(function(){
			if($(this).is(':checked'))
			{
				arrck.push($(this).val());
				ckcount++;
			}
		});
		console.log(arrck)
		if(ckcount > 0)
		{
			// return new Promise(resolve => {
			// 	let body = {
			// 		action: 'rbtsupervisioncreate',
			// 		ucode: localStorage.getItem("UCODE"),
			// 		date: this.thisDay,
			// 		code: this.code,
			// 		// time: this.time,
			// 		time: arrck,
			// 		note: this.note,
			// 		plt: this.ptname,
			// 	};
	
			// 	this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
			// 		console.log(data)
			// 		if(data['stat'] == 'ok')
			// 		{
			// 			console.log(data)
			// 			this.openToasts('Waiting for BCBA Approval!');
			// 			setTimeout(function(){
			// 				$('#back').click();
			// 			}, 3000);
			// 		}
			// 	})
			// });
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'WithEmails/createSupervisionRequest';

			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'save',
					ucode: localStorage.getItem("UCODE"),
					date: this.thisDay,
					code: this.code,
					// time: this.time,
					time: arrck,
					note: this.note,
					plt: this.ptname,
				},
				success: function(data)
				{
					if (data['stat'] == "ok") {
						jsopenToasts('Waiting for BCBA Approval!');
						setTimeout(function(){
							$('#back').click();
						}, 3000);
					}
					else
					{
						jsopenToaste('Error occured!');
					}
				}
			});
		}
		else 
		{
			this.openToaste("You need to select a time to proceed request!");
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
