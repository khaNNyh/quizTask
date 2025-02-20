import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { QuestionComponent } from './question/question.component';
import {
  TranslatePipe,
  TranslateDirective,
  TranslateService,
} from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    TranslatePipe,
    TranslateDirective,
    MatIconModule,
    MatMenuModule,
    QuestionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private translate: TranslateService) {}

  display: any;
  questionMode = false;

  startQuestion() {
    this.questionMode = true;
    this.timer(5);
  }

  endQuestion() {
    this.questionMode = false;
  }

  navigateHome() {
    this.endQuestion();
  }

  switchTranslation(string: string) {
    this.translate.use(string);
  }

  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0 || this.questionMode == false) {
        console.log('finished');
        clearInterval(timer);
        this.navigateHome();
      }
    }, 1000);
  }
}
