import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Coins, 
  TrendingUp, 
  ArrowUpRight,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Bitcoin,
  Wallet,
  Star,
  Gift,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface PaymentPackage {
  id: number;
  name: string;
  usdAmount: number;
  sbetAmount: number;
  bonus: number;
  popular?: boolean;
  description: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: 'crypto' | 'card' | 'bank';
  available: boolean;
  processingTime: string;
  fees: string;
}

const BuyToken = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedPackage, setSelectedPackage] = useState<number>(2);
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Token packages
  const packages: PaymentPackage[] = [
    {
      id: 1,
      name: 'Starter Pack',
      usdAmount: 50,
      sbetAmount: 5000,
      bonus: 0,
      description: 'Perfect for beginners'
    },
    {
      id: 2,
      name: 'Popular Pack',
      usdAmount: 100,
      sbetAmount: 11000,
      bonus: 10,
      popular: true,
      description: 'Most chosen package'
    },
    {
      id: 3,
      name: 'Pro Pack',
      usdAmount: 250,
      sbetAmount: 30000,
      bonus: 20,
      description: 'For serious predictors'
    },
    {
      id: 4,
      name: 'VIP Pack',
      usdAmount: 500,
      sbetAmount: 65000,
      bonus: 30,
      description: 'Maximum value package'
    }
  ];

  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-5 w-5" />,
      type: 'card',
      available: true,
      processingTime: 'Instant',
      fees: '2.9% + $0.30'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Bitcoin className="h-5 w-5" />,
      type: 'crypto',
      available: true,
      processingTime: '10-30 min',
      fees: 'Network fees only'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Wallet className="h-5 w-5" />,
      type: 'bank',
      available: false,
      processingTime: '1-3 days',
      fees: 'No fees'
    }
  ];

  // Get user profile
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['buy-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Get purchase history
  const { data: purchaseHistory = [] } = useQuery({
    queryKey: ['purchase-history', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .eq('transaction_type', 'purchase')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.log('Transaction history not available');
        return [];
      }

      return data || [];
    },
    enabled: !!user,
  });

  // Purchase mutation
  const purchaseMutation = useMutation({
    mutationFn: async ({ packageId, amount, method }: { 
      packageId?: number; 
      amount?: number; 
      method: string; 
    }) => {
      if (!user) throw new Error('User not authenticated');

      let purchaseAmount: number;
      let sbetAmount: number;
      let bonus = 0;

      if (packageId) {
        const pkg = packages.find(p => p.id === packageId);
        if (!pkg) throw new Error('Invalid package selected');
        
        purchaseAmount = pkg.usdAmount;
        sbetAmount = pkg.sbetAmount;
        bonus = pkg.bonus;
      } else if (amount && amount > 0) {
        purchaseAmount = amount;
        sbetAmount = amount * 100; // 1 USD = 100 SBET base rate
        // Calculate bonus based on amount
        if (amount >= 500) bonus = 30;
        else if (amount >= 250) bonus = 20;
        else if (amount >= 100) bonus = 10;
        else bonus = 0;
        
        if (bonus > 0) {
          sbetAmount = sbetAmount * (1 + bonus / 100);
        }
      } else {
        throw new Error('Invalid purchase amount');
      }

      // Simulate payment processing based on method
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (method === 'card') {
        // Simulate card processing
        const success = Math.random() > 0.1; // 90% success rate
        if (!success) throw new Error('Payment failed. Please try again.');
      }

      // Record transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          transaction_type: 'purchase',
          amount: sbetAmount,
          description: `Purchased ${sbetAmount.toLocaleString()} SBET for $${purchaseAmount} (${bonus}% bonus)`
        });

      if (transactionError) throw transactionError;

      // Update token balance
      const { error: balanceError } = await supabase.rpc('update_token_balance', {
        user_id: user.id,
        amount_change: sbetAmount
      });

      if (balanceError) throw balanceError;

      return { purchaseAmount, sbetAmount, bonus };
    },
    onSuccess: (result) => {
      toast.success(
        `Successfully purchased ${result.sbetAmount.toLocaleString()} SBET for $${result.purchaseAmount}!`
      );
      setCustomAmount('');
      queryClient.invalidateQueries({ queryKey: ['buy-profile'] });
      queryClient.invalidateQueries({ queryKey: ['purchase-history'] });
      refetchProfile();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Purchase failed');
    },
  });

  const selectedPackageData = packages.find(p => p.id === selectedPackage);
  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);

  const handlePurchase = async () => {
    if (!selectedPaymentMethod?.available) {
      toast.error('Selected payment method is not available');
      return;
    }

    setIsProcessing(true);
    
    try {
      if (customAmount) {
        await purchaseMutation.mutateAsync({
          amount: parseFloat(customAmount),
          method: selectedMethod
        });
      } else if (selectedPackageData) {
        await purchaseMutation.mutateAsync({
          packageId: selectedPackage,
          method: selectedMethod
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateSbetAmount = (usd: number) => {
    let sbet = usd * 100; // Base rate: 1 USD = 100 SBET
    let bonus = 0;
    
    if (usd >= 500) bonus = 30;
    else if (usd >= 250) bonus = 20;
    else if (usd >= 100) bonus = 10;
    
    if (bonus > 0) {
      sbet = sbet * (1 + bonus / 100);
    }
    
    return { sbet: Math.floor(sbet), bonus };
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Buy SBET Tokens</h1>
          <p className="text-gray-400">Purchase SBET tokens to start making predictions</p>
        </div>

        {/* Current Balance */}
        <Card className="bg-gradient-to-r from-sportbet-blue to-sportbet-green mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Current Balance</p>
                <p className="text-3xl font-bold text-white">
                  {profile?.token_balance?.toLocaleString() || 0} SBET
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Estimated Value</p>
                <p className="text-xl font-semibold text-white">
                  ${((profile?.token_balance || 0) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchase Options */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="packages" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-sportbet-gray">
                <TabsTrigger value="packages">Token Packages</TabsTrigger>
                <TabsTrigger value="custom">Custom Amount</TabsTrigger>
              </TabsList>

              <TabsContent value="packages">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <Card 
                      key={pkg.id}
                      className={`cursor-pointer transition-all relative ${
                        selectedPackage === pkg.id 
                          ? 'border-sportbet-blue bg-sportbet-blue/10' 
                          : 'border-sportbet-light-gray hover:border-sportbet-blue/50'
                      } ${pkg.popular ? 'ring-2 ring-sportbet-green' : ''}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-sportbet-green text-white px-3 py-1">
                            <Star className="h-3 w-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                          <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                          
                          <div className="mb-4">
                            <div className="text-3xl font-bold text-sportbet-blue">
                              ${pkg.usdAmount}
                            </div>
                            <div className="text-gray-400 text-sm">USD</div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Base Amount:</span>
                              <span className="text-white">{(pkg.usdAmount * 100).toLocaleString()} SBET</span>
                            </div>
                            {pkg.bonus > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Bonus ({pkg.bonus}%):</span>
                                <span className="text-sportbet-green">
                                  +{(pkg.usdAmount * 100 * pkg.bonus / 100).toLocaleString()} SBET
                                </span>
                              </div>
                            )}
                            <div className="border-t border-gray-600 pt-2">
                              <div className="flex justify-between font-bold">
                                <span className="text-white">Total:</span>
                                <span className="text-sportbet-blue">{pkg.sbetAmount.toLocaleString()} SBET</span>
                              </div>
                            </div>
                          </div>

                          {pkg.bonus > 0 && (
                            <div className="flex items-center justify-center text-sportbet-green text-sm">
                              <Gift className="h-4 w-4 mr-1" />
                              {pkg.bonus}% Bonus Included
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom">
                <Card className="bg-sportbet-gray border-sportbet-light-gray">
                  <CardHeader>
                    <CardTitle className="text-white">Custom Amount</CardTitle>
                    <CardDescription>Enter any amount you want to purchase</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Amount (USD)</label>
                      <Input
                        type="number"
                        placeholder="Enter amount in USD"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="bg-sportbet-dark border-gray-600 text-white text-lg"
                        min="10"
                        max="10000"
                      />
                      <p className="text-xs text-gray-400 mt-1">Minimum: $10, Maximum: $10,000</p>
                    </div>

                    {customAmount && !isNaN(parseFloat(customAmount)) && parseFloat(customAmount) >= 10 && (
                      <div className="p-4 bg-sportbet-dark rounded-lg space-y-3">
                        <h4 className="text-white font-medium">Purchase Preview</h4>
                        
                        {(() => {
                          const { sbet, bonus } = calculateSbetAmount(parseFloat(customAmount));
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">USD Amount:</span>
                                <span className="text-white">${parseFloat(customAmount).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Base SBET:</span>
                                <span className="text-white">{(parseFloat(customAmount) * 100).toLocaleString()}</span>
                              </div>
                              {bonus > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Bonus ({bonus}%):</span>
                                  <span className="text-sportbet-green">
                                    +{(parseFloat(customAmount) * 100 * bonus / 100).toLocaleString()}
                                  </span>
                                </div>
                              )}
                              <div className="border-t border-gray-600 pt-2">
                                <div className="flex justify-between font-bold">
                                  <span className="text-white">Total SBET:</span>
                                  <span className="text-sportbet-blue">{sbet.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Exchange Rate:</span>
                                <span className="text-white">1 USD = {(sbet / parseFloat(customAmount)).toFixed(0)} SBET</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Payment Methods */}
            <Card className="bg-sportbet-gray border-sportbet-light-gray mt-6">
              <CardHeader>
                <CardTitle className="text-white">Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <Card 
                      key={method.id}
                      className={`cursor-pointer transition-all ${
                        selectedMethod === method.id 
                          ? 'border-sportbet-blue bg-sportbet-blue/10' 
                          : 'border-sportbet-light-gray hover:border-sportbet-blue/50'
                      } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => method.available && setSelectedMethod(method.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="flex justify-center mb-3 text-sportbet-blue">
                          {method.icon}
                        </div>
                        <h4 className="text-white font-medium mb-2">{method.name}</h4>
                        <div className="space-y-1 text-xs text-gray-400">
                          <p>⏱️ {method.processingTime}</p>
                          <p>💳 {method.fees}</p>
                        </div>
                        {!method.available && (
                          <Badge className="mt-2 bg-gray-600 text-gray-300">
                            Coming Soon
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Purchase Button */}
            <div className="mt-6">
              <Button
                onClick={handlePurchase}
                disabled={
                  isProcessing || 
                  purchaseMutation.isPending ||
                  !selectedPaymentMethod?.available ||
                  (!selectedPackageData && (!customAmount || parseFloat(customAmount) < 10))
                }
                className="w-full bg-gradient-to-r from-sportbet-blue to-sportbet-green hover:from-sportbet-blue/80 hover:to-sportbet-green/80 py-3 text-lg font-semibold"
              >
                {isProcessing || purchaseMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Zap className="h-5 w-5 mr-2" />
                    {customAmount ? 
                      `Purchase ${calculateSbetAmount(parseFloat(customAmount || '0')).sbet.toLocaleString()} SBET for $${customAmount}` :
                      `Purchase ${selectedPackageData?.sbetAmount.toLocaleString()} SBET for $${selectedPackageData?.usdAmount}`
                    }
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Purchase Summary & History */}
          <div className="space-y-6">
            {/* Purchase Summary */}
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white">Purchase Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {customAmount && parseFloat(customAmount) >= 10 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">${parseFloat(customAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SBET Tokens:</span>
                      <span className="text-sportbet-blue">
                        {calculateSbetAmount(parseFloat(customAmount)).sbet.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bonus:</span>
                      <span className="text-sportbet-green">
                        {calculateSbetAmount(parseFloat(customAmount)).bonus}%
                      </span>
                    </div>
                  </div>
                ) : selectedPackageData ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Package:</span>
                      <span className="text-white">{selectedPackageData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">${selectedPackageData.usdAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SBET Tokens:</span>
                      <span className="text-sportbet-blue">{selectedPackageData.sbetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bonus:</span>
                      <span className="text-sportbet-green">{selectedPackageData.bonus}%</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">Select a package or enter amount</p>
                )}

                <div className="border-t border-gray-600 mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method:</span>
                    <span className="text-white">{selectedPaymentMethod?.name || 'Not selected'}</span>
                  </div>
                  {selectedPaymentMethod && (
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-400">Processing Time:</span>
                      <span className="text-white">{selectedPaymentMethod.processingTime}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Purchase History */}
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white">Recent Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                {purchaseHistory.length > 0 ? (
                  <div className="space-y-3">
                    {purchaseHistory.slice(0, 5).map((purchase, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-sportbet-dark rounded">
                        <div>
                          <p className="text-white text-sm font-medium">
                            {purchase.amount?.toLocaleString() || 0} SBET
                          </p>
                          <p className="text-gray-400 text-xs">
                            {new Date(purchase.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <CheckCircle className="h-4 w-4 text-sportbet-green" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Coins className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm">No purchases yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Token Info */}
            <Card className="bg-sportbet-gray border-sportbet-light-gray">
              <CardHeader>
                <CardTitle className="text-white">About SBET Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-sportbet-green mr-2 mt-0.5" />
                    <span className="text-gray-300">
                      Use tokens to purchase sports predictions
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-sportbet-green mr-2 mt-0.5" />
                    <span className="text-gray-300">
                      Stake tokens to earn passive rewards
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-sportbet-green mr-2 mt-0.5" />
                    <span className="text-gray-300">
                      Higher amounts get bonus tokens
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-sportbet-green mr-2 mt-0.5" />
                    <span className="text-gray-300">
                      Secure blockchain-based transactions
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyToken; 