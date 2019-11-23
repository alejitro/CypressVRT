var AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
});

module.exports.saveFileToS3 = (code, file, success) => {
  let bucketname= 'reports-vrt-testing'
  console.log("key: ", code);
  console.log("Bucket name: ", bucketname);
  s3.createBucket({
    Bucket: bucketname
  }, function (err, data) {
    if (err) {
      console.log("error de bucket: ",err);
      return 0;
    }
    console.log("CORS del bucket :",s3.getBucketCors.data);
    if(!s3.getBucketCors.data){
      configureCors(bucketname);
    }
    let params = {
      Bucket: bucketname,
      Key: code,
      Body: file,
      /*Body: `<pre>${file}<pre>`,
      CacheControl:"max-age=0,no-cache,no-store,must-revalidate",
      ContentType:"image/png",*/
      ACL:"public-read"
    };
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err);
        success(err);
        return 0;
      }
      updateUrlReport(code,`https://${bucketname}.s3.amazonaws.com/${code}`);
      console.log('PNG creada exitosamente: '+`https://${bucketname}.s3.amazonaws.com/${code}`);
      success();
    });
    listBucketKeys(code);

  });
}

updateUrlReport = (code,url_report)=>{
  let update = `UPDATE hangover.EXECUTION_TESTS SET url_report="${url_report}" WHERE code="${code}"`;
  console.log("report->"+update);
  db.query(update, (err, result) => {
      if (err) throw error;
     console.log(result);
  });
}

const configureCors = (bucket)=>{
  var params = {
    Bucket: bucket,
    CORSConfiguration: {
     CORSRules: [
        {
       AllowedHeaders: [
          "*"
       ],
       AllowedMethods: [
          "PUT",
          "POST",
          "DELETE"
       ],
       AllowedOrigins: [
          "*"
       ],
       ExposeHeaders: [
          "x-amz-server-side-encryption"
       ],
       MaxAgeSeconds: 3000
      },
        {
       AllowedHeaders: [
          "Authorization"
       ],
       AllowedMethods: [
          "GET"
       ],
       AllowedOrigins: [
          "*"
       ],
       MaxAgeSeconds: 3000
      }
     ]
    },
    ContentMD5: ""
   };
   s3.putBucketCors(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     //else     console.log(data);           // successful response
   });

}

const listBucketKeys = (key)=>{
  var split = key.split('/');
  var raiz = split[0];
  console.log("directorio raiz: ", raiz);
  let params={
    Bucket: 'reports-vrt-testing',
    Prefix: raiz,
  }
  s3.listObjectsV2(params,function(err,data){
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
