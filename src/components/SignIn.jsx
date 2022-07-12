import Text from './Text';
import {  Pressable, View } from 'react-native';
import { Formik} from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

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
        input: {
            borderColor: "grey",
            borderWidth: 1,
            padding: 10,
            borderRadius: 3,
            marginTop: 20,
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
        <FormikTextInput name="username" placeholder="Username" style={styles.input} />
        <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry={true}  />
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
      );
};

export default SignIn;