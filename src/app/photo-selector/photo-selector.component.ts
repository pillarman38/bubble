import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.css']
})
export class PhotoSelectorComponent implements OnInit {

  @ViewChild('dropArea') dropArea: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('gallery') gallery: ElementRef;

  uploadProgress = []

  constructor(private http: HttpClient) { }

  handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    console.log(e)

    this.handleFiles(e.target.files)
  }
  
  initializeProgress(numFiles) {
    this.progressBar.nativeElement.value = 0
    this.uploadProgress = []
  
    for(let i = numFiles; i > 0; i--) {
      this.uploadProgress.push(0)
    }
  }
  
  updateProgress(fileNumber, percent) {
    this.uploadProgress[fileNumber] = percent
    let total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) / this.uploadProgress.length
    console.debug('update', fileNumber, percent, total)
    this.progressBar.nativeElement.value = total
  }
  
  handleFiles(files) {
    console.log(files)
    files = [...files]
    this.initializeProgress(files.length)
    files.forEach(this.uploadFile)
    files.forEach(this.previewFile)
  }
  
  previewFile(file) {
    let reader = new FileReader()
    let gallery = document.getElementById('gallery')
    reader.readAsDataURL(file)
    reader.onloadend = function() {

      let imgStr = reader.result as string
      
      gallery.innerHTML += `<img src=${imgStr} width='100' height='100'>`
    }
  }
  
  uploadFile(file, i) {
    var formData = new FormData();
  
    formData.append("photo", "Groucho");// number 123456 is immediately converted to a string "123456"
    // HTML file input, chosen by user
    formData.append("photos", file);
    formData.append("photos", localStorage.getItem('email'));
    // JavaScript file-like object
    var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
    var blob = new Blob([content], { type: "text/xml"});
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == XMLHttpRequest.DONE) {
          console.log(request.responseText);
      }
  }
    request.open("POST", 'http://192.168.1.86:3001/api/management/uploadPhoto');
    request.send(formData);

  }
  ngOnInit(): void {
  }
}
