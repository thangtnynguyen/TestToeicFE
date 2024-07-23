import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { enviroment } from 'src/enviroments/enviroment';
@Component({
    selector: 'app-change-info',
    templateUrl: './change-info.component.html',
    styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {

    baseImageUrl = enviroment.host.baseFileSystemUrl;
    userCurrent: any = {
        id:'',
        name: '',
        userName: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone:''
    };
    constructor(private authService: AuthService,private toast:ToastrService) {
        this.authService.userCurrent.subscribe(user => {
            this.userCurrent = user;
        });
    }

    ngOnInit(): void {

    }

    handleSubmit(){

        const formData = new FormData();

		formData.append('avatarFile', this.userCurrent.avatarFile);
		formData.append('id', this.userCurrent.id);
		formData.append('phoneNumber', this.userCurrent.phoneNumber);
		formData.append('name', this.userCurrent.name);


        this.authService.editAccount(formData).subscribe((result)=>{
            if(result.status){
                this.toast.success("Thành công", "Success");
            }
            else{
                this.toast.warning("Thất bại", "Error");

            }
        })
    }


    avatarPreview: string | ArrayBuffer | null = this.userCurrent.avatarUrl ? this.baseImageUrl + this.userCurrent.avatarUrl : 'https://img2.thuthuatphanmem.vn/uploads/2018/11/30/anh-dai-dien-anime-dep_104204759.jpg';

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        const reader: FileReader = new FileReader();

        this.userCurrent.avatarFile=file;
        reader.onload = () => {
            this.avatarPreview = reader.result;
        };

        reader.readAsDataURL(file);
    }


}
