
import {StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryView from './RepositoryView';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import ReviewView from './ReviewView';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signIn" element={<SignIn />} exact />
        <Route path="/signUp" element={<SignUp />} exact />
        <Route path="/reviews" element={<ReviewView />} exact />
        <Route path="/createReview" element={<ReviewForm />} exact />
        <Route path="/repositories/:id" element={<RepositoryView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;