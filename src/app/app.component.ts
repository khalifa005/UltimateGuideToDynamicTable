import { Component, OnInit } from '@angular/core';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'email', title: 'Email' },
  ];
  public data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    // Add more rows as needed
  ];

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.paginationEnabled = true;
    this.configuration.rows = 5; // Set default rows per page
    this.configuration.orderEnabled = true; // Enable sorting
  }
  
}