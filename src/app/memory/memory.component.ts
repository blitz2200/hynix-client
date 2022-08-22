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
  isLoading: string = '';
  memoryType: string = 'c';

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getStartProcessing().subscribe(data => {
      this.memoryType = data.processor;

    });

    this.dataService.getFinishProcessing().subscribe(type => {
        this.isSubmitting = false;

        // this.isLoading = type!;
        // if (type == 'a') {
        //   this.isLoading = 'b';
        //   this.dataService.setStart('b');
        // }
        // if (type == 'b') {
        //   this.isLoading = 'c';
        //   this.dataService.setStart('c');
        // }
        //
        // if (type == 'c') {
        //   this.isLoading = 'd';
        //   this.dataService.setStart('d');
        // }
        //
        // if (type == 'd') {
        //   this.isSubmitting = false;
        // }
      }
    )
  }

}
