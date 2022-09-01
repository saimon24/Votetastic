import { ToastrService } from 'ngx-toastr';
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
  voted = false;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.voting = await (await this.dataService.getVotingDetails(+id)).data;
      this.options =
        (await (await this.dataService.getVotingOptions(+id)).data) || [];
    }
  }

  async vote(option: VotingOption) {
    console.log('VOTE: ', option);
    const data = await this.dataService.voteForOption(`${option.id}`);
    if (!data.error) {
      this.toaster.success('Thanks for your vote!');
      this.voted = true;
    }
  }
}
