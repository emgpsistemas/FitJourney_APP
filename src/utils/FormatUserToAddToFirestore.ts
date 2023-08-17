import { UserCredential } from 'firebase/auth';

export interface FitJourneyUser {
  isBasicInfoCompleted: boolean;
  uid: string;
  displayName: string | null;
  email: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
  createdAt: string | undefined;
  gender: string | null;
  age: string | null;
  weight: string | null;
  height: string | null;
  goal: string | null;
  fitnessLevel: string | null;
  observations: string | null;
}

export function formatUserToFitJourneyPattern(
  userCredential: UserCredential,
): FitJourneyUser {
  const fitJourneyUser: FitJourneyUser = {
    isBasicInfoCompleted: false,
    uid: userCredential.user.uid,
    displayName: userCredential.user.displayName,
    email: userCredential.user.email,
    photoUrl: userCredential.user.photoURL,
    emailVerified: userCredential.user.emailVerified,
    createdAt: userCredential.user.metadata.creationTime,
    gender: null,
    age: null,
    weight: null,
    height: null,
    goal: null,
    fitnessLevel: null,
    observations: null,
  };

  return fitJourneyUser;
}
