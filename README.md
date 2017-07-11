# Amazon CloudWatchLog API - using AWS JavaScript SDK

Sample application to retrive the log groups, log streams, and log events with fliters from Amazon CloudWatchLogs using their ApIs

## Requirements

1. Node and npm
2. Amazon JavaScript SDK
3. AngularJs
4. Installation

Clone the repository: `git clone git@github.com:suthagar23/aws-cloudwatchlogs-dashboard`

Install the application: `npm install`

Start the server: `node index.js`

View in browser at `http://localhost:8080`

##Config - For CloudWatchLog Application

You need to set up your AWS security credentials before the cloudwatchlog code is able to connect to AWS. You can do this by creating a file named "config.json" and saving the following lines in the file:

    { 
      "accessKeyId": "you_access_key>, 
      "secretAccessKey": <your_secret_access_key>, 
      "region": <required_region> 
    }
See the Security Credentials page. It's also possible to configure your credentials via a configuration file or directly in source. See the AWS SDK for Node.js Developer Guide for more information.

