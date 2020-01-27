'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient, Image } = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  
  const images = [
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    ];
  
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

   function drawingHandler(agent) {
     agent.add(`Drawing!`);
     var imageUrl = getRandomImageUrl();
     
     agent.add(new Image(imageUrl));
  }
  
  function getRandomImageUrl(){
    return images[Math.floor(Math.random() * images.length)];
  }  
  
  let intentMap = new Map();
  intentMap.set('Gift drawing', drawingHandler);
  agent.handleRequest(intentMap);
});
