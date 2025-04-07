import { CoursesHttpService } from './services/courses-http.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./action-types";
import { concatMap, map } from 'rxjs/operators';
import { allCoursesLoaded } from './course.actions';

@Injectable()
export class CoursesEffects {

  public loadCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap(action => this.coursesHttpService.findAllCourses()),
      map(courses => allCoursesLoaded({ courses }))
    )
  )

  public saveCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.courseUpdated),
      concatMap(action => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  )

  public constructor(private actions$: Actions,
    private coursesHttpService: CoursesHttpService) { }
}
