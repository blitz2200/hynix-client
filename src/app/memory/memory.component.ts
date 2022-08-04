import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  isSubmitting: boolean = false;
  isALoading: boolean = false;
  isBLoading: boolean = false;
  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getAIsFinish().subscribe(isAFinish => {
      this.isALoading = !isAFinish!;
      this.isBLoading = true;
    })

    this.dataService.getBIsFinish().subscribe(isBFinish => {
      this.isSubmitting = !isBFinish!;
    })
  }

  onStart() {
    this.isSubmitting = true;
    this.isALoading = true;
    this.dataService.aStart();
  }
}
