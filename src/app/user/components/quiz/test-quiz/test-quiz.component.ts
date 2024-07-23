import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { QuestionService } from 'src/app/user/services/api/question.service';
@Component({
  selector: 'app-test-quiz',
  templateUrl: './test-quiz.component.html',
  styleUrls: ['./test-quiz.component.css']
})
export class TestQuizComponent implements OnInit{

  question:any=[];
  baseUrl:any;
  correctAnswerId: number | null = null;
  selectedAnswerId: number | null = null;

  constructor(private questionService:QuestionService){
    this.baseUrl=enviroment.host.baseUrl
  }


  ngOnInit(): void {
      this.questionService.getQuestionRandom().subscribe((result)=>{
        this.question=result.data;
        this.assignRandomColors();
      })
  }

  goBack(){};
  goNext(){
    this.questionService.getQuestionRandom().subscribe((result)=>{
      this.question=result.data;
      this.assignRandomColors();
    })
  };
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  submitCheckAnswer(answerId: number) {
    const request = {
      questionId: this.question.id,
      answerId: answerId
    };
    this.questionService.CheckOneQuestionAnswer(request).subscribe((result) => {
      if (result.data.status) {
        this.correctAnswerId = answerId;
      } else {
        this.correctAnswerId = result.data.answerCorrectId;
      }
      this.selectedAnswerId = answerId;
  
      this.applyAnswerColors();

      if (this.audioPlayer) {
        this.audioPlayer.nativeElement.pause();
        // this.audioPlayer.nativeElement.currentTime = 0;
      }

      // setTimeout(() => {
      //   this.questionService.getQuestionRandom().subscribe((result) => {
      //     this.question = result.data;
      //     this.assignRandomColors();
      //     this.correctAnswerId = null;
      //     this.selectedAnswerId = null;
      //   });
      // }, 5000);
    });
  }

  applyAnswerColors() {
    this.question.questionAnswers.forEach((answer:any) => {
      answer.color = 'initial'; 
      if (answer.id === this.correctAnswerId) {
        answer.color = 'green'; 
      }
      if (this.selectedAnswerId === answer.id && answer.id !== this.correctAnswerId) {
        answer.color = 'red'; 
      }
    });
  }
  
  
  assignRandomColors() {
    this.question.questionAnswers.forEach((answer:any) => {
      answer.color=this.getRandomColor();
    });
  }
  gradientColors = [
    'linear-gradient(to right, #e91e63, #f8bbd0)',    // Dải màu hồng
    'linear-gradient(to right, #9c27b0, #e1bee7)',    // Dải màu tím
    'linear-gradient(to right, #ff9800, #ffe0b2)',    // Dải màu cam
    'linear-gradient(to right, #03a9f4, #81d4fa)',    // Dải màu xanh dương
    'linear-gradient(to right, #ff5722, #ffccbc)',    // Dải màu cam đất
    'linear-gradient(to right, #8bc34a, #dcedc8)',    // Dải màu xanh lá cây nhạt
    'linear-gradient(to right, #ffc107, #ffecb3)',    // Dải màu vàng
    'linear-gradient(to right, #2196f3, #bbdefb)'     // Dải màu xanh dương nhạt
  ];
  getRandomColor(): string {
    return this.gradientColors[Math.floor(Math.random() * this.gradientColors.length)];
  }
}
