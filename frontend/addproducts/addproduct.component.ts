import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from '../product.service';
import { SubcategoryService } from '../subcategory.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  listsubcategory:any;
  myFiles:string [] = [];
  constructor(private formBuilder: FormBuilder, private productservice:ProductService,private apidata:SubcategoryService) {}
  ngOnInit(): void {
    this.getAllsubcategory()
    this.form = this.formBuilder.group(
      {
        reference: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        description: ['', Validators.required],
        subcategory: ['',Validators.required],
      }
    );

}
onFileChange(event:any){
  for (var i=0;i<event.target.files.length; i++)
  this.myFiles.push(event.target.files[i]);
}

onSubmit(): void {
  this.submitted = true;

  let formdata=new FormData();
  formdata.append("reference",this.form.value.reference);
  formdata.append("price",this.form.value.price);
  formdata.append("quantity",this.form.value.quantity);
  formdata.append("description",this.form.value.description);
  for (var i=0; i<this.myFiles.length;i++){
    formdata.append("photos", this.myFiles[i]);
  }
  this.productservice.addproducts(formdata).subscribe((res:any)=>{console.log(res)
  console.log (this.form.value)
  Swal.fire('product aded')
  })
  // console.log(JSON.stringify(this.form.value, null, 2));
}
onReset(): void {
  this.submitted = false;
  this.form.reset();
}
getAllsubcategory(){
  this.apidata.getAllsubcategory().subscribe((res:any)=>{
    this.listsubcategory=res["data"]
    console.log("reponse",res)
  })
}

}
