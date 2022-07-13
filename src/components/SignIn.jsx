import Text from './Text';
import {  Pressable, View } from 'react-native';
import { Formik} from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import {useNavigate} from 'react-router-native'
import { useState } from 'react';


const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

const initialValues = {
    username: '',
    password: '',
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
        {isWrong && <Text color="error">Wrong details</Text>}
        <Pressable onPress={onSubmit} style={styles.signButton}>
          <Text fontWeight ='bold' style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    );
  };

  export const SignInContainer = ({initialValues, onSubmit, validationSchema, isWrong}) => {
    return (
      
      <Formik initialValues={initialValues}
       onSubmit={onSubmit}
       validationSchema={validationSchema}
       >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} isWrong={isWrong} />}
      </Formik>
    );
  }

const SignIn = () => {
  const navigate = useNavigate()
  const [signIn] = useSignIn();
  const [isWrong, setWrong] = useState(false)
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
    // call the mutate function here with the right arguments
      const {data} = await signIn({ username, password });
      navigate('/')
    } catch (e) {
      setWrong(true)
      console.log(e);
    }
  };
    return (
      <SignInContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} isWrong={isWrong}/>
      );
};

export default SignIn;