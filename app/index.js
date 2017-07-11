//var Todo = require('./models/todo');
//var express = require('express')
//var app = express()

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');


module.exports = function(app) {

AWS.config.loadFromPath('./config.json');
// Create an CloudWatchLog client
var cloudwatchlogs = new AWS.CloudWatchLogs();
    
    app.get('/loggroupname', function(req, res) {
        console.log("REST Request for /loggroup");
        var params = {
            limit: 40
        };
        cloudwatchlogs.describeLogGroups(params, function(err, data) {
          if (err) {
              console.log("REST Request for /loggroup : Error Occured");
              console.log(err, err.stack); // an error occurred
              res.send({error: "REST Request for /loggroup : Error Occured!"})
            }
          else {  
              console.log("REST Request for /loggroup : Success");
              //console.log(data);           // successful response
              //res.setHeader('Content-Type', 'text/html');
             // res.send(data);
              //res.status(200).json(data);
              res.send(JSON.stringify(data));
            }

        });
    })
    
var logStreams=[];    
//var logstreamPreviousToken='';
//var onemorelogstreamPreviousToken='';  
//var logstreamNextToken='';
app.get('/logstream', function(req, res) {
    
    var logGroupName = req.query.loggroupname; // logstream/?loggroupname=<name>
    var nextToken=req.query.nextToken;
    
    console.log("REST Request for /logstream : ", logGroupName);
    
    
    var params = {
      logGroupName: logGroupName, // 'API-Gateway-Execution-Logs_9upfn6zpoe/Sample2'
      descending: true || false,
      limit: 50
    };
    if(nextToken!="NOTOKEN"){
        params["nextToken"]=nextToken;
    }
   // console.log(params);
    
//    if(requestVal==0){ // Initial Request
//        // no need
//    }
//    else if(requestVal==1){ // nect page
//        if(logstreamNextToken!=''){
//             params["nextToken"]=logstreamNextToken;
//        }
//    }
//    else if(requestVal==-1){ // previous page
//        if(logstreamPreviousToken!=''){
//             params["nextToken"]=onemorelogstreamPreviousToken;
//        }
//    }
    
    cloudwatchlogs.describeLogStreams(params, function(err, data) {
      if (err) {
          console.log("REST Request for /logstream : Error Occured");
          console.log(err, err.stack); // an error occurred
          res.json({error: "REST Request for /logstream : Error Occured!"})
        }
      else {  
          console.log("REST Request for /logstream : Success");
          //console.log(data);           // successful response
          for (var i in data.logStreams) {
              val = data.logStreams[i].logStreamName;
              if(logStreams.indexOf(val) == -1) {
                   logStreams.push(val);
              }
            }
        //  console.log(logStreams);
//          if(requestVal==0){
//              logstreamPreviousToken='';
//              onemorelogstreamPreviousToken='';
//              logstreamNextToken=data.nextToken;
//          }
//          else if(requestVal==1){
//              onemorelogstreamPreviousToken=logstreamPreviousToken;
//              logstreamPreviousToken=logstreamNextToken;
//              logstreamNextToken=data.nextToken;
//          }
//          else if(requestVal==-1){
//              
//          }
          res.send(data);
        }
    });
    
})
    
app.get('/logeventsfliter', function(req, res) {
    var a=[
    '4c56ff4ce4aaf9573aa5dff913df997a',
      'c45147dee729311ef5b5c3003946c48f',
      '4e732ced3463d06de0ca9a15b6153677',
      'cfecdb276f634854f3ef915e2e980c31'
  ];
    var logGroupName = req.query.loggroupname; 
    var logStreamNames = logStreams; //req.query.logstreamnames; 
    var pattern = req.query.pattern;
    console.log("REST Request for /logevents : ", logGroupName);
  //  console.log(logStreams);

    var params = {
      logGroupName: logGroupName,
      filterPattern: pattern,
      interleaved: true || false,
      limit: 100,
      logStreamNames: logStreams.slice(0,100)
    };
    //console.log(logStreams.length);
//var params = {
//  logGroupName: 'API-Gateway-Execution-Logs_9upfn6zpoe/Sample2', /* required */
//  filterPattern: 'GET',
//  interleaved: true || false,
//  limit: 100,
//  logStreamNames: [
//    '4c56ff4ce4aaf9573aa5dff913df997a',
//      'c45147dee729311ef5b5c3003946c48f',
//      '4e732ced3463d06de0ca9a15b6153677',
//      'cfecdb276f634854f3ef915e2e980c31'
//    /* more items */
//  ]
//};
    cloudwatchlogs.filterLogEvents(params, function(err, data) {
      if (err) {
          console.log("REST Request for GET:/logeventsfliter : Error Occured");
          console.log(err, err.stack); // an error occurred
          res.json({error: "REST Request for POST:/logeventsfliter : Error Occured!"})
        }
      else {  
          console.log("REST Request for GET:/logeventsfliter : Success");
         // console.log(data);           // successful response
          res.send(data);
        }
    });
    
})
    


	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};