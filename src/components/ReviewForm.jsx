import Text from './Text';
import {  Pressable, View } from 'react-native';
import { Formik} from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import {useNavigate} from 'react-router-native'
import { useState } from 'react';
import useReview from '../hooks/useReview';



const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .required("Rating is required")
      .min(0)
      .max(100)
  });

const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: '',
    text: '',
  };

  const ReviewFormReal = ({ onSubmit, isWrong }) => {
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
        <FormikTextInput name="ownerName" placeholder="Repository owner name"  />
        <FormikTextInput name="repositoryName" placeholder="Repository name"  />
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100"  />
        <FormikTextInput name="text" placeholder="Review" multiline={true} />
        {isWrong && <Text color="error">Wrong details</Text>}
        <Pressable onPress={onSubmit} style={styles.signButton}>
          <Text fontWeight ='bold' style={styles.buttonText}>Create a review</Text>
        </Pressable>
      </View>
    );
  };

  export const ReviewFormContainer = ({initialValues, onSubmit, validationSchema, isWrong}) => {
    return (
      
      <Formik initialValues={initialValues}
       onSubmit={onSubmit}
       validationSchema={validationSchema}
       >
        {({ handleSubmit }) => <ReviewFormReal onSubmit={handleSubmit} isWrong={isWrong} />}
      </Formik>
    );
  }

const ReviewForm = () => {
  const navigate = useNavigate()
  const [createReview] = useReview();
  const [isWrong, setWrong] = useState(false)
  const onSubmit = async (values) => {
    const {rating, ownerName, text, repositoryName} = values;
    //console.log(rating, ownerName, text, repositoryName)
    
    try {
    // call the mutate function here with the right arguments
      const {data} = await createReview({ repositoryName, ownerName, rating, text});
      console.log(data.createReview.repositoryId);
      navigate('/repositories/' + data.createReview.repositoryId)
    } catch (e) {
      setWrong(true)
      console.log(e);
    }
    
  };
    return (
      <ReviewFormContainer initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} isWrong={isWrong}/>
      );
};

export default ReviewForm;