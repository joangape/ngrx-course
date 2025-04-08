import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './store';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { loginAction, logoutAction } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {

  loading = true;

  public isLogedIn$: Observable<boolean> = this.store.pipe(select(isLoggedIn))
  public isLogedOut$: Observable<boolean> = this.store.pipe(select(isLoggedOut))

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.loadUser();

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(logoutAction())
  }

  private loadUser(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.store.dispatch(loginAction(
        { user: JSON.parse(userString) }
      ));
    }
  }

}
