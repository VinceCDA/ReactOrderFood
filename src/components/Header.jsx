import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Header() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  function handleShowCart() {
    userProgressContext.showCart();
  }
  const totalCartItems = cartContext.items.reduce(
    (totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    },
    0
  );
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="A restaurant" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart ({totalCartItems})
          </Button>
        </nav>
      </header>
    </>
  );
}
