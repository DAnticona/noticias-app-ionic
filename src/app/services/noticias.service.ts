import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@Angular/common/http';
import { RespuestaTopHeadLines } from '../pages/interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
	'X-Api-key': apiKey,
});
@Injectable({
	providedIn: 'root',
})
export class NoticiasService {
	headLinesPage = 0;
	categoriaActual = '';
	categoriaPage = 0;

	constructor(private http: HttpClient) {}

	private ejecutarQuery<T>(query: string) {
		query = apiUrl + query;
		return this.http.get<T>(query, { headers });
	}

	getTopHeadLines() {
		this.headLinesPage++;
		return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
		// return this.http.get<RespuestaTopHeadLines>(
		// 	`http://newsapi.org/v2/top-headlines?country=us&apiKey=dc3aedd470404e6b98d8aea5ae5c35b1`
		// );
	}

	getTopHeadLinesCategoria(categoria: string) {
		if (this.categoriaActual === categoria) {
			this.categoriaPage++;
		} else {
			this.categoriaPage = 1;
			this.categoriaActual = categoria;
		}
		return this.ejecutarQuery<RespuestaTopHeadLines>(
			`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`
		);
		// 		return this.http.get(`ET
		// https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=dc3aedd470404e6b98d8aea5ae5c35b1`);
	}
}
