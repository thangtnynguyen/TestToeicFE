import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCurrent } from 'src/app/core/models/interfaces/user/user-current.interface';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { ExamToeicService } from 'src/app/user/services/api/exam-toeic.service';

@Component({
	selector: 'app-toeic-result',
	templateUrl: './toeic-result.component.html',
	styleUrls: ['./toeic-result.component.css']
})
export class ToeicResultComponent implements OnInit {



	userCurrent: UserCurrent;

	constructor(private examToeicService: ExamToeicService, private authService: AuthService, private route: ActivatedRoute, private router: Router,) {
		this.userCurrent = this.authService.getUserCurrent() as UserCurrent;
	}

	examToeicResults: any;
	groupedResults: any;
	ngOnInit() {
		if (this.userCurrent) {
			this.route.queryParams.subscribe(params => {
				const request = {
					...params,
					userId: this.userCurrent?.id
				};
				
				this.examToeicService.GetExamToeicResult(request).subscribe((result: any) => {
					if (result.status) {
						this.examToeicResults = result.data;

						// hom nhóm các kết quả theo examId
						const groupedByExamId = this.examToeicResults.reduce((groups: any, item: any) => {
							// dùng dụng examId làm khóa để gom nhóm
							const group = (groups[item.examToeicId] || []);
							group.push(item);
							groups[item.examToeicId] = group;
							return groups;
						}, {});

						//  số lần cho mỗi kết quả trong từng nhóm
						Object.values(groupedByExamId).forEach((group: any) => {
							group.forEach((item: any, index: any) => {
								item.times = `Lần ${index + 1}`;
							});
						});
						// chuyển đổi đối tượng này thành một mảng các nhóm
						this.groupedResults = Object.values(groupedByExamId);

						// console.log(this.groupedResults); 
					}
					else {
						this.examToeicResults = null;
					}
				})
			});
		}
		else {

		}


	}


	convertTimeToRelative(time: Date): string {
		const currentTime = new Date();
		const timeDiff = currentTime.getTime() - new Date(time).getTime();
		const seconds = Math.floor(timeDiff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (years > 0) {
			return years === 1 ? '1 năm trước' : `${years} năm trước`;
		} else if (months > 0) {
			return months === 1 ? '1 tháng trước' : `${months} tháng trước`;
		} else if (weeks > 0) {
			return weeks === 1 ? '1 tuần trước' : `${weeks} tuần trước`;
		} else if (days > 1) {
			return days === 2 ? 'hôm qua' : `${days} ngày trước`;
		} else if (days === 1) {
			return 'hôm kia';
		} else if (hours > 0) {
			return `${hours} giờ trước`;
		} else if (minutes > 0) {
			return `${minutes} phút trước`;
		} else {
			return 'vừa mới';
		}
	}

}
