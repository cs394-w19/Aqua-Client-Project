# glocal
## a react native application
![](demo.gif)

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
- create a Google Maps account:
   - navigate to the [google maps console](https://developers.google.com/maps/documentation/directions/start)
   - create an account and fill in payment information (you will not be charged unless you make many thousands of requests in a month)
   - Copy the API key given to you for future use

### installation
- clone repository `git clone https://github.com/cs394-w19/Aqua-Client-Project.git`
- cd into repository `cd aqua-client-project`
- install all packages `npm install`
- update the 'firebase.js' file with config contents 
- create a new file 'apiKey.json' in the project directory
    - Input the key as follows:
    ```
    {
      "apiKey": "YOUR_API_KEY"
    }
    ```

### usage
- test application `npm start`