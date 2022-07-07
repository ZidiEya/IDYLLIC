// login component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  submitted = false;

  constructor(private formbuilder:FormBuilder,private route:Router,private apidata:AuthentificationService,) {
    
   }

  ngOnInit(): void { 
    this.form = this.formbuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }
onSubmit(){
  this.submitted=true;
  this.apidata.login(this.form.value).subscribe((res:any)=>{
    console.log(res)
    if(res.message=="Hurray! you are now logged in"){
      localStorage.setItem('userconnect',JSON.stringify(res.user))
      localStorage.setItem('token',res.token)
      localStorage.setItem("sate","0")
      this.route.navigateByUrl('/profil')
    }

  },
  err=>{
    Swal.fire({
      icon:"error",
      title:'user not found',
      text:'email invalid',
      footer:'password invalid',

    })
    console.log(err)
  })
}

}
