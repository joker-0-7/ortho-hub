import React, { useEffect } from "react";

function App(id) {
  const userID = id.userID;

  useEffect(() => {
    console.log(userID);
  }, []);

  const createOrder = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/create-order`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    return data.id;
  };

  const onApprove = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/capture-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID: data.orderID, userID: userID }),
      }
    );

    const details = await res.json();
    console.log(details);

    // alert("Transaction completed by " + details.payer.name.given_name);
  };

  useEffect(() => {
    const loadPayPalScript = async () => {
      if (!window.paypal) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=AWjB7UwBDMbzxjJj19Sv1JL7R1cmmdgTdv-UeIhgE7tOVAn2AUe8UcT8Ju_maA0zGy0C_ccIx9bIVMrd&currency=USD`;
        script.addEventListener("load", () => {
          window.paypal
            .Buttons({
              createOrder: createOrder,
              onApprove: onApprove,
            })
            .render("#paypal-button-container");
        });
        document.body.appendChild(script);
      } else {
        window.paypal
          .Buttons({
            createOrder: createOrder,
            onApprove: onApprove,
          })
          .render("#paypal-button-container");
      }
    };

    loadPayPalScript();
  }, []);

  return <div id="paypal-button-container"></div>;
}

export default App;
