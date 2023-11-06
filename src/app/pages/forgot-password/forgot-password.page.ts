import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { Location } from "@angular/common";
declare var $: any;

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.page.html',
	styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
	email: string = '';
	constructor(
		private location: Location,
		private postPvd: PostProviderService,
		private router: Router,
		private toastController: ToastController,
	) { }
	
	ngOnInit() {
	}

	backButton(){
		this.location.back();
	}

  
	checkEmail(){
		var pattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

		if (pattern.test(this.email)) {
			// return new Promise(resolve => {
			// 	let body = {
			// 		action: 'verifyEmail',
			// 		email: this.email
			// 	}
				
			// 	this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data =>{
			// 		if(data['status'] == 'ok'){
			// 			this.openToasts("<center>Email is verified. Please click 'Send code' to continue!</center>");
			// 			$("#verifyEmail").hide();
			// 			$(".showverify").show();
			// 		}
			// 		else
			// 		{
			// 			this.openToaste("<center>Email is not registered!</center>");
			// 		}
			// 	})
	
			// });
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'WithEmails/verifyEmail';
			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'save',
					email: this.email
				},
				success: function(data)
				{
					console.log(data);
					if(data['status'] == 'ok'){
						jsopenToasts("<center>Email is verified. Please check the code in your email!</center>");
						$("#verifyEmail").hide();
						$(".showcode").show();
						// $(".showverify").show();
					}
					else
					{
						jsopenToaste("<center>Email is not registered!</center>");
					}
				}
			});
		}
		else {
			this.openToaste("Invalid email pattern!");
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
	codeCheck(){
		var datax = $('#codex').val().split('');
		console.log(datax.length);
		if(datax.length == 5)
		{
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'WithEmails/verifyCode';
			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {
					code:  $('#codex').val(),
					email: this.email,
				},
				success: function(data)
				{
					console.log(data);
					if(data['status'] == 'ok'){
						$(".showcode").hide();
						$(".showverify").show();
					}
					else
					{
						jsopenToaste("<center>Incorrect code!</center>");
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

  	emailCheck() {
		var pattern = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

		if (pattern.test(this.email)) {
			this.openToasts("Valid email!");
			$("#sendEmail").show();
		}
		else {
			this.openToaste("Invalid email!");
		}
	}

	passCheck(){
		var pass1 = $("#password1").val();
		var pass2 = $("#password2").val();
		if(pass1 != "" && pass2 != "")
		{
			if(pass1 == pass2){
				$("#confirmPassword").show();
			}
			else{
				$("#confirmPassword").hide();
				this.openToaste("Password mismatch!");
			}
		}
		else{
			$("#confirmPassword").hide();
		}
	}

	confirmPassword(){
		
		return new Promise(resolve => {
			let body = {
				action: 'updatePassword',
				email: this.email,
				password: $("#password1").val(),
			};
			
			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
				if (data['status'] == 'ok') {
					this.openToasts("Password updated successfully!");
					this.router.navigateByUrl('/login');
				}
				else {
					this.openToaste("Password update failed!");
				}
			});
		});
	}

	returnLogin(){
		this.router.navigate(['/login']);
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
			message: '<center>'+msg+'</center>',
			duration: 2000,
      		color: 'danger',
		});
		toast.present();
	}

  	async openToast(msg) {
		const toast = await this.toastController.create({
			message: '<center>'+msg+'</center>',
			duration: 3000
		});
		toast.present();
	}

}
