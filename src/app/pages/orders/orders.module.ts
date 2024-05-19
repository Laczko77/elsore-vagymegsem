import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HungarianDatePipe } from '../../shared/pipes/hungarian-date.pipe';

@NgModule({
  declarations: [OrdersComponent, HungarianDatePipe],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
  ],
})
export class OrdersModule {}
