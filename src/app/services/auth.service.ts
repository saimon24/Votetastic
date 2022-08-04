import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<boolean | User | any> =
    new BehaviorSubject(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    // Fallback
    const user = this.supabase.auth.user();
    if (user) {
      this.currentUser.next(user);
    } else {
      this.currentUser.next(false);
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('auth changed: ', event);
      console.log('auth changed session: ', session);
      if (session) {
        this.currentUser.next(session.user);
      } else {
        this.currentUser.next(false);
      }
    });
  }

  createAccount({ email, password }: { email: string; password: string }) {
    return this.supabase.auth.signUp({ email, password });
  }

  login({ email, password }: { email: string; password: string }) {
    return this.supabase.auth.signIn({ email, password });
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }
}
