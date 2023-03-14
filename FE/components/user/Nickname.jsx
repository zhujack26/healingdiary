import { StyleSheet, Text, TextInput, View } from "react-native"
import PropTypes from 'prop-types';
import { GlobalColors } from "../../constants/color";


const Nickname = ({title, placeholder}) => {

  return(
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
      style={styles.input}
      placeholder={placeholder ?? title}
      placeholderTextColor={GlobalColors.colors.white500}
      />
    </View>
  );
};

Nickname.propTypes = {
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
    fontSize: 20,
  },
  input:{
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.colors.white500,
    borderRadius: 0,
    paddingHorizontal: 10,
    height: 42,
  },

})
export default Nickname