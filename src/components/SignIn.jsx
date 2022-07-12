import Text from './Text';
import {  Pressable, View } from 'react-native';
import { Formik} from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';

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

  const SignInForm = ({ onSubmit }) => {
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
        <Pressable onPress={onSubmit} style={styles.signButton}>
          <Text fontWeight ='bold' style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    );
  };

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
      };
    return (
        <Formik initialValues={initialValues}
         onSubmit={onSubmit}
         validationSchema={validationSchema}
         >
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
      );
};

export default SignIn;