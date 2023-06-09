import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useHistory } from "react-router-dom";

function Cart({ cartItems, removeItem }) {
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    // Save cartItems to local storage when it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const amount = cartItems.reduce((total, item) => total + item.amount, 0);
    setTotalAmount(amount);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    const message =
      "Hello QuinaFashiion Here is my items Selection " +
      cartItems.map((item) => `${item.type}: ${item.amount}`).join("\n");
    const phoneNumber = 254705197981;
    const whatsppUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsppUrl, "_blank");
    localStorage.clear();
  };

  return (
    <div className="cart__main__container">
      <h2>Cart</h2>
      <div className="cart-container">
        {!cartItems || cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="table">
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="ul-cart-container">
                  <td>
                    <div>
                      <img src={item.image} alt="" />
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>{item.type}</p>
                    </div>
                  </td>
                  <td>{item.amount}</td>
                  <td>
                    <div>
                      <button
                        className="primary-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <h3>Total to be paid: {totalAmount}</h3>
            <div className="order-container">
              <button className="primary-btn" onClick={handlePlaceOrder}>
                Order
              </button>
            </div>
          </table>
        )}
      </div>
    </div>
  );
}

export default Cart;
