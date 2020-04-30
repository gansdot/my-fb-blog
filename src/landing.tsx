import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import config from "./config/fbconfig";
import App from "./App";
!firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();

export default class LandingPage extends Component {
  _isMounted = false;
  state = { isSignedIn: false };
  uiConfig: any = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  }

  componentWillMount() {
    this._isMounted = false;
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: false });
    });
  }

  render() {
    return (
      <>
        {this.state.isSignedIn ? (
          <App />
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </>
    );
  }
}
