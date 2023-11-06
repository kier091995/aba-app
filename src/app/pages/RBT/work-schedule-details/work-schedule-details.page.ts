import { Component, OnInit, Input } from '@angular/core';
import { PostProviderService } from '../../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController, AlertController, Platform  } from '@ionic/angular';
import { TaskTrackerPage } from '../task-tracker/task-tracker.page';

@Component({
	selector: 'app-work-schedule-details',
	templateUrl: './work-schedule-details.page.html',
	styleUrls: ['./work-schedule-details.page.scss'],
})
export class WorkScheduleDetailsPage implements OnInit {
	@Input() day: any;
	@Input() yrmonth: any;
	@Input() title: any;
	@Input() type: any;
	@Input() yr: any;
	arrData: any;
	thisDay: any;
	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private modalController: ModalController,
		private actionSheetController: ActionSheetController,
		private alertController: AlertController,
		private plt: Platform,
	) { }

	ngOnInit() {
		this.getData();
	}

	backButton(){
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	getData(){
		return new Promise(resolve => {
			let body = {
				action: 'rbtgetworkdetails',
				ucode: localStorage.getItem("UCODE"),
				date: this.yrmonth+'-'+this.day,
				day: this.day,
				type: this.type,
			};
			
			this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
				if(data['status'] == 'ok') {
					this.arrData = data['details'];
					this.thisDay = data['date'];
					console.log(data)
				}
				else {
					this.openToaste('Error occured!');
				}
			})
		});
	}

	async openModal(type, code) 
	{
		const modal = await this.modalController.create({
			component: TaskTrackerPage,
			componentProps: {
				type: type,
				code: code,
			}
		});
		
		modal.onDidDismiss().then((data) => {
			this.getData();
		});
		return await modal.present();
	}

	async openToaste(msg: string) {
		const toast = await this.toastController.create({
			message: '<center>'+msg+'</center>',
			duration: 2000,
			color: 'danger',
		});
		toast.present();
	}

	doRefresh(event) {
		setTimeout(() => {
			this.getData();
			event.target.complete();
		}, 2000);
	}

}
