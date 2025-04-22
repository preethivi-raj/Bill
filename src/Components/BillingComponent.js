import React, { useState } from "react";
import GeneratePDF from "./GeneratePDF";

const BillingComponent = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerAge, setCustomerAge] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  
  // State for selected date
  const [selectedDate, setSelectedDate] = useState("");

  const addProduct = () => {
    if (productName && parseFloat(productPrice) > 0) {
      setProducts([...products, { name: productName, price: parseFloat(productPrice) }]);
      setProductName("");
      setProductPrice("");
      document.getElementById("add_product_modal").close();
    }
  };

  const totalAmount = products.reduce((acc, item) => acc + item.price, 0);
  const balance = totalAmount - amountPaid;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-200 rounded-lg shadow-lg space-y-6 mt-1">
      <h2 className="text-3xl font-bold text-center">🧾 Generate Bill</h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Customer & Product Entry */}
        <div className="space-y-6 bg-base-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">👤 Customer Info</h3>
          <label className="form-control">
            <input 
              type="text" 
              placeholder="Customer Name" 
              className="input input-bordered w-full" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
            />
          </label>
          <label className="form-control">
            <input 
              type="number" 
              placeholder="Age" 
              className="input input-bordered w-full" 
              value={customerAge} 
              onChange={(e) => setCustomerAge(e.target.value)} 
            />
          </label>
          <label className="form-control">
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="input input-bordered w-full" 
              value={customerPhone} 
              onChange={(e) => setCustomerPhone(e.target.value)} 
            />
          </label>

          {/* Date Selector */}
          <label className="form-control">
            <input 
              type="date" 
              className="input input-bordered w-full" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
            />
          </label>
  
          <button 
            className="btn btn-primary w-full" 
            onClick={() => document.getElementById("add_product_modal").showModal()}
          >
            ➕ Add Product
          </button>

          <dialog id="add_product_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add New Product</h3>
              <label className="form-control">
                <input 
                  type="text" 
                  placeholder="Product Name" 
                  className="input input-bordered w-full" 
                  value={productName} 
                  onChange={(e) => setProductName(e.target.value)} 
                />
              </label>
              <label className="form-control">
                <input 
                  type="number" 
                  placeholder="Product Price" 
                  className="input input-bordered w-full" 
                  value={productPrice} 
                  onChange={(e) => setProductPrice(e.target.value)} 
                />
              </label>
              <div className="modal-action">
                <button onClick={addProduct} className="btn btn-success">Add</button>
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>

          <div className="space-y-2">
            <label className="text-lg font-semibold">💳 Amount Paid</label>
            <input 
              type="number" 
              placeholder="Enter amount paid" 
              className="input input-bordered w-full" 
              value={amountPaid} 
              onChange={(e) => setAmountPaid(parseFloat(e.target.value))} 
            />
          </div>
        </div>

        {/* Right Side: Bill Summary */}
        <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
          <h3 className="text-xl font-semibold">📜 Bill Summary</h3>
          <div className="text-sm space-y-1">
            <p><strong>Name:</strong> {customerName || "-"}</p>
            <p><strong>Age:</strong> {customerAge || "-"}</p>
            <p><strong>Phone:</strong> {customerPhone || "-"}</p>
            <p><strong>Date:</strong> {selectedDate || "-"}</p>
          </div>

          {/* Product List */}
          <ul className="mt-3 space-y-2">
            {products.length === 0 ? (
              <p className="text-gray-400">No products added.</p>
            ) : (
              products.map((item, index) => (
                <li key={index} className="flex justify-between border-b pb-1">
                  <span>{item.name}</span>
                  <span>₹{item.price.toFixed(2)}</span>
                </li>
              ))
            )}
          </ul>

          {/* Payment Info */}
          {products.length > 0 && (
            <div className="mt-4 font-semibold space-y-1">
              <div>Total: ₹{totalAmount.toFixed(2)}</div>
              <div>Paid: ₹{amountPaid.toFixed(2)}</div>
              <div className="text-lg text-success">Remaining: ₹{balance >= 0 ? balance.toFixed(2) : 0}</div>
            </div>
          )}

          {/* PDF Generation */}
          {products.length > 0 && (
            <GeneratePDF
              customerName={customerName}
              customerAge={customerAge}
              customerPhone={customerPhone}
              date={selectedDate}
              products={products}
              totalAmount={totalAmount}
              amountPaid={amountPaid}
              balance={balance}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingComponent;
