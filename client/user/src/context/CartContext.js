import { createContext, useState, useEffect, useContext } from "react";
import LogInContext from "./LogInContext";
import { ProductContext } from "./ProductContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { LoginData } = useContext(LogInContext); // lấy thông tin người dùng
  const { username } = LoginData;
  const {productAvailable} = useContext(ProductContext);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const cartKey = username && username !== "Username" ? `cart_${username}` : "cart_guest";

  // Tải giỏ hàng từ localStorage cho ng dùng đã đăng nhập khi component được mount
  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
      setNumberOfProduct(JSON.parse(storedCart).length); // cập nhật số lượng của sp trong navbar cho mỗi ng dùng 
    }
  }, [cartKey]); //Nếu có dữ liệu thì cập nhật state giỏ hàng và số lượng sản phẩm

  useEffect(() => {
    if (cartItem.length > 0) {
      localStorage.setItem(cartKey, JSON.stringify(cartItem)); //Nếu giỏ hàng còn item thì lưu lại
    } else {
      localStorage.removeItem(cartKey); //Nếu trống thì xóa khỏi localStorage
    }
  }, [cartItem, cartKey]);

  const addToCart = (product, quantity) => {
    setCartItem((prevItems) => {
      
      //Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingProduct = prevItems.find(
        (item) => item.id === product.id && item.color === product.color
      ); 

      // xem màu đã chọn còn ko
      const availabilityForColor = productAvailable.find(
        (p) => p.productID === product.productID && p.color === product.color
      )?.available || 0;

      //kiểm tra xem sp đã chọn đã hết trong tồn kho chưa
      if (existingProduct) {
        const totalQuantity = existingProduct.quantity + quantity;
        if (totalQuantity > availabilityForColor) {
          alert(
            `Số lượng của sản phẩm có màu này đã hết. Vui lòng chọn lại.`
          );
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id && item.color === product.color ? { ...item, quantity: totalQuantity } : item);
      } else {
        if (quantity > availabilityForColor) {
          alert(
            `Số lượng của sản phẩm có màu này đã hết. Vui lòng chọn lại.`
          );
          return prevItems;
        }
        setNumberOfProduct(numberOfProduct + 1);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId, color, amount) => {
    setCartItem((prevItems) =>
      prevItems.map((item) =>
        item.productID === productId && item.color === color
          ? {
              ...item,
              quantity: Math.min(
                Math.max(item.quantity + amount, 1),
                productAvailable.find(
                  (p) => p.productID === productId && p.color === color
                ).available
              ),
            }
          : item
      )
    );
  };

  const removeItem = (productId, color) => {
    setCartItem((prevItems) =>
      prevItems.filter((item) => !(item.productID === productId && item.color === color)) //Giữ lại các item có productID khác hoặc color khác với tham số để giữ lại các sp
    );
    setNumberOfProduct(numberOfProduct - 1);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItem,
        setCartItem,
        updateCartQuantity,
        removeItem,
        numberOfProduct,
        setNumberOfProduct,
        cartKey,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;

