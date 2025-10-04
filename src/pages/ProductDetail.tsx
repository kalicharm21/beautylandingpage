import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Heart, ArrowLeft, Check, Minus, Plus, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';
import productsData from '@/data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  
  const [selectedShade, setSelectedShade] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const product = productsData.find(p => p.id === id);

  useEffect(() => {
    if (product?.shades && product.shades.length > 0) {
      setSelectedShade(product.shades[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/products')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      shade: selectedShade || undefined,
    });

    toast({
      title: 'Added to cart!',
      description: `${product.name}${selectedShade ? ` in ${selectedShade}` : ''} has been added to your cart.`,
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
      >
        <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Main Image with Zoom */}
          <motion.div 
            className="relative aspect-square rounded-lg overflow-hidden bg-muted group cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={product.images[activeImageIndex]}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-110'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            {/* Zoom Indicator */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-4 w-4 text-foreground" />
              <span className="text-xs text-foreground">
                {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
              </span>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-xs text-foreground font-medium">
                {activeImageIndex + 1} / {product.images.length}
              </span>
            </div>
          </motion.div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveImageIndex(index);
                  setIsZoomed(false);
                }}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === index 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-transparent hover:border-muted-foreground/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {activeImageIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Free shipping on orders over $75</span>
            </div>
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.featured && <Badge className="bg-luxury text-luxury-foreground">Featured</Badge>}
              {discount > 0 && <Badge className="bg-destructive text-destructive-foreground">-{discount}%</Badge>}
            </div>
            <h1 className="font-luxury text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Shade Selection */}
          {product.shades && product.shades.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Shade: {selectedShade}
              </label>
              <Select value={selectedShade} onValueChange={setSelectedShade}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a shade" />
                </SelectTrigger>
                <SelectContent>
                  {product.shades.map((shade) => (
                    <SelectItem key={shade} value={shade}>
                      {shade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Quantity</label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-lg py-6"
              size="lg"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                <Check className="h-3 w-3" />
                <span>{tag}</span>
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16"
      >
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">About this product</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            {product.benefits && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Key Benefits:</h4>
                <ul className="space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ingredients" className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">{ingredient}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Customer Reviews</h3>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} out of 5 ({product.reviews} reviews)
                </span>
              </div>
            </div>
            
            {/* Mock Reviews */}
            <div className="space-y-4">
              {[
                { name: "Sarah M.", rating: 5, comment: "Absolutely love this product! The quality is amazing and it lasted all day." },
                { name: "Emma L.", rating: 4, comment: "Great color selection and smooth application. Highly recommend!" },
                { name: "Jessica K.", rating: 5, comment: "Perfect for my skin tone. Will definitely repurchase!" }
              ].map((review, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{review.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProductDetail;