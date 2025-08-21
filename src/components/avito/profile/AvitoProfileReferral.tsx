import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { generateReferralLink, copyReferralLink } from "@/utils/referral";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  availableForWithdraw: number;
}

const AvitoProfileReferral = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState("");
  const [isCopying, setIsCopying] = useState(false);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    availableForWithdraw: 0
  });

  useEffect(() => {
    if (user?.id) {
      const link = generateReferralLink(user.id.toString());
      setReferralLink(link);
      
      // Mock stats - replace with real API call
      setStats({
        totalReferrals: 12,
        activeReferrals: 8,
        totalEarnings: 2450,
        pendingEarnings: 320,
        availableForWithdraw: 2130
      });
    }
  }, [user]);

  const handleCopyLink = async () => {
    setIsCopying(true);
    const success = await copyReferralLink(referralLink);
    
    if (success) {
      toast({
        title: "Ссылка скопирована!",
        description: "Реферальная ссылка успешно скопирована в буфер обмена",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive"
      });
    }
    
    setTimeout(() => setIsCopying(false), 1000);
  };

  const benefits = [
    {
      icon: "DollarSign",
      title: "500₽ за регистрацию",
      description: "Получайте деньги за каждого нового пользователя"
    },
    {
      icon: "TrendingUp",
      title: "5% с продаж",
      description: "Процент с каждой успешной продажи рефералов"
    },
    {
      icon: "Gift",
      title: "Бонусы за активность",
      description: "Дополнительные выплаты за активных пользователей"
    },
    {
      icon: "CreditCard",
      title: "Быстрые выплаты",
      description: "Выводите заработанные средства на карту или кошелек"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Поделитесь ссылкой",
      description: "Отправьте реферальную ссылку друзьям и знакомым"
    },
    {
      step: 2,
      title: "Пользователь регистрируется",
      description: "Когда кто-то зарегистрируется по вашей ссылке"
    },
    {
      step: 3,
      title: "Получите бонус",
      description: "Вы сразу получаете 500₽ на баланс"
    },
    {
      step: 4,
      title: "Зарабатывайте с продаж",
      description: "Получайте 5% с каждой продажи ваших рефералов"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-fit">
            <Icon name="Users" className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold gradient-text">
            Реферальная программа
          </CardTitle>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Приглашайте друзей и зарабатывайте на их активности! 
            Получайте до 5% с каждой их продажи.
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings Stats */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="TrendingUp" className="w-5 h-5 text-green-600" />
                <span>Статистика заработка</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.totalEarnings.toLocaleString()}₽
                  </div>
                  <div className="text-sm text-gray-600">Всего заработано</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.pendingEarnings.toLocaleString()}₽
                  </div>
                  <div className="text-sm text-gray-600">В ожидании</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.availableForWithdraw.toLocaleString()}₽
                  </div>
                  <div className="text-sm text-gray-600">Доступно к выводу</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.totalReferrals}
                  </div>
                  <div className="text-sm text-gray-600">Всего рефералов</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Активные рефералы</div>
                  <div className="font-semibold">{stats.activeReferrals} из {stats.totalReferrals}</div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700" disabled={stats.availableForWithdraw === 0}>
                  <Icon name="Download" className="w-4 h-4 mr-2" />
                  Вывести средства
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* How it works */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="HelpCircle" className="w-5 h-5 text-blue-600" />
                <span>Как это работает</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {howItWorks.map((item, index) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link & Benefits */}
        <div className="space-y-6">
          {/* Referral Link */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Link" className="w-5 h-5 text-blue-600" />
                <span>Ваша реферальная ссылка</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  disabled={isCopying}
                  className="px-3"
                >
                  {isCopying ? (
                    <Icon name="Check" className="w-4 h-4" />
                  ) : (
                    <Icon name="Copy" className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Icon name="MessageCircle" className="w-3 h-3 mr-1" />
                  Telegram
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Icon name="Share" className="w-3 h-3 mr-1" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Icon name="Facebook" className="w-3 h-3 mr-1" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Icon name="Twitter" className="w-3 h-3 mr-1" />
                  Twitter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Star" className="w-5 h-5 text-yellow-500" />
                <span>Преимущества программы</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                    <Icon name={benefit.icon as any} className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{benefit.title}</h4>
                    <p className="text-xs text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Special Offer */}
          <Card className="shadow-card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-center">
                <Badge className="mb-3 bg-yellow-500">Специальное предложение</Badge>
                <h3 className="font-bold text-gray-900 mb-2">Первые 10 рефералов</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Получайте 1000₽ вместо 500₽ за первых 10 приглашенных пользователей!
                </p>
                <div className="text-lg font-bold text-yellow-600">
                  До конца акции: 12 дней
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvitoProfileReferral;