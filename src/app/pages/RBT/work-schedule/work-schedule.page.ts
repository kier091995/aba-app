import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../../providers/post-provider.service';
import { WorkScheduleDetailsPage } from '../work-schedule-details/work-schedule-details.page';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController  } from '@ionic/angular';
declare var $: any;

@Component({
	selector: 'app-work-schedule',
	templateUrl: './work-schedule.page.html',
	styleUrls: ['./work-schedule.page.scss'],
})
export class WorkSchedulePage implements OnInit {
	ym: any;
	tr: any;
	yrmonth: any;
	schedCode: any;
	dateView: any;
	arrColor: any;
	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private modalController: ModalController,
		private actionSheetController: ActionSheetController
	) { }

	ngOnInit() {
		this.ym = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString();
		this.optionsFn();
	}

	optionsFn() {
		if(this.ym)
		{
			return new Promise(resolve => {
				let body = {
					action: 'getrbtsched',
					ucode: localStorage.getItem("UCODE"),
					ym: this.ym
				};
	
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.tr = data['dates'];
						this.yrmonth = data['details'];
						this.dateView = data['dateView'];
						this.arrColor = data['arrColor'];
						$('#tblData').show();
						console.log(data);
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

	async presentActionSheet(day, date) {
		if(day)
		{
			console.log(this.ym+'ymmmmmmmmmmm');
			const actionSheet = await this.actionSheetController.create({
				header: 'Schedule: '+date,
				cssClass: 'match-item-action-sheet',
				buttons: [
					{
						text: 'Supervision Request Lists',
						cssClass: 'actionSheet',
						handler: () => {
							this.openModal(day, 'Supervision Request Lists', this.ym, 'supervision');
						}
					}, 
					{
						text: 'RBT Work Schedule Request Lists',
						cssClass: 'actionSheet',
						handler: () => {
							this.openModal(day, 'RBT Work Schedule Request Lists', this.ym, 'work');
					}
				}]
			});
			await actionSheet.present();
			const { role } = await actionSheet.onDidDismiss();
		}
	}

	async openModal(day, header, yr, type) 
	{
		const modal = await this.modalController.create({
			component: WorkScheduleDetailsPage,
			componentProps: {
				title: header,
				yrmonth: yr,
				type: type,
				day: day,
			}
		});
		
		modal.onDidDismiss().then((data) => {
			this.optionsFn();
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
			this.optionsFn();
			event.target.complete();
		}, 2000);
	}

}
