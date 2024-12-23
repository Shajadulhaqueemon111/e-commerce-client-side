import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminApproveSystem = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://server-side-five-azure.vercel.app/seller_uploadProduct")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const approveProduct = (id) => {
    fetch(
      `https://server-side-five-azure.vercel.app/seller_uploadProduct/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Product approved successfully") {
          toast.success("Product approved successfully!");
          // Update local state
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === id ? { ...product, status: "Approved" } : product
            )
          );
        } else {
          console.error("Error approving product:", data.message);
        }
      })
      .catch((error) => console.error("Error approving product:", error));
  };
  const rejectProduct = (id) => {
    fetch(
      `https://server-side-five-azure.vercel.app/seller_uploadProduct/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.error("Product rejected and deleted!");

          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          );
        } else {
          console.error("Error rejecting product:", response.statusText);
        }
      })
      .catch((error) => console.error("Error rejecting product:", error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-3">
        Admin Approve System
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-500">Category: {product.category}</p>
            <p className="text-gray-700">${product.price}</p>
            <div className="card-actions justify-between">
              <button
                onClick={() => approveProduct(product._id)}
                className={`btn ${
                  product.status === "Approved"
                    ? "btn-success"
                    : "btn-outline btn-primary"
                }`}
              >
                {product.status || "Pending"}
              </button>
              <button
                onClick={() => rejectProduct(product._id)}
                className="btn btn-error"
              >
                Rejected
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminApproveSystem;
