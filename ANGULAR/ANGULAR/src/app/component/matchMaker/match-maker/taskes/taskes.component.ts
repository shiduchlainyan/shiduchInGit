import { Component, OnInit } from '@angular/core';
import { Taskes } from 'src/app/models/taskes';
import { MatchmakerService } from 'src/app/Services/matchmaker.service';

@Component({
  selector: 'app-taskes',
  templateUrl: './taskes.component.html',
  styleUrls: ['./taskes.component.css']
})
export class TaskesComponent implements OnInit {
  TaskesKing1: Taskes[]
  TaskesKing2: Taskes[]

  constructor(private MatchmakerService: MatchmakerService) { }

  ngOnInit() {
   
    this.GetAllTaskes();
  }


  GetAllTaskes() {
    this.MatchmakerService.GetAllTaskes().subscribe((res: Taskes[]) => {
      this.TaskesKing1 = res.filter(p => p.kindTask == 1);
      this.TaskesKing2 = res.filter(p => p.kindTask == 2);
    })
  }

  active(ev) {
  
  
    ev.parentElement.classList.toggle("active");
    var panel = ev.parentElement.nextElementSibling;
    if (panel.style.maxHeight) {
  panel.style.maxHeight = null;

    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    
    }
  }


  remov(item, kind) {

    if (kind == 1)
      this.TaskesKing1 = this.TaskesKing1.filter(p => p != item)
    if (kind == 2)
      this.TaskesKing2 = this.TaskesKing2.filter(p => p != item)
    this.MatchmakerService.removeTask(item).subscribe(res => { });
  }

  addComment(item:Taskes,ev) {
   this.active(ev.target.parentElement.parentElement.previousElementSibling.children[0])
    if(item.kindTask==1)
     this.TaskesKing1.find(p=>p.Id==item.Id).finishComment=true;
     else
     this.TaskesKing2.find(p=>p.Id==item.Id).finishComment=true;
    this.MatchmakerService.addCommentFotTask(item).subscribe(res => { });
    // this.isFinish = true;
  }
}


