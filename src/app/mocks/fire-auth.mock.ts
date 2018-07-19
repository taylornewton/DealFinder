import { Subject } from 'rxjs';

export class MockFireAuth {
    authState = new Subject();

    auth = {
        signOut(): Promise<any> { return Promise.resolve({}); },
        signInWithEmailAndPassword(): Promise<any> {return Promise.resolve({}); }
    }
}