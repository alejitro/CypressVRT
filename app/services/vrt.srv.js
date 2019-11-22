'use strict'
const shell = require('shelljs');
const request = require('request');
const fs = require('fs');
const s3 = require('../../worker-sqs/s3Storage.js');
var resemblejsCompare = require('resemblejs').compare;
Promise = require('promise');


module.exports.generateVRT = function(req,success,error){
    let itemsEx = req.numberExecution;
    let path = req.path_project;
    let code = req.code;
    const codeinit = req.code;
    var item = 1;

    var timestamp = (new Date()).getTime();
    var execution = {
        insertionDate: new Date(),
        timestamp: timestamp,
        //beforeImgUri: fs.readFile(`${path}/cypress/screenshots/vrthabitica/imagen1.png`),
        //afterImgUri: fs.readFile(`${path}/cypress/screenshots/vrthabitica/imagen1C.png`)
    };

    const options = {
        // stop comparing once determined to be > 5% non-matching; this will
        // also enable compare-only mode and no output image will be rendered;
        // the combination of these results in a significant speed-up in batch processing
        returnEarlyThreshold: 5
    };

    //for(var i = 0,p = Promise.resolve();i<itemsEx;i++){
        //p= p.then(_ => new Promise(resolve => {
            code = `${codeinit}_${item}`;
            shell.exec('npx cypress run --headed');
            return new Promise((resolve, reject) => {
                const options = {};
                console.log(execution.beforeImgUri);
                fs.readdir(`${path}/cypress/screenshots/vrthabitica.js/`,function(err, items) {
                    let file;
                    var execution = {
                        insertionDate: new Date(),
                        timestamp: timestamp,
                        beforeImgUri: `${path}/cypress/screenshots/vrthabitica.js/${items[0]}`,
                        afterImgUri: `${path}/cypress/screenshots/vrthabitica.js/${items[1]}`
                    };
        
                    const options = {
                        // stop comparing once determined to be > 5% non-matching; this will
                        // also enable compare-only mode and no output image will be rendered;
                        // the combination of these results in a significant speed-up in batch processing
                        returnEarlyThreshold: 5
                    };
        
                    /*for(var i=0;i<items.length;i++){
                        if(items[i].includes('Login.png')){
                            file = items[i];
                            break;
                        }
                    }*/
                    console.log("BeforeImgUri: ", execution.beforeImgUri);
                    console.log("AfterImgUri: ", execution.afterImgUri);
                    resemblejsCompare(execution.beforeImgUri, execution.afterImgUri, options, function (err, data) {
                        if (err) reject(err);   
                        else        {
                            console.log("Resultado de resemble: ",data);
                            fs.writeFile(`${path}/cypress/report/comparation.png`, data.getBuffer(), (err) => {                
                                if (err) reject(err);
                                execution.comparation = data;
                                execution.comparationImgUri = `${path}/cypress/report/comparation.png`;
                                console.log('report '+JSON.stringify(execution))
                                success(execution);
                            });
                        }                     
                        
                    });
            
                });
            });
        /*    shell.exec('npx cypress run', function(stdout, stderr) {
                fs.readdir(`${path}/test/report`,function(err, items) {
                    let file;
                    for(var i=0;i<items.length;i++){
                        if(items[i].includes('html')){
                            file = items[i];
                            break;
                        }
                    }
                    const content = fs.readFileSync(`${path}/test/report/${file}`);
                    s3.saveFileToS3(`${code}`,content,()=>{
                        for(var i=0;i<items.length;i++){
                            if(items[i].includes('html')){
                                fs.unlinkSync(`${path}/test/report/${items[i]}`);
                            }
                        }
                        if(item == itemsEx){
                            success("ok");
                        }else{
                            item = item+1;
                            resolve();
                        }
                    /*});
                });
            });
        }));
    }*/
}
