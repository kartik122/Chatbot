# Chatbot with Falcon

Run a personalized chatbot with the open-source Falcon 7B Instruct LLM and ask questions.

## Getting the Falcon Docker Image Running

To run the Falcon model API, you need to get the Docker image for the falcon model.

#### `docker pull guptak650/falcon-7b-instruct:latest` to pull the docker image in your system.

#### `docker run --gpus all -p 5000:5000 -d guptak650/falcon-7b-instruct:latest` to run the docker image.

The image will run in your system on port 5000 as stated in the command.
Remove `--gpus all` command if you dont want to use the GPUs to run the image or specify a specific GPU to run the image with the `--gpus` flag

## Connecting Model API to Client App

Inside your client app directory go to `./src/Chatbot.js`.

Change the URL on **line 38** to the IP Address of the host machine where the docker image is running along with its port number where it is hosted and replace locahost:5000 with the IP address and Port Number accordingly.

Example : //line 38 : `.get(http://[IP-Address-OR-Localhost]:[PORT-NUMBER]/api/falcon)`

## Starting Client Application

#### `npm install` inside the directory to install the necessary files and modules to run the React App.

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Ask Questions and get answers within seconds!!
