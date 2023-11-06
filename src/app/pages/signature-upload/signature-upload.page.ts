import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../../providers/post-provider.service';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, AlertController, Platform } from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-signature-upload',
  templateUrl: './signature-upload.page.html',
  styleUrls: ['./signature-upload.page.scss'],
})
export class SignatureUploadPage implements OnInit {
	sign: any;

  	constructor(
    	private router: Router,
		private postPvd: PostProviderService,
		private toastController: ToastController,
		private menuCtrl: MenuController,
		private alertController: AlertController,
		private someComponent: AppComponent,
		private plt: Platform, 
 	) { }
	disabledUploadsign:boolean = false;
	ngOnInit() {
		this.getSign();
	}

 	backButton(){
		this.router.navigate(['/profile']);
	}

  	signChange(event)
	{
		var file = $("input[type=file]").get(0).files[0];
 
        if(file){
            var reader = new FileReader();
 
            reader.onload = function(){
                $("#output").attr("src", reader.result);
            }
 
            reader.readAsDataURL(file);
        }
	}

	getSign(){
		return new Promise(resolve => {
			let body = {
				action: 'fetchSign',
				ucode: localStorage.getItem("UCODE"),
				utype: localStorage.getItem("UTYPE"),
			};

			this.postPvd.postData(body, localStorage.getItem("HOMELINK")).subscribe(data => {
				// this.sign = data['sign'];
				$("#output").attr('src', data['sign']);
			})
		});
	}

	saveSignature()
	{
		this.disabledUploadsign = true;
		if (this.plt.is('ios')) {
			var ptname = 'ios';
		}
		else if(this.plt.is('android')) {
			var ptname = 'android';
		}
		else{
			var ptname = 'APP';
		}
		var formData = new FormData();
		var file = $("#signature")[0].files;

		if(file.length > 0)
		{
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'WithEmails/EmeUploadSignature';

			formData.append('action', 'save');
			formData.append('ucode', localStorage.getItem('UCODE'));
			formData.append('file', file[0]);
			formData.append('plt', ptname);

			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: formData,
				contentType: false,
				processData: false,
				success: function(data)
				{
					if (data['status'] == "ok") {
						this.disabledUploadsign = false;
						jsopenToasts('<center>Signature upload successful.<center>');
						setTimeout(function(){
							$('#signature').val('');
							$('#saveSignature').removeAttr('disabled')
						},3000);
					}
					else
					{
						this.disabledUploadsign = false;

						$('#saveSignature').removeAttr('disabled')
						jsopenToaste('<center>Error occured!<center>');
					}
				}
			});
		}
		else
		{
			this.disabledUploadsign = false;

			jsopenToaste('<center>No file selected!<center>');
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

	doRefresh(event) {
		setTimeout(() => {
			this.getSign();
			event.target.complete();
		}, 2000);
	}
}
