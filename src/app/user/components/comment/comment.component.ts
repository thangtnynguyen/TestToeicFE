import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommentService } from '../../services/api/comment.service';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { app } from 'src/app/core/configs/app.config';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css'],
	encapsulation: ViewEncapsulation.None,


})
export class CommentComponent implements OnInit {

	@Input() comment: any;
	@Input() comments: any;

	@Output() messageEvent = new EventEmitter<boolean>();

	App = app;
	private toggle: boolean = false;


	constructor(private commentService: CommentService, private ngxToastr: NgxToastrService) { }

	ngOnInit(): void {
		// this.sendMessage(false);
	}

	toggleReply(commentId: number) {
		if (this.comments) {
			this.comments.forEach((c: any) => {
				if (c.id === commentId) {
					c.isReplying = !c.isReplying; // Toggle trạng thái của ô nhập
				}
			});
		}
	}

	sendReply(comment: any) {
		const request = {
			content: comment.replyText,
			examId: comment.examId,
			parentCommentId: comment.id,
		};
		this.commentService.CreateComment(request).subscribe((result) => {
			if (result.status) {
				this.ngxToastr.success(result.message, 'Thành công', {
					progressBar: true
				});
				comment.isReplying = false;
				comment.replyText = '';
				this.sendMessage();
			}
		}, error => {
			console.log(error);
			this.ngxToastr.error(error.error.message, '', {
				progressBar: true
			});
		});

	}

	sendMessage() {
		this.toggle = !this.toggle; 
		this.messageEvent.emit(this.toggle);
	}












}
// toggleReply(commentId: number) {
//   const toggleReplyRecursive = (comments: any[]) => {
//     comments.forEach((c: any) => {
//       if (c.id === commentId) {
//         c.isReplying = !c.isReplying;
//         console.log(comments);
//       } else if (c.children && c.children.length > 0) {
//         toggleReplyRecursive(c.children);

//       }

//     });

//   };

//   if (this.comments) {
//     toggleReplyRecursive(this.comments);
//   }

// }

