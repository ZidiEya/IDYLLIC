import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
fileToUplead:Array<File>=[];
  constructor(private formbuilder:FormBuilder,private route:Router,private apidata:AuthentificationService,) {
    
   }
handleFileInput(files:any){
  this.fileToUplead=<Array<File>>files.target.files;
  console.log(this.fileToUplead);
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
  console.log("form validation",this.form.value)
  let formdata= new FormData();
formdata.append("email",this.form.value.email);
formdata.append("password",this.form.value.password);
formdata.append("photo",this.fileToUplead[0]);
this.apidata.register(formdata).subscribe((res:any)=>{
  console.log(res)
})
  
}


}
