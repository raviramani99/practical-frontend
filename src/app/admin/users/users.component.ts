import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../user/services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  searchCriteria = {
    search: '',
    startDate: '',
    endDate: ''
  };

  constructor(private adminService: AdminService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch the list of users
  fetchUsers() {
    this.adminService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  // Toggle active/deactive status of a user
  toggleStatus(user: any) {
    const updatedStatus = !user.isActive;
    this.adminService.toggleUserStatus(user._id, updatedStatus).subscribe(
      () => {
        user.isActive = updatedStatus; // Update the local status on success
      },
      (error: any) => {
        console.error('Error updating user status', error);
      }
    );
  }
  onSearch() {
    // Send search criteria to the backend
    this.adminService.getUsers(this.searchCriteria).subscribe({
      next: (filteredUsers) => {
        this.users = filteredUsers; // Update the products list based on search
      },
      error: (error) => {
        console.error('Error during search:', error);
      }
    });
  }
}
