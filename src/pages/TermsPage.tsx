import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Условия использования
          </h1>
          <p className="text-gray-600">
            Последнее обновление: 27 июля 2025 года
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="FileText" className="w-6 h-6 text-blue-600" />
                <span>Общие положения</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Настоящие Условия использования регулируют использование интернет-сервиса для 
                размещения объявлений о продаже товаров и услуг. Используя наш сервис, вы 
                соглашаетесь с данными условиями.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Globe" className="w-6 h-6 text-green-600" />
                <span>Описание сервиса</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Наш сервис предоставляет платформу для:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Icon name="ShoppingBag" className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-1">Продавцам</h4>
                    <p className="text-blue-800 text-sm">
                      Размещение объявлений, общение с покупателями, управление продажами
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <Icon name="Search" className="w-6 h-6 text-green-600 mb-2" />
                    <h4 className="font-semibold text-green-900 mb-1">Покупателям</h4>
                    <p className="text-green-800 text-sm">
                      Поиск товаров, связь с продавцами, безопасное совершение покупок
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="UserPlus" className="w-6 h-6 text-purple-600" />
                <span>Регистрация и аккаунт</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Требования к пользователям:</h4>
                <ul className="text-gray-700 space-y-2 ml-4">
                  <li>• Возраст не менее 18 лет или согласие родителей/опекунов</li>
                  <li>• Предоставление достоверной информации при регистрации</li>
                  <li>• Поддержание актуальности контактных данных</li>
                  <li>• Ответственность за безопасность учетной записи</li>
                </ul>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Icon name="AlertTriangle" className="w-5 h-5 text-yellow-600 mb-2" />
                  <p className="text-yellow-800 text-sm">
                    <strong>Важно:</strong> Один пользователь может иметь только один активный аккаунт. 
                    Создание множественных аккаунтов запрещено.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Obligations */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="CheckCircle" className="w-6 h-6 text-green-600" />
                <span>Обязанности пользователей</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Разрешено:</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>✓ Размещать честные и точные объявления</li>
                    <li>✓ Использовать собственные фотографии товаров</li>
                    <li>✓ Вежливо общаться с другими пользователями</li>
                    <li>✓ Соблюдать договоренности о встречах</li>
                    <li>✓ Оставлять честные отзывы</li>
                    <li>✓ Сообщать о нарушениях администрации</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Запрещено:</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>✗ Размещать запрещенные к продаже товары</li>
                    <li>✗ Использовать чужие фотографии без разрешения</li>
                    <li>✗ Создавать фальшивые объявления</li>
                    <li>✗ Заниматься мошенничеством</li>
                    <li>✗ Спамить и рассылать рекламу</li>
                    <li>✗ Нарушать права других пользователей</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Items */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Ban" className="w-6 h-6 text-red-600" />
                <span>Запрещенные товары и услуги</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <Icon name="Shield" className="w-6 h-6 text-red-600 mb-2" />
                  <h4 className="font-semibold text-red-900 mb-2">Опасные предметы</h4>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Оружие и боеприпасы</li>
                    <li>• Взрывчатые вещества</li>
                    <li>• Яды и токсины</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Icon name="AlertCircle" className="w-6 h-6 text-orange-600 mb-2" />
                  <h4 className="font-semibold text-orange-900 mb-2">Контрафакт</h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Поддельные товары</li>
                    <li>• Пиратские копии</li>
                    <li>• Нарушение авторских прав</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Icon name="UserX" className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-semibold text-purple-900 mb-2">Недопустимое</h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Наркотические средства</li>
                    <li>• Органы и ткани</li>
                    <li>• Интимные услуги</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payments and Fees */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="CreditCard" className="w-6 h-6 text-blue-600" />
                <span>Платежи и комиссии</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <Icon name="Gift" className="w-6 h-6 text-green-600 mb-2" />
                    <h4 className="font-semibold text-green-900 mb-2">Бесплатные услуги</h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Регистрация и базовое использование</li>
                      <li>• Размещение до 10 объявлений</li>
                      <li>• Общение с пользователями</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Icon name="Star" className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-2">Платные услуги</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Продвижение объявлений</li>
                      <li>• Дополнительные лимиты</li>
                      <li>• Премиум-функции</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>Важно:</strong> Все цены указываются с учетом НДС. Платежи обрабатываются 
                    через защищенные платежные системы. Возврат средств возможен в соответствии с 
                    нашей политикой возврата.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Scale" className="w-6 h-6 text-purple-600" />
                <span>Ответственность</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Ответственность платформы:</h4>
                  <p className="text-blue-800 text-sm">
                    Мы обеспечиваем работу платформы и безопасность данных, но не несем ответственности 
                    за качество товаров, честность сделок между пользователями или их действия.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Ответственность пользователей:</h4>
                  <p className="text-orange-800 text-sm">
                    Пользователи несут полную ответственность за размещаемый контент, соблюдение 
                    законодательства, качество товаров и выполнение обязательств по сделкам.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Violations and Sanctions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="AlertTriangle" className="w-6 h-6 text-red-600" />
                <span>Нарушения и санкции</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  При нарушении условий использования мы можем применить следующие меры:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Icon name="MessageSquare" className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Предупреждение</h4>
                        <p className="text-xs text-gray-600">За незначительные нарушения</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Временная блокировка</h4>
                        <p className="text-xs text-gray-600">От 1 дня до 1 месяца</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Icon name="Ban" className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Постоянная блокировка</h4>
                        <p className="text-xs text-gray-600">За серьезные нарушения</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Gavel" className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">Правовые меры</h4>
                        <p className="text-xs text-gray-600">При криминальных действиях</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="RefreshCw" className="w-6 h-6 text-blue-600" />
                <span>Изменения условий</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Мы оставляем за собой право изменять настоящие условия использования. О существенных 
                изменениях мы уведомим пользователей не менее чем за 30 дней. Продолжение использования 
                сервиса после внесения изменений означает согласие с новыми условиями.
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon name="Phone" className="w-6 h-6 text-green-600" />
                <span>Контактная информация</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 mb-3">
                  По вопросам, связанным с условиями использования, обращайтесь:
                </p>
                <div className="space-y-2">
                  <p className="text-green-700">
                    <strong>Email:</strong> legal@avito.ru
                  </p>
                  <p className="text-green-700">
                    <strong>Телефон:</strong> 8 (800) 123-45-67
                  </p>
                  <p className="text-green-700">
                    <strong>Адрес:</strong> г. Москва, ул. Тверская, 15, БЦ "Центральный"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;