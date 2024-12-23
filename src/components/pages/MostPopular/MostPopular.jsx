import { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";

const MostPopular = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    fetch("https://server-side-five-azure.vercel.app/Jns_Product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-4">
        Most Popular Product
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product, index) => (
          <div key={index} className="border p-4 rounded shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-500">Category: {product.category}</p>
            <p className="text-gray-700">${product.price}</p>
            <Link to={`/view/${product._id}`}>
              <button className="btn w-full flex btn-secondary">
                <GrView /> View
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          className="btn btn-outline mx-2"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline mx-2"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MostPopular;
