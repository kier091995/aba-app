import { Component, OnInit, Input } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController, AlertController, Platform  } from '@ionic/angular';
import { SupervisorlogPage } from '../supervisorlog/supervisorlog.page';
declare var $:any;

@Component({
	selector: 'app-bcba-calendar-modal-details',
	templateUrl: './bcba-calendar-modal-details.page.html',
	styleUrls: ['./bcba-calendar-modal-details.page.scss'],
})
export class BcbaCalendarModalDetailsPage implements OnInit {
	@Input() codesched: any;
	@Input() yrmonth: any;
	@Input() day: any;
	@Input() time: any;
	@Input() title: any;
	arrData: any;
	thisDay: string;
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
		var explode = this.yrmonth.split(' ');
		this.thisDay = explode[0]+' '+this.day+', '+explode[1];

		this.getData(this.time);

		$('body').on('click', '#reject', function(){
			presentAlert($(this).attr('class'));
		});

		var codesched = this.codesched;
		var time = this.time;
		var yrmonth = this.yrmonth;
		var day = this.day;

		async function presentAlert(x) {
			var code = x.split(' ');
			const alert = document.createElement('ion-alert');
			alert.subHeader = 'Attention!!!';
			alert.message = 'Please indicate below why this schedule is rejected:';
			alert.inputs = [
				{
					name: 'note',
					placeholder: 'Note',
				}
			],
			alert.buttons = [
				{
					text: 'Reject',
					cssClass: 'secondary',
					handler: (data) => {
						console.log(cancel(data['note'], code[0]))
						cancel(data['note'], code[0])
					}
				}
			]
		  
			document.body.appendChild(alert);
			await alert.present();
		}

		function cancel(msg, code){
			console.log(msg)
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'CancelSched/';
			console.log(link)
			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {action: 'cancel', datacode: code, note: msg},
				success: function(data){
					console.log(data)
					if(data.stat == 'ok')
					{
						jsopenToasts('The schedule is rejected!');
						$("#getDataSched").click();
					}
					else
					{
						jsopenToaste('Error occured!');
					}
				}
			});
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

	backButton(){
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	getData(x)
	{
		if(this.codesched != '')
		{
			this.title = 'Schedule Request';
			return new Promise(resolve => {
				let body = {
					action: 'fetchScheduleList',
					ucode: localStorage.getItem("UCODE"),
					schedcode: this.codesched,
					time: this.time,
					yrmonth: this.yrmonth,
					day: this.day,
				};
				
				console.log(this.time)
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.arrData = data['details'];
						console.log(data['details'])
						// console.log(data['details']);
					}
					else {
						this.openToaste('Error occured!');
					}
				})
			});
		}
		else {
			this.title = 'RBT Work Schedule';
			return new Promise(resolve => {
				let body = {
					action: 'fetchworkschedbcba',
					ucode: localStorage.getItem("UCODE"),
					date: this.thisDay,
				};
				
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.arrData = data['details'];
						console.log(data['details']);
					}
					else {
						this.openToaste('Error occured!');
					}
				})
			});
			
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

	doRefresh(event) {
		setTimeout(() => {
			this.getData('');
			event.target.complete();
		}, 2000);
	}

	approve(val, code)
	{
		if(val)
		{
			// return new Promise(resolve => {
			// 	let body = {
			// 		action: 'approveSched',
			// 		datacode: code,
			// 		type: val,
			// 	};
				
			// 	// console.log(this.time)
			// 	this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
			// 		if(data['status'] == 'ok') {
			// 			this.openToasts('The schedule is approve!');
			// 			setTimeout(() => {
			// 				this.getData('');
			// 			}, 2000);
			// 		}
			// 		else {
			// 			this.openToaste('Error occured!');
			// 		}
			// 	})
			// });
			
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'WithEmails/ApproveSched';
			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {datacode: code, type: val},
				success: function(data){
					console.log(data)
					if(data.status == 'ok')
					{
						jsopenToasts('The schedule is approved!');
						$("#getDataSched").click();
					}
					else
					{
						jsopenToaste('Error occured!');
					}
				}
			});
		}
		else {
			jsopenToaste("Please select a sched type!");
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

	
	log(fnc, code)
	{
		this.goLog(code, fnc);
	}

	async goLog(code, type)
	{
		const modal = await this.modalController.create({
			component: SupervisorlogPage,
			componentProps: {
				ucode: localStorage.getItem("UCODE"),
				code: code,
				type: type,
			}
		});
		
		modal.onDidDismiss().then((data) => {
			this.getData('');
		});
		return await modal.present();
	}
}