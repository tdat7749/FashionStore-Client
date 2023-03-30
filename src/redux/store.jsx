import { configureStore } from "@reduxjs/toolkit";
import AuthenSlice from "./slice/AuthenSlice";
import BrandSlice from "./slice/BrandSlice";
import CarouselSlice from "./slice/CarouselSlice";
import CartSlice from "./slice/CartSlice";
import CategorySlice from "./slice/CategorySlice";
import OptionSlice from "./slice/OptionSlice";
import OrderSlice from "./slice/OrderSlice";
import ProductSlice from "./slice/ProductSlice";
import RoleSlice from "./slice/RoleSlice";
import UserSlice from "./slice/UserSlice";


const store = configureStore({
    reducer: {
        user: UserSlice,
        product: ProductSlice,
        category: CategorySlice,
        brand: BrandSlice,
        carousel: CarouselSlice,
        option: OptionSlice,
        authen: AuthenSlice,
        cart: CartSlice,
        order: OrderSlice,
        role: RoleSlice
    }
})

export default store