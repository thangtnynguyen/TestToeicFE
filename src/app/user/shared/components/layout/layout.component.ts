import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
	constructor(public router: Router) { }


	isShowHeader() {
		// return !this.router.url.startsWith('/toeic/test-toeic');
		return !(
			this.router.url.startsWith('/toeic/test-toeic') ||
			this.router.url.startsWith('/quiz/test-quiz')
		);
	}
}
