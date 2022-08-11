import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Voting } from "../../types/votings";

@Component({
  selector: 'app-votings-list',
  templateUrl: './votings-list.component.html',
  styleUrls: ['./votings-list.component.scss'],
})
export class VotingsListComponent implements OnInit {
  votings: Voting[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadVotings();
  }

  async loadVotings() {
    this.votings = await this.dataService.getVotings();
  }

  async startVoting() {
    const data = await this.dataService.startVoting();
    console.log(
      '🚀 ~ file: votings-list.component.ts ~ line 16 ~ VotingsListComponent ~ startVoting ~ data',
      data
    );
  }
}
