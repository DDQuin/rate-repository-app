import Text from './Text';
import {  Pressable, View } from 'react-native';
import { Formik} from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import {useNavigate} from 'react-router-native'
import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';


const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(1)
      .max(30)
      .required('Username is required'),
    password: yup
      .string()
      .min(5)
      .max(50)
      .required('Password is required'),
      passwordConfirmation: yup
      .string()
     .oneOf([yup.ref('password'), null])
     .required('Password confirm is required')
  });

const initialValues = {
    username: '',
    password: '',
    passwordConformation: '',
  };

  const SignInForm = ({ onSubmit, isWrong }) => {
    const styles = {
        container: {
            backgroundColor: "white",
            padding: 10,
        },
        
        signButton: {
            marginTop: 20,
            padding: 10,
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
            alignItems: "center",
            flex: 0,
        },

        buttonText: {
            color: "white",
        },
    }
    return (
      <View style={styles.container}>
        <FormikTextInput name="username" placeholder="Username"  />
        <FormikTextInput name="password" placeholder="Password"  secureTextEntry={true}  />
        <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation"  secureTextEntry={true}  />
        {isWrong && <Text color="error">Wrong details</Text>}
        <Pressable onPress={onSubmit} style={styles.signButton}>
          <Text fontWeight ='bold' style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>
    );
  };

  export const SignUpContainer = ({initialValues, onSubmit, validationSchema, isWrong}) => {
    return (
      
      <Formik initialValues={initialValues}
       onSubmit={onSubmit}
       validationSchema={validationSchema}
       >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} isWrong={isWrong} />}
      </Formik>
    );
  }

const SignUp = () => {
  const navigate = useNavigate()
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const [isWrong, setWrong] = useState(false)
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
    // call the mutate function here with the right arguments
      const {data} = await signUp({ username, password });
      const {data2} = await signIn({username, password})
      navigate("/")
    } catch (e) {
      setWrong(true)
      console.log(e);
    }
  };
    return (
      <SignUpContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} isWrong={isWrong}/>
      );
};

export default SignUp;