import firebase from "firebase";
import { Alert } from "react-native";

class database {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBYvbI7J1A3qSBQ0Rrlg_Btbc7NXQNTIFE",
        authDomain: "rideandshare-8fa88.firebaseapp.com",
        projectId: "rideandshare-8fa88",
        storageBucket: "rideandshare-8fa88.appspot.com",
        messagingSenderId: "96584108097",
        appId: "1:96584108097:web:167aa4f7431c971fa41ec0",
        measurementId: "G-X2VT47FX24",
        databaseURL: "https://rideandshare-8fa88-default-rtdb.firebaseio.com",
      });
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //User Logged In
        this.uid = user.uid;
      } else {
        //User not Logged In
        this.uid = "";
      }
    });
  }
  getUid() {
    // console.log(firebase.auth().currentUser)
    try {
      this.userid = firebase.auth().currentUser.uid;
      return this.userid;
    } catch (err) {
      return null;
    }
  }
  //-------------------Authentication Logic --------------------------//
  isAuthenticated(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }
  signIn(email, pass) {
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.then((e) => {
      Alert.alert("Login", "Login SuccessFull");
    });
    promise.catch((e) => {
      Alert.alert("Error", e.message);
    });
  }
  signOut() {
    firebase.auth().signOut();
  }
  signUp(email, pass, name) {
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
    promise.then(function () {
      let userid = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("users/" + userid)
        .set({
          name: name,
          email: email,
          pass: pass,
          uid: userid,
          profile:
            "https://firebasestorage.googleapis.com/v0/b/social-21c03.appspot.com/o/Profile%2Favatarfunction%20rand(val)%20%7Breturn%20Math.floor((Math.random()%20*%20val)%2B1)%7D.png?alt=media&token=8be82942-b513-479e-8eee-33d6746896d8",
        });
      Alert.alert("Account created", "Login SuccessFull");
    });
    promise.catch(function (error) {
      Alert.alert("Error", error);
    });
  }
  //-------------------Authentication Logic done --------------------------//

  fb(path) {
    return firebase;
  }
  db(path) {
    return firebase.database().ref(path);
  }
  getKey() {
    return firebase.database().ref().child("estore").push().key;
  }
  update(path, callback) {
    firebase.database().ref(path).update(callback);
  }
  on(path, callback) {
    firebase.database().ref(path).on("child_added", callback);
  }
  add(path, task) {
    firebase.database().ref(path).push(task);
  }
  fset(path, task) {
    firebase.database().ref(path).set(task);
  }
  dlt(path, id) {
    firebase.database().ref(path).child(id).remove();
  }
  convertTime(time) {
    const d = new Date(time);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const output =
      d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear();
    return output;
  }
  convertTime2(time) {
    const d = new Date(time);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const output =
      d.getFullYear() + "/" + months[d.getMonth()] + "/" + d.getDate();
    return output;
  }
  getTimeinMilli() {
    var d = new Date();
    return d.getTime();
  }
}
export default new database();
