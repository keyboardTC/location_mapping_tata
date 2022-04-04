import AuthContent from '../components/Auth/AuthContent';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/Auth/firebase/firebase_config';
import { Alert } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

function RegisterScreen() {

const authCtx = useContext(AuthContext);
const signupHandler = ({email, password}) => {

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    authCtx.authenticate(userCredential._tokenResponse.idToken);
    console.log("===================")
    console.log(userCredential._tokenResponse.idToken);
  })
  .catch((res)=>{
    Alert.alert('Authentification Failed, Please check your credentials')
    return
  })
}

  return <AuthContent onAuthenticate={signupHandler} />;
  // return <AuthContent  />;
}

export default RegisterScreen;