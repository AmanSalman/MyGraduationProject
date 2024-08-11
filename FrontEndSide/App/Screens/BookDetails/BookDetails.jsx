import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart, faHeart, faStar, faUser, faComment ,faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import Colors from "../../Common/Utils/Colors";
import Footer from "../../Common/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectToken } from "../../ReduxAndAsyncStorage/BookSlice";
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const StarIcon = ({ size = 10, color = Colors.GRAY }) => (
  <FontAwesomeIcon icon={faStar} size={size} color={color} />
);

const BookDetails = ({ route }) => {
  const { title, price, finalPrice, description, mainImage, subImages, id, reviews = [] } = route.params;

  const [comment, setComment] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [rating, setRating] = useState(0);
  const commentInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(selectToken);

  useEffect(() => {
    checkWishlistStatus();
  }, []);

  const checkWishlistStatus = async () => {
    try {
      const response = await axios.get(
        `https://ecommercebackend-jzct.onrender.com/wishlist/${id}`,
        {
          headers: {
            Authorization: `AmanGRAD__${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsInWishlist(true);
      } else if (response.status === 404) {
        setIsInWishlist(false);
      } else {
        throw new Error(`Failed to check wishlist status. Status code: ${response.status}`);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!token) {
        Alert.alert(
          'يرجى تسجيل الدخول لإضافة الكتب إلى عربة التسوق',
          '',
          [{ text: 'موافق', style: 'default' }]
        );
        return;
      }

      const response = await axios.post(
        'https://ecommercebackend-jzct.onrender.com/cart/',
        { bookId: id },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `AmanGRAD__${token}`
          }
        }
      );

      if (response.status === 200) {
        dispatch(addToCart({ title, price: finalPrice, image: mainImage, quantity: 1 }));
        navigation.navigate("Cart");
        Alert.alert("تمت إضافة الكتاب إلى عربة التسوق!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      } else {
        throw new Error(`فشل في إضافة الكتاب إلى العربة, الرمز الناتج: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert("الكتاب موجود بالفعل في عربة التسوق!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      } else {
        Alert.alert("فشل في إضافة الكتاب إلى العربة!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      }
    }
  };
  const handleAddToFavorites = async () => {
    try {
      if (!token) {
        Alert.alert(
          'يرجى تسجيل الدخول لإضافة الكتب إلى المفضلة',
          '',
          [{ text: 'موافق', style: 'default' }]
        );
        return;
      }
  
      const response = await axios.post(
        'https://ecommercebackend-jzct.onrender.com/wishlist/',
        { bookId: id },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `AmanGRAD__${token}`
          }
        }
      );
  
      if (response.status === 200) {
        setIsInWishlist(true);
        Alert.alert('تمت إضافة الكتاب إلى المفضلة بنجاح!', "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      } else {
        throw new Error(`فشل في إضافة الكتاب إلى المفضلة, الرمز الناتج: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert("الكتاب موجود بالفعل في المفضلة!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      } else {
        Alert.alert("فشل في إضافة الكتاب إلى المفضلة!", "", [{ text: 'موافق', style: 'default' }], { cancelable: false });
      }
    }
  };
  

 

  const handleAddComment = async () => {
    try {
      if (comment.trim() === "") {
        Alert.alert("الرجاء إدخال تعليق قبل الإرسال!");
        return;
      }

      const response = await axios.post(
        `https://ecommercebackend-jzct.onrender.com/book/${id}/review`,
        {
          comment,
          rating
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `AmanGRAD__${token}`,
          }
        }
      );

      if (response.status === 201) {
        Alert.alert("تمت إضافة التعليق بنجاح!");
      } else {
        throw new Error(`فشل في إضافة التعليق.  : ${response.status}`);
      }
    } catch (error) {
      Alert.alert("   . الرجاء المحاولة مرة أخرى لاحقًا" );
    }
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
    Alert.alert(`تم تقييم الكتاب بـ ${index + 1} نجمة/نجوم`);
  };

  const scrollToCommentInput = () => {
    if (scrollViewRef.current && commentInputRef.current) {
      commentInputRef.current.measureLayout(scrollViewRef.current, (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      });
    }
  };

  const combinedImages = [mainImage, ...subImages];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
        
        <Swiper style={styles.wrapper} showsButtons={true}>
          {combinedImages.map((img, index) => (
            <View style={styles.slide} key={index}>
              {img ? (
                <Image source={{ uri: img }} style={styles.image} />
              ) : (
                <Text>الصورة غير متوفرة</Text>
              )}
            </View>
          ))}
        </Swiper>

        <Text style={styles.title}>{title}</Text>

        {price !== undefined && price !== finalPrice && (
          <Text style={styles.originalPrice}>₪{price.toFixed(2)}</Text>
        )}

        <Text style={styles.finalPrice}>السعر: ₪{finalPrice.toFixed(2)}</Text>

        <Text style={styles.details}>{description}</Text>

        <View style={styles.buttonContainer}>


          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>أضف إلى عربة التسوق</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleAddToFavorites}>
            <FontAwesomeIcon icon={faHeart} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>أضف إلى المفضلة</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsContainer}>
          <View style={styles.commentsTitleContainer}>
            <FontAwesomeIcon icon={faComment} style={styles.commentIcon} />
            <Text style={styles.commentsTitle}>التعليقات</Text>
          </View>
          <View style={styles.line} /> 

          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <View style={styles.commentContainer} key={index}>
                <FontAwesomeIcon icon={faUser} style={styles.userIcon} />
                <Text style={styles.commentText}>{review.comment}</Text>
              </View>
            ))
          ) : (
            <Text>لا توجد تعليقات بعد.</Text>
          )}
                

                <View style={styles.starContainer}>


            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                <StarIcon size={25} color={index < rating ? Colors.YELLOW : Colors.GRAY} />
              </TouchableOpacity>
            ))}



          </View>



          <View style={styles.inputContainer}>


          <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
          <FontAwesomeIcon icon={faPaperPlane} style={styles.sendIcon} />
        </TouchableOpacity>


        <TextInput
          ref={commentInputRef}
          style={styles.commentInput}
          placeholder="أضف تعليق..."
          value={comment}
          onChangeText={setComment}
          onFocus={scrollToCommentInput}
        />
       
      </View>
        </View>
   
       
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
    //marginBottom:70,
    //marginTop:40
    paddingTop:60,
    paddingBottom:90

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:10,
   textAlign:'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  details: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'justify',
    textAlign:'center',

  },
  originalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: Colors.GRAY,
    textAlign:'center',

  },
  finalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PINK,
    marginBottom: 10,
    textAlign:'center',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    backgroundColor: Colors.ORANGE,
    padding: 10,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonIcon: {
    color: Colors.WHITE,
  },
  commentsContainer: {
    marginVertical: 20,
    alignItems: 'flex-end',
    borderWidth: 2,
    borderColor:Colors.GRAY,
    paddingTop:20,
    paddingBottom:20,
    paddingLeft:10,
    paddingRight:10,

  },
  commentsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,

  },
  commentIcon: {
    marginRight: 12,
    color: Colors.PINK,
     padding:13
  },
  commentsTitle: {
    fontSize: 23,
    fontWeight: 'bold',
   // color: Colors.PINK,

  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userIcon: {
    marginRight: 10,
  },
  commentText: {
    fontSize: 20,


  },
  commentInput: {
    borderColor: Colors.PINK,
    borderWidth: 2,
    borderRadius: 19,
    //padding: 10,
    paddingHorizontal:'30%',
    paddingVertical:10,
    marginBottom: 10,
    marginTop:15,
    marginStart:12


  },
  starContainer: {
    flexDirection: 'row',
    marginTop:40,
    marginEnd:10,
  },
  wrapper: {
    height: 300, // Adjust the height of the Swiper component
    marginBottom: 20, // Add some margin at the bottom of the Swiper
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  line: {
    borderBottomColor: Colors.GRAY, // لون الخط
    borderBottomWidth: 2, // سماكة الخط
    width: '40%', // الطول المطلوب للخط
    alignSelf: 'flex-end', // يجعل الخط في وسط الصفحة
    marginBottom: 20, // تباعد بين الخط وباقي العناصر
  },


  sendButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 18,
    backgroundColor:Colors.PINK, // خلفية زهرية للزر الإرسال
  },
  sendIcon: {
    fontSize: 20, // حجم الأيقونة هنا
    color:Colors.WHITE,
   
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop:12
  },
});

export default BookDetails;
