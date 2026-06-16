import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { ErrorState } from '@/shared';

export default function RouteErrorBoundary() {
  const error = useRouteError();
  let message: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return <ErrorState error={message} />;
}
