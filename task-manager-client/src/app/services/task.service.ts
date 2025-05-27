import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import { Task, CreateTaskRequest, UpdateTaskStatusRequest } from "../models/task.model"

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "http://localhost:3000/tasks"

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(catchError(this.handleError))
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError))
  }

  createTask(task: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(catchError(this.handleError))
  }

  updateTaskStatus(id: string, statusUpdate: UpdateTaskStatusRequest): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/status`, statusUpdate).pipe(catchError(this.handleError))
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred"

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }

    return throwError(() => errorMessage)
  }
}
