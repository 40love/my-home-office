import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-approve-holiday',
  templateUrl: './approve-holiday.component.html',
  styleUrls: ['./approve-holiday.component.css']
})
export class ApproveHolidayComponent implements OnInit {
  requests = [];
  constructor(
    private dashService: DashboardService,
  ) { }

  ngOnInit() {
    this.dashService.getRequests().then(x => {
      x.forEach(d => {
        // you have to set dates as javascript dates beacuse firebase has it's own way of storing dates( as Timestamp)
        const fromDate = d.data().startDate.toDate();
        const toDate = d.data().endDate.toDate();
        if (d.data().status === 0) {
          this.requests.push({
            id: d.id,
            email: d.data().email,
            reason: d.data().reason,
            startDate: fromDate,
            endDate: toDate,
            status: d.data().status
          });
        }
      });
    });
  }

  //0-pending
  //1-approved
  //2-rejected

  toggleRequestStatus(req, status) {
    req.status = status;
    this.dashService.changeRequestStatus(req).then(x => {
      console.log(x);
      this.requests = this.requests.filter(r => r.id !== req.id);
    }).catch(err => {
      console.log(err);
    });
  }

}
