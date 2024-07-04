---

# <p align="center">WeChat</p>

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Project Screenshots](#project-screenshots)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Future Roadmap](#future-roadmap)
- [Creators](#creators)

## Introduction
Welcome to WeChat, an innovative video chat web application designed for seamless real-time communication. WeChat boasts a user-friendly interface and utilizes robust technologies like Socket.io and WebRTC. A standout feature is real-time age detection, powered by TensorFlow, Keras, and CNN models, enhancing interactivity. Join us in making digital communication smarter and more intuitive with WeChat, where future updates will include parental controls and support for remote education.

## <p align="center">Features</p>

- **Video Chat**: Seamless video chat using Socket.io and WebRTC.
- **User-Friendly Interface**: Intuitive design for a smooth user experience.
- **Real-Time Age Detection**: Utilizes TensorFlow, Keras, and CNN for advanced age detection.
- **High-Quality Connection**: Reliable video communication.
- **Interactive Elements**: Enhanced user engagement with intelligent features.
- **Future Enhancements**:
  - **Parental Controls**: Ensure safe usage for younger users.
  - **Remote Education Support**: Tools for educational purposes.


## Installation 

To set up WeChat, follow these steps:

### Step 1: Install Python Dependencies

Navigate to the `ml` folder and install required Python dependencies:

```bash
cd ml
pip install -r requirements.txt
```

### Step 2: Start Age Detection

Run the age detection module from the `ml` folder:

```bash
python main.py
```

### Step 3: Start WebRTC Server

Navigate to the `server` folder, install dependencies, and start the server:

```bash
cd server
npm install
nodemon index.js
```

### Step 4: Install Node.js Modules for Frontend

Navigate to the `client` folder, install necessary Node.js modules:

```bash
cd client
npm install
```

### Step 5: Start Frontend

Start the frontend server from the `client` folder:

```bash
npm start
```

Access WeChat in your browser at `http://localhost:3000`.

## Project Screenshots

<!-- Include screenshots of your project -->

![Screenshot 1](https://github.com/sahuf2003/WeChat/assets/127684377/4ed8b7c3-fde0-40b5-b199-7a5327148580)
![Screenshot 2](https://github.com/sahuf2003/WeChat/assets/127684377/1df4e5ed-5e96-4662-8849-fa60062d808f)



## Tech Stack

<p align="left">
  <a href="https://firebase.google.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/>
  </a>
  <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg" alt="flask" width="40" height="40"/>
  </a>
  <a href="https://nodejs.org" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>
  </a>
  <a href="https://opencv.org/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg" alt="opencv" width="40" height="40"/>
  </a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
  </a>
  <a href="https://scikit-learn.org/" target="_blank" rel="noreferrer">
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="scikit_learn" width="40" height="40"/>
  </a>
  <a href="https://www.selenium.dev" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/>
  </a>
  <a href="https://www.tensorflow.org" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" alt="tensorflow" width="40" height="40"/>
  </a>
</p>

## Dependencies

- Firebase
- Socket.io
- WebRTC
- TensorFlow
- Keras
- CNN

## Future Roadmap

- **Parental Controls**: Implement features to ensure safe usage for children.
- **Remote Education**: Add support for educational purposes.

## <p align="center">Creators</p>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/sahuf2003" target="_black">
        <img src="https://github.com/sahuf2003.png" width="150px;" alt="Sahuf Shaikh"/>
        <br />
        <sub><b>Sahuf Shaikh</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/TechSmith90210" target="_black">
        <img src="https://github.com/TechSmith90210.png" width="150px;" alt="Salman Shaikh"/>
        <br />
        <sub><b>Salman Shaikh</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/shrutipendem112" target="_black">
        <img src="https://github.com/shrutipendem112.png" width="150px;" alt="Shruti Pendem"/>
        <br />
        <sub><b>Shruti Pendem</b></sub>
      </a>
    </td>    
    <td align="center">
      <a href="https://github.com/kaif178" target="_black">
        <img src="https://github.com/kaif178.png" width="150px;" alt="Kaif Shaikh"/>
        <br />
        <sub><b>Kaif Shaikh</b></sub>
      </a>
    </td>
  </tr>
</table>
```
