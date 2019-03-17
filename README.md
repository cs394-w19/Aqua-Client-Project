# glocal
## a react native application

### dependencies
- universal
    - [node](https://nodejs.org/en/)
        - [expo](https://expo.io/)
        - [react native](https://facebook.github.io/react-native/)
        - [firebase/firestore](https://console.firebase.google.com/)
- macOS
    - [xcode](https://developer.apple.com/xcode/)

### dependency setup
- install node: run installer from [node's website](https://nodejs.org/en/)
- install expo: `npm install -g expo-cli`
- install react native by following thier [getting started guide](https://facebook.github.io/react-native/docs/getting-started.html)
- create firebase account:
    - navigate to the [firebase console](https://console.firebase.google.com/)
    - sign in with a (non northwestern) google account
    - add a project and give it a name
    - create a cloud firestore database
    - from the project overview page in the firebase console, click "add firebase to your web app"
    - copy the contents of config (example below)
    ```
    var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
    };
    ```

### installation
- clone repository `git clone https://github.com/cs394-w19/Aqua-Client-Project.git`
- cd into repository `cd aqua-client-project`
- install all packages `npm install`
- update the 'firebase.js' file with config contents 
- create a new file 'apiKey.json' in the project directory

### usage
- test application `npm start`