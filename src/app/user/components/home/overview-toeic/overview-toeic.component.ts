import { Component } from '@angular/core';

@Component({
  selector: 'app-overview-toeic',
  templateUrl: './overview-toeic.component.html',
  styleUrls: ['./overview-toeic.component.css']
})
export class OverviewToeicComponent {

  public showFullContent = false;

  toggleContent(): void {
    this.showFullContent = !this.showFullContent;
  }
}
