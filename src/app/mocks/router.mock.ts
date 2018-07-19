import { Observable } from 'rxjs';

export class MockRouter {
  public events = new Observable(obs => {
    obs.next();
    obs.complete();
  });

  navigateByUrl(url: string) { return url; }
  navigate() {}
}