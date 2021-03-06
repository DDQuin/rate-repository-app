import { SignInContainer } from "../../components/SignIn";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import * as yup from 'yup';

describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        // render the SignInContainer component, fill the text inputs and press the submit button
        const onSubmit = jest.fn();
        const initialValues = {
            username: '',
            password: '',
          };

          const validationSchema = yup.object().shape({
            username: yup
              .string()
              .required('Username is required'),
            password: yup
              .string()
              .required('Password is required'),
          });
        const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} isWrong={false} validationSchema={validationSchema} initialValues={initialValues}/>);
        fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
        fireEvent.press(getByText('Sign in'));
        
        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit.mock.calls[0][0]).toEqual({
                username: 'kalle',
                password: 'password',
              });
        });
      });
    });
  });