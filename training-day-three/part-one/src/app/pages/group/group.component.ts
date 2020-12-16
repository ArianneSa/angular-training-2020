import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: any;
  clients: any;

  constructor(private service: GlobalService) { }


  ngOnInit(): void {
    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('groups: ', profile);
        this.groups = profile.tag.groups;
        this.clients = profile.tag.accounts;

        console.log('groups', this.groups)
        console.log('clients', this.clients)
      }
    )
  }

}
