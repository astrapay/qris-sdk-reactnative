import { executeQris } from '@astrapay/astrapay-qris-react-native';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function App() {
  const buttonOnpress = () => {
    executeQris();
  };
  return (
    <View style={styles.container}>
      <Text>Sample App</Text>
      <Button onPress={buttonOnpress} title="Scan Qris" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
