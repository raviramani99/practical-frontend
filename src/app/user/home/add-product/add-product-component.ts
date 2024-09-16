import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service'; // Import the product service

@Component({
    selector: 'add-product-modal',
    standalone: true,
    templateUrl: './add-product-component.html',
    styleUrls: ['./add-product-component.scss'],
    imports: [CommonModule, ReactiveFormsModule] // Include ReactiveFormsModule
})
export class AddProductModal {
    @Output() productCreated = new EventEmitter<void>();
    @Input() productToEdit: any; // Input for the product being edited (if any)

    isModalOpen: boolean = false;
    isEditing: boolean = false;
    productForm: FormGroup;
    selectedImage: File | null = null;

    constructor(private fb: FormBuilder, private productService: ProductService) {
        this.productForm = this.fb.group({
            productName: ['', Validators.required],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
            image: [null] // For storing image file
        });
    }

    open() {
        if (this.productToEdit) {
            // Populate form with product data for editing
            this.isEditing = true;
            this.productForm.patchValue({
                productName: this.productToEdit.productName,
                description: this.productToEdit.description
            });
        } else {
            // Clear form for adding new product
            this.isEditing = false;
            this.productForm.reset();
        }
        this.isModalOpen = true;
    }

    close() {
        this.isModalOpen = false;
        this.isEditing = false;
        this.productToEdit = null; // Clear productToEdit on close
    }

    onImageSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedImage = file;
        }
    }

    onSubmit() {
        if (this.productForm.valid) {
            const { productName, description } = this.productForm.value;

            // Create FormData to send the image and product info
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('description', description);
            if (this.selectedImage) {
                formData.append('image', this.selectedImage);
            }

            if (this.isEditing && this.productToEdit) {
                // If editing, include the product ID
                formData.append('productId', this.productToEdit._id);
                this.productService.updateProduct(this.productToEdit._id, formData).subscribe(
                    (response) => {
                        console.log('Product updated successfully', response);
                        this.productCreated.emit();
                        this.close(); // Close modal after successful submission
                    },
                    (error) => {
                        console.error('Error updating product:', error);
                    }
                );
            } else {
                // If adding, no product ID needed
                this.productService.addProduct(formData).subscribe(
                    (response) => {
                        console.log('Product added successfully', response);
                        this.productCreated.emit();
                        this.close(); // Close modal after successful submission
                    },
                    (error) => {
                        console.error('Error adding product:', error);
                    }
                );
            }
        }
    }
}
