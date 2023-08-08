export namespace Exercise {
  export interface Create {
    name: string;
    muscle_group: number;
    description: string;
  }

  export interface Exercise {
    id: number;
    name: string;
    muscle_group: number;
    description: string;
  }
}
