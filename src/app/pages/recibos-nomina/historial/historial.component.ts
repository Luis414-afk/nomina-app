import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  private fileTransfer: FileTransferObject;
  private readonly DOCUMENT_NAME = 'Nomina.pdf';

  constructor(
    private iab: InAppBrowser,
    private file: File,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private platform: Platform
  ) {
    this.fileTransfer = this.transfer.create();
  }

  ngOnInit() {}

  /**
   * Descarga y abre un archivo PDF desde una URL
   * @param url URL del archivo a descargar
   */
  openUrl(url: string) {

    let path = '';
   
    const document : string = "Nomina";

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }

    this.fileTransfer = this.transfer.create();
    
    // this.isLoading = true;
    this.fileTransfer
      .download(url, path + document + ".pdf")
      .then(entry => {
        let nativeURL = entry.nativeURL;
        this.fileOpener
          .open(nativeURL, 'application/pdf')
          .then(() => console.log("File is opened"))
          .catch(e => console.log("Error opening file in - " + entry.toURL(), e));

      }).catch(er => {
        console.log('Error to download file', er);

        // this.isLoading = false;
   
      });
  }
}
