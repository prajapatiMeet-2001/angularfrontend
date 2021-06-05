import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http:HttpClient,private router:Router) {}
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  fname: String;
  lname: String;
  phone: String;
  email: String;
  password: String;
  dob: Date;
  state: String;
  city: String;
  pincode: String;

  emailL: string;
  passL: string;
  title = 'Log In';
  disType: string = 'block';
  disType1: string = 'none';
  signin() {
    console.log(this.emailL, this.passL);
    if(this.emailL === undefined || this.passL === undefined )
            {
              //console.log(user)
              alert("All fields required")
            }
    else
    {
      const user = 
      {
        email: this.emailL,
        password: this.passL,
      };
      this.http.post('http://localhost:3000/user/signin',user,{headers:this.headers}).toPromise()
      .then((res:any)=> 
      {
        console.log(res)
        if(res.auth == true)
        {
          localStorage.setItem("token", res.token)
          alert('Sign In Successful')
          this.router.navigate(['/'])
        }
      })
      .catch((err:any)=> 
      {
        // Handle error
        console.log(err)
      }); 
    }
  }
  signup() {
    const user = {
      fname: this.fname,
      lname: this.lname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      dob: this.dob,
      state: this.state,
      city: this.city,
      pincode: this.pincode
    };
    console.log(user);
    if(user === undefined || user.fname === undefined || user.lname === undefined || user.city === undefined || user.dob === undefined|| user.phone === undefined || user.password === undefined || user.pincode === undefined || user.state === undefined)
            {
              //console.log(user)
              alert("All fields required")
            }
    else
    {
      this.http.post('http://localhost:3000/user/signup',user,{headers:this.headers}).toPromise()
      .then((res:any)=> 
      {
        console.log(res)
        if(res.auth == true)
        {
          localStorage.setItem("token", res.token)
          alert('Sign Up Successful')
          this.router.navigate(['/'])
        }
      })
      .catch((err:any)=> 
      {
        // Handle error
        console.log(err)
      }); 
    }
  }
  changedisplay() {
    this.title = 'Log In';
    this.disType = 'block';
    this.disType1 = 'none';
  }
  changedisplay1() {
    this.title = 'Sign Up';
    this.disType1 = 'block';
    this.disType = 'none';
  }
  getusers()
  {
    this.http.post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',{"mobile":"9408372825"}).toPromise()
    .then((res:any)=> 
    {
      console.log(res)
    })
  }
  ngOnInit() {
    //this.getusers()
  }
}
