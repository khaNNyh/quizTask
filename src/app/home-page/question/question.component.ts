import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  TranslatePipe,
  TranslateDirective,
  TranslateService,
} from '@ngx-translate/core';
import { HomePageComponent } from '../home-page.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateDirective],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Output() endQuestionEmitter = new EventEmitter();
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: string | null = null;
  score: number = 0;
  summaryMode = false;
  userAnswers: any[] = [];
  finalScore: number = 0;

  constructor(
    private questionService: QuestionService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.onLangChange.subscribe((event) => {
      this.loadQuestions();
    });
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe((data: any) => {
      console.log(data);
      if (this.translate.currentLang === 'pl') {
        this.questions = data.questionsPL;
      } else {
        this.questions = data.questionsENG;
      }
    });
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  nextQuestion(): void {
    if (this.selectedAnswer) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.userAnswers.push({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: this.selectedAnswer,
      });

      if (this.selectedAnswer === currentQuestion.correctAnswer) {
        this.score++;
      }

      this.selectedAnswer = null;
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex >= this.questions.length) {
        this.summaryMode = true;

        this.finalScore = (this.score / this.questions.length) * 100;
      }
    }
  }

  endQuestion() {
    this.endQuestionEmitter.emit();
  }
}
