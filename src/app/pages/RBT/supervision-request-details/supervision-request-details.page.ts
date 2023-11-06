import { Component, OnInit, Input } from '@angular/core';
import { PostProviderService } from '../../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController  } from '@ionic/angular';
import { SupervisionRequestCreatePage } from '../supervision-request-create/supervision-request-create.page';
declare var $:any;

@Component({
	selector: 'app-supervision-request-details',
	templateUrl: './supervision-request-details.page.html',
	styleUrls: ['./supervision-request-details.page.scss'],
})
export class SupervisionRequestDetailsPage implements OnInit {
	@Input() day: any;
	@Input() yrmonth: any;
	@Input() supervisor: any;
	thisDay: string;
	arr: any;

	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private modalController: ModalController,
		private actionSheetController: ActionSheetController
	) { }

	ngOnInit() {
		this.thisDay = this.yrmonth+' '+this.day;
		this.getdata();
	}

	getdata() {
		if(this.supervisor)
		{
			return new Promise(resolve => {
				let body = {
					action: 'rbtsupervisionschedlistdetails',
					ucode: localStorage.getItem("UCODE"),
					supervisor: this.supervisor,
					ym: this.yrmonth,
					day: this.day,
				};
	
				this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
					if(data['status'] == 'ok') {
						console.log(data)
						this.arr = data['arr'];
						this.thisDay = data['thisDay'];
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
	// async presentActionSheet(i) {
	// 	console.log(this.arr[i][2]);
	// 	var btn = [];
	// 	for(var x = 0; x < this.arr[i][2].length; x++)
	// 	{
	// 		var code = this.arr[i][2][x][2];
	// 		var time = this.arr[i][2][x][1];
	// 		var companyname = this.arr[i][2][x][3];
	// 		if(this.arr[i][2][x][0] == 'label')
	// 		{
	// 			btn.push({
	// 				text: this.arr[i][2][x][1],
	// 				cssClass: 'actionSheet',
	// 				handler: () => {
	// 				}
	// 			});
	// 		}
	// 		else
	// 		{
	// 			btn.push({
	// 				text: this.arr[i][2][x][1],
	// 				cssClass: 'actionSheet',
	// 				handler: 
	// 					this.openModal.bind(this, code, this.arr[i][2][x][1], this.thisDay, companyname),
	// 				// }
	// 			});
	// 		}
			
	// 	}

	// 	const actionSheet = await this.actionSheetController.create({
	// 		header: 'Availability',
	// 		cssClass: 'match-item-action-sheet',
	// 		buttons: btn,
	// 	});
	// 	await actionSheet.present();

	// 	const { role } = await actionSheet.onDidDismiss();
	// }

	async openModal(code, thisDay, i){
		// console.log(time+'gago')

		// console.log(time, companyname)
		const modal = await this.modalController.create({
			component: SupervisionRequestCreatePage,
			componentProps: {
				code: code,
				thisDay: thisDay,
				companyname: this.arr[i][0],
				arrays: this.arr[i][2],
			}
		});
			
		modal.onDidDismiss().then((data) => {
			this.getdata();
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

	backButton(){
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	doRefresh(event) {
		setTimeout(() => {
			this.getdata();
		}, 2000);
	}
}
