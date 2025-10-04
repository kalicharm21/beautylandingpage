import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  image: string;
  images: string[];
  model: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  shades: string[];
  tags: string[];
  inStock: boolean;
  featured: boolean;
};

const defaultProduct: Product = {
  id: "",
  name: "",
  category: "",
  price: 0,
  originalPrice: 0,
  rating: 0,
  reviews: 0,
  image: "",
  images: [],
  model: "",
  description: "",
  benefits: [],
  ingredients: [],
  shades: [],
  tags: [],
  inStock: true,
  featured: false,
};

const ProductAdmin = () => {
  const [product, setProduct] = useState<Product>({
    ...defaultProduct,
    id: Date.now().toString(),
  });

  const [products, setProducts] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("admin-products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  // Save updated products array to localStorage
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("admin-products", JSON.stringify(newProducts));
  };

  // Handle simple field change
  const handleChange = (field: keyof Product, value: any) => {
    setProduct({
      ...product,
      [field]: value,
    });
  };

  // Array handlers
  const handleArrayChange = (
    field: keyof Product,
    index: number,
    value: string
  ) => {
    const arr = [...(product[field] as string[])];
    arr[index] = value;
    setProduct({ ...product, [field]: arr });
  };

  const addToArrayField = (field: keyof Product) => {
    const arr = [...(product[field] as string[]), ""];
    setProduct({ ...product, [field]: arr });
  };

  const removeFromArrayField = (field: keyof Product, index: number) => {
    const arr = [...(product[field] as string[])];
    arr.splice(index, 1);
    setProduct({ ...product, [field]: arr });
  };

  // Submit form to add or edit product
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name || !product.category || product.price <= 0) {
      alert("Name, category and positive price are required");
      return;
    }

    const existingIndex = products.findIndex((p) => p.id === product.id);
    const updatedProducts = [...products];
    if (existingIndex >= 0) {
      updatedProducts[existingIndex] = product;
    } else {
      updatedProducts.push(product);
    }

    saveProducts(updatedProducts);
    setProduct({ ...defaultProduct, id: Date.now().toString() });
  };

  function editProduct(p: Product) {
    setProduct(p);
  }

  function deleteProduct(id: string) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const filtered = products.filter((prod) => prod.id !== id);
    saveProducts(filtered);
  }

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">Product Admin</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name *</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category *</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) => handleChange("category", e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Price & Original Price */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Price *</label>
            <input
              type="number"
              min={0}
              value={product.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Original Price</label>
            <input
              type="number"
              min={0}
              value={product.originalPrice}
              onChange={(e) =>
                handleChange("originalPrice", Number(e.target.value))
              }
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-semibold">Main Image URL *</label>
          <input
            type="text"
            value={product.image}
            onChange={(e) => handleChange("image", e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Additional Images */}
        <div>
          <label className="block mb-1 font-semibold">Additional Images</label>
          {product.images.map((img, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={img}
                onChange={(e) => handleArrayChange("images", i, e.target.value)}
                className="border p-2 rounded flex-grow"
              />
              <button
                type="button"
                className="text-red-600"
                onClick={() => removeFromArrayField("images", i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => addToArrayField("images")}
          >
            + Add Image
          </button>
        </div>

        {/* Model */}
        <div>
          <label className="block mb-1 font-semibold">3D Model Path</label>
          <input
            type="text"
            value={product.model}
            onChange={(e) => handleChange("model", e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={product.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Arrays: Benefits, Ingredients, Shades, Tags */}
        {(["benefits", "ingredients", "shades", "tags"] as (keyof Product)[]).map(
          (field) => (
            <div key={field}>
              <label className="block mb-1 font-semibold capitalize">{field}</label>
              {product[field].map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(field, i, e.target.value)
                    }
                    className="border p-2 rounded flex-grow"
                  />
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => removeFromArrayField(field, i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-primary hover:underline mb-4"
                onClick={() => addToArrayField(field)}
              >
                + Add {field.slice(0, -1)}
              </button>
            </div>
          )
        )}

        {/* Rating and Reviews */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Rating</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={product.rating}
              onChange={(e) => handleChange("rating", Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Reviews</label>
            <input
              type="number"
              min={0}
              value={product.reviews}
              onChange={(e) => handleChange("reviews", Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* In Stock & Featured */}
        <div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.inStock}
              onChange={(e) => handleChange("inStock", e.target.checked)}
              className="form-checkbox"
            />
            In Stock
          </label>
        </div>
        <div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.featured}
              onChange={(e) => handleChange("featured", e.target.checked)}
              className="form-checkbox"
            />
            Featured
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:opacity-90 transition"
        >
          Save Product
        </button>
      </form>

      {/* Products List */}
      <h2 className="text-2xl font-bold mb-6">Existing Products</h2>
      <ul>
        {products.map((p) => (
          <li
            key={p.id}
            className="border p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <strong>{p.name}</strong> - <em>{p.category}</em> - ${p.price}
            </div>
            <div>
              <button
                onClick={() => editProduct(p)}
                className="mr-4 text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductAdmin;
