import { currencyFormatter } from "../utils/formatting";

export default function CartItem({ item, cartContext }) {
  return (
    <>
      <li className="cart-item">
        <p>
          {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
        </p>
        <p className="cart-item-actions">
          <button onClick={() => cartContext.removeItem(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => cartContext.addItem(item)}>+</button>
        </p>
      </li>
    </>
  );
}
