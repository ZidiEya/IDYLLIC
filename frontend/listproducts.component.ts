import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit {

  listproduct:any
  closeResult = '';
  form: FormGroup;
  p: number = 1;
  search_name:any;
    constructor(private  FormBuilder:FormBuilder,private apiproduct:ProductService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.form = this.FormBuilder.group(
      {
        reference: ['', Validators .required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        description: ['', Validators.required],
        _id: ['', Validators.required]
      }
    );
    this.getallproducts()
    
  }
  getallproducts(){
    this.apiproduct.getproducts().subscribe((res:any)=>{
    this.listproduct=res["data"]
    console.log("list product",this.listproduct)   
    })
  }



open(content:any,product:any) {
  this.form.patchValue({
    _id:product._id,
    reference:product.reference,
    price:product.price,
    quantity:product.quantity,
    description:product.description
  })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

}
