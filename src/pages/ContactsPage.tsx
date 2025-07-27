import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Контакты
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Icon name="MapPin" className="w-6 h-6 text-blue-600" />
                  <span>Наши офисы</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Главный офис</h4>
                  <p className="text-gray-600 mb-1">г. Москва, ул. Тверская, 15</p>
                  <p className="text-gray-600">БЦ "Центральный", этаж 10</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Региональный офис</h4>
                  <p className="text-gray-600 mb-1">г. Санкт-Петербург, Невский пр., 28</p>
                  <p className="text-gray-600">БЦ "Северная столица", этаж 5</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Icon name="Phone" className="w-6 h-6 text-green-600" />
                  <span>Телефоны</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Headphones" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Служба поддержки</p>
                    <p className="text-blue-600 font-mono">8 (800) 123-45-67</p>
                    <p className="text-sm text-gray-500">Круглосуточно, бесплатно</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Briefcase" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Отдел продаж</p>
                    <p className="text-blue-600 font-mono">+7 (495) 123-45-67</p>
                    <p className="text-sm text-gray-500">Пн-Пт: 9:00-18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Icon name="Mail" className="w-6 h-6 text-purple-600" />
                  <span>Электронная почта</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="HelpCircle" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Общие вопросы</p>
                    <a href="mailto:info@avito.ru" className="text-blue-600 hover:underline">
                      info@avito.ru
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Безопасность</p>
                    <a href="mailto:security@avito.ru" className="text-blue-600 hover:underline">
                      security@avito.ru
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Users" className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Партнерство</p>
                    <a href="mailto:partners@avito.ru" className="text-blue-600 hover:underline">
                      partners@avito.ru
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Icon name="MessageSquare" className="w-6 h-6 text-orange-600" />
                  <span>Социальные сети</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
                    Telegram
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Icon name="Phone" className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Icon name="Mail" className="w-4 h-4 mr-2" />
                    VK
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Icon name="Send" className="w-6 h-6 text-blue-600" />
                  <span>Напишите нам</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема сообщения *</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      placeholder="О чем хотите рассказать?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Подробно опишите ваш вопрос или предложение..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <Icon name="Info" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Время ответа</p>
                        <p>Мы отвечаем на все сообщения в течение 24 часов в рабочие дни.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" className="w-4 h-4 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Working Hours */}
        <Card className="border-0 shadow-lg mt-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <Icon name="Clock" className="w-6 h-6 text-green-600" />
              <span>Режим работы</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Icon name="Headphones" className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Служба поддержки</h4>
                <p className="text-green-700 font-medium">24/7</p>
                <p className="text-sm text-gray-600">Круглосуточно</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Icon name="Briefcase" className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Офисы</h4>
                <p className="text-blue-700 font-medium">Пн-Пт: 9:00-18:00</p>
                <p className="text-sm text-gray-600">Выходные: выходной</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Icon name="Mail" className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                <p className="text-purple-700 font-medium">Ответ в течение 24ч</p>
                <p className="text-sm text-gray-600">В рабочие дни</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactsPage;