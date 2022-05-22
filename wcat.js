#!/usr/bin/env node
let fs = require("fs");
//input
let inputArr = process.argv.slice(2);
//console.log(inputArr);
// options
let optionsArr =[];
let fileArr=[];
// identify options
for(let i= 0; i<inputArr.length;i++){
   let firstCh = inputArr[i].charAt(0);
   if(firstCh=="-"){
       optionsArr.push(inputArr[i]);
   }
   else{
       fileArr.push(inputArr[i]);
   }
}
// option check 
let isBothPresent = optionsArr.includes("-b") && optionsArr.includes("-n");
if(isBothPresent==true){
    console.log("either enter -n or -b option ");
    
}
//existence 
for(let i = 0; i<fileArr.length;i++){
    let isPresent = fs.existsSync(fileArr[i]);
    if(isPresent==false){
        console.log(`file ${fileArr[i]} is not present`);
        
    }
}
// read 
let content ="";
for(let i=0; i<fileArr.length;i++){
   //buffer 
   let bufferContent = fs.readFileSync(fileArr[i]);
   content+=bufferContent+"\r\n";
}
//console.log(content);
let contentArr = content.split("\r\n");
//console.log(contentArr);
//-s 
let isSPresent = optionsArr.includes("-s");
if(isSPresent== true ){
    for(let i =1; i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]= null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr=[];
    for(let i =0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
}
//console.log(contentArr.join("\n"));
//-n
let isNPresent = optionsArr.includes("-n");
if(isNPresent==true){
    for(let i =0; i<contentArr.length;i++){
        contentArr[i]=`${i+1} ${contentArr[i]}`;
    }
}
//console.log(contentArr.join("\n"));
let isBPresent = optionsArr.includes("-b");
if(isBPresent==true){

    let counter = 1;
    for(let i = 0; i<contentArr.length;i++){
        if(contentArr[i] != ""){
            contentArr[i] =`${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));





