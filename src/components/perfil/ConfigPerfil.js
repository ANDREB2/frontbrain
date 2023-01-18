import React from 'react';

//import { ClarifaiStub, grpc } from 'clarifai-nodejs-grpc';



class ConfigPerfil{

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////  
    constructor(){
        this.USER_ID = 'b2';
        //this.USER_ID = 'cefas.andre@gmail.com'
        // Your PAT (Personal Access Token) can be found in the portal under Authentification
        this.PAT = 'a4eb61c9d3884f70b9a2454ee470727c';
        this.APP_ID = 'my-first-application';
        // Change these to whatever model and image URL you want to use
        this.MODEL_ID = 'face-detection';
        this.MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
        this.IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
        //this.stub = ClarifaiStub.grpc();

        //this.metadata = new grpc.Metadata();

        this.raw = JSON.stringify({
            "user_app_id": {
                "user_id": this.USER_ID,
                "app_id": this.APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": this.IMAGE_URL
                        }
                    }
                }
            ]
        });
            /*this.requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Key ' + this.PAT
                },
                body: this.raw
            };*/
        console.log(this.MODEL_ID);
        //https://api.clarifai.com/v2/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs
        /*fetch("https://api.clarifai.com/v2/models/" + this.MODEL_ID + "/versions/" + this.MODEL_VERSION_ID + "/outputs", this.requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));*/
    }
    
    getUSER_ID(){
        return this.USER_ID;
    }

    getMODEL_ID(){
        return this.MODEL_ID;
    }

    getPAT(){
        return this.PAT;
    }

    getMODEL_VERSION_ID(){
        return this.MODEL_VERSION_ID;
    }
    
    getRequestOptions(){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + this.PAT
            },
            body: this.raw
        };
        return requestOptions;
    }

    testRequest(){
        console.log(this.IMAGE_URL);
        fetch("https://api.clarifai.com/v2/models/" + this.getMODEL_ID() + "/versions/" + this.getMODEL_VERSION_ID() + "/outputs", this.getRequestOptions())
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    
   /*ProcessaClarifai(){
        this.metadata.set("authorization", "Key " + this.getPAT());
        this.stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": this.USER_ID,
                "app_id": this.APP_ID
            },
            model_id: this.MODEL_ID,
            version_id: this.MODEL_VERSION_ID, // This is optional. Defaults to the latest model version.
            inputs: [
                { data: { image: { url: this.IMAGE_URL, allow_duplicate_url: true } } }
            ]
        },
        this.metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }

            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }

            // Since we have one input, one output will exist here.
            const output = response.outputs[0];

            console.log("Predicted concepts:");
            for (const concept of output.data.concepts) {
                console.log(concept.name + " " + concept.value);
            }
        }

    );
}*/
    

    
}
export default ConfigPerfil;