import { useNavigation } from '@react-navigation/native';
import React, { createContext, useEffect, useState } from 'react';

interface RegisterUserInfoContextData {
  nextStep: () => void;
  previousStep: () => void;
}

export const RegisterUserInfoContext =
  createContext<RegisterUserInfoContextData>({} as RegisterUserInfoContextData);

export const RegisterUserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { navigate } = useNavigation();
  const [actualStep, setActualStep] = useState(1);

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
    <RegisterUserInfoContext.Provider value={{ nextStep, previousStep }}>
      {children}
    </RegisterUserInfoContext.Provider>
  );
};
