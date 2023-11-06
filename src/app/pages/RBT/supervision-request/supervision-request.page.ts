import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController  } from '@ionic/angular';
import { SupervisionRequestDetailsPage } from '../supervision-request-details/supervision-request-details.page';
declare var $:any;

@Component({
	selector: 'app-supervision-request',
	templateUrl: './supervision-request.page.html',
	styleUrls: ['./supervision-request.page.scss'],
})
export class SupervisionRequestPage implements OnInit {
	ym: string;
	visor: string;
	supervisor: any;
	min: string;
	max: string;
	sched: any;
	arrColor: any;
	yrmonth: any;
	tr: any;

	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private modalController: ModalController,
		private actionSheetController: ActionSheetController
	) { }

	ngOnInit() {
		this.min = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString().padStart(2, "0");
		this.max = (new Date().getFullYear() + 1).toString();
		console.log(this.min, this.max);
		this.getVisor();
 	}

	doRefresh(event) {
		setTimeout(() => {
			this.ym = '';
			this.visor = '';
			event.target.complete();
		}, 2000);
	}

	getVisor() {
		return new Promise(resolve => {
			let body = {
				action: 'rbtsupervisiongetvisor',
				ucode: localStorage.getItem("UCODE"),
			};

			this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
				if(data['status'] == 'ok') {
					this.visor = data['visor'];
					console.log(data);
				}
				else {
					this.openToaste('Error on fetching details.');
				}
			})
		});
	}

	optionsFn() {
		if(this.supervisor && this.ym)
		{
			return new Promise(resolve => {
				let body = {
					action: 'rbtsupervisionschedlist',
					ucode: localStorage.getItem("UCODE"),
					supervisor: this.supervisor,
					ym: this.ym
				};
	
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.tr = data['dates'];
						this.yrmonth = data['details'];
						this.sched = data['sched'];
						this.arrColor = data['arrColor'];
						console.log(data)
						$('#tblData').show();
					}
					else {
						this.openToaste('Error on fetching details.');
					}
				})
			});
		}
		else 
		{
			$('#tblData').hide();
		}
	}

	async openModal(day, check) {
		if(check)
		{
			const modal = await this.modalController.create({
				component: SupervisionRequestDetailsPage,
				componentProps: {
					day: day,
					yrmonth: this.yrmonth,
					supervisor: this.supervisor,
				}
			});
				
			modal.onDidDismiss().then((data) => {
				this.optionsFn();
			});
			return await modal.present();
		}
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
