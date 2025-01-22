import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  coffees: [],
  status: "idle",
  error: null,
};

export const fetchCoffees = createAsyncThunk(
  "coffees/fetchCoffees",
  async () => {
    const response = await fetch("https://api.sampleapis.com/coffee/hot");
    return response.json();
  }
);

const coffeesSlice = createSlice({
  name: "coffees",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCoffees.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCoffees.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const normalizedCoffees = action.payload.map((coffee) => ({
        ...coffee,
        ingredients: Array.isArray(coffee.ingredients)
          ? coffee.ingredients.map((ingredient) =>
              ingredient.trim().toLowerCase()
            )
          : typeof coffee.ingredients === "string"
          ? coffee.ingredients
              .split(",")
              .map((ingredient) => ingredient.trim().toLowerCase())
          : [],
      }));
      state.coffees = state.coffees.concat(normalizedCoffees);
    },
    [fetchCoffees.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default coffeesSlice.reducer;

export const selectAllCoffees = (state) => state.coffees.coffees;

export const selectCoffeeById = (state, id) => {
  const filteredCoffee = state.coffees.coffees.filter((coffee) => {
    return coffee.id == id;
  });
  return filteredCoffee[0];
};
