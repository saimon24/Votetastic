import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Voting } from '../interfaces/votings';
import { VotingOption } from '../interfaces';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  voting: Voting = null!;
  options: VotingOption[] = [];
  voted = false;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

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
    const data = await this.dataService.voteForOption(`${option.id}`);
    if (!data.error) {
      this.showVotingResult();
    }
  }

  async showVotingResult() {
    this.options =
      (await (await this.dataService.getVotingOptions(this.voting.id)).data) ||
      [];

    this.barChartData = {
      labels: this.options.map((item) => item.title),
      datasets: [
        {
          data: this.options.map((item) => item.votes),
          backgroundColor: '#6366f1',
          borderRadius: 2,
        },
      ],
    };

    this.toaster.success('Thanks for your vote!');
    this.voted = true;
  }
}
