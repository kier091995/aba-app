import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController, AlertController, Platform  } from '@ionic/angular';
declare var $: any;
import { Location } from "@angular/common";


@Component({
	selector: 'app-work-schedule-create',
	templateUrl: './work-schedule-create.page.html',
	styleUrls: ['./work-schedule-create.page.scss'],
})
export class WorkScheduleCreatePage implements OnInit {
	companies: any;
	company: any;
	supervisors: any;
	disabledCreateWorkSched: boolean= false;
	maxyr: any;
	st: any;
	et: any;
	supervisor: any;
	
	public show:boolean = true;
	ptname: string;
	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private alertController: AlertController,
		private plt: Platform,
		private location: Location,
	) { }

	ngOnInit() {
		this.getCompany();
		var today = new Date();
		var year = today.getFullYear();
		//To go to same day next year
		this.maxyr = new Date().getFullYear()+5;
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

	getCompany(){
		return new Promise(resolve => {
			let body = {
				action: 'rbtgetcompany',
				ucode: localStorage.getItem('UCODE')
			}

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data=> {
				if(data['stats'] == 'ok'){
					this.companies = data['datax'];
					console.log(data);
				}
				else {
					this.openToaste('<center>Error occured!</center>');
				}
			})
		})
	}

	optionsFn() {
		

		if(this.company)
		{
			console.log('x1')
			return new Promise(resolve => {
				let body = {
					action: 'rbtgetvisor',
					ucode: localStorage.getItem("UCODE"),
					code: this.company
				}

				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['stat'] == 'ok') {
						this.supervisors = data['visor'];
					}
					else {
						this.openToaste('Error on fetching details.');
					}
				})
			});
		}
	}

	timeChange() {
		
		if(this.st && this.et)
		{
			console.log('x2')
			// console.log(this.supervisor, $('#fd').val(), $('#td').val(), this.st, this.et);
			return new Promise(resolve => {
				let body = {
					action: 'rbtvalidatetime',
					supervisor: this.supervisor,
					cdates: $('#fd').val(),
					cdatee: $('#td').val(),
					start: this.st,
					end: this.et,
				}

				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['stats'] == 'ok') {
						console.log(data);
						if(data['count'] == 0)
						{
							// this.show = false;
							$('#save').css('display', '')
						}
						else
						{
							// this.show = true;
							$('#save').css('display', 'none')
							this.openToaste('The supervisor that you choose already have appointment on the selected time and day.');
						}
					}
					else {
						this.openToaste('Error occured!');
					}
				})
			});
		}
		
	}
	public disabledButton: boolean = false;
	save(){
		this.disabledCreateWorkSched = true;
		if (this.plt.is('ios')) {
			var ptname = 'ios';
		}
		else if(this.plt.is('android')) {
			var ptname = 'android';
		}
		else{
			var ptname = 'APP';
		}

		var counter = 0;
		$('.req').each(function(){
			if($(this).val() == '')
			{
				counter++;
			}
		});

		if(counter == 0)
		{
			// return new Promise(resolve => {
			// 	let body = {
			// 		action: 'rbtsaveown',
			// 		ucode: localStorage.getItem("UCODE"),
			// 		ccomp: this.company,
			// 		csup: this.supervisor,
			// 		cdates: $('#fd').val(),
			// 		cdatee: $('#td').val(),
			// 		cstime: this.st,
			// 		cetime: this.et,
			// 		cnote: $('#note').val(),
			// 		plt: this.ptname,
			// 	}

			// 	this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
			// 		if(data['stats'] == 'ok') {
			// 			this.show = false;
			// 			$('#save').css('display', 'none')
			// 			this.openToasts('Work schedule has been created!');
			// 			this.supervisors = [];
			// 			$('ion-datetime').val('');
			// 			$('ion-textarea').val('');
			// 			this.supervisor = '';
			// 			this.company = '';
						
			// 		}
			// 		else {
			// 			this.openToaste('Error occured!');
			// 		}
			// 	})
			// });
			// $('#save').attr('disabled', 'true');
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'WithEmails/createWorkSchedRBT';
			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'save',
					'ucode': localStorage.getItem("UCODE"),
					'ccomp': this.company,
					'csup': this.supervisor,
					'cdates': $('#fd').val(),
					'cdatee': $('#td').val(),
					'cstime': this.st,
					'cetime': this.et,
					'cnote': $('#note').val(),
					'plt': ptname,
				},
				success: function(data)
				{
					if (data['status'] == "ok") {
						jsopenToasts('Work schedule has been created.');
						this.disabledCreateWorkSched = false;
						setTimeout(function(){
							this.show = false;
							// $('#save').removeAttr('disabled');
							// this.openToasts('Work schedule has been created!');
							this.supervisors = [];
							$('ion-datetime').val('');
							$('ion-textarea').val('');
							this.supervisor = '';
							this.company = '';
							
						},3000);
					}
					else
					{
						this.disabledCreateWorkSched = false;

						jsopenToaste('Error occured!');
						$('#save').removeAttr('disabled');
					}
				}
			});
		}
		else
		{
			this.disabledCreateWorkSched = false;

			$('#save').css('display', '')
			this.openToaste("<center>All fields are required!</center>")
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
