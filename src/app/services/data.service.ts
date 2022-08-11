import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const TABLE_VOTINGS = 'votings';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  startVoting() {
    return this.supabase.from(TABLE_VOTINGS).insert({
      voting_question: 'My questions',
      description: 'My description',
    });
  }

  async getVotings() {
    const votings = await this.supabase
      .from(TABLE_VOTINGS)
      .select('*')
      .eq('creator_id', this.supabase.auth.user()?.id);
    return votings.data || [];
  }

  async getVotingDetails(id: number) {
    return this.supabase.from(TABLE_VOTINGS).select('*').eq('id', id).single();
  }

  async updateVotingDetails(voting: any, id: number) {
    return this.supabase
      .from(TABLE_VOTINGS)
      .update(voting)
      .eq('id', id)
      .single();
  }

  async deleteVoting(id: number) {
    return this.supabase.from(TABLE_VOTINGS).delete().eq('id', id).single();
  }
}
