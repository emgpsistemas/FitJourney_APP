import { GOOGLE_WEB_CLIENT_ID } from '@env';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../lib/firebase/config';
import { storage } from '../lib/mmkv/storage';
import { LoginFormData } from '../validations/common/Login';
import { UserRegisterFormData } from '../validations/common/UserRegister';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

interface FirebaseAuthContextData {
  session: UserCredential | null;
  user: User | null;
  isLoading: boolean;
  signUpWithEmail({ email, password }: UserRegisterFormData): Promise<void>;
  signIn({ email, password }: LoginFormData): Promise<void>;
  signOut(): void;
  checkUserSession(): Promise<void>;
  recoveryPassword(email: string): Promise<void>;
  signInWithGoogle(): Promise<void>;
}

export const FirebaseAuthContext = createContext<FirebaseAuthContextData>(
  {} as FirebaseAuthContextData,
);

export const FirebaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<UserCredential | null>(null);
  const [initializing, setInitializing] = useState(true);

  async function addUserToFirestore(user: UserCredential) {
    const payload = {
      uid: user.user.uid,
      name: user.user.displayName,
      email: user.user.email,
      photoUrl: user.user.photoURL,
      emailVerified: user.user.emailVerified,
      createdAt: user.user.metadata.creationTime,
      gender: null,
      age: null,
      weight: null,
      height: null,
      goal: null,
      fitnessLevel: null,
      observations: null,
    };
    try {
      await addDoc(collection(FIRESTORE_DB, 'users'), payload).then(
        (docRef) => {
          console.log('Document written with ID: ', docRef.id);
        },
      );
    } catch (error) {
      console.error('addUserToFirestore function error: ', error);
    }
  }

  // TODO: Get all documents ids from collection (users) in firestore database to check if user already exists
  // const getAllIdsFromCollection = async () => {
  //   const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'users'));
  //   const userIds = querySnapshot.docs.map((doc) => doc.id);
  //   return userIds;
  // };

  // const updateOrCreateUser = (user: UserCredential) => {
  //   const teste = getAllIdsFromCollection().then((ids) => {
  //     console.log('ids => ', ids);
  //   });

  // const document = getDoc(testeDocument).then((doc) => {
  //   if (doc.exists()) {
  //     console.log('Document data:', doc.data());
  //   } else {
  //     console.log('No such document!');
  //   }
  // });
  // };

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password,
      );
      await saveUserToStorage(response.user);
      setUser(response.user);
      setSession(response);
    } catch (error: any) {
      if (error?.message.includes('wrong-password')) {
        Alert.alert('Erro!', 'Senha incorreta.');
      }
      if (error?.message.includes('user-not-found')) {
        Alert.alert('Erro!', 'Usuário não encontrado.');
      }
      console.error('signIn function error =>', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    setIsLoading(true);
    try {
      await FIREBASE_AUTH.signOut();
      setUser(null);
      setSession(null);
      storage.delete('UserInfo');
    } catch (error) {
      console.error('signOut function error =>', error);
      Alert.alert('Erro!', 'Não foi possível fazer logout.');
    } finally {
      setIsLoading(false);
    }
  }

  async function signUpWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password,
      );
      addUserToFirestore(response);
      Alert.alert('Sucesso!', 'Usuário criado com sucesso!');
    } catch (error) {
      console.error('signUpWithEmail function error =>', error);
      Alert.alert('Erro!', 'Não foi possível criar o usuário.');
    } finally {
      setIsLoading(false);
    }
  }

  async function recoveryPassword(email: string) {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert('Sucesso!', 'Email de recuperação enviado!');
    } catch (error: any) {
      if (error?.message.includes('user-not-found')) {
        Alert.alert('Erro!', 'Usuário não encontrado.');
      }
      console.error('recoveryPassword function error =>', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveUserToStorage(user: User) {
    try {
      const jsonUser = JSON.stringify(user);
      storage.set('UserInfo', jsonUser);
    } catch (error) {
      console.error('saveUserToStorage function error =>', error);
    }
  }

  async function loadUserFromStorage() {
    try {
      const user = storage.getString('UserInfo');
      if (user) {
        const jsonUser: User = JSON.parse(user);
        setUser(jsonUser);
      }
    } catch (error) {
      console.error('loadUserFromStorage function error =>', error);
    }
  }

  async function checkUserSession() {
    try {
      const user = storage.getString('UserInfo');
      const userJson = user ? JSON.parse(user) : null;

      if (
        userJson &&
        session &&
        userJson.refreshToken !== session.user.refreshToken
      ) {
        storage.delete('UserInfo');
      }
    } catch (error) {
      console.error('checkUserSession function error =>', error);
    }
  }

  async function signInWithGoogle() {
    setIsLoading(true);
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const response = await signInWithCredential(
        FIREBASE_AUTH,
        googleCredential,
      );
      addUserToFirestore(response);
      await saveUserToStorage(response.user);
      setUser(response.user);
      setSession(response);
    } catch (error: any) {
      console.error('signInWithGoogle function error =>', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert(
          'Opa!',
          'O login foi cancelado, tente novamente mais tarde.',
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert(
          'Opa!',
          'O login está em progresso, tente novamente mais tarde.',
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert(
          'Opa!',
          'O serviço do Google Play não está disponível ou está desatualizado.',
        );
      } else {
        // some other error happened
        Alert.alert('Opa!', 'Ocorreu um erro, tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  function onAuthStateChange(user: User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    loadUserFromStorage();
    const subscriber = onAuthStateChanged(FIREBASE_AUTH, onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <FirebaseAuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signIn,
        signOut,
        signUpWithEmail,
        checkUserSession,
        recoveryPassword,
        signInWithGoogle,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
