import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { PostProviderService } from '../app/providers/post-provider.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	type = localStorage.getItem("UTYPE");

	pages = [
		{ title: 'Profile', url: '/profile', icon: 'person-outline', children: [], open: false},
		{ title: 'Notification', url: '/notification', icon: 'bulb-outline', children: [], open: false},
		{ title: 'BCBA Calendar', url: '/bcba-calendar', icon: 'calendar-outline', children: [], open: false},
	];

	pagesr = [
		{ title: 'Profile', url: '/profile', icon: 'person-outline', children: [], open: false},
		{ title: 'Notification', url: '/notification', icon: 'bulb-outline', children: [], open: false},
		{ 
			title: 'ABA Work Schedule', icon: 'list-outline',
			children: [
				{ title: 'My Work Schedule', url: '/work-schedule', icon: 'calendar-outline', children: [], open: false},
				{ title: 'Create Work Schedule', url: '/work-schedule-create', icon: 'calendar-outline', children: [], open: false}
			]
		},
		// { title: 'Task tracker', url: '/task-tracker', icon: 'list-outline', children: [], open: false},
		{ title: 'ABA Supervision Request', url: '/supervision-request', icon: 'calendar-outline', children: [], open: false},
	]

	constructor(
		private router: Router,
		private platform: Platform,

		private appVersion: AppVersion,
		private postPvd: PostProviderService,
		private alertController: AlertController,
	) {
		this.initializeApp();
	}

	logout(){
		this.type = '';
		localStorage.clear();
		this.router.navigate(['/login']);
	}

	theFunction(){
		console.log(';x');
		this.type = localStorage.getItem("UTYPE");
	}

	AppVer: String;
	AppPackageName: String;
	initializeApp() {
		this.platform.ready().then(() => {
			// this.statusBar.styleDefault();
			// this.splashScreen.hide();

			// timer(3000).subscribe(() => this.showSplash = false)

			this.appVersion.getVersionNumber().then(versionNumber => {
				this.AppVer = versionNumber;

				if (this.platform.is('android')) {
					var devPlat = 'android';
					localStorage.setItem("PLATFORM", 'AND');
				}

				if (this.platform.is('ios')) {
					var devPlat = 'ios';
					localStorage.setItem("PLATFORM", 'IOS');
				}
				
				if (versionNumber != undefined) {
					return new Promise(resolve => {
						let body = {
							action: 'checkVersion',
							currentVersion: versionNumber,
							devPlat: devPlat,
							packageName: this.appVersion.getPackageName(),
						}

						this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
							console.log(data, 'asda')
							if (data['platform'] == 'android') {
								if (data['updated'] == 'no') {
									// alert(JSON.stringify(data));
									this.presentAlertConfirm('android');
								}
							}
							else if (data['platform'] == 'ios') {
								if (data['updated'] == 'no') {
									// alert(JSON.stringify(data));
									this.presentAlertConfirm('ios');
								}
							}
						});
					});
				}
			}).catch(err => {
				console.log(err);
			})


		});
	}

	async presentAlertConfirm(plt) {
		const alert = await this.alertController.create({
			header: 'Application needs to be updated.',
			backdropDismiss: false,
			// message: 'Message <strong>text</strong>!!!',
			buttons: [
				{
					text: 'Update',
					handler: () => {
						// window.location.href = "https://play.app.goo.gl/?link=https://https://play.google.com/store/apps/details?id=com.agsi.AzureConnect";
						if(plt == 'android')
						{
							// var linkandroid = "https://play.google.com/store/apps/details?id="+this.appVersion.getPackageName();
							var linkandroid = "https://play.google.com/store/search?q=rbt%20compliance%20tracker&c=apps";
							window.open(linkandroid, "_system");
							navigator['app'].exitApp();
						}
						else
						{
							window.open("https://apps.apple.com/ph/app/azure-connect/id1490206148", "_system");
							navigator['app'].exitApp();
						}
						
						// console.log('Confirm Okay');
						// document.location.href = 'index.html';
					}
				}
			]
		});

		await alert.present();
	}
}
