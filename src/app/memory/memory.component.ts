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
    this.dataService.getMouseOver().subscribe(type => {
      this.memoryType = type;

    });
  }

  currentMemory(): string {
    switch (this.memoryType) {
      case 'a':
        return 'DRAM only';
      case 'b':
        return 'DRAM & CXL Memory';
      case 'c':
        return 'DRAM & CXL CMS';
      case 'd':
        return 'DRAM & CXL CMS x2';
      case 'e':
        return 'DRAM & CXL CMS x4';
      default:
        return 'DRAM & CXL CMS';
    }
  }
}
