import { useNavigation } from '@react-navigation/native';
import React, { createContext, useEffect, useReducer, useState } from 'react';

export type Gender = 'Masculino' | 'Feminino';
export type Goal = 'Emagrecimento' | 'Resistência' | 'Hipertrofia' | 'Saúde';
export type FitnessLevel =
  | 'Iniciante'
  | 'Intermediário'
  | 'Avançado'
  | 'Atleta'
  | 'Não sei';
interface UserInfo {
  gender: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  fitnessLevel: string;
}

type Action =
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
}

const userInfoReducer = (state: UserInfo, action: Action): UserInfo => {
  switch (action.type) {
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
  const [actualStep, setActualStep] = useState(1);

  const [userInfoState, dispatchUserInfo] = useReducer(userInfoReducer, {
    gender: '',
    age: 0,
    weight: 0,
    height: 0,
    goal: '',
    fitnessLevel: '',
  });

  console.log(userInfoState);

  function nextStep() {
    try {
      if (actualStep === 6) return;
      setActualStep(actualStep + 1);
    } catch (error) {
      console.log('nextStep function error => ', error);
    }
  }

  function previousStep() {
    try {
      if (actualStep === 1) return;
      setActualStep(actualStep - 1);
    } catch (error) {
      console.log('nextStep function error => ', error);
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
      default:
        return false;
    }
  }

  useEffect(() => {
    handleNavigation();
  }, [nextStep, previousStep]);

  return (
    <RegisterUserInfoContext.Provider
      value={{ nextStep, previousStep, userInfoState, dispatchUserInfo }}
    >
      {children}
    </RegisterUserInfoContext.Provider>
  );
};
