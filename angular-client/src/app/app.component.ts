import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Springboard GraphQL Training';
  friendsList: any;

  constructor(private apollo: Apollo) {


    const query = gql`
      {
        friend {
          name
        }
      }
    `;

    const query2 = gql`
    {
      user {
        name
      }
    }
    `;

     this.apollo.watchQuery({
    query: query
    }).valueChanges.subscribe(
      data => {
        this.friendsList = data.data['friend'];
        console.log(data.data);
      }
    )

    this.apollo.watchQuery({
      query: query2
      }).valueChanges.subscribe(
        data => {
          console.log(data.data);
        }
      )

  }

  addMyFriend() {
    const value = (document.getElementById("friendsName") as any).value;
    debugger;
    let query3 = gql`
      mutation ($name: String!) {
        addFriend(name:$name) {
          name
        }
      }  
    `;

    if (value) {
      this.apollo.mutate({
        mutation: query3,
        variables: {
          name: value
        }
        }).subscribe(
          data => {
            this.friendsList = data.data['addFriend'];
            (document.getElementById("friendsName") as any).value = "";
            console.log(data.data);
          }
        );
    }
  }
}
