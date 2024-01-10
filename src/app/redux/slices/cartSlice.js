import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    books: JSON.parse(typeof window !== 'undefined' ? window.localStorage.getItem('cart') : '[]'),
  },
  reducers: {
    addToFavs: (state, action) => {
      const bookToAdd = action.payload;
      const isBookInFavs = (books, bookToAdd) => {
        return books.some((book) => book.title === bookToAdd.title);
      };
      
      if (!isBookInFavs(state.books, bookToAdd)) {
        state.books = [...state.books, bookToAdd];
        localStorage.setItem('cart', JSON.stringify(state.books));
      }
    },
    
    removeFromFavs: (state, action) => {
      const titleToRemove = action.payload;
      state.books = state.books.filter((book) => book.title !== titleToRemove);
      localStorage.setItem('cart', JSON.stringify(state.books));
    },
    
  },
});

export const { addToFavs, removeFromFavs } = cartSlice.actions;
export default cartSlice.reducer;
