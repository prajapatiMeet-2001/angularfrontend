import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private http:HttpClient,private router:Router) {}
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
   signout() 
  {
    this.http.post('http://localhost:3000/user/signout',{ 'headers': this.headers }).toPromise()
      .then((res:any)=> 
      {
        console.log(res)
        if(res.auth === false)
        {
          localStorage.removeItem("token");
          alert('Sign Out Successful')
          this.router.navigate(['/login'])
        }
      })
      .catch((err:any)=> 
      {
        // Handle error
        console.log(err)
      }); 
  }
  ngOnInit() 
  {
    this.checkauth()
    this.getusers()
  }
  user:any;
  users:any;
  checkauth()
  {
    const token = localStorage.getItem("token")
    console.log(token)
    if(token)
      this.http.get('http://localhost:3000/user/checkauth/'+token,{ 'headers': this.headers }).toPromise()
      .then((res:any)=> 
      {
        var date = new Date(Date.parse(res.dob))
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        
        const date1 = `${year}-${month}-${day}`
        this.user  = res
        this.user.dob = date1
        console.log('user\n', this.user)
      })
      .catch((err:any)=> 
      {
        // Handle error
        console.log(err)
      }); 
    else  
      this.signout()
  }
  getusers()
  {
    this.http.get('http://localhost:3000/user/getusers/',{ 'headers': this.headers }).toPromise()
      .then((res:any)=> 
      {
        console.log(res)
        this.users  = res
      })
      .catch((err:any)=> 
      {
        // Handle error
        console.log(err)
      }); 
  }
  editdata(user)
  {
    console.log('edit user,',user)
    if(user === undefined || user.fname === undefined || user.lname === undefined || user.city === undefined || user.dob === undefined|| user.phone === undefined || user.password === undefined || user.pincode === undefined || user.state === undefined)
            {
              //console.log(user)
              alert("All fields required")
            }
    else
    {
      this.http.put('http://localhost:3000/user/updatedata',user,{headers:this.headers}).toPromise()
      .then((res:any)=> 
      {
        console.log(res)
        this.checkauth()
      })
      .catch((err:any)=> 
      {
        // Handle error
        console.log(err)
      }); 
    }
  }
  disType: string = 'block';
  disType1: string = 'none';
  //userdata
  changedisplay() {
    this.disType1 = 'none';
    this.disType = 'block';
  }
  changedisplay1() {
    this.disType = 'none';
    this.disType1 = 'block';
  }

}
