import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const SellerProfile = () => {
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    storeName: "POTIONSHOP",
    storeLogoUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
    companyName: "ООО «Зелья и Эликсиры»",
    inn: "7743013902",
    ogrn: "1027739850962",
    address: "г. Москва, ул. Алхимическая, д. 15, оф. 301",
    taxRegime: "УСН доходы 6%",
    accountNumber: "40702810938000123456",
    bik: "044525225",
    bankName: "ПАО Сбербанк",
    corrAccount: "30101810400000000225",
  });

  const handleSave = (blockType: string, formData: any) => {
    setProfileData({ ...profileData, ...formData });
    setEditingBlock(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-black text-xl font-bold">А</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Александр Волков</h1>
          <p className="text-gray-600">admin@potionshop.ru</p>
        </div>
      </div>

      {/* Блок 1: Настройка карточки магазина */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Store" size={20} />
            Настройка карточки магазина
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setEditingBlock(editingBlock === "store" ? null : "store")
            }
          >
            <Icon name="Edit" size={16} className="mr-2" />
            {editingBlock === "store" ? "Отменить" : "Редактировать"}
          </Button>
        </CardHeader>
        <CardContent>
          {editingBlock === "store" ? (
            <StoreForm
              data={profileData}
              onSave={(data) => handleSave("store", data)}
            />
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Название магазина
                </Label>
                <p className="text-lg">{profileData.storeName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Логотип магазина
                </Label>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={profileData.storeLogoUrl}
                    alt="Логотип"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="text-sm text-gray-500">logo.png</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Блок 2: Юридические данные */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileText" size={20} />
            Юридические данные
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setEditingBlock(editingBlock === "legal" ? null : "legal")
            }
          >
            <Icon name="Edit" size={16} className="mr-2" />
            {editingBlock === "legal" ? "Отменить" : "Редактировать"}
          </Button>
        </CardHeader>
        <CardContent>
          {editingBlock === "legal" ? (
            <LegalForm
              data={profileData}
              onSave={(data) => handleSave("legal", data)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Название, как в реестре
                </Label>
                <p>{profileData.companyName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">ИНН</Label>
                <p>{profileData.inn}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  ОГРН/ОГРНИП
                </Label>
                <p>{profileData.ogrn}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Налоговый режим
                </Label>
                <p>{profileData.taxRegime}</p>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-600">
                  Адрес регистрации
                </Label>
                <p>{profileData.address}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Блок 3: Реквизиты для выплаты */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="CreditCard" size={20} />
            Реквизиты для выплаты безопасной сделки
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setEditingBlock(editingBlock === "payment" ? null : "payment")
            }
          >
            <Icon name="Edit" size={16} className="mr-2" />
            {editingBlock === "payment" ? "Отменить" : "Редактировать"}
          </Button>
        </CardHeader>
        <CardContent>
          {editingBlock === "payment" ? (
            <PaymentForm
              data={profileData}
              onSave={(data) => handleSave("payment", data)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Номер расчётного счёта
                </Label>
                <p>{profileData.accountNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">БИК</Label>
                <p>{profileData.bik}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Название банка
                </Label>
                <p>{profileData.bankName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Корреспондентский счёт
                </Label>
                <p>{profileData.corrAccount}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Форма настройки магазина
const StoreForm = ({
  data,
  onSave,
}: {
  data: any;
  onSave: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    storeName: data.storeName,
    storeLogoUrl: data.storeLogoUrl,
  });

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="storeName">Название магазина</Label>
        <Input
          id="storeName"
          value={formData.storeName}
          onChange={(e) =>
            setFormData({ ...formData, storeName: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="logo">Логотип магазина</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
      </div>
      <Button onClick={() => onSave(formData)}>Сохранить</Button>
    </div>
  );
};

// Форма юридических данных
const LegalForm = ({
  data,
  onSave,
}: {
  data: any;
  onSave: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    companyName: data.companyName,
    inn: data.inn,
    ogrn: data.ogrn,
    address: data.address,
    taxRegime: data.taxRegime,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">Название, как в реестре</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="inn">ИНН</Label>
          <Input
            id="inn"
            value={formData.inn}
            onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="ogrn">ОГРН/ОГРНИП</Label>
          <Input
            id="ogrn"
            value={formData.ogrn}
            onChange={(e) => setFormData({ ...formData, ogrn: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="taxRegime">Налоговый режим</Label>
          <Select
            value={formData.taxRegime}
            onValueChange={(value) =>
              setFormData({ ...formData, taxRegime: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="УСН доходы 6%">УСН доходы 6%</SelectItem>
              <SelectItem value="УСН доходы минус расходы 15%">
                УСН доходы минус расходы 15%
              </SelectItem>
              <SelectItem value="ОСНО">ОСНО</SelectItem>
              <SelectItem value="ПСН">ПСН</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="address">Адрес регистрации</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>
      <Button onClick={() => onSave(formData)}>Сохранить</Button>
    </div>
  );
};

// Форма реквизитов
const PaymentForm = ({
  data,
  onSave,
}: {
  data: any;
  onSave: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    accountNumber: data.accountNumber,
    bik: data.bik,
    bankName: data.bankName,
    corrAccount: data.corrAccount,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="accountNumber">Номер расчётного счёта</Label>
          <Input
            id="accountNumber"
            value={formData.accountNumber}
            onChange={(e) =>
              setFormData({ ...formData, accountNumber: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="bik">БИК</Label>
          <Input
            id="bik"
            value={formData.bik}
            onChange={(e) => setFormData({ ...formData, bik: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="bankName">Название банка</Label>
          <Input
            id="bankName"
            value={formData.bankName}
            onChange={(e) =>
              setFormData({ ...formData, bankName: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="corrAccount">Корреспондентский счёт</Label>
          <Input
            id="corrAccount"
            value={formData.corrAccount}
            onChange={(e) =>
              setFormData({ ...formData, corrAccount: e.target.value })
            }
          />
        </div>
      </div>
      <Button onClick={() => onSave(formData)}>Сохранить</Button>
    </div>
  );
};

export default SellerProfile;
