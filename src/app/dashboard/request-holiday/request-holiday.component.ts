import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-request-holiday',
  templateUrl: './request-holiday.component.html',
  styleUrls: ['./request-holiday.component.css']
})
export class RequestHolidayComponent implements OnInit {
  hoveredDate: NgbDate;
  showSuccMsg = false;
  fromDate: NgbDate;
  toDate: NgbDate;
  currentUser: any = {
    email: '',
    isApprover: false
  };

  request = {
    email: '',
    reason: '',
    startDate: null,
    endDate: null,
    status: 0
  }

  constructor(
    calendar: NgbCalendar,
    // instance of DashboardService created by me
    private dashService: DashboardService,
  ) {
    // we set start date as current day
    this.fromDate = calendar.getToday();
    // we set end date as 10 days later
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  // this function is called when component is loaded(initialised)
  ngOnInit() {
    this.dashService.getCurrentUser().then(x => {
      if (x.size) {
        x.docs.forEach(res => {
          this.currentUser = res.data();
          this.request.email = this.currentUser.email;
        })
      }
    });
  }

  // ----------
  // functions from NgbCalendar in order to work with period selection --- see NgbCalendar for documentation
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  //----------


  submit() {
    // we build our javascript date type from NgbDate type --- see NgbCalendar for documentation
    this.request.startDate = new Date(`${this.fromDate.month}/,${this.fromDate.day}/${this.fromDate.year}`);
    // we build our javascript date type from NgbDate type --- see NgbCalendar for documentation
    this.request.endDate = new Date(`${this.toDate.month}/,${this.toDate.day}/${this.toDate.year}`);

    // we post the request to database
    this.dashService.addRequest(this.request).then(x => {
      this.showSuccMsg = true;
      console.log(x);
      // timeout to show message for 3 sec
      setTimeout(() => {
        this.showSuccMsg = false;
      }, 3000)
    }).catch(err => {
      console.log(err);
    });
  }

 
}
