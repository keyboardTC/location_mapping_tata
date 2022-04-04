import AuthContent from '../components/Auth/AuthContent';
import { auth } from '../components/Auth/firebase/firebase_config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useContext  } from 'react';
import LoadingOverlay from '../components/Custom_ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../context/auth-context';
import { LocationsContext } from '../context/locations-context';

function LoginScreen() {
  const [isloaded, setIsloaded] = useState(false);
  const authCtx = useContext(AuthContext);
  const LocationCtx = useContext(LocationsContext);

  const signInHandler = async ({email, password}) => {
    setIsloaded(true)
   await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      authCtx.authenticate(userCredential._tokenResponse.idToken, userCredential.user.uid);
      console.log("===================");
      console.log(` =====> ${userCredential.user.uid}`);
    })
    .catch((res)=>{
      Alert.alert('Authentification Failed, Please check your credentials')
      return
    })
    setIsloaded(false);
    LocationCtx.toggleChange();
  }

  if (isloaded) {
    console.log("Logging laoctions are loading");
    return <LoadingOverlay message='Loading...'/>
  }

  return <AuthContent isLogin signInHandler={signInHandler}/>;
}

export default LoginScreen;