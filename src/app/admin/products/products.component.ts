import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  errorMessage: string | null = null;
  searchCriteria = {
    search: '',
    startDate: '',
    endDate: ''
  };

  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  logout() {
    this.authService.logout();
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products.';
        console.error('Error fetching products:', err);
      }
    });
  }

  onSearch() {
    // Send search criteria to the backend
    this.adminService.getAllProducts(this.searchCriteria).subscribe({
      next: (filteredProducts) => {
        this.products = filteredProducts; // Update the products list based on search
      },
      error: (error) => {
        console.error('Error during search:', error);
      }
    });
  }
}
