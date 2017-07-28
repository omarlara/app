import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  
  public idNav:number;
  public nameNav:string;
  public imageNav:string;
  public descriptionNav: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.idNav = navParams.get('id');
      this.nameNav = navParams.get('name');
      this.imageNav = navParams.get('image');
      this.descriptionNav = navParams.get('description');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    console.log("this.idNav", this.idNav);
    console.log("descriptionNav", this.descriptionNav);
  }



}
