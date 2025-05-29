import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../../../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:5000/api/feedbacks';

  constructor(private http: HttpClient) {}

  // ✅ Obtenir tous les feedbacks pour un blog
  getFeedbacksByBlog(blogId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/blog/${blogId}`);
  }

  // ✅ Créer un nouveau feedback (tous les champs sont envoyés)
  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  // ✅ Mettre à jour un feedback existant
  updateFeedback(id: string, feedback: Partial<Feedback>): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${id}`, feedback);
  }

  // ✅ Supprimer un feedback
  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
