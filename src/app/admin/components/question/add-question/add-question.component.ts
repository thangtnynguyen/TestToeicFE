import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import questionConstant from 'src/app/admin/constants/question.constant';
import { QuestionService } from 'src/app/admin/services/apis/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {

  public validateFormSuccess: any = {
    touchSection: false,
    touchDiff: false
  }
  questionContant: any = questionConstant;
  questionAnswer: any = {
    content: '',
    isCorrect: false,
    score: 0,
  }
  public question: any = {
    title: '',
    image: '',
    imageFile: null,
    audioFile: null,
    paragraph: '',
    score: 1,
    questionCategoryId: 1,
    difficulty: '',
    questionAnswers: [],
    typeForm: 1,
    typeKind: 1,
    sectionId: 1,
  };

  constructor(private ngxToastr: ToastrService, private questionService: QuestionService, private router: Router) { }





  onSubmit() {

    const formData = new FormData();

    // Thêm các trường dữ liệu vào FormData
    formData.append('title', this.question.title);
    formData.append('imageFile', this.question.imageFile);// Đây là file,
    formData.append('audioFile', this.question.audioFile); // Đây là file,
    formData.append('paragraph', this.question.paragraph);
    formData.append('score', this.question.score);
    formData.append('questionCategoryId', this.question.questionCategoryId);
    formData.append('difficulty', this.question.difficulty);
    formData.append('typeForm', this.question.typeForm);
    formData.append('typeKind', this.question.typeKind);
    formData.append('sectionId', this.question.sectionId);

    // this.question.questionAnswers.forEach((questionAnswer: any) => {
    //   const jsonQuestionAnswer = JSON.stringify(questionAnswer);
    //   formData.append('questionAnswers', jsonQuestionAnswer);
    // });

    this.question.questionAnswers.forEach((questionAnswer: any, index: number) => {
      formData.append(`questionAnswers[${index}].content`, questionAnswer.content);
      formData.append(`questionAnswers[${index}].isCorrect`, questionAnswer.isCorrect);
      formData.append(`questionAnswers[${index}].score`, questionAnswer.score);
      
    });



    // if (this.question.questionAnswers && this.question.questionAnswers.length > 0) {
    //   for (var j = 0; j < this.question.questionAnswers.length; j++) {
    //     formData.append(`questionAnswers[${j}].isCorrect`, this.question.questionAnswers[j].isCorrect);
    //     formData.append(`questionAnswers[${j}].content`, this.question.questionAnswers[j].content);
    //     formData.append(`questionAnswers[${j}].score`, this.questionAnswer.score);
    //   }

    // }
    //ignore
    formData.append('image', '');
    formData.append('audio', '');

    //api
    this.questionService.CreateQuestion(formData).subscribe((result: any) => {
      if (result.status) {
        this.ngxToastr.success(result.message, '', {
          progressBar: true
        });
        this.router.navigate(['/admin/question']);
      }
    }, error => {
      console.log(error);
      this.ngxToastr.error(error.error.message, '', {
        progressBar: true
      });
    });

    // console.log(formData);
    // Log ra dữ liệu
    // formData.forEach((value: any, key: any) => {
    //   console.log(`${key}: ${value}`);
    // });
  }




  onFileImageSelected(event: any) {
    this.question.imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.question.imageUrl = reader.result;
    };
    reader.readAsDataURL(this.question.imageFile);
  }

  onFileAudioSelected(event: any) {
    this.question.audioFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.question.audioSrc = reader.result;
    };
    reader.readAsDataURL(this.question.audioFile);
  }


  setCorrectAnswer(questionAnswer: any) {
    this.question.questionAnswers.forEach((answer:any) => {
      answer.score = 0;
      if(answer.isCorrect = (answer === questionAnswer)){
        answer.score=1;
      }
    });
  }

  deleteQuestionAnswer(index: number) {
    this.question.questionAnswers.splice(index, 1);
  }

  addQuestionAnswer() {
    this.question.questionAnswers.push({ content: '', isCorrect: false });
  }
}

