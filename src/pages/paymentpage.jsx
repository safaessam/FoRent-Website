import React, { useState } from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import ValidSchema from "../schemas/paymentpage";
import "../pages/css/pay.css";

const PaymentPage = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // useFormik hook for form handling
  const { errors, touched } = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
    validationSchema: ValidSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // Function to show the modal
  const handleShowModal = () => setShowModal(true);

  // Function to hide the modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="Pay-Page">
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h3 className="text-center">Pay With PayPal</h3>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ATthFd3bb8Sdh2LHawQGvfhMMCTcaVUOHP4X_mphtuMGojuMpUC5tbMY9hl4qxvQlicZLDQe-qnENIRT",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: "10.00" } }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handleShowModal();
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Payment Error", err);
                    alert(
                      "There was an error processing your payment with PayPal. Please try again or choose another payment method."
                    );
                  }}
                />
              </PayPalScriptProvider>
              <div
                className={`modal ${showModal ? "show" : ""}`}
                tabIndex="-1"
                style={{ display: showModal ? "block" : "none" }}
                role="dialog"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Payment Successful</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleCloseModal}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>Your transaction has been completed successfully.</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
