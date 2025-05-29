import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback } from '../../../../../models/feedback.model';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  @Input() blogId?: string;
  @Input() isEditMode: boolean = false;
  @Output() feedbackSubmitted = new EventEmitter<Feedback>();

  feedbackForm: FormGroup;
  categories: string[] = ['Général', 'Technique', 'Suggestion', 'Bug'];
  emojis: string[] = ['😕', '😐', '🙂', '😃', '🤣'];
  selectedEmojiIndex: number | null = null;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      category: ['Général', Validators.required],
      tags: ['']
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.loadFeedbackData();
    }
  }

  loadFeedbackData(): void {
    this.feedbackForm.patchValue({
      title: 'Titre existant',
      content: 'Contenu existant...',
      category: 'Technique',
      tags: 'feedback,amélioration'
    });
  }

  selectEmoji(index: number): void {
    this.selectedEmojiIndex = index;
  }


  onSubmit(): void {
    if (this.feedbackForm.invalid || this.selectedEmojiIndex === null) {
      this.markFormAsTouched();
      return;
    }
  
    const feedbackData: Feedback = {
      ...this.feedbackForm.value,
      blog: this.blogId ?? '', // Si vide, envoie chaîne vide ou null selon backend
      createdAt: new Date(),
      user: { username: 'Current User' }, // À remplacer avec un vrai utilisateur connecté
      rating: this.selectedEmojiIndex + 1
    };
  
    this.feedbackService.createFeedback(feedbackData).subscribe({
      next: (response) => {
        console.log('Feedback envoyé avec succès :', response);
        alert('Merci pour votre feedback !');
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi du feedback :', error);
        alert('Une erreur est survenue lors de l\'envoi du feedback.');
      }
    });
  }
  
  
  private markFormAsTouched(): void {
    Object.values(this.feedbackForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  resetForm(): void {
    this.feedbackForm.reset({ category: 'Général' });
    this.selectedEmojiIndex = null;
  }
}
