import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  function handleClose() {
    userProgressContext.hideCheckOut();
  }
  function handleFinish() {
    userProgressContext.hideCheckOut();
    cartContext.clearItem();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressContext.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the nex few
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <>
      <Modal
        open={userProgressContext.progress === "checkout"}
        onClose={
          userProgressContext.progress === "checkout" ? handleClose : null
        }
      >
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
          <Input label={"Full Name"} type="text" id={"name"} />
          <Input label={"Email address"} type="email" id={"email"} />
          <Input label={"Street"} type="text" id={"street"} />
          <div className="control-row">
            <Input label={"Postal Code"} type="text" id={"postal-code"} />
            <Input label={"City"} type="text" id={"city"} />
          </div>
          {error && <Error title={"Failed to submit order"} message={error} />}
          <p className="modal-actions">{actions}</p>
        </form>
      </Modal>
    </>
  );
}
