import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  requests = [];
  currentUser: any = {};
  constructor(
    private dashService: DashboardService,
  ) { }

  ngOnInit() {
    this.dashService.getCurrentUser().then(x => {
      if (x.size) {
        x.docs.forEach(res => {
          this.currentUser = res.data();
          // after getting current user, we get all the requests for logged in user.
          this.dashService.getRequests().then(x => {
            x.forEach(d => {
              const f = d.data().startDate.toDate();
              const t = d.data().endDate.toDate();
              // if current user is approver then push everything into the array.
              if (this.currentUser.isApprover) {
                this.requests.push({
                  id: d.id,
                  email: d.data().email,
                  reason: d.data().reason,
                  startDate: f,
                  endDate: t,
                  status: d.data().status
                });
              } else {
                // if current user is not approver then push only his requests
                if (this.currentUser.email === d.data().email) {
                  this.requests.push({
                    id: d.id,
                    email: d.data().email,
                    reason: d.data().reason,
                    startDate: f,
                    endDate: t,
                    status: d.data().status
                  });
                }
              }
            });
          });
        })
      }
    });
  }

  deleteRequest(r) {
    this.dashService.deleteRequest(r).then(x => {
      // after succesfull delete we filter our array locally so we don't have to make a new request to the server(or refresh the page to get all the requests)
      this.requests = this.requests.filter(z => z.id !== r.id);
    }).catch(err => {
      console.log(err);
    });
  }

}
