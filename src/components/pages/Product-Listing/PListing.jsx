import { useEffect, useState } from "react";
import { GrView, GrSearch } from "react-icons/gr";
import { Link } from "react-router-dom";

const PListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCategory, setSearchCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://server-side-five-azure.vercel.app/seller_uploadProduct")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(
          data.filter((product) => product.status === "Approved")
        ); // Initialize with approved products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.status === "Approved" &&
        product.category.toLowerCase().includes(searchCategory.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">
        Product Listing Page
      </h1>

      {/* Search Bar */}
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="input input-bordered w-1/2"
        />
        <button onClick={handleSearch} className="btn btn-primary ml-2">
          <GrSearch className="mr-1" /> Search
        </button>
      </div>

      {/* Product Listing */}
      {loading ? (
        <p>
          <span className="loading loading-spinner text-success"></span>
        </p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-500">Category: {product.category}</p>
              <p className="text-gray-700 text-xl font-bold">
                ${product.price}
              </p>
              <Link to={`/admin/Product_View/${product._id}`}>
                <button className="btn btn-primary w-full">
                  <GrView className="mr-1" /> View
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No approved products available for the selected category.</p>
      )}
    </div>
  );
};

export default PListing;
