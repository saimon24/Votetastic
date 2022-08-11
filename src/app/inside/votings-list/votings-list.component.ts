import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Voting } from '../../types/votings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votings-list',
  templateUrl: './votings-list.component.html',
  styleUrls: ['./votings-list.component.scss'],
})
export class VotingsListComponent implements OnInit {
  votings: Voting[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadVotings();
  }

  async loadVotings() {
    this.votings = await this.dataService.getVotings();
  }

  async startVoting() {
    const record = await this.dataService.startVoting();

    if (!record.error && record.data?.length) {
      this.router.navigateByUrl(`/app/${record.data[0].id}`);
    }
  }
}
