
//   git add .
//  git commit -m "changes" 
//  git push -u origin main
//  backend link (API):    https://documenter.getpostman.com/view/30950345/2sA3Bt1Ugg?fbclid=IwZXh0bgNhZW0CMTAAAR03fz_CFshXtjs4BCh3-YJEKTt9to2xIafeYtQyVxLzjuUjg2oyXdwoD9Y_aem_AfZ9gYzpQzGKGF_yLr6qIBCIfgQQC99U5AQD0LJIUh23R6dGSceeAfE8-COdKOmZsM0RUVb74nfMm-fyIHTVxl3k#intro
//______________________________________________

// App.js







import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./App/PublicScreens/LoginScreen/Login";
import Signin from "./App/PublicScreens/SigninScreen/Signin";
import Signup from "./App/PublicScreens/SignupScreen/Signup";
import Home from "./App/Screens/HomeScreen/Home";
import ForgotPassword from "./App/PublicScreens/ForgotPasswordScreen/ForgotPassword";
import Footer from "./App/Common/Footer/Footer";
import Cart from "./App/Screens/CartScreen/Cart";
import Categories from "./App/Screens/CategoriesScreen/Categories";
import New from "./App/Screens/New/New";
import Discount from "./App/Screens/Discount/Discount";
import Profile from "./App/Screens/ProfileScreen/Profile";
import EditProfile from "./App/Screens/ProfileScreen/EditProfile";
import WishList from "./App/Screens/WishList/WishList";
import BookDetails from "./App/Screens/BookDetails/BookDetails";
import store, { persistor } from "./App/ReduxAndAsyncStorage/store";
import { PersistGate } from "redux-persist/integration/react";
import OrderScreen from "./App/Screens/OrderScreen/OrderScreen";
import BooksByCategory from "./App/Screens/CategoriesScreen/BooksByCategory";
import BookItem from "./App/Screens/CategoriesScreen/BookItem";
import CartItem from './App/Screens/CartScreen/CartItem';
import ChangePassword from './App/Screens/ProfileScreen/ChangePassword';
import OrderConfirmationScreen from './App/Screens/OrderScreen/OrderConfirmationScreen';
import AllOrders from "./App/Screens/AllOrders/AllOrders";



const Stack = createStackNavigator();


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
  name="Home"
  component={Home}
  options={({ navigation }) => ({
    footer: () => <Footer navigation={navigation} />, 
  })}
/>

            <Stack.Screen
              name="Categories"
              component={Categories}
              options={{ footer: () => <Footer /> }}
            />
             <Stack.Screen 
             name="BooksByCategory" 
             component={BooksByCategory}
             options={{ footer: () => <Footer /> }}
             />

              <Stack.Screen 
             name="BookItem" 
             component={BookItem}
             options={{ footer: () => <Footer /> }}
             />

<Stack.Screen
  name="New"
  component={New}
  options={({ navigation }) => ({
    footer: () => <Footer navigation={navigation} />, 
  })}
/>

<Stack.Screen
  name="Discount"
  component={Discount}
  options={({ navigation }) => ({
    footer: () => <Footer navigation={navigation} />, 
  })}
/>

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="WishList"
              component={WishList}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="BookDetails"
              component={BookDetails}
              options={{ footer: () => <Footer /> }}
            />
                        

            <Stack.Screen
              name="Cart"
              component={Cart}
              options={({ navigation }) => ({
                footer: () => <Footer navigation={navigation} />,
              })}
            />
             <Stack.Screen
              name="CartItem"
              component={CartItem}
              options={({ navigation }) => ({
                footer: () => <Footer navigation={navigation} />,
              })}
            />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="OrderConfirmationScreen" component={OrderConfirmationScreen} />
        
            <Stack.Screen name="ChangePassword" component={ChangePassword} />

            <Stack.Screen
              name="AllOrders"
              component={AllOrders}
              options={{ footer: () => <Footer /> }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;