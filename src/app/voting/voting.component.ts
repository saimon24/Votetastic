import { ActivatedRoute } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Voting } from '../interfaces/votings';
import { VotingOption } from '../interfaces';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  voting: Voting = null!;
  options: VotingOption[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.voting = await (await this.dataService.getVotingDetails(+id)).data;
      this.options =
        (await (await this.dataService.getVotingOptions(+id)).data) || [];
      console.log('VOTING: ', this.voting);
      console.log('Options: ', this.options);
    }
  }

  vote(option: VotingOption) {
    console.log('VOTE: ', option);
  }
}
