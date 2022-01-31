import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  ngOnDestroy() {

    /*   this.dCandidateService.saveDetailCandidate(this.cand).subscribe((res:DetaileCandidate)=>{
      });   */
  }

  constructor(private http: HttpClient, public dCandidateService: CandidateService, public Router: Router) { }
  newFile;
  cand: DetaileCandidate;
  imageName: string;
  docs: string[] = [];
  src = "";
  ngOnInit() {
    this.cand = this.dCandidateService.cand;
    if (this.cand.Candidate.ImageCandidate)
      this.imageName = this.cand.Candidate.ImageCandidate.split("/")[5];
    this.cand.Documents.forEach(element => {
      this.docs.push(element.Describe);
    });
  }

  addImage(event) {
    if (this.imageName != null && this.imageName != "") {
      Swal.fire({
        title: 'האם אתה בטוח ?',
        text: "שאתה רוצה להחליף את התמונה !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'החלף!',
        cancelButtonText: 'ביטול',
      }).then((result) => {
        if (result.value) {
          let fileList: FileList = event.target.files;
          if (fileList.length > 0) {
            this.newFile = fileList[0];
            let image1: FormData = new FormData();
            this.imageName = this.newFile.name;
            image1.append('uploadFile', this.newFile, this.newFile.name);
            this.dCandidateService.uploadFile(image1, this.dCandidateService.cand.User.Tz).subscribe(res => {
              this.src = res;

            })

          }
        }
      })
    }
    else {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.newFile = fileList[0];
        let image1: FormData = new FormData();
        this.imageName = this.newFile.name;
        image1.append('uploadFile', this.newFile, this.newFile.name);
        this.dCandidateService.uploadFile(image1, this.dCandidateService.cand.User.Tz).subscribe(() => { })
      }
    }
  }

  addDoc(event) {
    let image1: FormData = new FormData();

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        this.newFile = fileList[i];
        image1.append(i.toString(), this.newFile, this.newFile.name);
        this.docs.push(this.newFile.name);
      }
      this.dCandidateService.UploadDoc(image1, this.dCandidateService.cand.User.Tz).subscribe(() => { })
    }
  }

  // addFile() {
  //   if(this.newFile){
  //     let formData: FormData = new FormData();
  //     formData.append('uploadFile', this.newFile, this.newFile.name);
  //     this.CandidateService.postFileUpLoad(formData,this.CandidateService.cand.User.Tz).subscribe(()=>{

  //       alert('success!');
  //     })
  //   }
  // }



  // onSubmit(form: any) {
  //   console.log(this.RegisterTeacher);
  //   console.log(this.registerAddress);
  //   this.teachersService.createTeacher(this.RegisterTeacher, this.registerAddress).subscribe(data => {
  //     console.log(data);
  //   });
  //   console.log("d ");
  //   this.rout.navigate(['schedule']);//מעביר למסך מערכת השעות
  // }






  saveDetailCandidate() {//שומר את פרטי המועמד

    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });

  }

  saveAndContinue() {//שומר את פרטי המועמד וממשיך לתאב הבא
    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });

    //setActivePage('products')
    // this.router.navigate(['desc'], {relativeTo: this.activatedRoute});
    this.Router.navigate(['/detail-candidate/criterion']);
  }
  clacute(i:number){
    return i< this.docs.length-1?true:false;
   }
}
