import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";


const Store = configureStore({
     reducer: {
          user: Slice.reducer
     }
});   

export default Store;