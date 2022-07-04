import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {

  id=this.activeroute.snapshot.params['id']
  product:any
  constructor(private activeroute:ActivatedRoute,private Productservice:ProductService){}
  ngOnInit(): void {
  console.log(this.id)
  this.getoneproduct()
   }
    getoneproduct(){
      this.Productservice.getproductsbyid(this.id).subscribe((res:any)=>{
        this.product=res["data"]
        console.log(this.product)
        })
      }

}
