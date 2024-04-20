import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Paypal = (props) => {
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [donatename, setDonateName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleApprove = async (orderID) => {
    setPaidFor(true);
    const storedToken = Cookies.get("token");
    if (storedToken) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/history`,
          {
            price: product.price,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        console.log("Đẩy price thành công:", response.data);
      } catch (error) {
        console.error("Đẩy price thất bại", error);
        setError("Lỗi khi gửi giá sản phẩm đến backend");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/history`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setDonateName(response.data.donatename);
          setPrice(response.data.price);
          setDescription(response.data.description);
          setDate(response.data.date);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
  
    fetchData();
  }, []);
  

  if (paidFor) {
    Swal.fire({
      title: "Thank You !",
      text: `Cảm ơn vì đã donate ${product.price} $`,
      icon: "success"
    });
    // alert(`Cảm ơn vì đã donate $${product.price}`);
  }

  if (error) {
    alert(error);
  }

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        onClick={(data, actions) => {
          const hasAlready = false;
          if (hasAlready) {
            setError("Đã tồn tại");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price,
                },
                payee: {
                  email_address: "sb-duksl29334917@business.example.com", // Email nhận tiền
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("order", order);
          handleApprove(data.orderID);
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err);
          console.log("Failed");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
