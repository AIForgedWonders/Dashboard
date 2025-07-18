
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Zap, 
  Star, 
  Check, 
  X,
  Sparkles,
  Rocket,
  Shield,
  Users,
  Database,
  Clock,
  Target,
  Palette,
  Box,
  FileText,
  Music
} from "lucide-react";
import { toast } from "sonner";

export default function Upgrade() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      badge: "Current Plan",
      badgeColor: "bg-gray-600",
      icon: Star,
      features: [
        { text: "10 AI generations per month", included: true },
        { text: "Basic templates", included: true },
        { text: "Standard quality", included: true },
        { text: "Community support", included: true },
        { text: "Watermark on exports", included: true },
        { text: "Advanced AI models", included: false },
        { text: "Priority support", included: false },
        { text: "Team collaboration", included: false }
      ]
    },
    {
      name: "Pro",
      price: { monthly: 29, yearly: 290 },
      badge: "Most Popular",
      badgeColor: "bg-gradient-purple",
      icon: Zap,
      features: [
        { text: "1,000 AI generations per month", included: true },
        { text: "Premium templates", included: true },
        { text: "High quality outputs", included: true },
        { text: "Priority support", included: true },
        { text: "No watermarks", included: true },
        { text: "Advanced AI models", included: true },
        { text: "API access", included: true },
        { text: "Team collaboration (5 members)", included: true }
      ]
    },
    {
      name: "Enterprise",
      price: { monthly: 99, yearly: 990 },
      badge: "Best Value",
      badgeColor: "bg-gradient-to-r from-yellow-600 to-yellow-800",
      icon: Crown,
      features: [
        { text: "Unlimited AI generations", included: true },
        { text: "Custom templates", included: true },
        { text: "Ultra-high quality", included: true },
        { text: "24/7 dedicated support", included: true },
        { text: "White-label solutions", included: true },
        { text: "All AI models", included: true },
        { text: "Full API access", included: true },
        { text: "Unlimited team members", included: true }
      ]
    }
  ];

  const features = [
    {
      category: "AI Generation",
      icon: Sparkles,
      items: [
        { name: "Image Generation", free: "10/month", pro: "1,000/month", enterprise: "Unlimited" },
        { name: "Text Generation", free: "Basic", pro: "Advanced", enterprise: "Premium" },
        { name: "Audio Generation", free: "Limited", pro: "Full Access", enterprise: "Custom Models" },
        { name: "3D Generation", free: "❌", pro: "✅", enterprise: "✅ + Custom" }
      ]
    },
    {
      category: "Collaboration",
      icon: Users,
      items: [
        { name: "Team Members", free: "1", pro: "5", enterprise: "Unlimited" },
        { name: "Project Sharing", free: "❌", pro: "✅", enterprise: "✅" },
        { name: "Real-time Editing", free: "❌", pro: "✅", enterprise: "✅" },
        { name: "Version Control", free: "❌", pro: "Basic", enterprise: "Advanced" }
      ]
    },
    {
      category: "Storage & Export",
      icon: Database,
      items: [
        { name: "Cloud Storage", free: "1 GB", pro: "100 GB", enterprise: "1 TB" },
        { name: "Export Quality", free: "Standard", pro: "High", enterprise: "Ultra" },
        { name: "Bulk Export", free: "❌", pro: "✅", enterprise: "✅" },
        { name: "API Access", free: "❌", pro: "Limited", enterprise: "Full" }
      ]
    }
  ];

  const handleUpgrade = (planName: string) => {
    toast.success(`Upgrading to ${planName} plan...`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-100">Upgrade Your Plan</h1>
          <p className="text-xl text-purple-300">Unlock the full potential of AI-powered creativity</p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-purple-100' : 'text-purple-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-purple-600 rounded-full transition-colors"
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-purple-100' : 'text-purple-400'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <Badge className="bg-green-600 text-white">Save 17%</Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`bg-slate-800/50 border-purple-500/20 relative ${
              plan.name === 'Pro' ? 'border-purple-500 scale-105' : ''
            }`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={`${plan.badgeColor} text-white px-3 py-1`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4">
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-purple-100">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-purple-100">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-purple-400 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-purple-200' : 'text-gray-400'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => handleUpgrade(plan.name)}
                  className={`w-full mt-6 ${
                    plan.name === 'Free' 
                      ? 'bg-gray-600 hover:bg-gray-700' 
                      : plan.name === 'Pro'
                      ? 'bg-gradient-purple hover:opacity-90'
                      : 'bg-gradient-to-r from-yellow-600 to-yellow-800 hover:opacity-90'
                  }`}
                  disabled={plan.name === 'Free'}
                >
                  {plan.name === 'Free' ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-purple-100 text-center">Feature Comparison</h2>
          {features.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-slate-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        <th className="text-left py-2 text-purple-300">Feature</th>
                        <th className="text-center py-2 text-purple-300">Free</th>
                        <th className="text-center py-2 text-purple-300">Pro</th>
                        <th className="text-center py-2 text-purple-300">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b border-purple-500/10">
                          <td className="py-3 text-purple-200">{item.name}</td>
                          <td className="py-3 text-center text-purple-300">{item.free}</td>
                          <td className="py-3 text-center text-purple-300">{item.pro}</td>
                          <td className="py-3 text-center text-purple-300">{item.enterprise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-200">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-purple-100 mb-2">Can I change my plan anytime?</h4>
                <p className="text-sm text-purple-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h4 className="font-medium text-purple-100 mb-2">What happens to my projects if I downgrade?</h4>
                <p className="text-sm text-purple-400">Your projects remain accessible, but some premium features may be disabled until you upgrade again.</p>
              </div>
              <div>
                <h4 className="font-medium text-purple-100 mb-2">Is there a free trial for paid plans?</h4>
                <p className="text-sm text-purple-400">Yes, we offer a 14-day free trial for both Pro and Enterprise plans with full access to all features.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
