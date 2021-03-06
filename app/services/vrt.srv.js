'use strict'
const shell = require('shelljs');
const request = require('request');
const fs = require('fs');
const fsex = require('fs-extra');
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
    };

    const options = {
        // stop comparing once determined to be > 5% non-matching; this will
        // also enable compare-only mode and no output image will be rendered;
        // the combination of these results in a significant speed-up in batch processing
        returnEarlyThreshold: 5
    };


    for(var i = 0,p = Promise.resolve();i<itemsEx;i++){
        p= p.then(_ => new Promise(resolve => {
            if(itemsEx>1){
                code = `${codeinit}_${item}`;
            }else{
                code = `${codeinit}`;
            }
            requestcall(path,code,req,codeinit,itemsEx).then(()=>{
                shell.exec('npx cypress run --headed');
                return new Promise((reject) => {
                    fs.readdir(`${path}/cypress/screenshots/vrthabitica.js/`,function(err, items) {
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

                        return new Promise((reject) => {
                            const options = {};
                            console.log("BeforeImgUri: ", execution.beforeImgUri);
                            console.log("AfterImgUri: ", execution.afterImgUri);
                            resemblejsCompare(execution.beforeImgUri, execution.afterImgUri, options, function (err, data) {
                                if (err) reject(err);   
                                else {
                                    console.log("Resultado de resemble: ",data);
                                    console.log("Buffer: ", data.getBuffer());
                                }
                                execution.comparationImgUri = `${path}/cypress/report/comparation_${code}.png`;
                                fs.writeFileSync(execution.comparationImgUri, data.getBuffer(), (err) => {                
                                    if (err) reject(err);
                                    execution.comparation = data;
                                    console.log('report '+JSON.stringify(execution))
                                    //success(execution);
                                });
                                fs.readdir(`${path}/cypress/report/`,function(err, imageItems) {
                                    let file;
                                    for(var i=0;i<imageItems.length;i++){
                                        if(imageItems[i].includes(`${code}`)){
                                            file = imageItems[i];
                                            break;
                                        }
                                    }
                                    console.log("file: ",file);
                                    const content = fs.readFileSync(`${path}/cypress/report/${file}`);
                                    console.log("dataContent",content);
                                    s3.saveFileToS3(`${code}`,content,()=>{
                                        for(var i=0;i<imageItems.length;i++){
                                            if(imageItems[i].includes('png')){
                                                fs.unlinkSync(`${path}/cypress/report/${imageItems[i]}`);
                                            }
                                        }
                                        if(item == itemsEx){
                                            success("ok");
                                        }else{
                                            item = item+1;
                                            resolve();
                                        }
                                    });
                                });
                                
                            });
                        });
                
                    });
                });
            });
        }));
    }    
}

function requestcall(path_project,code,req,codeinit,itemsEx) {
    return new Promise(function(resolve, reject) {
            if(itemsEx>1){
                let insert = "INSERT INTO `hangover`.`EXECUTION_TESTS` (`code`, `id_application`, `type_application_name`, `level_name`, `type_name`, `type_execution_name`, `number_executions`, `execution_time`, `repetitions`, `status`,`parent`)" 
                         +  "VALUES ('" + `${code}` + "', '" + req.aplication + "', '" + req.typeAplication + "', '" + req.level + "', '" + req.type + "', '" + req.subType + "', '" + req.numberExecution + "', '" + req.executionTime + "', '" + req.repetitions + "', '" + req.status + "','" + codeinit + "');";
                console.log(insert);
                db.query(insert, (err, result) => {
                    if (err) throw error;
                    resolve("ok");
                });
            }else{
                resolve("ok");
            }                
    }); 
 }