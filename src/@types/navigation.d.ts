export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      // Auth
      Login: unknown;
      UserRegister: unknown;
      ForgotPassword: unknown;

      // Register User Info Steps
      Step1: unknown;
      Step2: unknown;
      Step3: unknown;
      Step4: unknown;
      Step5: unknown;
      Step6: unknown;

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
