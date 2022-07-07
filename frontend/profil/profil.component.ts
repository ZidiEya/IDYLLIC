// profile component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listproduct:any
  closeResult = '';
  form: FormGroup;
  p: number = 1;
  search_name:any;

  constructor(private  FormBuilder:FormBuilder,private apiproduct:ProductService,private modalService: NgbModal ,private route:Router) { }
  ngOnInit(): void {
    
    this.form = this.FormBuilder.group(
      {
        reference: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        description: ['', Validators.required],
        _id: ['', Validators.required]
      })
    this.getallproducts()
  }

  
  logout(){
    localStorage.clear() 
    this.route.navigateByUrl('/home')
   }
   getallproducts(){
    this.apiproduct.getproducts().subscribe((res:any)=>{
    this.listproduct=res["data"]
    console.log("list product",this.listproduct)   
    })
  }
    deleteproduct(id:any){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiproduct.deleteproducts(id).subscribe((res:any) =>
          console.log(res))
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          
          )
          this.getallproducts()
        }
      })
      }
      updateproduct(){
        this.apiproduct.updateproducts(this.form.value._id,this.form.value).subscribe((res:any)=>{
          Swal.fire("product update")
          this.getallproducts()
          console.log(res)
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
