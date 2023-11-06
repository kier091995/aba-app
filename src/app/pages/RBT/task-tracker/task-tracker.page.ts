import { Component, OnInit, Input } from '@angular/core';
import { PostProviderService } from '../../../providers/post-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, MenuController, ModalController, ActionSheetController, AlertController, Platform  } from '@ionic/angular';
declare var $:any;

@Component({
	selector: 'app-task-tracker',
	templateUrl: './task-tracker.page.html',
	styleUrls: ['./task-tracker.page.scss'],
})
export class TaskTrackerPage implements OnInit {
	@Input() type: any;
	@Input() code: any;
	arrData: any;
	simple: any;
	name: string;
	visor: string;
	date: string;
	PT: any;
	PTS: any;

	sum: number;
	supervisorcode: any;
	stime: any;
	etime: any;
	newcode: any;

	diabledTaskLog: boolean = false;
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

	ngOnInit(){
		console.log(this.type, this.code)
		this.name = localStorage.getItem("NAME");
		var codex = this.code;

		if(this.type != 'view')
		{
			this.getData();

			$('body').on('change', '.stype', function(){
				console.log($(this).find(':selected').text());
				var val = $(this).find(':selected').val();
				var theclass = $(this).attr('attr');
				var link1 = localStorage.getItem("HOMELINK");
				var link = link1.slice(0, -1)+'1/';
				console.log(link)
				$.ajax({
					url: link,
					type: 'POST',
					dataType: 'json',
					data: {code: val, action: 'subtype'},
					success: function(data)
					{
						console.log(data)
						$('.sub'+theclass).html(data['PTS']);
					}
				});
			});

			$('body').on('change', '.time', function(){
				var attr = $(this).attr('attr');
				console.log(attr, $(this).val())
				$('.'+attr).html($(this).val());

				var split = $(this).val().split(':');

				var test = parseInt(split[0]);
				var test1 = parseInt(split[1]);
				var total = Math.abs(test)+'.'+Math.abs(test1);
				$('.'+attr).html(total);
				countTotal();
			})

			function countTotal(){
				var sum = 0;
				$('.total').each(function(){
					var val = $(this).text();
					if(val)
					{
						sum += parseInt(val);
						console.log(val);
					}
					
				});
				console.log(sum * 0.05)
				var total = sum * 0.05
				$('.finaltotal').html(total.toFixed(2));
			}

			$('body').on('click', '#save', function(){
				$('#save').attr('disabled', true);
				var req = 0;
				var ths = [];
				$('.req').each(function(){
					if($(this).val() == '')
					{
						req++;
						ths.push($(this));
					}
				});

				if(req == 0)
				{
					var link1 = localStorage.getItem("HOMELINK");
					var link = link1.slice(0, -1)+'1/';

					var arrProType = [];
					var arrSubType = [];
					var arrCmnt = [];
					var arrDuration = [];

					var arrtotalX = [];
					$('.total').each(function(){
						if($(this).html() != '')
						{
							arrtotalX.push($(this).html());
						}
					});


					$('.stype').each(function(){
						if($(this).find(':selected').text() != '')
						{
							arrProType.push($(this).find(':selected').text());
						}
					});
					$('.sub').each(function(){
						if($(this).find(':selected').text() != '')
						{
							arrSubType.push($(this).find(':selected').text());
						}
					});

					$('.comment').each(function(){
						if($(this).val() != '')
						{
							arrCmnt.push($(this).val());
						}
					});

					$('.time').each(function(){
						if($(this).val() != '')
						{
							arrDuration.push($(this).val());
						}
					});

					// console.log(arrDuration)
					$.ajax({
						url: link,
						type: 'POST',
						dataType: 'json',
						data: {
							action: 'save',
							'ucode': localStorage.getItem("UCODE"),
							'newcode': $('.newcode').val(),
							'bcba': $('.supervisorcode').val(),
							'stime': $('.stime').val(),
							'etime': $('.etime').val(),
							'date': $('.date').html(),
							'duration': arrDuration,
							'protype': arrProType,
							'prosub': arrSubType,
							'cmnt': arrCmnt,
							'totalX': arrtotalX,
						},
						success: function(data)
						{
							// console.log(data)
							jsopenToasts('Task log create successful!');
							$('#save').removeAttr('disabled');
							setTimeout(function(){
								console.log('back')
								$('#back').click();
							},3000);
							// $('.sub'+theclass).html(data['PTS']);
						}
					});
				}
				else
				{
					$('#save').removeAttr('disabled');
					ths[0].focus();
					ths[0].css('border', '1px solid red');
					setTimeout(function(){
						ths[0].removeAttr('style');
					}, 5000)
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

			$('body').on('click', '#remove', function(){
				var lnt = $('.btnRemove').length;
				var count = $(this).index('.btnRemove') + 1;
				$(this).parent().parent().remove();
				// if(lnt > 1) {
				// 	$('#divappend'+count).remove();
				// }
				console.log(count)
			});
		}

		else if(this.type == 'view')
		{
			var link1 = localStorage.getItem("HOMELINK");
			var link = link1.slice(0, -1)+'1/';

			$.ajax({
				url: link,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'view',
					'ucode': localStorage.getItem("UCODE"),
					'code': codex,
				},
				success: function(data)
				{
					console.log(data)
					$('#x').html(data.datax);
					var total = data.total;
					$('.finaltotal').html(total.toFixed(2));
					$('.visor').html(data.visor);
					$('.date').html(data.date);
				}
			});
		}
	}

	getData() {
		return new Promise(resolve => {
			let body = {
				action: 'rbtgettaskcreate',
				ucode: localStorage.getItem("UCODE"),
				type: this.type,
				code: this.code,
			};
			
			this.postPvd.postData(body, localStorage.getItem('HOMELINK')).subscribe(data => {
				if(data['status'] == 'ok') {
					this.arrData = data['datax'];
					this.newcode = this.arrData['newcode'];
					this.supervisorcode = this.arrData['supervisorcode'];
					this.stime = this.arrData['stime'];
					this.etime = this.arrData['etime'];
					this.visor = data['supervisor'];
					this.date = data['date'];
					$('.pt1').append(data['PT'])
					this.PT = data['PT'];
					console.log(data);
				}
				else {
					this.openToaste('Error occured!');
				}
			})
		});
	}

	btnappend(){
		var count = $('.stype').length;
		count++;

		var borderstyle = 'style="border: 1px solid"';
		var styletime = 'style="font-size: 10px;width: 100%;color: black; background-color: white"';
		var styleselect = 'style="width: 100%; font-size: 12px;color: black; background-color: white"';
		var stylecomment = 'style="font-size:12px;width: 100%;color: black; background-color: white"';
		var label = `style="font-family: 'Poetsen One';font-size: 12px;"`;


		$('#divappend').append(
			`
			<ion-row id="rowappend">
				<ion-col class="datalist" size="4" `+borderstyle+`>
					<ion-button button id="remove" class="btnRemove" color="danger" size="small"><ion-icon name="remove-circle-outline" style="color: #fff;"></ion-icon></ion-button> <br>
					<input type="time" class="time req" attr="total`+count+`" `+styletime+`>
				</ion-col>
				<ion-col class="datalist" size="6" `+borderstyle+`>
					<ion-label position="stacked" `+label+`>Service Type: </ion-label>
					<select class="stype pt`+count+` req" attr="pt`+count+`" `+styleselect+`>`+this.PT+`</select>
					
					<ion-label position="stacked" `+label+`>Service Subtype: </ion-label>
					<select class="subpt`+count+` req" `+styleselect+`></select>

					<ion-label position="stacked" `+label+`>Comment:</ion-label>
					<textarea class="csscomment comment" cols="30" rows="10" `+stylecomment+`></textarea>
				</ion-col>
				<ion-col class="datalist" size="2" `+borderstyle+`>
				<label class="total total`+count+`" `+label+`></label>
				</ion-col>
			</ion-row>
		`)
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
			this.getData();
			event.target.complete();
		}, 2000);
	}

}
