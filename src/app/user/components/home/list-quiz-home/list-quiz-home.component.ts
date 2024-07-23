import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-quiz-home',
  templateUrl: './list-quiz-home.component.html',
  styleUrls: ['./list-quiz-home.component.css']
})
export class ListQuizHomeComponent implements OnInit  {


  unlimitedQuiz:any={
    color:'',
    title:'',
    duration:'unlimited',
    view:10000000
  }


  ngOnInit(): void {
      this.assignRandomColors();
      this.unlimitedQuiz.title='Bài thi không giới hạn';
  }




  assignRandomColors() {
    this.unlimitedQuiz.color=this.getRandomColor();
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
