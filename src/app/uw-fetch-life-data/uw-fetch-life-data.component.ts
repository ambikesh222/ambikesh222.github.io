import { Component, OnInit } from '@angular/core';
import { LifeRegistration } from './../life-registration';
import { LifeComponent } from './../life/life.component';
 
import { RegistrationService } from '../registration.service';
import { Router,Route } from '@angular/router';

@Component({
  selector: 'app-uw-fetch-life-data',
  templateUrl: './uw-fetch-life-data.component.html',
  styleUrls: ['./uw-fetch-life-data.component.css']
})
export class UwFetchLifeDataComponent implements OnInit {

  user:LifeRegistration=new LifeRegistration();
  config:any;
  value:string="Approve";
  userData:any=[];
  activeUser :any= null;
  reason: string = '';//Get user reason, on Modal window
  showModal: boolean;
al:boolean;
  constructor(private userRegistration:RegistrationService,private _router:Router){
    this.userRegistration.getLifeData().subscribe(data=>{
      console.log(data);
      this.userData=data;
     
    });

  }

  show(user){
    this.showModal = true; // Show-Hide Modal Check
    this.activeUser = user; // Preserving user info for later use
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }


  public approvealForm(user){

    this.userRegistration.updateStatusOfLife(user).subscribe(
  
      data=>{
            
           alert("Approved  Successfully");
           let curl=this._router.url;
           this._router.navigateByUrl('/',{skipLocationChange: true}).then(()=>{
           this._router.navigate([curl]);
           });
      },
       error=>{
         alert("Unsuccessfull");
  
       }
    )
    }
    public rejectForm(){
      let getActiveUserInfo = this.activeUser;
      getActiveUserInfo.reason = this.reason;
      this.userRegistration.rejectStatusOfLife(getActiveUserInfo).subscribe(
        data=>{
          alert("Rejected Successfully");
          let curl=this._router.url;
          this._router.navigateByUrl('/',{skipLocationChange: true}).then(()=>{
          this._router.navigate([curl]);
          });
        },
        error=>{alert("Unsuccessfull")}
      )
    }
    public detailsForm(){
    this.userRegistration.getLifeData().subscribe(data=>{
      console.log(data);
      this.userData=data;
    })
  }
  ngOnInit(): void {

  }
  onDetails(user) :void{
      this._router.navigate(['/UWLifeDetails11'], {state: {data: this.userData}});
    }
   

  }

