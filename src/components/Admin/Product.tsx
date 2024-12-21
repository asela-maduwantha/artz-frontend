import React, { useEffect, useState } from 'react';
import { Package, Plus, Trash2, Upload } from 'lucide-react';
import {
  productService,
  ProductData,
  ProductFeature,
  CustomizationOption,
} from '../../services/api/productservice';

// Available icons for features
const availableIcons = [
  '👜',
  '💳',
  '📏',
  '✨',
  '🎨',
  '📦',
  '🎁',
  '🛍️',
  '💝',
  '🎯',
  '⭐',
  '🌟',
  '💫',
  '🌈',
  '🎨',
  '🎭',
  '🎪',
  '🎢',
  '🎡',
  '🎠',
];

type CategoryKey = keyof typeof categoryMap;

const categoryMap = {
  'Handmade Jewelry': ['Necklaces', 'Bracelets', 'Earrings', 'Rings', 'Anklets'],
  'Eco-Friendly Gift Items': [
    'Reusable Bags',
    'Bamboo Products',
    'Upcycled Decor',
    'Natural Candles',
    'Sustainable Kitchenware',
  ],
  'Personalized Keepsakes': [
    'Personalized Photo Frames',
    'Customized Keychains',
    'Engraved Wooden Plaques',
    'Monogrammed Items',
    'Memory Books',
  ],
};

const Product = () => {
  const [formData, setFormData] = useState<Partial<ProductData>>({
    name: '',
    description: '',
    price: 0,
    img_url: '',
    category: '',
    is_customizable: false,
    is_active: true,
    features: [],
    customization_options: [],
  });

  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle main category change
  const handleCategoryChange = (category: CategoryKey) => {
    setFormData((prev) => ({
      ...prev,
      category: category,
    }));
    setAvailableSubCategories(categoryMap[category] || []);
    console.log(availableSubCategories)
  };

  // Handle feature changes
  const handleFeatureChange = (index: number, field: keyof ProductFeature, value: string) => {
    const updatedFeatures = [...(formData.features || [])];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // Add new feature
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), { tag: '', description: '', icon: '✨' }],
    }));
  };

  // Remove feature
  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }));
  };

  // Handle customization option changes
  const handleCustomizationChange = (
    index: number,
    field: keyof CustomizationOption,
    value: any
  ) => {
    const updatedOptions = [...(formData.customization_options || [])];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, customization_options: updatedOptions }));
  };

  // Add new customization option
  const addCustomizationOption = () => {
    const newOption: CustomizationOption = {
      name: '',
      type: 'text',
      available_values: [],
      min_value: 0,
      max_value: 0,
      additional_price: 0,
      is_required: false,
    };
    setFormData((prev) => ({
      ...prev,
      customization_options: [...(prev.customization_options || []), newOption],
    }));
  };

  // Remove customization option
  const removeCustomizationOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customization_options: (prev.customization_options || []).filter((_, i) => i !== index),
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset");

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        
        if (response.ok) {
          setFormData((prev) => ({
            ...prev,
            img_url: data.secure_url,
          }));
        } else {
          console.error("Upload failed", data.error);
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup preview URL when component unmounts
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productService.createProduct(formData as ProductData);
      // Handle success (e.g., show toast, redirect)
    } catch (error) {
      // Handle error (e.g., show toast)
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center space-x-2">
        <Package className="text-emerald-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">Product Image</label>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {imagePreview || formData.img_url ? (
            <div className="relative">
              <img
                src={imagePreview || formData.img_url}
                alt="Preview"
                className="h-32 w-32 rounded-lg object-cover"
              />
              {imagePreview && !formData.img_url && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 text-center text-xs text-white">
                  Uploading...
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
              <Upload className="text-gray-400" size={24} />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer rounded-md bg-emerald-50 px-4 py-2 text-emerald-600 hover:bg-emerald-100"
          >
            Choose Image
          </label>
          {imagePreview && !formData.img_url && (
            <p className="text-sm text-gray-500">Image selected, uploading to server...</p>
          )}
        </div>
      </div>
    </div>


        {/* Category Selection */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value as CategoryKey)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
              required
            >
              <option value="">Select Category</option>
              {Object.keys(categoryMap).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Features */}
        <div className="rounded-lg border bg-gray-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Product Features</h3>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
            >
              <Plus size={16} />
              <span>Add Feature</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.features?.map((feature, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 md:grid-cols-3"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Feature Tag
                  </label>
                  <input
                    type="text"
                    value={feature.tag}
                    onChange={(e) => handleFeatureChange(index, 'tag', e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Icon</label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={feature.icon}
                      onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2"
                    >
                      {availableIcons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Options */}
        <div className="rounded-lg border bg-gray-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Customization Options</h3>
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_customizable}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, is_customizable: e.target.checked }))
                  }
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Enable customization</span>
              </div>
            </div>
            {formData.is_customizable && (
              <button
                type="button"
                onClick={addCustomizationOption}
                className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
              >
                <Plus size={16} />
                <span>Add Option</span>
              </button>
            )}
          </div>

          {formData.is_customizable && (
            <div className="space-y-4">
              {formData.customization_options?.map((option, index) => (
                <div key={index} className="space-y-4 rounded-lg bg-white p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Option Name
                      </label>
                      <input
                        type="text"
                        value={option.name}
                        onChange={(e) => handleCustomizationChange(index, 'name', e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Option Type
                      </label>
                      <select
                        value={option.type}
                        onChange={(e) => handleCustomizationChange(index, 'type', e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2"
                        required
                      >
                        <option value="text">Text Input</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="color">Color Picker</option>
                        <option value="number">Number Input</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Additional Price
                      </label>
                      <input
                        type="number"
                        value={option.additional_price}
                        onChange={(e) =>
                          handleCustomizationChange(
                            index,
                            'additional_price',
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-md border border-gray-300 p-2"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {(option.type === 'text' || option.type === 'number') && (
                      <>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Minimum Value
                          </label>
                          <input
                            type="number"
                            value={option.min_value}
                            onChange={(e) =>
                              handleCustomizationChange(index, 'min_value', Number(e.target.value))
                            }
                            className="w-full rounded-md border border-gray-300 p-2"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Maximum Value
                          </label>
                          <input
                            type="number"
                            value={option.max_value}
                            onChange={(e) =>
                              handleCustomizationChange(index, 'max_value', Number(e.target.value))
                            }
                            className="w-full rounded-md border border-gray-300 p-2"
                            min="0"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Available Values
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.available_values.map((value, valueIndex) => (
                        <div
                          key={valueIndex}
                          className="flex items-center rounded bg-gray-100 px-3 py-1"
                        >
                          <span>{value}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newValues = [...option.available_values];
                              newValues.splice(valueIndex, 1);
                              handleCustomizationChange(index, 'available_values', newValues);
                            }}
                            className="ml-2 text-red-500 hover:text-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder="Add value and press Enter"
                        className="rounded-md border border-gray-300 p-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const value = input.value.trim();
                            if (value) {
                              handleCustomizationChange(index, 'available_values', [
                                ...option.available_values,
                                value,
                              ]);
                              input.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={option.is_required}
                        onChange={(e) =>
                          handleCustomizationChange(index, 'is_required', e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">Required option</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCustomizationOption(index)}
                      className="flex items-center space-x-1 text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                      <span>Remove Option</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
            className="rounded text-emerald-600"
          />
          <label className="text-sm text-gray-700">Make product active and visible in store</label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="flex items-center space-x-2 rounded-lg bg-emerald-600 px-6 py-2 text-white transition-colors duration-200 hover:bg-emerald-700"
          >
            <Package size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
