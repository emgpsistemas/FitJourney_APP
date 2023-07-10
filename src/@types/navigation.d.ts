export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      // Auth
      Login: unknown;
      Register: unknown;
      ForgotPassword: unknown;

      // Home
      Home: unknown;

      // Exercises
      Exercises: unknown;

      // Profile
      Profile: unknown;

      // Training
      RegisteredTrainings: unknown;
      TrainingDetails: { id: number };
    }
  }
}
