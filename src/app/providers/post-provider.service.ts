import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class PostProviderService {
	server: string = localStorage.getItem("HOMELINK");
	constructor(public http: HttpClient)
	{

	}

	postData(body, file)
	{
		let type = "application/json; charset=UTF-8";
		let headers = new HttpHeaders({ 'Content-type': type });
		console.log('x')
		return this.http.post(file, JSON.stringify(body));

	}
}
