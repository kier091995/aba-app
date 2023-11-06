import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
declare var $: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	constructor(
		private appVersion: AppVersion,
		private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
	) { }

	AppVer: String;
	ngOnInit() {

		localStorage.setItem("HOMELINK", 'https://www.abacompliancetracker.com/aba/RBTApp/');

	}

	ionViewDidEnter(): void {
		// localStorage.clear();

		this.menuCtrl.enable(false);
		console.log(localStorage.getItem("UTYPE"));

		localStorage.setItem("HOMELINK", 'https://www.abacompliancetracker.com/aba/RBTApp/');
		var ucode = localStorage.getItem("UCODE");
		console.log(ucode)
		if(ucode != null || ucode != undefined)
		{
			this.router.navigate(['/profile']);
		}
	}

	ionViewDidLeave(): void {
		this.menuCtrl.enable(true);
	}

	openForgotPassword() {
		this.router.navigate(['/forgot-password']);
	}

	openRegister() {
		this.router.navigate(['/register']);
	}

	login(user, pass) {
		console.log($('#user').val(),$('#pass').val());
		var count = 0;
		var ths = [];
		$(".required").each(function () {
			if ($(this).val() == "") {
				count++;
				ths.push($(this));
			}
		});

		if (count == 0) {
			return new Promise(resolve => {
				let body = {
					action: 'NewLogin',
					user: user,
					pass: pass,
					// rbt
					// type: 'c75bd20cfe2ae235f95f4171455547d921a4b3e2',
					// super
					type: '0f90840f722482888e9da6d7363e28741c24a12f',
				};

				this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
					if (data['status'] == "Success") {
						// this.openToasts('<center>Welcome!!!</center>');
						console.log(data['data']);
						localStorage.setItem("UCODE", data['data']['userCode']);
						localStorage.setItem("UTYPE", data['data']['categoryName']);
						localStorage.setItem("SUB", data['sub']);
						localStorage.setItem("ROLECODE", data['data']['roleCategoryCode']);
						localStorage.setItem("NAME", data['data']['name']);
						this.router.navigate(['/profile']);
					}
					else {
						this.openToaste('<center>Invalid credentials!</center>');
					}
				})
			});
		}
		else{
			ths[0].focus();
			ths[0].css({ "border": '#FF0000 1px solid' });
			setTimeout(function(){
				ths[0].removeAttr('style');
			},5000);
		}



	}


	async openToasts(msg) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2000,
			color: 'success',

		});
		toast.present();
	}

	async openToaste(msg) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2000,
			color: 'danger',
		});
		toast.present();
	}

}
