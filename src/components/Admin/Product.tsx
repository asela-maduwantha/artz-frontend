import React, { useState, useEffect } from 'react';

// Define types
type CustomizationOption = {
  name: string;
  type: 'text' | 'dropdown' | 'color' | 'checkbox';
  description: string;
};

type CategoryMapType = {
  [key: string]: string[];
};

const Product: React.FC = () => {
  // Comprehensive category mapping
  const categoryMap: CategoryMapType = {
    'Handmade Jewelry': [
      'Necklaces', 'Bracelets', 'Earrings', 
      'Rings', 'Anklets'
    ],
    'Eco-Friendly Gift Items': [
      'Reusable Bags', 'Bamboo Products', 
      'Upcycled Decor', 'Natural Candles', 
      'Sustainable Kitchenware'
    ],
    'Personalized Keepsakes': [
      'Personalized Photo Frames', 
      'Customized Keychains', 
      'Engraved Wooden Plaques', 
      'Monogrammed Items', 
      'Memory Books'
    ]
  };

  // State with type annotations
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  
  const [mainCategory, setMainCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);
  
  const [isCustomizable, setIsCustomizable] = useState<boolean>(false);
  const [customizationOptions, setCustomizationOptions] = useState<CustomizationOption[]>([
    { name: '', type: 'text', description: '' }
  ]);

  // Update available subcategories when main category changes
  useEffect(() => {
    // Reset subcategory when main category changes
    setSubCategory('');
    
    // Set available subcategories based on selected main category
    if (mainCategory) {
      setAvailableSubCategories(categoryMap[mainCategory] || []);
    } else {
      setAvailableSubCategories([]);
    }
  }, [mainCategory]);

  // Typed handler for customization option changes
  const handleCustomizationChange = (
    index: number, 
    field: keyof CustomizationOption, 
    value: string
  ) => {
    const updatedOptions = [...customizationOptions];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value
    };
    setCustomizationOptions(updatedOptions);
  };

  // Add new customization option
  const addCustomizationOption = () => {
    setCustomizationOptions([
      ...customizationOptions, 
      { name: '', type: 'text', description: '' }
    ]);
  };

  // Remove customization option
  const removeCustomizationOption = (index: number) => {
    const updatedOptions = customizationOptions.filter((_, i) => i !== index);
    setCustomizationOptions(updatedOptions);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
      category: mainCategory,
      subCategory: subCategory,
      isCustomizable,
      customizationOptions: isCustomizable ? customizationOptions : []
    };
    console.log('Product Data:', productData);
    // Add your submission logic here
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Product Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Product Name</label>
            <input 
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Product Price</label>
            <input 
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter product price"
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Product Description</label>
          <textarea 
            className="w-full border rounded p-2"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Main Category</label>
            <select 
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Main Category</option>
              {Object.keys(categoryMap).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Sub Category</label>
            <select 
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full border rounded p-2"
              disabled={!mainCategory}
              required
            >
              <option value="">Select Sub Category</option>
              {availableSubCategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Customization Toggle */}
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox"
            checked={isCustomizable}
            onChange={(e) => setIsCustomizable(e.target.checked)}
            className="form-checkbox"
          />
          <label>Make Product Customizable</label>
        </div>

        {/* Customization Options */}
        {isCustomizable && (
          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Customization Options</h3>
            {customizationOptions.map((option, index) => (
              <div key={index} className="mb-4 p-3 border rounded bg-white">
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div>
                    <label className="block mb-2 font-medium">Option Name</label>
                    <input 
                      type="text"
                      value={option.name}
                      onChange={(e) => handleCustomizationChange(index, 'name', e.target.value)}
                      placeholder="Enter option name"
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Option Type</label>
                    <select
                      value={option.type}
                      onChange={(e) => handleCustomizationChange(index, 'type', e.target.value as CustomizationOption['type'])}
                      className="w-full border rounded p-2"
                    >
                      <option value="text">Text Input</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="color">Color Picker</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button 
                      type="button" 
                      onClick={() => removeCustomizationOption(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium">Option Description</label>
                  <textarea 
                    className="w-full border rounded p-2"
                    value={option.description}
                    onChange={(e) => handleCustomizationChange(index, 'description', e.target.value)}
                    placeholder="Enter option description"
                  />
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addCustomizationOption}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Customization Option
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;