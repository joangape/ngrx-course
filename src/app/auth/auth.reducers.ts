import { Action, ActionReducerMap, createReducer, on } from "@ngrx/store";
import { User } from "./model/user.model";
import { loginAction, logoutAction } from "./auth.actions";
import { AuthState } from "./reducers";


export const initialAuthState: AuthState = { user: undefined }

// export const reducers: ActionReducerMap<AuthState> = {}

export const authReducer = createReducer(
  initialAuthState,
  on(loginAction, (state, action) => ({ user: action.user })),
  on(logoutAction, (state, action) => ({ user: undefined }))
)
