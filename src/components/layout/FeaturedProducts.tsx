import { Heart } from "lucide-react";

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}


const FeaturedProducts: React.FC = () => {
  const featuredProducts: Product[] = [
    {
      name: 'Personalized Photo Frame',
      description: 'Custom pencil drawing framed in premium wood',
      price: 3500,
      image: 'https://img.freepik.com/free-vector/wedding-invitation-template_1340-147.jpg',
    },
    {
      name: 'Eco-Friendly Gift Hamper',
      description: 'Handcrafted sustainable gift box',
      price: 4500,
      image: 'https://img.freepik.com/free-photo/flat-lay-composition-flowers-with-copyspace_23-2148134775.jpg',
    },
    {
      name: 'Handmade Earrings',
      description: 'Natural materials, unique design',
      price: 2500,
      image: 'https://img.freepik.com/free-photo/top-view-essentials-bead-working-with-scissors_23-2148815798.jpg',
    },
  ];

  return (
    <div className="py-12 px-4 sm:py-16 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Featured Gifts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-64 object-cover rounded-md"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-lg font-bold">LKR {product.price.toLocaleString()}</span>
                <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center justify-center">
                  <Heart className="inline mr-2" size={20} />
                  <span>Add to Wishlist</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default  FeaturedProducts ;