export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      // Auth
      Login: unknown;
      UserRegister: unknown;
      ForgotPassword: unknown;

      // Home
      Home: unknown;

      // Exercises
      Exercises: unknown;
      RegisteredExercices: unknown;

      // Profile
      Profile: unknown;
      EditProfile: unknown;

      // Training
      RegisteredTrainings: unknown;
      TrainingDetails: { id: number };
      RegisterExercise: unknown;
    }
  }
}
