import { ApolloLink, FetchResult, NextLink, Observable, Operation } from 'apollo-link';

export class CustomLink extends ApolloLink {
  request(operation: Operation, forward?: NextLink): Observable<FetchResult> | null {
    const subscriber = forward(operation);
    return new Observable<FetchResult>((observer) => {
      const subscription = subscriber.subscribe({
        next(value): void {
          observer.next(value);
        },
        error(errorValue: any): void {
          observer.error(errorValue);
        },
        complete(): void {
          observer.complete.call(observer);
        },
      });

      return () => subscription.unsubscribe();
    });
  }
}
