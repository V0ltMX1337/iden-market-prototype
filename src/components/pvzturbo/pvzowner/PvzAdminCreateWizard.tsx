import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

type Status = "На проверке";

interface OwnerInfo {
  fullName: string;
  inn: string;
  phone: string;
  email: string;
}

interface Requisites {
  ogrn: string;
  legalAddress: string;
  bankName: string;
  bik: string;
  accountNumber: string;
}

interface PvzAddress {
  city: string;
  street: string;
  house: string;
  postalCode: string;
}

interface PvzSettings {
  workHours: string;
  notes: string;
}

export default function PvzAdminCreateWizard() {
  const [step, setStep] = useState(1);

  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo>({ fullName: "", inn: "", phone: "", email: "" });
  const [requisites, setRequisites] = useState<Requisites>({ ogrn: "", legalAddress: "", bankName: "", bik: "", accountNumber: "" });
  const [pvzAddress, setPvzAddress] = useState<PvzAddress>({ city: "", street: "", house: "", postalCode: "" });
  const [pvzSettings, setPvzSettings] = useState<PvzSettings>({ workHours: "", notes: "" });

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!ownerInfo.fullName.trim()) newErrors.fullName = "Введите ФИО";
      if (!/^\d{10,12}$/.test(ownerInfo.inn)) newErrors.inn = "ИНН должен содержать 10 или 12 цифр";
      if (!/^\+?\d{10,15}$/.test(ownerInfo.phone.replace(/\s+/g, ""))) newErrors.phone = "Введите корректный номер";
      if (!/\S+@\S+\.\S+/.test(ownerInfo.email)) newErrors.email = "Введите корректный email";
    } else if (step === 2) {
      if (!/^\d{13}$/.test(requisites.ogrn)) newErrors.ogrn = "ОГРН должен содержать 13 цифр";
      if (!requisites.legalAddress) newErrors.legalAddress = "Введите адрес";
      if (!requisites.bankName) newErrors.bankName = "Введите название банка";
      if (!/^\d{9}$/.test(requisites.bik)) newErrors.bik = "БИК должен содержать 9 цифр";
      if (!/^\d{20}$/.test(requisites.accountNumber)) newErrors.accountNumber = "Счёт должен содержать 20 цифр";
    } else if (step === 3) {
      if (!pvzAddress.city) newErrors.city = "Введите город";
      if (!pvzAddress.street) newErrors.street = "Введите улицу";
      if (!pvzAddress.house) newErrors.house = "Введите дом";
      if (!/^\d{6}$/.test(pvzAddress.postalCode)) newErrors.postalCode = "Почтовый индекс — 6 цифр";
    } else if (step === 4) {
      if (!pvzSettings.workHours) newErrors.workHours = "Укажите часы работы";
      if (!coordinates) newErrors.coordinates = "Укажите точку на карте";
      if (!photo) newErrors.photo = "Загрузите фото ПВЗ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
      setErrors({});
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    if (validateStep()) {
      const formData = new FormData();
      formData.append("owner", JSON.stringify(ownerInfo));
      formData.append("requisites", JSON.stringify(requisites));
      formData.append("address", JSON.stringify(pvzAddress));
      formData.append("settings", JSON.stringify(pvzSettings));
      formData.append("coordinates", JSON.stringify(coordinates));
      if (photo) formData.append("photo", photo);

      alert("Данные успешно отправлены!");
      // здесь можно делать fetch('/api/pvz', { method: 'POST', body: formData })
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Создание ПВЗ</h1>

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Владелец</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="ФИО" value={ownerInfo.fullName} onChange={(e) => setOwnerInfo({ ...ownerInfo, fullName: e.target.value })} />
            {errors.fullName && <p className="text-red-600">{errors.fullName}</p>}
            <Input placeholder="ИНН" value={ownerInfo.inn} onChange={(e) => setOwnerInfo({ ...ownerInfo, inn: e.target.value })} />
            {errors.inn && <p className="text-red-600">{errors.inn}</p>}
            <Input placeholder="Телефон" value={ownerInfo.phone} onChange={(e) => setOwnerInfo({ ...ownerInfo, phone: e.target.value })} />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
            <Input placeholder="Email" value={ownerInfo.email} onChange={(e) => setOwnerInfo({ ...ownerInfo, email: e.target.value })} />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Реквизиты</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="ОГРН" value={requisites.ogrn} onChange={(e) => setRequisites({ ...requisites, ogrn: e.target.value })} />
            {errors.ogrn && <p className="text-red-600">{errors.ogrn}</p>}
            <Input placeholder="Юридический адрес" value={requisites.legalAddress} onChange={(e) => setRequisites({ ...requisites, legalAddress: e.target.value })} />
            {errors.legalAddress && <p className="text-red-600">{errors.legalAddress}</p>}
            <Input placeholder="Банк" value={requisites.bankName} onChange={(e) => setRequisites({ ...requisites, bankName: e.target.value })} />
            {errors.bankName && <p className="text-red-600">{errors.bankName}</p>}
            <Input placeholder="БИК" value={requisites.bik} onChange={(e) => setRequisites({ ...requisites, bik: e.target.value })} />
            {errors.bik && <p className="text-red-600">{errors.bik}</p>}
            <Input placeholder="Счёт" value={requisites.accountNumber} onChange={(e) => setRequisites({ ...requisites, accountNumber: e.target.value })} />
            {errors.accountNumber && <p className="text-red-600">{errors.accountNumber}</p>}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Адрес ПВЗ</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Город" value={pvzAddress.city} onChange={(e) => setPvzAddress({ ...pvzAddress, city: e.target.value })} />
            {errors.city && <p className="text-red-600">{errors.city}</p>}
            <Input placeholder="Улица" value={pvzAddress.street} onChange={(e) => setPvzAddress({ ...pvzAddress, street: e.target.value })} />
            {errors.street && <p className="text-red-600">{errors.street}</p>}
            <Input placeholder="Дом" value={pvzAddress.house} onChange={(e) => setPvzAddress({ ...pvzAddress, house: e.target.value })} />
            {errors.house && <p className="text-red-600">{errors.house}</p>}
            <Input placeholder="Почтовый индекс" value={pvzAddress.postalCode} onChange={(e) => setPvzAddress({ ...pvzAddress, postalCode: e.target.value })} />
            {errors.postalCode && <p className="text-red-600">{errors.postalCode}</p>}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader><CardTitle>Дополнительно</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Часы работы" value={pvzSettings.workHours} onChange={(e) => setPvzSettings({ ...pvzSettings, workHours: e.target.value })} />
            {errors.workHours && <p className="text-red-600">{errors.workHours}</p>}
            <Input placeholder="Примечания" value={pvzSettings.notes} onChange={(e) => setPvzSettings({ ...pvzSettings, notes: e.target.value })} />

            <div>
              <label className="block font-medium mb-1">Фото ПВЗ</label>
              <Input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
              {errors.photo && <p className="text-red-600">{errors.photo}</p>}
              {photo && <img src={URL.createObjectURL(photo)} alt="preview" className="mt-2 max-h-48" />}
            </div>

            <div>
              <label className="block font-medium mb-1">Отметьте ПВЗ на карте</label>
              <YMaps>
                <Map
                  defaultState={{ center: [55.75, 37.57], zoom: 10 }}
                  width="100%" height="300px"
                  onClick={(e: any) => setCoordinates(e.get('coords'))}
                >
                  {coordinates && <Placemark geometry={coordinates} />}
                </Map>
              </YMaps>
              {errors.coordinates && <p className="text-red-600">{errors.coordinates}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader><CardTitle>Подтверждение</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p><strong>ФИО:</strong> {ownerInfo.fullName}</p>
            <p><strong>ИНН:</strong> {ownerInfo.inn}</p>
            <p><strong>Email:</strong> {ownerInfo.email}</p>
            <p><strong>Адрес:</strong> {pvzAddress.city}, {pvzAddress.street}, {pvzAddress.house}</p>
            <p><strong>Часы работы:</strong> {pvzSettings.workHours}</p>
            <p><strong>Фото:</strong> {photo?.name}</p>
            <p><strong>Координаты:</strong> {coordinates?.join(", ")}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && <Button variant="outline" onClick={prevStep}>Назад</Button>}
        {step < 5 && <Button onClick={nextStep}>Далее</Button>}
        {step === 5 && <Button onClick={handleSubmit} className="ml-auto">Создать ПВЗ</Button>}
      </div>
    </div>
  );
}
