import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cartStore';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotal, 
    getItemCount 
  } = useCartStore();

  const total = getTotal();
  const itemCount = getItemCount();
  const shipping = itemCount > 0 ? (total > 75 ? 0 : 9.99) : 0;
  const tax = total * 0.08; // 8% tax
  const grandTotal = total + shipping + tax;

  const handleQuantityChange = (id: string, currentQuantity: number, delta: number, shade?: string) => {
    const newQuantity = currentQuantity + delta;
    updateQuantity(id, newQuantity, shade);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
          <h1 className="font-luxury text-3xl font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Discover our beautiful collection of luxury cosmetics and start building your perfect beauty routine.
          </p>
          <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="font-luxury text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/products')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={`${item.id}-${item.shade || 'default'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 shadow-soft"
            >
              <div className="flex space-x-4">
                {/* Product Image */}
                <Link to={`/products/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg bg-muted hover:scale-105 transition-transform"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/products/${item.id}`}
                    className="block group"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {item.name}
                    </h3>
                  </Link>
                  {item.shade && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Shade: {item.shade}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">
                      ${item.price}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1, item.shade)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1, item.shade)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id, item.shade)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-right">
                    <p className="text-sm text-muted-foreground">
                      Subtotal: <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <div className="bg-card border border-border rounded-lg p-6 shadow-soft sticky top-24">
            <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                <span className="font-medium text-foreground">${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over $75
                </p>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              asChild
              className="w-full mt-6 bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Secure checkout powered by industry-leading encryption
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;