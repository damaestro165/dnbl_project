'use client';

import { useFormState } from 'react-dom';
import confirmationNewRequestAction from './ConfirmationNewRequestAction';
import Button from '../Button';



type InputErrorsT = {
  email?: string[];
};

type InitialFormStateT = {
  error: false;
};

type ErrorFormStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type ConfirmationNewRequestFormStateT =
  | InitialFormStateT
  | ErrorFormStateT;

const initialState: InitialFormStateT = {
  error: false,
};

export default function ConfirmationNewRequest() {
  const [state, formAction] = useFormState<
    ConfirmationNewRequestFormStateT,
    FormData
  >(confirmationNewRequestAction, initialState);

  return (
    <div className='mx-auto my-8 p-8 max-w-lg rounded-sm'>
      <h2 className='text-center text-2xl text-amber-500 mb-8 font-bold'>
        Confirmation request
      </h2>
      <p className='mb-4'>
        Request a new confirmation email. Maybe some info about token expiry or
        limited request here.
      </p>
      <form action={formAction} className='my-8'>
        <div className='mb-3'>
          <label htmlFor='email' className='block mb-1'>
            Email *
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            className='bg-white border border-zinc-300 w-full rounded-sm p-2'
          />
          {state.error && state?.inputErrors?.email ? (
            <div className='text-red-700' aria-live='polite'>
              {state.inputErrors.email[0]}
            </div>
          ) : null}
        </div>
        <div className='mb-3'>
          <Button label='Submit' />
        </div>
        {state.error && state.message ? (
          <div className='text-red-700' aria-live='polite'>
            {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}