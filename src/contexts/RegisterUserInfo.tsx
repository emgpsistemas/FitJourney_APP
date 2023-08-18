import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { FIRESTORE_DB } from '../lib/firebase/config';
import { FitJourneyUser } from '../utils/FormatUserToAddToFirestore';

export type Gender = 'Masculino' | 'Feminino';
export type Goal = 'Emagrecimento' | 'Resistência' | 'Hipertrofia' | 'Saúde';
export type FitnessLevel =
  | 'Iniciante'
  | 'Intermediário'
  | 'Avançado'
  | 'Atleta'
  | 'Não sei';
interface UserInfo {
  name: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  fitnessLevel: string;
}

export type ActionTypes =
  | 'SET_NAME'
  | 'SET_GENDER'
  | 'SET_AGE'
  | 'SET_WEIGHT'
  | 'SET_HEIGHT'
  | 'SET_GOAL'
  | 'SET_FITNESS_LEVEL';

export type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_GENDER'; payload: Gender }
  | { type: 'SET_AGE'; payload: number }
  | { type: 'SET_WEIGHT'; payload: number }
  | { type: 'SET_HEIGHT'; payload: number }
  | { type: 'SET_GOAL'; payload: Goal }
  | { type: 'SET_FITNESS_LEVEL'; payload: FitnessLevel };

interface RegisterUserInfoContextData {
  nextStep: () => void;
  previousStep: () => void;
  userInfoState: UserInfo;
  dispatchUserInfo: React.Dispatch<Action>;
  maxStep: number;
  onConfirm: (payload: FitJourneyUser) => Promise<void>;
}

const userInfoReducer = (state: UserInfo, action: Action): UserInfo => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_GENDER':
      return { ...state, gender: action.payload };
    case 'SET_AGE':
      return { ...state, age: action.payload };
    case 'SET_WEIGHT':
      return { ...state, weight: action.payload };
    case 'SET_HEIGHT':
      return { ...state, height: action.payload };
    case 'SET_GOAL':
      return { ...state, goal: action.payload };
    case 'SET_FITNESS_LEVEL':
      return { ...state, fitnessLevel: action.payload };
    default:
      return state;
  }
};

export const RegisterUserInfoContext =
  createContext<RegisterUserInfoContextData>({} as RegisterUserInfoContextData);

export const RegisterUserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { navigate } = useNavigation();
  const { getUserFirebaseCollection } = useFirebaseAuth();
  const [actualStep, setActualStep] = useState(1);
  const minStep = 1;
  const maxStep = 7;

  const [userInfoState, dispatchUserInfo] = useReducer(userInfoReducer, {
    name: '',
    gender: '',
    age: 0,
    weight: 0,
    height: 0,
    goal: '',
    fitnessLevel: '',
  });

  function nextStep() {
    try {
      if (actualStep === maxStep) return;
      setActualStep(actualStep + 1);
    } catch (error) {
      console.error('nextStep function error => ', error);
    }
  }

  function previousStep() {
    try {
      if (actualStep === minStep) return;
      setActualStep(actualStep - 1);
    } catch (error) {
      console.error('nextStep function error => ', error);
    }
  }

  function handleNavigation() {
    switch (actualStep) {
      case 1:
        return navigate('Step1');
      case 2:
        return navigate('Step2');
      case 3:
        return navigate('Step3');
      case 4:
        return navigate('Step4');
      case 5:
        return navigate('Step5');
      case 6:
        return navigate('Step6');
      case 7:
        return navigate('Step7');
      default:
        return false;
    }
  }

  async function onConfirm(payload: FitJourneyUser) {
    const collectionFounded = await getUserFirebaseCollection(payload.uid);
    console.log('payload => ', payload);
    console.log('collectionFounded => ', collectionFounded);
    if (collectionFounded) {
      const userDocRef = doc(
        FIRESTORE_DB,
        'users',
        collectionFounded.documentId,
      );
      const fieldsToUpdate = {
        ...payload,
      };
      await updateDoc(userDocRef, fieldsToUpdate);
    }
  }

  useEffect(() => {
    handleNavigation();
  }, [nextStep, previousStep]);

  return (
    <RegisterUserInfoContext.Provider
      value={{
        nextStep,
        previousStep,
        userInfoState,
        dispatchUserInfo,
        maxStep,
        onConfirm,
      }}
    >
      {children}
    </RegisterUserInfoContext.Provider>
  );
};
