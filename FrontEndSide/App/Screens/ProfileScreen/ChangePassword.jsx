import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import Colors from "../../Common/Utils/Colors";
import { selectToken } from "../../ReduxAndAsyncStorage/BookSlice";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = useSelector(selectToken);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
      return;
    }

    try {
      const response = await axios.patch(
        "https://ecommercebackend-jzct.onrender.com/auth/changePassword",
        {
          oldPassword: currentPassword,
          newPassword,
        },
        {
          headers: {
            authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (!response.data || !response.data.message || response.data.message !== "success") {
        Alert.alert("كلمة المرور الحالية غير صحيحة");
        console.log('Response:', response);
        console.log('Response Data:', response.data);
        return;
      }
      
      

      Alert.alert("تم تغيير كلمة المرور بنجاح");
      navigation.goBack();
    } catch (error) {
      Alert.alert("حدث خطأ أثناء تغيير كلمة المرور");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
    
    
      <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
        >
          <IconAntDesign name="arrowleft" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo/logo.jpg")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>تغيير كلمة المرور</Text>

        <TextInput
          style={styles.input}
          placeholder="كلمة المرور الحالية"
          keyboardType="default"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="كلمة المرور الجديدة"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="تأكيد كلمة المرور"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleChangePassword}
        >
          <View style={styles.buttonContent}>
            <IconAntDesign name="save" size={20} color="white" />
            <Text style={styles.buttonText}>حفظ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: "100%",
    height: 50,
  },
  header: {
    marginLeft: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffa500",
    marginBottom: 50,
  },
  input: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#0abae4",
    borderRadius: 10,
    textAlign: "right",
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: Colors.ORANGE,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#FFA000",
  },
});

export default ChangePassword;

