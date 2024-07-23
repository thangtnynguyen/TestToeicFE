import { Component } from '@angular/core';
import { ToastrService } from 'src/app/core/modules/toastr/toastr.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent {
  title = 'Take the TOEIC test with me';



  public isToeic=true;

  openToeic(){
    this.isToeic=true;
  }
  openQuiz(){
    this.isToeic=false;
  }


}



