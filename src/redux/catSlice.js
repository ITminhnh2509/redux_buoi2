import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cats: [],
  currentPage: 1,
  status: "start",
  error: "",
};
const url = "https://66a07ba77053166bcabb8de3.mockapi.io/studentt/v1/student";
export const fetchDataCats = createAsyncThunk(
  "cats/fetchDataCats",
  async () => {
    const res = await axios.get(url);
    return res.data;
  }
);
export const deleteCat = createAsyncThunk("cats/deleteCat", async (id) => {
  await axios.delete(url + "/" + id);
  return id;
});
export const addNewCat = createAsyncThunk("cats/addNewCat", async (cat) => {
  const res = await axios.post(url, cat);
  return res.data;
});
export const reCheckCat = createAsyncThunk("cats/reCheckCat", async (cat) => {
  const rs = await axios.put(url + "/" + cat.id, {
    ...cat,
    checked: !cat.checked,
  });
  return rs.data;
});
const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataCats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataCats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cats = action.payload;
      })
      .addCase(fetchDataCats.rejected, (state, action) => {
        state.status = "Fail";
        state.error = action.payload.message;
      })
      .addCase(deleteCat.fulfilled, (state, action) => {
        state.cats = state.cats.filter((item) => item.id !== action.payload);
      })
      .addCase(addNewCat.fulfilled, (state, action) => {
        state.cats = [...state.cats, action.payload];
      })
      .addCase(reCheckCat.fulfilled, (state, action) => {
        state.cats = state.cats.map((item) =>
          item.id === action.payload.id
            ? { ...item, checked: !item.checked }
            : item
        );
      });
  },
});
export default catSlice.reducer;
