import { Component, OnInit } from '@angular/core';
import { PostProviderService} from '../../providers/post-provider.service';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, AlertController } from '@ionic/angular';

declare var $: any;

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	name: string;
	type: string;
	email: string;
	contact: string;
	gender: string;
	bdate: string;
	address: string;
	address1: string;
	city: string;
	state: string;
	zipcode: string;
	country: string;

	// visor
	supid: string;
	cert: string;
	quali: string;
	dquali: string;
	dsuper: string;

	companies: any;
	comlng: number;
	supervisors: any;
	suplng: number;
	certdate: any;
	recertdate: any;
	stype: string;
	companycodes: any;

	constructor(
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private alertController: AlertController,
		private someComponent: AppComponent,
	) { }

	ngOnInit() {

	}

	ionViewDidEnter(): void {
		this.menuCtrl.enable(true);
		if(localStorage.getItem("UTYPE") == 'Supervisors')
		{
			this.stype = localStorage.getItem("SUB");
		}
		else
		{
			this.stype = 'RBT';
		}
		
	}
	utype: string;
	ionViewWillEnter(): void {
		this.utype = localStorage.getItem("UTYPE");
		this.menuCtrl.enable(true);
		this.fetchDetails();
		this.fetchCompany();
		this.fetchSupervisors();

		this.someComponent.theFunction();
		this.checkData();
	}

	fetchDetails(){
		return new Promise(resolve => {
			let body = {
				action: 'fetchDetails',
				ucode: localStorage.getItem("UCODE")
			};

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
				if (data['status'] == "success") {
					// this.openToasts('<center>Success!</center>');
					this.email = data['email'];
					this.contact = data['contact'];
					this.address = data['address'];
					this.address1 = data['address1'];
					this.city = data['city'];
					this.state = data['state'];
					this.zipcode = data['zipcode'];
					this.supid = data['supid'];
					this.cert = data['cert'];
					this.certdate = data['certdate'];
					this.recertdate = data['recertdate'];
					this.quali = data['quali'];
					this.dquali = data['dquali'];
					this.dsuper = data['dsuper'];
					this.name = data['name'];
					this.type = data['categoryName'];
				}
				else {
					this.openToaste('<center>Error Occured!</center>');
				}
			})
		});
	}

	fetchCompany(){
		return new Promise(resolve => {
			let body = {
				action: 'fetchCompanyNew',
				ucode: localStorage.getItem("UCODE"),
				utype: localStorage.getItem("UTYPE"),
			};

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
				if (data['status'] == "success") {
					// this.openToasts('<center>Success!</center>');
					this.companies = data['companies'];
					this.companycodes = data['companycode'];
					this.comlng = this.companies.length;
					if(data['count'] == 8)
					{
						$('#btncompany').hide();
					}
				}
				else {
					this.openToaste('<center>Error Occured!</center>');
				}
			})
		});
	}

	fetchSupervisors(){
		return new Promise(resolve => {
			let body = {
				action: 'fetchSupervisors',
				ucode: localStorage.getItem("UCODE")
			};

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
				if (data['status'] == "success") {
					// this.openToasts('<center>Success!</center>');
					this.supervisors = data['supervisors'];
					this.suplng = this.supervisors.length;
					// console.log(this.suplng)
				}
				else {
					this.openToaste('<center>Error Occured!</center>');
				}
			})
		});
	}
	

	async openToasts(msg: any) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2000,
			color: 'success',

		});
		toast.present();
	}

	async openToaste(msg: string) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2000,
			color: 'danger',
		});
		toast.present();
	}

	editProfile(){
		this.router.navigateByUrl('/profile-edit');
	}

	createCompany(){
		this.router.navigateByUrl('/create-company');
	}

	createVisor(){
		this.router.navigateByUrl('/create-supervisors');
	}

	updatePass()
	{
		this.router.navigateByUrl('/update-password');
	}

	attachCompany()
	{
		this.router.navigateByUrl('/attach-company');
	}

	attachSuper()
	{
		this.router.navigateByUrl('/attach-supervisor');
	}

	doRefresh(event) {
		setTimeout(() => {
			this.fetchDetails();
			this.fetchCompany();
			this.fetchSupervisors();
			event.target.complete();
		}, 2000);
	}

	checkData(){
		// console.log(localStorage.getItem("UCODE"), localStorage.getItem("UTYPE"));
		if(localStorage.getItem("UTYPE") == 'RBT')
		{
			
			return new Promise(resolve => {
				let body = {
					action: 'NEWrbtValidation',
					ucode: localStorage.getItem("UCODE"),
				};
	
				this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
					if (data['status'] == "ok") {
						this.presentAlertConfirm(data['msg'], data['module'], data['work']);
					}
				})
			});
		}
	}


	async presentAlertConfirm(msg, module, work) {
		const alert = await this.alertController.create({
			header: 'Attention!',
			backdropDismiss: false,
			message: '<p style="text-align: justify;">'+msg+'</p>',
			cssClass: 'foo',
			buttons: [
				{
					text: 'Go',
					handler: () => {

						if(module == 'Company')
						{
							this.chooseCreateCompany();
						}

						if(module == 'Supervisor')
						{
							this.chooseCreateSupervisor();
						}

						if(module == 'Worksched')
						{
							this.router.navigate(['/work-schedule-create']);
						}
					}
				}
			]
		});

		await alert.present();
	}

	async chooseCreateCompany() {
		const alert = await this.alertController.create({
			header: 'Attention!',
			backdropDismiss: false,
			message: '<p style="text-align: justify;">Please choose whether to <b>create</b> or <b>attach</b> a company </p>',
			cssClass: 'foo',
			buttons: [
				{
					text: 'Create',
					handler: () => {
						this.createCompany();
					}
				},
				{
					text: 'Attach',
					handler: () => {
						this.attachCompany();
					}
				}
			]
		});

		await alert.present();
	}

	async chooseCreateSupervisor() {
		const alert = await this.alertController.create({
			header: 'Attention!',
			backdropDismiss: false,
			message: '<p style="text-align: justify;">Please choose whether to <b>create</b> or <b>attach</b> a supervisor </p>',
			cssClass: 'foo',
			buttons: [
				{
					text: 'Create',
					handler: () => {
						this.createVisor();
					}
				},
				{
					text: 'Attach',
					handler: () => {
						this.attachSuper();
					}
				}
			]
		});

		await alert.present();
	}

	async presentRemove(code) 
	{
		console.log(code);
		const alert = await this.alertController.create({
			header: 'Attention!',
			backdropDismiss: false,
			message: '<p style="text-align: justify;">Are you sure you want to remove this company?</p>',
			cssClass: 'foo',
			buttons: [
				{
					text: 'Yes',
					handler: () => {
						return new Promise(resolve => {
							let body = {
								action: 'RBTremoveCompany',
								ucode: localStorage.getItem("UCODE"),
								code: code,
							};
				
							this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
								if (data['status'] == "ok") {
									this.openToasts('<center>Company has been removed!</center>');
									this.fetchCompany();
								}
								else {
									this.openToaste('<center>Error Occured!</center>');
								}
							})
						});
					}
				},
				{
					text: 'No',
					role: 'cancel',
					handler: (blah) => {
					}
				}
			]
		});

		await alert.present();
	}

	signature()
	{
		this.router.navigateByUrl('/signature-upload');
	}


	async deleteacc() {
		const alert = await this.alertController.create({
			header: 'Attention!',
			backdropDismiss: false,
			message: '<p style="text-align: justify;"> Are you sure you want to delete your account? </p>',
			cssClass: 'foo',
			buttons: [
				{
					text: 'Confirm',
					handler: () => {
						return new Promise(resolve => {
							let body = {
								action: 'DeactivateAccount',
								ucode: localStorage.getItem("UCODE"),
							};
				
							this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
								if (data['status'] == "ok") {
									this.openToasts('Account has been deleted!!!');
									this.type = '';
									localStorage.clear();
									this.router.navigate(['/login']);
								}
							})
						});
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
				}
			]
		});

		await alert.present();
	}
	
}
