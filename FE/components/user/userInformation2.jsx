import { StyleSheet, Text, TextInput, View } from "react-native"
import PropTypes from 'prop-types';

const userInformation2 = ({title, placeholder}) => {

  return(
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
      style={styles.input}
      placeholder={placeholder ?? title}
      placeholderTextColor={'#a3a3a3'}
      />
    </View>
  );
};

userInformation2.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title:{
    marginBottom: 4,
  },
  input:{
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    height: 42,
  },

})
export default userInformation2