import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  standalone: true,
})
export class DeleteConfirmationModalComponent {
  @Input() product: any;

  constructor(public activeModal: NgbActiveModal, private productService:ProductService) { }

  confirmDelete() {
    this.activeModal.close('delete');
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }
}
