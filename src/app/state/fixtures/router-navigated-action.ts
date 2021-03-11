import {
  RouterNavigatedPayload,
  SerializedRouterStateSnapshot,
} from '@ngrx/router-store';

export const payload = (id: string) =>
  (({
    routerState: {
      root: {
        params: {},
        data: {},
        url: [],
        outlet: 'primary',
        routeConfig: null,
        queryParams: {},
        fragment: null,
        firstChild: {
          params: {
            id,
          },
          data: {},
          url: [
            {
              path: 'm',
              parameters: {},
            },
            {
              path: id,
              parameters: {},
            },
          ],
          outlet: 'primary',
          routeConfig: {
            path: 'm/:id',
          },
          queryParams: {},
          fragment: null,
          children: [],
        },
        children: [
          {
            params: {
              id,
            },
            data: {},
            url: [
              {
                path: 'm',
                parameters: {},
              },
              {
                path: id,
                parameters: {},
              },
            ],
            outlet: 'primary',
            routeConfig: {
              path: 'm/:id',
            },
            queryParams: {},
            fragment: null,
            children: [],
          },
        ],
      },
      url: `/m/${id}`,
    },
    event: {
      id: 1,
      url: `/m/${id}`,
      urlAfterRedirects: `/m/${id}`,
    },
  } as unknown) as RouterNavigatedPayload<SerializedRouterStateSnapshot>);
