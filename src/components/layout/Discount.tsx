import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, DollarSign, ArrowRight } from 'lucide-react';
import { discountService, Discount } from '../../services/api/discountservice';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../common/CustomCard";

const DiscountCard = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const data = await discountService.getDiscounts();
        setDiscounts(data);
      } catch (error) {
        console.error('Error fetching discounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const handleApplyDiscount = (discountId: string, discountCode: string) => {
    navigate(`/shop?discountId=${discountId}&code=${discountCode}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800  mb-8 text-center">Available Discounts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((discount) => (
          <Card key={discount.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              
                <img
                  src='https://img.freepik.com/free-vector/realistic-three-dimensional-sales-background_23-2148961182.jpg?t=st=1734768402~exp=1734772002~hmac=2b9e420117dde95b55b0dbfb95798bd62ad5a454e0dfc87278d2278ddb42cdab&w=996'
                  alt={`${discount.code} discount`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              
              
              <CardTitle className="text-xl font-bold text-green-600">
                {discount.value}% OFF
              </CardTitle>
              <CardDescription className="text-sm font-medium text-gray-600">
                Code: {discount.code}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-gray-700">{discount.description}</p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>Valid until {formatDate(discount.end_date)}</span>
              </div>
              
              {discount.minimumPurchase && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign size={16} />
                  <span>Min. purchase: ${discount.minimumPurchase}</span>
                </div>
              )}
              
              {discount.maximumDiscount && (
                <p className="text-sm text-gray-600">
                  Max discount: ${discount.maximumDiscount}
                </p>
              )}
            </CardContent>

            <CardFooter>
              <button
                onClick={() => handleApplyDiscount(discount.id, discount.code)}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <span>Apply Discount</span>
                <ArrowRight size={16} />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscountCard;