import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  currentYear: string = '';

  constructor(private datePipe: DatePipe) {
    const currentDate = new Date();
    this.currentYear = this.datePipe.transform(currentDate, 'yyyy') ?? '';
  }
  
}
