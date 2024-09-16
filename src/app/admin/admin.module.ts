import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component'; // Adjust path as needed

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        AdminComponent
    ]
})
export class AdminModule { }
