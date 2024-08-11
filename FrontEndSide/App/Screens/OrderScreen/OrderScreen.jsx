



import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert,KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Colors from '../../Common/Utils/Colors'; 
import { Picker } from '@react-native-picker/picker';

const OrderScreen = ({ route, navigation }) => {
  const { cartItems, totalPrice } = route.params;
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [street, setStreet] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [regionPickerOpen, setRegionPickerOpen] = useState(false);
  const [cityPickerOpen, setCityPickerOpen] = useState(false);
  const [townPickerOpen, setTownPickerOpen] = useState(false);
 

  // Function to calculate delivery cost based on region
  const getDeliveryCost = () => {
    switch (region) {
      case 'القدس':
        return 50;
      case 'الداخل المحتل':
        return 75;
      case 'الضفة الغربية':
        return 20;
      default:
        return 0; // No delivery cost if region is not selected or invalid
    }
  };

  // Calculate delivery cost based on selected region
  const deliveryCost = getDeliveryCost();

  const handleConfirmOrder = () => {
    if (!city || !town || !street || !phoneNumber) {
      Alert.alert('يرجى ملء جميع الحقول لإكمال الطلب');
      return;
    }

    // Calculate total price including delivery cost
    const totalWithDelivery = totalPrice + deliveryCost;

    // Your order confirmation logic goes here
    // You can navigate to the confirmation screen or dispatch an action to finalize the order
    navigation.navigate('OrderConfirmationScreen', {
      city,
      town,
      street,
      phoneNumber,
      discountCode,
      cartItems,
      totalPrice,
      deliveryCost, // Pass delivery cost to the confirmation screen
      totalWithDelivery, // Pass total price with delivery cost to the confirmation screen
    });
  };

  // Function to get city options based on selected region
  const getCityOptions = () => {
    switch (region) {
      case 'الضفة الغربية':
        return ['رام الله', 'نابلس', 'طولكرم', 'جنين', 'سلفيت', 'بيت لحم', 'أريحا', 'الخليل', 'قلقيلية'];
      case 'الداخل المحتل':
        return ['Jaffa', 'Haifa', 'Lod', 'Acre'];
      case 'القدس':
        return ['القدس الشرقية', 'ضواحي القدس'];
      default:
        return [];
    }
  };

  // Function to get town options based on selected city
  const getTownOptions = () => {
    switch (city) {
      case 'طولكرم':
        return ['اكتابا', 'الجاروشية', 'الحسبة', 'الحفاصي', 'الراس', 'المسقوفة', 'النزلة الشرقية', 'النزلة الغربية', 'النزلة الوسطى', 'باقة الشرقية', 'بلعا', 'بيت ليد', 'خربة جبارة', 'دير الغصون', 'رامين', 'زيتا', 'سفارين', 'شوفة', 'صيدا', 'عتيل', 'عزبة الخلال', 'عزبة شوفة', 'عكابة', 'علار', 'عنبتا', 'فرعون', 'قفين', 'كفا', 'كفر اللبد', 'كفر جمال', 'كفر زيباد', 'كفر صور', 'كفر عبوش', 'كور', 'مخيم نور شمس', 'مخيم طولكرم', 'مدينة طولكرم', 'نزلة عيسى'];
      case 'نابلس':
        return ['يتما', 'ياصيد', 'نصف جبيل', 'مجدل بني فاضل', 'مادما', 'كفر قليل', 'قوصين', 'قصرة', 'قريوت', 'قبلان', 'فروش بيت دجن', 'عين شبلي', 'عينوس', 'عوريف', 'عورتا', 'عمورية', 'عقربا', 'عصيرة القبلية', 'عصيرة الشمالية', 'عزموط', 'عراق بورين', 'طلوزة', 'مرة', 'سبيسطية', 'سالم', 'زيتا جماعين', 'زواتا', 'دوجين', 'دير شرف', 'دير الحطب', 'دوما', 'خلة النعمان', 'حوارة', 'جورديش', 'جماعين', 'جالود', 'تلفيت', 'تل', 'بيت وزن', 'بيت فوريك', 'بيت رجن', 'بيت حسن', 'بيت ايبا', 'بيت امرين', 'بيتا', 'بورين', 'بزاريا', 'اوصرين', 'اودلا', 'الناصرية', 'الناقورة', 'اللبن الشرقية', 'العقربانية', 'الساوية', 'الباذان', 'اجنسنيا'];
      case 'جنين':
        return ['الجلمة', 'الهاشمية', 'الطيبة', 'رمانة', 'صانور', 'الجديدة', 'سيلة الظهر', 'برقين', 'كفيرت', 'ميثلون', 'كفر قود', 'كفر دان', 'الزاوية', 'الزبابدة', 'زبوبا', 'مثلث الشهداء', 'تعنك', 'يعبد', 'كفر راعي', 'عرابة', 'السيلة الحارثية', 'عانين', 'سيلة الحارثية', 'فقوعة', 'رابا', 'عرانة', 'الجديدة', 'دير غزالة', 'الباحثة', 'بيت قاد', 'أم التوت', 'مرج بن عامر', 'العرقة', 'المقيبلة', 'المنشية', 'الريحانية', 'فارة', 'مثلث الشيخ عامر', 'زبدة', 'زيتا', 'العقبة', 'عزبة صباح', 'قباطية', 'أم الريحان', 'الرزق', 'الحفيرة', 'برقين', 'المغير', 'صير', 'العارضة', 'عصيرة', 'فحمة', 'رابة']
        ;
      case 'رام الله':
        return ['عين يبرود', 'بير زيت', 'الجلزون', 'بير نبالا', 'المزرعة الشرقية', 'سنجل', 'بيت عور التحتا', 'بيت عور التفوح', 'كفر نعمة', 'عطارة', 'برقين', 'البيرة',  'سلواد', 'دير دبوان', 'بيتونيا', 'البيرة', 'بردلة', 'بتين', 'نبي صالح', 'جناتة', 'بدو', 'كوبر', 'الجديرة']
        ;
      case 'سلفيت':
        return ['سلفيت'];
      case 'بيت لحم':
        return ['الخضر', 'الخضر', 'بتير', 'حوسان', 'العبيدية', 'جورة الشمعة', 'العبيدية', 'نحالين', 'الجفتلك', 'زعترة', 'القعيق', 'الفرعة', 'المعصرة', 'بيت فجار', 'بيت ساحور', 'حوسان', 'العبيدية', 'الفرعة', 'المعصرة', 'بيت فجار', 'بيت ساحور', 'حوسان', 'العبيدية', 'نحالين', 'الجفتلك', 'زعترة', 'القعيق', 'الفرعة', 'المعصرة', 'بيت فجار', 'بيت ساحور']
        ;
      case 'أريحا':
        return ['أريحا',  'الزبابدة', 'العوجا', 'الظاهرية', 'المغير', 'الفرديس', 'المسكوبية']
        ;
      case 'الخليل':
        return ['الخليل'];
      case 'قلقيلية':
        return ['قلقيلية'];
      case 'ضواحي القدس':
        return ['ضواحي القدس'];
      case 'القدس الشرقية':
        return ['القدس'];
      default:
        return [];
    }
  };


 
  

  return (
   
    
    <KeyboardAvoidingView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
        <View style={[styles.titleContainer, { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 140 }}>
    <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.WHITE} />
</TouchableOpacity>

  <MaterialCommunityIcons name="clipboard-outline" size={24} color={Colors.WHITE} style={styles.titleIcon} />
  <Text style={[styles.title, { color: Colors.WHITE }]}>ملخص الطلب</Text>
</View>


        {/* Existing book/cart items */}
        {cartItems.map((item) => (
          <View key={item._id} style={styles.itemContainer}>
            <Image source={{ uri: item.mainImage }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.infoBottom}>
                <Text style={styles.price}>السعر: ₪{item.price.toFixed(1)}</Text>
                <Text style={styles.quantity}>الكمية: {item.quantity}</Text>
              </View>
            </View>
          </View>
        ))}
          {/* Region selection */}
          <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setRegionPickerOpen(!regionPickerOpen)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={[styles.label, { fontSize: 18, textAlign: 'right' }]}>
                المنطقة: {region ? region : ' اضغط لاختيار المنطقة'}
              </Text>
              <MaterialCommunityIcons name="map-marker" size={20} color={Colors.BLUE} style={{ marginLeft: 10 }} />

            </View>
          </TouchableOpacity>
          {regionPickerOpen && (
            <Picker
              selectedValue={region}
              onValueChange={(itemValue, itemIndex) => {
                setRegion(itemValue);
                setCity('');
                setTown('');
                setRegionPickerOpen(false);
              }}
              style={{ marginTop: 10 }}
            >
              <Picker.Item label="اختر المنطقة" value="" />
              <Picker.Item label="القدس" value="القدس" />
              <Picker.Item label="الضفة الغربية" value="الضفة الغربية" />
              <Picker.Item label="الداخل المحتل" value="الداخل المحتل" />
            </Picker>
          )}
        </View>

        {/* City selection */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setCityPickerOpen(!cityPickerOpen)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={[styles.label, { fontSize: 18 }]}> المدينة: {city ? city : ' اضغط لاختيار المدينة'} </Text>

          <MaterialCommunityIcons name="map-marker" size={20} color={Colors.ORANGE} style={{ marginLeft: 10 }} />

            </View>
          </TouchableOpacity>
          {cityPickerOpen && (
            <Picker
              selectedValue={city}
              onValueChange={(itemValue, itemIndex) => {
                setCity(itemValue);
                setTown('');
                setCityPickerOpen(false);
              }}
              style={{ marginTop: 10 }}
            >
              <Picker.Item label="اختر المدينة" value="" />
              {getCityOptions().map((cityOption, index) => (
                <Picker.Item key={index} label={cityOption} value={cityOption} />
              ))}
            </Picker>
          )}
        </View>

        {/* Town selection */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setTownPickerOpen(!townPickerOpen)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={[styles.label, { fontSize: 18 }]}> البلدة: {town ? town : ' اضغط لاختيار البلدة'} </Text>
              <MaterialCommunityIcons name="map-marker" size={20} color={Colors.PINK} style={{ marginLeft: 10 }} />
            </View>
          </TouchableOpacity>
          {townPickerOpen && (
            <Picker
              selectedValue={town}
              onValueChange={(itemValue, itemIndex) => {
                setTown(itemValue);
                setTownPickerOpen(false);
              }}
              style={{ marginTop: 10 }}
            >
              <Picker.Item label="اختر البلدة" value="" />
              {getTownOptions(city).map((townOption, index) => (
                <Picker.Item key={index} label={townOption} value={townOption} />
              ))}
            </Picker>
          )}
        </View>

        {/* Street input */}
        <Text style={styles.label}>الحي أو الشارع:</Text>
        <TextInput
          placeholder="الحي أو الشارع"
          value={street}
          onChangeText={(text) => setStreet(text)}
          style={styles.input}
        />

        {/* Phone number input */}
        <Text style={styles.label}>أدخل رقم الهاتف:</Text>
        <TextInput
          placeholder="رقم الهاتف"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.input}
          keyboardType="phone-pad"
        />

        {/* Discount code input */}
        <Text style={styles.label}>أدخل كود الخصم:</Text>
        <TextInput
          placeholder="كود الخصم"
          value={discountCode}
          onChangeText={(text) => setDiscountCode(text)}
          style={styles.input}
        />

      {/* Delivery cost */}
           <View style={styles.deliveryCostContainer}>
  <Text style={styles.deliveryCost}>₪{deliveryCost}</Text>
  <Text style={styles.label}>تكلفة التوصيل:</Text>

           </View>


        {/* Total Price */}
        <View style={styles.totalContainer}>
         
          <Text style={styles.totalPrice}>₪{totalPrice.toFixed(2)}</Text>
          <Text style={styles.totalText}>قيمة الطلب قبل الخصم:</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={[styles.totalPrice, { fontWeight: 'bold' }]}>₪{(totalPrice + deliveryCost).toFixed(2)}</Text>
          <Text style={[styles.totalText, { fontWeight: 'bold' }]}>المجموع الكلي:</Text>

        </View>

        {/* Confirm order button */}



        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmButtonText}>تأكيد الطلب</Text>
        </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 50, // Add padding bottom to prevent content from sticking under the keyboard
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.PINK,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop:40,
  },
  titleIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  alignContent:'center'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1, // سمك الخط الحدودي
    borderColor: '#ccc', // لون الحدود
    borderRadius: 5, // تقوس الزوايا إذا لزم الأمر
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    marginRight: 19,
    fontWeight: 'bold',

    marginBottom: 15,
    textAlign: 'right', // النص على اليمين
  },
  infoBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    marginRight: 110,
    color: Colors.BLACK,
  },
  quantity: {
    color: Colors.BLACK,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'right',
    color: Colors.BLACK,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: Colors.BLUE,
    textAlign: 'right',
  },
  deliveryCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  deliveryCost: {
    fontSize: 15,
    
    //color: Colors.GREEN,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderColor: Colors.ORANGE,
  },
  
  totalText: {
    fontSize: 15,
    
    color: Colors.BLACK,
  },
  totalPrice: {
    fontSize: 15,
    //fontWeight: 'bold',
    color: Colors.BLACK,
  },
  confirmButton: {
    backgroundColor: Colors.ORANGE,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:50
  },
  confirmButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderScreen;