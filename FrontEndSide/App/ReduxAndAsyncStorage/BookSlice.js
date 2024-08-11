
//  App\ReduxAndAsyncStorage\BookSlice.js
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

export const fetchBookDetails = createAsyncThunk(
  'books/fetchBookDetails',
  async ({ bookId, token }) => {
    try {
      const response = await axios.get(`https://ecommercebackend-jzct.onrender.com/book/${bookId}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `AmanGRAD__${token}`
        },
      });
      return response.data.book;
    } catch (error) {
     // console.error('Error fetching book details:', error);
      throw error;
    }
  }
);

export const addToCart = createAsyncThunk(
  'books/addToCart',
  async (bookData, { getState, dispatch }) => {
    const state = getState();
    const existingBook = state.books.booksInCart.find(book => book.BookID === bookData.BookID);
    if (existingBook) {
      Alert.alert('الكتاب موجود بالفعل في العربة');
      return; // Exit early if book already in cart
    }
    dispatch(addBookToCart(bookData));
  }
);

const addBookToCart = createAction('books/addBookToCart', (bookData) => {
  return {
    payload: bookData
  };
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    booksInCart: [],
    totalPrice: 0,
    token: '',
    username: '',
    loading: true,
  },
  reducers: {
    removeFromCart: (state, action) => {
      const removedBook = state.booksInCart.find(book => book.BookID === action.payload);
      state.booksInCart = state.booksInCart.filter(book => book.BookID !== action.payload);
      if (removedBook) {
        state.totalPrice -= removedBook.price * removedBook.quantity;
      }
    },
    incrementQuantity: (state, action) => {
      const bookToUpdate = state.booksInCart.find(book => book.BookID === action.payload);
      if (bookToUpdate) {
        bookToUpdate.quantity++;
        state.totalPrice += bookToUpdate.price;
      }
    },
    decrementQuantity: (state, action) => {
      const bookToUpdate = state.booksInCart.find(book => book.BookID === action.payload);
      if (bookToUpdate && bookToUpdate.quantity > 1) {
        bookToUpdate.quantity--;
        state.totalPrice -= bookToUpdate.price;
      }
    },
    clearCart: (state) => {
      state.booksInCart = [];
      state.totalPrice = 0;
    },
    saveToken: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    saveUsername: (state, action) => {
      state.username = action.payload;
    },
    setCart: (state, action) => {
      state.booksInCart = action.payload.books;
      state.totalPrice = action.payload.totalPrice || 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {})
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        const bookIndex = state.booksInCart.findIndex(book => book.BookID === action.payload.BookID);
        if (bookIndex >= 0) {
          state.booksInCart[bookIndex] = {
            ...state.booksInCart[bookIndex],
            ...action.payload,
          };
        }
      })
      .addCase(addBookToCart, (state, action) => {
        state.booksInCart.push(action.payload);
        state.totalPrice += action.payload.price * action.payload.quantity;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        console.error('Error fetching book details:', action.error.message);
      });
  },
});

export const { removeFromCart, incrementQuantity, decrementQuantity, clearCart, saveToken, saveUsername, setCart } = bookSlice.actions;

export const selectBooksInCart = state => state.books.booksInCart;
export const selectTotalPrice = state => state.books.totalPrice;
export const selectToken = state => state.books.token;

export default bookSlice.reducer;
