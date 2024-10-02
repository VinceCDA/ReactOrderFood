import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  function handleCloseCart() {
    userProgressContext.hideCart();
  }
  function handleGoToCheckout() {
    userProgressContext.showCheckOut();
  }
  return (
    <>
      <Modal
        className="cart"
        open={userProgressContext.progress === "cart"}
        onClose={
          userProgressContext.progress === "cart" ? handleCloseCart : null
        }
      >
        <h2>Your cart</h2>
        <ul>
          {cartContext.items.map((item) => (
            <CartItem key={item.id} item={item} cartContext={cartContext} />
          ))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
          <Button textOnly onClick={handleCloseCart}>
            Close
          </Button>
          {cartContext.items.length > 0 && (
            <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
          )}
        </p>
      </Modal>
    </>
  );
}
