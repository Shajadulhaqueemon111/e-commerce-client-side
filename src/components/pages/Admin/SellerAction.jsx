import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SellerAction = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          "https://api.imgbb.com/1/upload?key=bf5fd93f65d5d0710adea1df2c70d5e3",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();

        if (data.success) {
          setValue("image", data.data.url);
          //   toast.success("Image uploaded successfully!");
        } else {
          //   toast.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("An error occurred while uploading the image");
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      // Add a default status to the data
      const payload = { ...data, status: "pending" };

      // Send data to the server
      const response = await fetch(
        "https://server-side-five-azure.vercel.app/seller_uploadProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);
        toast.success("Product uploaded successfully!");

        reset();
      } else {
        toast.error("Failed to upload product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Seller Upload System</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product-Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name required" })}
            className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            {...register("price", {
              required: "Price required",
              valueAsNumber: true,
            })}
            className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description required" })}
            className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("category", { required: "Category required" })}
            className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Category</option>
            <option value="Bags">Bags</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Sweatshirts">Sweatshirts</option>
            <option value="Blazers">Blazers</option>
            <option value="Footwear">Footwear</option>
            <option value="Dresses">Dresses</option>
            <option value="Jackets">Jackets</option>
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image-Upload
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Image Preview */}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            POST
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerAction;
