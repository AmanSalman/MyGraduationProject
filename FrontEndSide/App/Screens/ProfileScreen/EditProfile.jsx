import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import Colors from "../../Common/Utils/Colors";
import { selectToken } from "../../ReduxAndAsyncStorage/BookSlice";

const EditProfile = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://ecommercebackend-jzct.onrender.com/user/profile",
          {
            headers: {
              authorization: `AmanGRAD__${token}`,
            },
          }
        );
        const userData = response.data.user;
        setUserData(userData);
        setEmail(userData.email);
        setPhoneNumber(userData.phone);
        setUserName(userData.username);
      } catch (error) {
        Alert.alert("Failed to fetch user data", error.message);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveProfile = async () => {
    const updatedData = {};
    if (username && username !== userData.username) {
      updatedData.username = username;
    }
    if (email && email !== userData.email) {
      updatedData.email = email;
    }
    if (phoneNumber && phoneNumber !== userData.phone) {
      updatedData.phone = phoneNumber;
    }

    try {
      await axios.patch(
        "https://ecommercebackend-jzct.onrender.com/auth/update",
        updatedData,
        {
          headers: {
            authorization: `AmanGRAD__${token}`,
          },
        }
      );

      Alert.alert("تم حفظ التغييرات بنجاح");
      setIsEditMode(false);
    } catch (error) {
      Alert.alert(
        "حدث خطأ أثناء حفظ التغييرات",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate("Profile")}
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

        <Text style={styles.title}>تعديل الملف الشخصي</Text>

        <View style={styles.inputContainer}>

        <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder={userData ? userData.email : "البريد الالكتروني"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={false} 
          />

          
          <TextInput
            style={styles.input}
            placeholder={userData ? userData.username : "الاسم"}
            keyboardType="default"
            autoCapitalize="none"
            value={username}
            onChangeText={setUserName}
            editable={isEditMode}
          />
        
          <TextInput
            style={styles.input}
            placeholder="رقم الهاتف"
            keyboardType="phone-pad"
            maxLength={13}
            value={phoneNumber}
            onChangeText={(text) =>
              setPhoneNumber(text.replace(/[^0-9]/g, ""))
            }
            editable={isEditMode}
          />
        </View>

        <TouchableOpacity
          style={styles.changePasswordContainer}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <IconAntDesign name="lock" size={20} color={Colors.PINK} />
          <Text style={styles.changePasswordText}>تغيير كلمة المرور</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={isEditMode ? handleSaveProfile : handleToggleEditMode}
        >
          <View style={styles.buttonContent}>
            <IconAntDesign
              name={isEditMode ? "save" : "edit"}
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {isEditMode ? "حفظ" : "تعديل"}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    height: 50,
  },
  header: {
    marginLeft: 50,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffa500",
    margin: 10,
    marginBottom: 50,
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor:Colors.BLUE,
    borderRadius: 10,
    textAlign: "right",
  },
  disabledInput: {
    borderColor: Colors.GRAY,
    color: "#736F6E",
  },
  changePasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  changePasswordText: {
    color: Colors.PINK,
    marginLeft: 5,
    fontSize: 16,
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
  buttonIcon: {
    marginRight: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default EditProfile;
