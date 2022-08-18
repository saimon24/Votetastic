export interface VotingOption {
  id?: number;
  creator_id?: string;

  voting_id: number;
  title: string;
  votes: number;
}
