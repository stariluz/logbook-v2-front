import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = this.initializeProduct();
  displayNewProduct: boolean = false;
  displayEditProduct: boolean = false;
  displayProductDetails = false;
  file: File | null = null;
  bulkProducts: any[] = [];

  constructor(private inventoryService: InventoryService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.inventoryService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  initializeProduct() {
    return {
      pertenece: '',
      fondo: '',
      unidad_presupuestal: '',
      cuenta: '',
      subcuenta: '',
      folio: '',
      codigo: '',
      cant: 0,
      descripcion: '',
      modelo: '',
      serie_de_fabrica: '',
      ubicacion: '',
      responsable: '',
      num_de_emp: '',
      observaciones: ''
    };
  }

  showNewProduct(): void {
    this.selectedProduct = this.initializeProduct();
    this.displayNewProduct = true;
  }

  addProduct(): void {
    this.inventoryService.addProduct(this.selectedProduct).subscribe(() => {
      this.loadProducts();
      this.displayNewProduct = false;
      this.messageService.add({severity:'success', summary:'Producto agregado'});
    }, error => {
      this.messageService.add({severity:'error', summary:'Error al agregar producto'});
    });
  }

  showEditProduct(product: any): void {
    this.selectedProduct = { ...product };
    this.displayEditProduct = true;
  }

  showProductDetails(product: any) {
    this.selectedProduct = { ...product };
    this.displayProductDetails = true;
  }

  updateProduct(): void {
    if (this.selectedProduct._id) {
      this.inventoryService.updateProduct(this.selectedProduct._id, this.selectedProduct).subscribe(() => {
        this.loadProducts();
        this.displayEditProduct = false;
        this.messageService.add({severity:'success', summary:'Producto actualizado'});
      }, error => {
        this.messageService.add({severity:'error', summary:'Error al actualizar producto'});
      });
    }
  }

  deleteProduct(id: string): void {
    this.inventoryService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
      this.messageService.add({severity:'success', summary:'Producto eliminado'});
    }, error => {
      this.messageService.add({severity:'error', summary:'Error al eliminar producto'});
    });
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
    }
  }

  uploadBulkProducts(): void {
    if (!this.file) {
      this.messageService.add({severity:'error', summary:'No se ha seleccionado ningún archivo'});
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);

    fileReader.onload = (event: any) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const formattedData = data.slice(1).map((row: any) => ({
        pertenece: row[0],
        fondo: row[1],
        unidad_presupuestal: row[2],
        cuenta: row[3],
        subcuenta: row[4],
        folio: row[5],
        codigo: row[6],
        cant: row[7],
        descripcion: row[8],
        modelo: row[9],
        serie_de_fabrica: row[10],
        ubicacion: row[11],
        responsable: row[12],
        num_de_emp: row[13],
        observaciones: row[14],
      }));

      this.bulkProducts = formattedData;
      this.sendBulkProducts();
    };
  }

  sendBulkProducts(): void {
    if (this.bulkProducts.length > 0) {
      this.inventoryService.uploadBulkProducts(this.bulkProducts).subscribe(() => {
        this.messageService.add({severity:'success', summary:'Productos cargados exitosamente'});
        this.loadProducts();
        this.bulkProducts = [];
        this.file = null;
      }, error => {
        this.messageService.add({severity:'error', summary:'Error al cargar productos'});
      });
    } else {
      this.messageService.add({severity:'error', summary:'No hay productos para cargar'});
    }
  }
}
