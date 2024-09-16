import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationModalComponent } from './delete-product/delete-product.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { AddProductModal } from './add-product/add-product-component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AddProductModal, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  searchCriteria = {
    search: '',
    startDate: '',
    endDate: ''
  };

  constructor(private productService: ProductService, private modalService: NgbModal, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        console.log('Products fetched:', data);
        this.products = data;
      },
      error: (err: any) => {
        console.error('Error fetching products', err);
      }
    });
  }

  onEdit(product: any) {
    
  }

  onDelete(product: any) {
    const modalRef = this.modalService.open(DeleteConfirmationModalComponent);
    modalRef.componentInstance.product = product;

    modalRef.result.then((result: any) => {
      console.log('Modal closed with result:', result);
      if (result === 'delete') {
        console.log('Deleting product:', product);
        this.productService.deleteProduct(product._id).subscribe({
          next: () => {
            this.loadProducts();
            console.log('Product deleted:', product);
          },
          error: (err: any) => {
            console.error('Error deleting product', err);
          }
        });
      }
    }).catch((err: any) => {
      console.error('Modal dismissed with error:', err);
    });
  }

  addProduct() {
    console.log('Add product clicked');
  }

  logout() {
    console.log('Logout clicked');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onProductCreated() {
    this.loadProducts(); // Reload products when child component emits event
  }

  onSearch() {
    // Send search criteria to the backend
    this.productService.getProducts(this.searchCriteria).subscribe({
      next: (filteredProducts) => {
        this.products = filteredProducts; // Update the products list based on search
      },
      error: (error) => {
        console.error('Error during search:', error);
      }
    });
  }

}
