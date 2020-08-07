import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.css']
})
export class PhotoSelectorComponent implements OnInit {

  @ViewChild('dropArea') dropArea: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;
  
  photo = "";

  gallery = false;
  gallerySub = new BehaviorSubject<boolean>(false)
  currentMsg = this.gallerySub.asObservable()
  constructor(private http: HttpClient) { }

  handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    console.log(e)
    
    this.handleFiles(e.target.files)
    this.gallery = true
    console.log(this)
  }
  
  // initializeProgress(numFiles) {
  //   this.progressBar.nativeElement.value = 0
    
  
  //   // for(let i = numFiles; i > 0; i--) {
  //     this.uploadProgress = 
  //   // }
  // }
  
  updateProgress(fileNumber, percent) {
    // this.uploadProgress[fileNumber] = percent
    // let total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) / this.uploadProgress.length
    console.debug('update', fileNumber, percent)
    // this.progressBar.nativeElement.value = total
  }
  
  handleFiles(files) {
    console.log(this)
    
    console.log(files[0])
    files = [...files]
    // this.initializeProgress(files.length)
    // files.forEach(this.uploadFile)
    this.previewFile(files[0])
    
  }
  // galleryChanger() {

  // }
  previewFile(file) {
    // this.photo = "https://i.insider.com/5cdf092a93a1522b75087d88?width=1100&format=jpeg&auto=webp"
    function doStuff(file, callback) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        console.log(file)
        let imgStr = reader.result as string
        callback(imgStr)
      }
    }
    
    var why = doStuff(file, (err, res) =>{
      console.log(file, err,res)
        if(err) {
          this.photo = err
        }
        if(res) {
          
          // this.currentMsg.subscribe((resp) => {
            this.photo = res
          // })
         
        }
    })
    return why
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
