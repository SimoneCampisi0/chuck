import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Joke} from "./dto/Joke";
import {interval} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chucknorris';
  value: String | undefined

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    interval(3000).subscribe(() => {
      this.apiCall()
      });
    }

  apiCall() {
      this.getAPI().subscribe(
        (response) => {
          this.value = response.value;
        },
        (error) => {
          console.log("Error");
        }
      );

  }

  getAPI () {
    return this.http.get<Joke>('https://api.chucknorris.io/jokes/random')
  }
}
