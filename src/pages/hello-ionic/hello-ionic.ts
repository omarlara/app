import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController  } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, } from 'angularfire2/database';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})

export class HelloIonicPage {
  userProfile: any = null;
  songs: FirebaseListObservable<any>;

  constructor(
   private _facebook: Facebook,
   public navCtrl: NavController,
   public alertCtrl: AlertController,  
   public actionSheetCtrl: ActionSheetController,
   af: AngularFireDatabase) 
   {
    this.songs = af.list('/songs');
  }

  addSong(){
    let prompt = this.alertCtrl.create({
        title: 'Song Name',
        message: "Enter a name for this new song you're so keen on adding",
        inputs: [
        {
            name: 'title',
            placeholder: 'Title'
        },
        ],
        buttons: [
        {
            text: 'Cancel',
            handler: data => {
            console.log('Cancel clicked');
            }
        },
        {
            text: 'Save',
            handler: data => {
            this.songs.push({
                title: data.title
            });
            }
        }
        ]
    });
    prompt.present();
  }

  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
        {
            text: 'Delete Song',
            role: 'destructive',
            handler: () => {
            this.removeSong(songId);
            }
        },{
            text: 'Update title',
            handler: () => {
            this.updateSong(songId, songTitle);
            }
        },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            console.log('Cancel clicked');
            }
        }
        ]
    });
    actionSheet.present();
  }

    removeSong(songId: string){
        this.songs.remove(songId);
    }
  
    updateSong(songId, songTitle){
        let prompt = this.alertCtrl.create({
            title: 'Song Name',
            message: "Update the name for this song",
            inputs: [
            {
                name: 'title',
                placeholder: 'Title',
                value: songTitle
            },
            ],
            buttons: [
            {
                text: 'Cancel',
                handler: data => {
                console.log('Cancel clicked');
                }
            },
            {
                text: 'Save',
                handler: data => {
                this.songs.update(songId, {
                    title: data.title
                });
                }
            }
            ]
        });
        prompt.present();
    }

  facebookLogin(){
    console.log('click');
    this._facebook.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
        })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { console.log(error) });
}
}
