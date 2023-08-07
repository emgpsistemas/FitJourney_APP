import { Action, ActionTypes } from '../contexts/RegisterUserInfo';

const numberRegex = /^[0-9]*$/;

export const handleNumberChange = (
  value: string,
  dispatchFunction: React.Dispatch<Action>,
  type: ActionTypes,
) => {
  if (numberRegex.test(value)) {
    dispatchFunction({
      type: type as any,
      payload: Number(value),
    });
  }
};
