import { Component, OnInit, Input } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, AlertController, Platform, ActionSheetController } from '@ionic/angular';
import { Location } from "@angular/common";
declare var $: any;
import { BcbaCalendarModalDetailsPage } from '../bcba-calendar-modal-details/bcba-calendar-modal-details.page';

@Component({
	selector: 'app-bcba-calendar-modal',
	templateUrl: './bcba-calendar-modal.page.html',
	styleUrls: ['./bcba-calendar-modal.page.scss'],
})
export class BcbaCalendarModalPage implements OnInit {
	@Input() codesched: any;
	@Input() yrmonth: any;
	@Input() day: any;
	@Input() headertitle: any;
	@Input() company: any;

	thisDay: string;
	time1: any[];
	time2: any[];
	timeData: any[];
	schedTime: any[];
	ptname: string;
	exist: any;
	disabledSaveBCBA:boolean = false;
	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private location: Location,
		private modalController: ModalController,
		private alertController: AlertController,
		private plt: Platform,
		private actionSheetCTRL: ActionSheetController,
	) { }

	ngOnInit() {
		var explode = this.yrmonth.split(' ');
		this.thisDay = explode[0]+' '+this.day+' '+explode[1];

		this.time1 = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
		this.time2 = ['06:59','07:59','08:59','09:59','10:59','11:59','12:59','13:59','14:59','15:59','16:59'];

		this.getData();
	}

	backButton(){
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	getData()
	{
		if(this.codesched)
		{
			return new Promise(resolve => {
				let body = {
					action: 'fetchAvailables',
					ucode: localStorage.getItem("UCODE"),
					schedcode: this.codesched,
					company: this.company,
					date: this.thisDay,
				};
	
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.timeData = data['existingTime'];
						this.schedTime = data['arrData'];
						this.exist = data['exist'];
						console.log(data);
					}
					else {
						this.openToaste('Error occured!');
					}
				})
			});
		}
		else
		{
			this.timeData = [false ,false ,false ,false ,false ,false ,false ,false ,false ,false ,false];
			this.schedTime = ['' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''];
			console.log(this.timeData)
			return new Promise(resolve => {
				let body = {
					action: 'ckExist',
					ucode: localStorage.getItem("UCODE"),
					schedcode: this.codesched,
					company: this.company,
					date: this.thisDay,
				};
	
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.exist = data['exist'];
						console.log(data)
					}
					else {
						this.openToaste('Error occured!');
					}
				})
			});
		}
	}

	async presentAlertConfirm() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			message: 'Are you sure you want to set this as your availability time?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					cssClass: 'alertConfirm',
					handler: (blah) => {
						// console.log('Confirm Cancel: blah');
					}
				}, {
					text: 'Yes',
					cssClass: 'alertConfirm',
					handler: () => {
						this.save();
					}
				}
			]
		});
  
		await alert.present();
	}

	save(){
		this.disabledSaveBCBA = true;
		var time = [];
		var counter = 0;
		$('ion-checkbox').each(function(){
			if($(this).attr('aria-checked') == 'true')
			{
				time.push($(this).val());
			}
			else
			{
				time.push('');
				counter++;
			}
		});
		
		if(counter < 11)
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
					action: 'saveAvailability',
					ucode: localStorage.getItem("UCODE"),
					schedcode: this.codesched,
					company: this.company,
					timex:  JSON.stringify(time),
					date: this.thisDay,
					ptname: this.ptname,
				};
	
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.disabledSaveBCBA = false;
						this.codesched = data['schedcode'];
						this.openToasts('Time availabilty has been saved.');
					}
					else {
						this.disabledSaveBCBA = false;
						this.openToaste('Error occured!');
					}
				})
			});
		}
		else
		{
			this.disabledSaveBCBA = false;
			this.openToaste('There is no selected available time.');
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

	async openDetails(val)
	{
		const modal = await this.modalController.create({
			component: BcbaCalendarModalDetailsPage,
			componentProps: {
				codesched: this.codesched,
				yrmonth: this.yrmonth,
				day: this.day,
				time: val,
			}
		});
		
		modal.onDidDismiss().then((data) => {
			// this.optionsFn();
		});
		return await modal.present();
	}

	async actionSheet(data) {
		var arr = data.split(',');
		var btns = [];
		// console.log(arr)
		for (let i = 0; i < arr.length; i++) {
			btns.push({
				'text': arr[i],
				'cssClass': 'actionSheet',
				'handler': () => {
					this.openDetails(arr[i]);
				}
			});
		}

		const actionSheet = await this.actionSheetCTRL.create({
			header: 'Schedule requests',
			cssClass: 'match-item-action-sheet',
			buttons: btns
		});
		await actionSheet.present();
		const { role } = await actionSheet.onDidDismiss();
	}

	doRefresh(event) {
		setTimeout(() => {
			this.getData();
			event.target.complete();
		}, 2000);
	}

}
