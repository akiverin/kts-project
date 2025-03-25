import { RouteObject } from 'react-router';
import App from '../App';
import Foods from '../pages/Foods';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/foods',
        element: <Foods />,
      },
    ],
  },
];
