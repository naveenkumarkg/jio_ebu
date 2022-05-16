import { ErrorResponseService } from '../../../shared';
/* istanbul ignore next */
export const givenError500 = new ErrorResponseService(
    'Http failure response for http://localhost:3004/shop/api/acquia/header: 0 Unknown Error',
    'HttpErrorResponse',
    false,
    500,
    'Unknown Error',
    'http://localhost:3004/shop/api/acquia/header'
);
