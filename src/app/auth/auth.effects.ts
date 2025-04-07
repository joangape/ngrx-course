import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginAction, logoutAction } from "./auth.actions";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

  public login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
  ),
    { dispatch: false }
  );

  public logout$ = createEffect(() => this.actions$.pipe(
    ofType(logoutAction),
    tap(action => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  ),
    { dispatch: false }
  );

  public constructor(private actions$: Actions, private router: Router) { }
}
