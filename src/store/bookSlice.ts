import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
  AnyAction,
} from "@reduxjs/toolkit";

export type Books = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
    };
    categories?: string[];
  };
};

type BooksState = {
  list: Books[];
  loading: boolean;
  error: string | null;
  totalItems: number; // Добавляем totalItems
};

export const fetchBooks = createAsyncThunk<
  { totalItems: number; items: Books[] },
  {
    startIndex: number;
    maxResults: number;
    query: string;
    orderBy: string;
    category: string;
  },
  { rejectValue: string }
>(
  "posts/fetchPosts",
  async function (
    { startIndex, maxResults, query, orderBy },
    { rejectWithValue }
  ) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${orderBy}&key=AIzaSyATJzoDhcUV8WdyuFiuyEIIK8BSlIN8JHQ`
    );

    if (!response.ok) {
      return rejectWithValue("Server Error!");
    }

    const data = await response.json();
    console.log(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${orderBy}&key=AIzaSyATJzoDhcUV8WdyuFiuyEIIK8BSlIN8JHQ`
    );

    return {
      totalItems: data.totalItems,
      items: data.items,
    };
  }
);

export const updateBooks = createAction<Books[]>("updateBooks");

const initialState: BooksState = {
  list: [],
  loading: false,
  error: null,
  totalItems: 0,
};

const bookSlise = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload.items)) {
          if (action.meta.arg.startIndex === 1) {
            state.list = action.payload.items;
          } else {
            state.list = state.list.concat(action.payload.items);
          }
          state.totalItems = action.payload.totalItems;
        }
        state.loading = false;
      })

      .addCase(updateBooks, (state, action) => {
        state.list = action.payload;
        console.log(action.payload);
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default bookSlise.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
