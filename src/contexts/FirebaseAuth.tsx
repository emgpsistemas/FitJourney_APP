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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../lib/firebase/config';
import { storage } from '../lib/mmkv/storage';
import {
  FitJourneyUser,
  formatUserToFitJourneyPattern,
} from '../utils/FormatUserToAddToFirestore';
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
  addOrUpdateUserToFirestore(fitJourneyUser: FitJourneyUser): Promise<void>;
  fitJourneyUser: FitJourneyUser;
  getUserFirebaseCollection(fitJourneyUser: FitJourneyUser): Promise<any>;
  loadUserFromStorage(): Promise<void>;
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
  const [fitJourneyUser, setFitJourneyUser] = useState<FitJourneyUser>(
    {} as FitJourneyUser,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<UserCredential | null>(null);
  const [initializing, setInitializing] = useState(true);

  async function getUserFirebaseCollection(fitJourneyUser: FitJourneyUser) {
    // Get a reference to the users collection
    const usersCollectionRef = collection(FIRESTORE_DB, 'users');
    const usersCollectionSnapshot = await getDocs(usersCollectionRef);
    const collectionData = usersCollectionSnapshot.docs.map((doc) => {
      return {
        documentId: doc.id,
        userId: doc.get('uid') as string,
      };
    });
    console.log('fitJourneyUser', fitJourneyUser.uid);
    console.log('collectionData', collectionData[0].userId);
    const collectionIdFoundByUid = collectionData.find((data) => {
      return data.userId === fitJourneyUser.uid;
    });
    return collectionIdFoundByUid;
  }

  async function addOrUpdateUserToFirestore(fitJourneyUser: FitJourneyUser) {
    try {
      const collectionFounded = await getUserFirebaseCollection(fitJourneyUser);
      if (collectionFounded) {
        // Get a reference to the user document
        const userDocRef = doc(
          FIRESTORE_DB,
          'users',
          collectionFounded.documentId,
        );
        // Check if user already exists
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          // User doesn't exist, add the user
          await addDoc(collection(FIRESTORE_DB, 'users'), fitJourneyUser);
        } else {
          // User exists, update the user
          const fieldsToUpdate = {
            ...fitJourneyUser,
          };
          await updateDoc(userDocRef, fieldsToUpdate);
        }
      } else {
        // User doesn't exist, add the user
        await addDoc(collection(FIRESTORE_DB, 'users'), fitJourneyUser);
      }
    } catch (error) {
      console.error('addOrUpdateUserToFirestore function error: ', error);
    }
  }

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
      const user = formatUserToFitJourneyPattern(response);
      await saveUserToStorage(user);
      setUser(response.user);
      setSession(response);
      setFitJourneyUser(user);
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
      const user = formatUserToFitJourneyPattern(response);
      addOrUpdateUserToFirestore(user);
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

  async function saveUserToStorage(user: FitJourneyUser) {
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
        const jsonUser: FitJourneyUser = JSON.parse(user);
        setFitJourneyUser(jsonUser);
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
      const user = formatUserToFitJourneyPattern(response);
      addOrUpdateUserToFirestore(user);
      await saveUserToStorage(user);
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
        addOrUpdateUserToFirestore,
        fitJourneyUser,
        getUserFirebaseCollection,
        loadUserFromStorage,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
