import { View, Text, SafeAreaView, Alert } from 'react-native';
import AppButton from './component/AppButton';

const ProfileScreen = ({ navigation }: any) => {
  Alert.alert('Transaction Canceled');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 30,
        }}
      >
        <Text>ProfileScreen</Text>
        <AppButton
          title="Back to home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
