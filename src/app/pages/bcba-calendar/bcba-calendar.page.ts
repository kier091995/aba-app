import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { BcbaCalendarModalPage } from '../bcba-calendar-modal/bcba-calendar-modal.page';
import { BcbaCalendarModalDetailsPage} from '../bcba-calendar-modal-details/bcba-calendar-modal-details.page';
declare var $: any;

@Component({
	selector: 'app-bcba-calendar',
	templateUrl: './bcba-calendar.page.html',
	styleUrls: ['./bcba-calendar.page.scss'],
})
export class BcbaCalendarPage implements OnInit {
	min: string;
	max: string;
	companies: any;
	company: any;
	ym: any;

	yrmonth: string;
	tr: any[];
	schedCode: any[];
	dateView: any;
	arrColor: any;
	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private modalController: ModalController,
		private actionSheetController: ActionSheetController,
		private alertController: AlertController,
	) { }

	ngOnInit() {
		this.min = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString().padStart(2, "0");
		this.max = (new Date().getFullYear() + 1).toString();
		this.getCompany();
	}

	getCompany() {
		return new Promise(resolve => {
			let body = {
				action: 'getBCBACompany',
				ucode: localStorage.getItem("UCODE"),
			};

			this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
				if(data['status'] == 'ok') {
					this.companies = data['companies'];
					console.log(data);
					if(data['sign'] == null)
					{
						this.alertSign();
					}
				}
				else {
					this.openToaste('Error on fetching details.');
				}
			})
		});
	}

	async alertSign()
	{
		const alert = await this.alertController.create({
			header: 'Attention!',
			backdropDismiss: false,
			message: '<p style="text-align: justify;">Before you proceed you must upload your signature first!</p>',
			cssClass: 'foo',
			buttons: [
				{
					text: 'Go',
					handler: () => {
						this.router.navigateByUrl('/signature-upload');
					}
				}
			]
		});

		await alert.present();
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

	doRefresh(event) {
		setTimeout(() => {
			this.ym = '';
			this.company = '';
			this.getCompany();
			event.target.complete();
		}, 2000);
	}

	optionsFn() {
		// console.log(this.company, this.ym);

		if((this.company != undefined && this.ym != undefined) && (this.company != '' && this.ym != ''))
		{
			return new Promise(resolve => {
				let body = {
					action: 'getBCBASched',
					ucode: localStorage.getItem("UCODE"),
					company: this.company,
					ym: this.ym
				};
	
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.tr = data['dates'];
						this.yrmonth = data['details'];
						this.schedCode = data['schedCode'];
						this.dateView = data['dateView'];
						this.arrColor = data['arrColor'];
						$('#tblData').show();
						console.log(this.arrColor);
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

	async presentActionSheet(day, codesched, date) {
		if(day)
		{
			const actionSheet = await this.actionSheetController.create({
				header: 'Schedule: '+date,
				cssClass: 'match-item-action-sheet',
				buttons: [
					{
						text: 'My Supervision Availability',
						cssClass: 'actionSheet',
						handler: () => {
							this.openModal(codesched, 'My Supervision Availability', this.yrmonth, day, 'BcbaCalendarModalPage');
						}
					}, 
					{
						text: 'My RBT Work Schedule',
						cssClass: 'actionSheet',
						handler: () => {
							this.openModal('', 'My RBT Work Schedule', this.yrmonth, day, 'BcbaCalendarModalDetailsPage');
					}
				}]
			});
			await actionSheet.present();
			const { role } = await actionSheet.onDidDismiss();
		}
	}

	async openModal(val, header, yrmonth, day, component) 
	{
		var arr = [];
		var componentx;
		if(component == 'BcbaCalendarModalPage')
		{
			componentx = BcbaCalendarModalPage;
			arr = [{
				codesched: val,
				yrmonth: yrmonth,
				day: day,
				headertitle: header,
				company: this.company}];
		}
		else if(component == 'BcbaCalendarModalDetailsPage')
		{
			componentx = BcbaCalendarModalDetailsPage;
			arr = [{
				codesched: val,
				yrmonth: yrmonth,
				day: day,
				time: 'x',
				title: 'Work Schedule'
			}];
		}

		const modal = await this.modalController.create({
			component: componentx,
			componentProps: arr[0]
		});
		
		modal.onDidDismiss().then((data) => {
			this.optionsFn();
		});
		return await modal.present();
	}

}
