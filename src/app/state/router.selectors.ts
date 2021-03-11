import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const getRouterState = createFeatureSelector<RouterReducerState>(
  'router',
);

export const {
  selectCurrentRoute,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl,
} = getSelectors(getRouterState);
