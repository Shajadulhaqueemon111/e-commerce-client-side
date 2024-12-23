import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    fetch("https://server-side-five-azure.vercel.app/Jns_Product")
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((item) => item._id === _id);

        console.log(foundProduct);
        setProduct(foundProduct);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [_id]);

  if (!product) {
    return <div>Loading...</div>; // Show a loading state while fetching
  }

  return (
    <div className="flex mt-16 justify-center items-center h-screen">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={product.image} alt={product.name} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <h2 className="card-title">${product.price}</h2>
          <p>{product.description}</p>
          <div className="card-actions w-full">
            <button className="btn w-full btn-secondary">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
