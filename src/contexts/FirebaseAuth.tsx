import { GOOGLE_WEB_CLIENT_ID } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { FIREBASE_AUTH } from '../lib/firebase/config';
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
      await AsyncStorage.removeItem('user');
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
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
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
      await AsyncStorage.setItem('@UserInfo', jsonUser);
    } catch (error) {
      console.error('saveUserToStorage function error =>', error);
    }
  }

  async function loadUserFromStorage() {
    console.log('loadUserFromStorage');
    try {
      const jsonUser = await AsyncStorage.getItem('@UserInfo');
      if (jsonUser) {
        const user = JSON.parse(jsonUser);

        setUser(user);
      }
    } catch (error) {
      console.error('loadUserFromStorage function error =>', error);
    }
  }

  async function checkUserSession() {
    try {
      const userJson = await AsyncStorage.getItem('@UserInfo');
      const user = userJson ? JSON.parse(userJson) : null;

      if (user && session && user.refreshToken !== session.user.refreshToken) {
        await AsyncStorage.removeItem('user');
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
      await saveUserToStorage(response.user);
      setUser(response.user);
      console.log('response', response);
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
