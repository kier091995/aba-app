import { Component, OnInit, Input } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController, AlertController, Platform  } from '@ionic/angular';
declare var $:any;

@Component({
	selector: 'app-supervisorlog',
	templateUrl: './supervisorlog.page.html',
	styleUrls: ['./supervisorlog.page.scss'],
})
export class SupervisorlogPage implements OnInit {
	@Input() code: any;
	@Input() type: any;
	company: any;
	rbt: any;
	date: any;
	supe: any;
	sups: any;
	ptname: string;
	logcode: any;
	own: any;
	visor: any;

	signature: any;
	disablesuplog: boolean = false;
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
		if(this.type == 'create')
		{
			this.getData();
		}
		else
		{
			this.fetch();
		}
		

		
	}

	backButton(){
		this.modalController.dismiss({
			'dismissed': true
		});
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
			this.getData();
			event.target.complete();
		}, 2000);
	}

	getData()
	{
		if(this.code)
		{
			return new Promise(resolve => {
				let body = {
					action: 'getsupervisorlog',
					ucode: localStorage.getItem("UCODE"),
					code: this.code,
				};
				
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.company = data['company'];
						this.rbt = data['rbt'];
						this.date = data['date'];
						this.logcode = data['datax']['newcode'];
						this.signature = data['sign'];

						if(this.signature)
						{
							$('#ckboxsign').css('display', '');
						}

						var dbstime = data['datax']['stime'];
						var dbetime = data['datax']['etime'];
						var stime = dbstime.split(':');
						var etime = dbetime.split(':');

						var f = parseInt(stime[0]) - parseInt(etime[0]);
						var l = parseInt(stime[1]) - parseInt(etime[1]);
						var total = Math.abs(f)+'.'+Math.abs(l);
						$('#hours').html(total)
						$('#total').html(total)
						$('#totalx').val(total)

						$('#stime').html(data['datax']['stime']);
						$('#etime').html(data['datax']['etime']);
						
					}
					else {
						this.openToaste('Error occured!');
					}
				})
			});
			
		}
	}

	unrestrict() {
		var hours = Number($('#totalx').val());
		var unr = Number($('#unr').val());
		var total = String(Math.abs(hours - unr));
		$('#total').html(total);
	}

	suptime() {
		if((this.supe != undefined && this.sups != undefined) && (this.supe != '' && this.sups != ''))
		{
			var s = this.sups.split('T');
			var e = this.supe.split('T');

			var superstime = s[1].split(':');
			var superetime = e[1].split(':');
			var f = parseInt(superstime[0]) - parseInt(superetime[0]);
			var l = parseInt(superstime[1]) - parseInt(superetime[1]);
			var total = Math.abs(f)+'.'+Math.abs(l);
			console.log(superetime, superstime)
			$('#totalsup').html(total);
		}
	}

	async confirm() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			message: 'By creating this log means you sign this document?',
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


	save()
	{
		// var counter = 0;
		// var ths = [];
		// $('.req').each(function(){
		// 	if($(this).val() == '')
		// 	{
		// 		ths.push($(this));
		// 		counter++;
		// 	}
		// });

		// if(counter == 0)
		// {
		// 	if (this.plt.is('ios')) {
		// 		this.ptname = 'ios';
		// 	}
		// 	else if(this.plt.is('android')) {
		// 		this.ptname = 'android';
		// 	}
		// 	else{
		// 		this.ptname = 'APP';
		// 	}

		// 	return new Promise(resolve => {
		// 		let body = {
		// 			action: 'savesupervisorlog',
		// 			ucode: localStorage.getItem("UCODE"),
		// 			ptname: this.ptname,
		// 			workcode: this.logcode,
		// 			type: $('#stype').val(),
		// 			unrestricted: $('#unr').val(),
		// 			method: $('#ms').val(),
		// 			superstime: this.sups,
		// 			supertimee: this.supe,
		// 			total: $('#totalsup').html(),
		// 			observation: $('#co').val(),
		// 			note: $('#note').val(),
		// 			tx: $('#hours').html(),
		// 			total1: $('#total').html(),
		// 		};
	
		// 		this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
		// 			if(data['status'] == 'ok') {
		// 				// this.codesched = data['schedcode'];
		// 				this.openToasts'The log has been created.');
		// 				this.backButton();
		// 			}
		// 			else {
		// 				this.openToaste('Error occured!');
		// 			}
		// 		})
		// 	});
		// }
		// else
		// {
		// 	this.openToaste('This fields are required!');
  		// 	ths[0].focus();
  		// 	ths[0].css('border', '1px solid red');
  		// 	setTimeout(function(){
  		// 		ths[0].removeAttr('style');
  		// 	},5000);
		// }
		this.disablesuplog = true;
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
		var ths = [];
		$('.req').each(function(){
			if($(this).val() == '')
			{
				ths.push($(this));
				counter++;
			}
		});

		if(counter == 0)
		{
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'WithEmails/CreateSupervisorLog';
			var logcode = this.logcode;
			var sups = this.sups;
			var supe = this.supe;
			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'save',
					ucode: localStorage.getItem("UCODE"),
					ptname: ptname,
					workcode: logcode,
					type: $('#stype').val(),
					unrestricted: $('#unr').val(),
					method: $('#ms').val(),
					superstime: sups,
					supertimee: supe,
					total: $('#totalsup').html(),
					observation: $('#co').val(),
					note: $('#note').val(),
					tx: $('#hours').html(),
					total1: $('#total').html(),
				},
				success: function(data)
				{
					if (data['status'] == "ok") {
						jsopenToasts('The log has been created.');
						this.disablesuplog = false;
						setTimeout(function(){
							
							$('#back').click();
						},3000);
					}
					else
					{
						this.disablesuplog = false;
						jsopenToaste('Error occured!');
					}
				}
			});
		}
		else
		{
			this.disablesuplog = false;
			jsopenToaste('This fields are required!');
  			ths[0].focus();
  			ths[0].css('border', '1px solid red');
  			setTimeout(function(){
  				ths[0].removeAttr('style');
  			},5000);
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

	fetch()
	{
		if(this.code)
		{
			return new Promise(resolve => {
				let body = {
					action: 'displaysupervisorlog',
					ucode: localStorage.getItem("UCODE"),
					code: this.code,
				};
				
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						this.company = data['company'];
						this.rbt = data['rbt'];
						this.date = data['date'];

						this.own = data['datax'];
						this.visor = data['visor'];

						this.logcode = data['datax']['newcode'];

						var dbstime = data['datax']['stime'];
						var dbetime = data['datax']['etime'];
						var stime = dbstime.split(':');
						var etime = dbetime.split(':');

						var f = parseInt(stime[0]) - parseInt(etime[0]);
						var l = parseInt(stime[1]) - parseInt(etime[1]);
						var total = Math.abs(f)+'.'+Math.abs(l);
						$('#hoursv').html(total)
						$('#totalv').html(total)						
					}
					else {
						this.openToaste('Error occured!');
					}
				})
			});
			
		}
	}

	checkSign(event: any) {
		if(event.detail.checked) {
			$('#btnSave').css('display', '');
		} else if (!event.detail.checked) {
			$('#btnSave').css('display', 'none');

		}
	}

}
