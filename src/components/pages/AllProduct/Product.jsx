import { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import "./styles.css";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // const imgSize = { height: "200px" };

  useEffect(() => {
    fetch("https://server-side-five-azure.vercel.app/Jns_Product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [
          "All",
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filter products by category
  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4">
        This is All Products
      </h1>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 my-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Swiper Component */}
      <Swiper
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {filteredProducts.map((product, index) => (
          <SwiperSlide key={index} className="p-4">
            <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white w-80 md:w-96">
              {/* Product Image */}
              <div className="w-full h-52 overflow-hidden rounded-lg mb-4">
                <img
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  src={product.image}
                  alt={product.name}
                  className="hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                Category: {product.category}
              </p>
              <p className="text-md text-gray-700 font-bold mb-4">
                ${product.price}
              </p>

              {/* View Details Button */}
              <Link to={`/details/${product._id}`}>
                <button className="flex items-center justify-center w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300">
                  <GrView className="mr-2" /> View
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Product;
// import { useEffect, useState } from "react";
// import { GrView } from "react-icons/gr";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";
// import { Link } from "react-router-dom";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [searchResults, setSearchResults] = useState([]); // To hold filtered results
//   const imgSize = { height: "200px" };

//   useEffect(() => {
//     fetch("https://server-side-five-azure.vercel.app/Jns_Product/")
//       .then((response) => response.json())
//       .then((data) => setProducts(data)) // Load all products initially
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         // Upload the image to ImgBB
//         const response = await fetch(
//           "https://api.imgbb.com/1/upload?key=bf5fd93f65d5d0710adea1df2c70d5e3",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
//         const data = await response.json();
//         console.log(data);
//         if (data.success) {
//           // Set the uploaded image URL
//           setUploadedImage(data.data.url);
//         } else {
//           alert("Image upload failed");
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     }
//   };

//   const handleSearchByImage = async () => {
//     try {
//       const response = await fetch("https://server-side-five-azure.vercel.app/Jns_Product/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: uploadedImage }),
//       });
//       const data = await response.json();

//       if (data.results) {
//         setSearchResults(data.results);
//       } else {
//         setSearchResults([]);
//         alert(data.message || "No matching products found");
//       }
//     } catch (error) {
//       console.error("Error searching products by image:", error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-center text-2xl font-bold mt-4">
//         Search Products by Image
//       </h1>

//       {/* Image Upload Section */}
//       <div className="text-center my-4">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="file-input file-input-bordered file-input-primary"
//         />
//         {uploadedImage && (
//           <div className="mt-4">
//             <img
//               src={uploadedImage}
//               alt="Uploaded Preview"
//               className="w-48 h-48 object-cover mx-auto"
//             />
//             <button
//               onClick={handleSearchByImage}
//               className="btn btn-primary mt-2"
//             >
//               Search by Image
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Displaying Search Results */}
//       <h2 className="text-center text-xl font-bold mt-4">
//         {searchResults.length > 0 ? "Search Results" : "All Products"}
//       </h2>

//       <Swiper
//         spaceBetween={10}
//         pagination={{ clickable: true }}
//         modules={[Pagination]}
//         className="mySwiper"
//         breakpoints={{
//           320: { slidesPerView: 1, spaceBetween: 10 },
//           640: { slidesPerView: 2, spaceBetween: 20 },
//           1024: { slidesPerView: 3, spaceBetween: 30 },
//         }}
//       >
//         {(searchResults.length > 0 ? searchResults : products).map(
//           (product, index) => (
//             <SwiperSlide key={index} className="p-4">
//               <div className="border p-4 rounded shadow-md">
//                 <img style={imgSize} src={product.image} alt={product.name} />
//                 <h2 className="text-xl font-bold">{product.name}</h2>
//                 <p className="text-gray-500">Category: {product.category}</p>
//                 <p className="text-gray-700">${product.price}</p>
//                 <Link to={`/details/${product._id}`}>
//                   <button className="btn w-full flex btn-secondary">
//                     <GrView /> View
//                   </button>
//                 </Link>
//               </div>
//             </SwiperSlide>
//           )
//         )}
//       </Swiper>
//     </div>
//   );
// };

// export default Product;
