import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';






@IonicPage()
@Component({
  selector: 'page-documentation',
  templateUrl: 'documentation.html',
})
export class DocumentationPage {

  fileTransfer: FileTransferObject = this.transfer.create();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private document: DocumentViewer,
    public platform: Platform, private iab: InAppBrowser, private fileOpener: FileOpener,
    private file: File, private transfer: FileTransfer) {
    platform.ready().then(() => {

    });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentationPage');
  }

  viewPDF(){
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }

    this.document.viewDocument(this.file.applicationDirectory+'www/assets/docs/test2.pdf', 'application/pdf', options)
  }

  viewPDFURL(){
    
    const browser = this.iab.create('http://beacons.imatcom.net/wp-content/uploads/2017/12/Test.pdf', '_self', 'location=yes,zoom=no');
  }


  

  //descargo el PDF y lo guardo en un directorio
  download() {
    const url = 'http://beacons.imatcom.net/wp-content/uploads/2017/12/Test.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.viewOpener();//Una vez guardado lo abro
    }, (error) => {
      // handle error
    });
  }

  viewOpener() {
    this.fileOpener.open(this.file.dataDirectory + 'file.pdf', 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));
  }

  openFromAssets(){
    this.fileOpener.open('file:///android_asset/www/assets/docs/test2.pdf', 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));
  }

  upload() {
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {}

    }

    this.fileTransfer.upload('<file path>', '<api endpoint>', options)
      .then((data) => {
        // success
      }, (err) => {
        // error
      })
  }

}
