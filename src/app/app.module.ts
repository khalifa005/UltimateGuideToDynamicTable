import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TableModule } from 'ngx-easy-table';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbThemeModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizeHtmlPipe } from './Pipes/SanitizeHtmlPipe';
import { CategoryNamePipe } from './Pipes/CategoryNamePipe';
import { DyTableComponent } from './Components/dy-table/dy-table.component';
import { StatusBadgePipe } from './Pipes/StatusBadgePipe';

@NgModule({
  declarations: [
    AppComponent,
    DyTableComponent,

    SanitizeHtmlPipe,
    CategoryNamePipe,
    StatusBadgePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    NbCardModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbAccordionModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule,
    NbCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
