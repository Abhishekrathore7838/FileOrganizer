//let inputArr=process.argv;
//console.log(inputArr);
//['pathToNode','pathToFile','input_passed_in_terminal']
//let input=inputArr[2];
//console.log(input);

//Project Start

let fs=require("fs");
let path=require("path");
let folderPath=process.argv[2];
//let folderPath=path.join(__dirname,"Download");
//console.log(folderPath);

let folderExists=fs.existsSync(folderPath);

let extensions={
    Audio:[".mp3"],
    Video:[".mp4",".mkv"],
    Document:[".doc",".xlsx",".pdf",".txt"],
    Image:[".jpeg",".jpg",".png",".gif"],
    Software:[".exe"]
};

if(folderExists){
    //we will code
    //console.log("Path is Valid!!!!");
    let files=fs.readdirSync(folderPath);
    for(let i=0;i<files.length;i++){
        //console.log(files[i]);
        let ext=path.extname(files[i]);
        let nameOfFolder= giveFolderName(ext);
        //console.log(ext);
        //console.log("Ext--",ext,"Folder--",nameOfFolder);
        let pathOfFolder=path.join(folderPath,nameOfFolder);
        let exist= fs.existsSync(pathOfFolder);
        if(exist){
            moveFile(folderPath,pathOfFolder,files[i]);
        }else{
            fs.mkdirSync(pathOfFolder);
            moveFile(folderPath,pathOfFolder,files[i]);
        }
    }
    //console.log(files);
}
else{
    console.log("Please Enter a Valid Path!!!!!");
}


function giveFolderName(ext){
    for(let key in extensions){ //Foreach Loop
        let extArr=extensions[key];
        for(let i=0;i<extArr.length;i++){
            if(extArr[i]==ext){
                return key;
            }
        }
    }
    return 'Others';
}

function moveFile(folderPath,pathOfFolder,fileName){
    let sourcePath=path.join(folderPath,fileName);
    let DestinationPath=path.join(pathOfFolder,fileName);
    fs.copyFileSync(sourcePath,DestinationPath);
    fs.unlinkSync(sourcePath);
}

