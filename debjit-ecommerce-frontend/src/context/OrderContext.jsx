import { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Mock function to generate an order ID
  const generateOrderID = () => Math.floor(10000000 + Math.random() * 90000000).toString();

  const addOrder = (cartItems, totalAmount, customerDetails = { name: "Danial Donald" }) => {
    const newOrder = {
      id: generateOrderID(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      customer: customerDetails,
      items: cartItems,
      totalAmount,
      status: 'Pending', // Default status
      paymentMethod: 'Credit card'
    };
    
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders((prevOrders) => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: 'Canceled' } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
