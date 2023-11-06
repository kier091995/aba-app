import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { Location } from "@angular/common";
declare var $: any;
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private plt: Platform,
		private menuCtrl: MenuController,
		private location: Location,
  ) { }

	ngOnInit() {
		$('#role').on('change', function(){
			if($(this).val() == 'Supervisor')
			{
				$('#subtype').show();
			}
			else
			{
				$('#subtype').hide();
			}
		});

		if (this.plt.is('ios')) {
			var ptname = 'ios';
		}
		else if(this.plt.is('android')) {
			var ptname = 'android';
		}
		else{
			var ptname = 'APP';
		}

		$('body').on('click', '#register', function(){
			$('#register').attr('disabled', 'true');
			var count = 0;
			var ths = [];
			$('.requiredreg').each(function(){
				if($(this).val() == "")
				{
					count++;
					ths.push($(this))
				}
				// console.log('x');
			});

			if($('#role').val() == 'Supervisor')
			{
				if($('#subtype').val() == 'Role subtype')
				{
					count++;
					ths.push($("#subtype"));
				}
			}

			console.log(count)
			if(count == 0)
			{
				var link1 = localStorage.getItem("HOMELINK");
				var link = link1.slice(0, -1)+'WithEmails/Register';

				$.ajax({
					url: link,
					type: 'POST',
					dataType: 'json',
					data: {
						action: 'save',
						'code': $('#role').find(':selected').attr('data-code'),
						'ctype': $('#role').val(),
						'subtype': $('#subtype').val(),
						'fn': $('#fn').val(),
						'ln': $('#ln').val(),
						'email': $('#email').val(),
						'phone': $('#phone').val(),
						'platname': ptname,
					},
					success: function(data)
					{
						if (data['status'] == "Success") {
							

							jsopenToasts('<center>'+data['msg']+'<center>');
							setTimeout(function(){
								console.log('back')
								$('input[type="text"], input[type="tel"], select').val('');
								$('#register').removeAttr('disabled');
								$('#login').click();
							},3000);
						}
						else
						{
							$('#register').removeAttr('disabled');
							jsopenToaste('<center> '+data['msg']+' <center>');
						}
					}
				});
			}
			else{
				$('#register').removeAttr('disabled');
				jsopenToaste('<center>All field are required.</center>');
				ths[0].focus();
				ths[0].css({ "border": '#FF0000 1px solid' });
				setTimeout(function(){
					ths[0].removeAttr('style');
				},5000);
			}
		});


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

  	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

	openForgotPassword() {
		this.router.navigateByUrl('/forgot-password');
	}

	openLogin() {
		this.router.navigateByUrl('/login');
	}

	// ptname: string;
	// onSubmit(fn, ln, email){
	// 	var count = 0;
	// 	var ths = [];
	// 	$('.requiredreg').each(function(){
	// 		if($(this).val() == "")
	// 		{
	// 			count++;
	// 			ths.push($(this))
	// 		}
	// 		// console.log('x');
	// 	});

	// 	if($('#role').val() == 'Supervisor')
	// 	{
	// 		if($('#subtype').val() == 'Role subtype')
	// 		{
	// 			count++;
	// 			ths.push($("#subtype"));
	// 		}
	// 	}

	// 	console.log(count)
	// 	if(count == 0)
	// 	{
	// 		if (this.plt.is('ios')) {
	// 			this.ptname = 'ios';
	// 		}
	// 		else if(this.plt.is('android')) {
	// 			this.ptname = 'android';
	// 		}
	// 		else{
	// 			this.ptname = 'APP';
	// 		}

	// 		return new Promise(resolve => {
	// 			let body = {
	// 				action: 'Register',
	// 				code: $('#role').find(':selected').attr('data-code'),
	// 				ctype: $('#role').val(),
	// 				subtype: $('#subtype').val(),
	// 				fn: fn,
	// 				ln: ln,
	// 				email: email,
	// 				phone: $('#phone').val(),
	// 				platname: this.ptname,
	// 			};
	// 			console.log(localStorage.getItem("HOMELINK"));
	// 			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
	// 				if (data['status'] == "Success") {
	// 					this.openToasts('<center>'+data['msg']+'<center>');
	// 					$('input[type="text"], input[type="tel"], select').val('');
	// 					console.log(data['send']);
	// 					setTimeout(()=>{
	// 						// this.router.navigateByUrl('/login', {state: {'from': 'register'}});
	// 						// this.router.navigate(['/login']);
	// 						this.location.back();
	// 					}, 3000);
	// 				}
	// 				else {
	// 					this.openToaste('<center>'+data['msg']+'<center>');
	// 				}
	// 			})
	// 		})
	// 	}
	// 	else{
	// 		this.openToaste('<center>This field is required.</center>');
	// 		ths[0].focus();
	// 		ths[0].css({ "border": '#FF0000 1px solid' });
	// 		setTimeout(function(){
	// 			ths[0].removeAttr('style');
	// 		},5000);
	// 	}
	// }

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
