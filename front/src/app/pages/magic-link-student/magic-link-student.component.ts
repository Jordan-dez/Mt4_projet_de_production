import { Component } from '@angular/core';

@Component({
  selector: 'app-magic-link-student',
  templateUrl: './magic-link-student.component.html',
  styleUrls: ['./magic-link-student.component.scss']
})
export class MagicLinkStudentComponent {

  email: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
