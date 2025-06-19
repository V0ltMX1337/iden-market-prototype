import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

interface StaffData {
  photoUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  rate: string;
  bio: string;
  dob: string;
  hired: string;
  isTemp: boolean;
  oftenReplaces: boolean;
  problematic: boolean;
  newbie: boolean;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  rate?: string;
  bio?: string;
  dob?: string;
  hired?: string;
}

export default function PvzOwnerEditStaff() {
  const { staffId } = useParams<{ staffId: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<StaffData>({
    photoUrl: "",
    firstName: "",
    lastName: "",
    phone: "",
    rate: "",
    bio: "",
    dob: "",
    hired: "",
    isTemp: false,
    oftenReplaces: false,
    problematic: false,
    newbie: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [mounted, setMounted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
    if (staffId) {
      // TODO: загрузка данных по staffId
    }
  }, [staffId]);

  const handleChange = (key: keyof StaffData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!data.firstName || data.firstName.trim().length < 2) {
      newErrors.firstName = "Введите имя минимум 2 символа";
    }

    if (!data.lastName || data.lastName.trim().length < 2) {
      newErrors.lastName = "Введите фамилию минимум 2 символа";
    }

    if (!data.phone || !/^\d{10,}$/.test(data.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Введите корректный телефон (минимум 10 цифр)";
    }

    if (!data.rate || isNaN(Number(data.rate)) || Number(data.rate) <= 0) {
      newErrors.rate = "Введите положительную ставку";
    }

    if (data.bio && data.bio.length > 500) {
      newErrors.bio = "Характеристика не может быть длиннее 500 символов";
    }

    const today = new Date();
    if (data.dob) {
      const dobDate = new Date(data.dob);
      if (isNaN(dobDate.getTime())) {
        newErrors.dob = "Неверная дата рождения";
      } else if (dobDate > today) {
        newErrors.dob = "Дата рождения не может быть в будущем";
      }
    }

    if (data.hired) {
      const hiredDate = new Date(data.hired);
      if (isNaN(hiredDate.getTime())) {
        newErrors.hired = "Неверная дата устройства";
      } else if (hiredDate > today) {
        newErrors.hired = "Дата устройства не может быть в будущем";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    // TODO: отправка на сервер
    navigate(-1);
  };

  // Обработка выбора фото
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Можно добавить проверку формата/размера
      const reader = new FileReader();
      reader.onload = () => {
        setData((prev) => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`flex w-full h-full px-4 py-6 transition-opacity duration-500 ease-in-out ${
        mounted ? "opacity-100" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Левая колонка */}
      <div className="flex flex-col w-[280px] mr-8 space-y-6">
        {/* Блок 1: Персонал (в отдельном выделенном Card) */}
        <Card>
          <CardContent className="flex flex-col items-center cursor-pointer" onClick={handlePhotoClick} aria-label="Изменить фото сотрудника" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePhotoClick(); }}>
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden relative">
              {data.photoUrl ? (
                <img
                  src={data.photoUrl}
                  alt="Фото сотрудника"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Нет фото
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-tr rounded-bl select-none">
                Изменить
              </div>
            </div>
            <p className="mt-4 font-semibold text-xl text-center">
              {data.firstName || data.lastName
                ? `${data.firstName} ${data.lastName}`
                : "Имя Фамилия"}
            </p>
          </CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </Card>

        {/* Блок 2: Настройки переключателей */}
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Настройки сотрудника</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Временный сотрудник", key: "isTemp" },
              { label: "Часто выходит для замены", key: "oftenReplaces" },
              { label: "Проблемный сотрудник", key: "problematic" },
              { label: "Новичок", key: "newbie" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center justify-between">
                <span>{label}</span>
                <Switch
                  checked={data[key as keyof StaffData] as boolean}
                  onCheckedChange={(val) => handleChange(key as keyof StaffData, val)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Правая колонка */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Изменить данные сотрудника</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Имя"
              value={data.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              aria-invalid={!!errors.firstName}
              aria-describedby="error-firstName"
            />
            {errors.firstName && (
              <p id="error-firstName" className="text-red-600 text-sm mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Фамилия"
              value={data.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              aria-invalid={!!errors.lastName}
              aria-describedby="error-lastName"
            />
            {errors.lastName && (
              <p id="error-lastName" className="text-red-600 text-sm mt-1">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Номер телефона"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby="error-phone"
            />
            {errors.phone && (
              <p id="error-phone" className="text-red-600 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Ставка за смену"
              value={data.rate}
              onChange={(e) => handleChange("rate", e.target.value)}
              aria-invalid={!!errors.rate}
              aria-describedby="error-rate"
            />
            {errors.rate && (
              <p id="error-rate" className="text-red-600 text-sm mt-1">
                {errors.rate}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Характеристика"
              className="w-full p-2 border rounded resize-y h-24"
              value={data.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              aria-invalid={!!errors.bio}
              aria-describedby="error-bio"
            />
            {errors.bio && (
              <p id="error-bio" className="text-red-600 text-sm mt-1">
                {errors.bio}
              </p>
            )}
          </div>

          <div>
            <Input
              type="date"
              placeholder="Дата рождения"
              value={data.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              aria-invalid={!!errors.dob}
              aria-describedby="error-dob"
            />
            {errors.dob && (
              <p id="error-dob" className="text-red-600 text-sm mt-1">
                {errors.dob}
              </p>
            )}
          </div>

          <div>
            <Input
              type="date"
              placeholder="Дата устройства"
              value={data.hired}
              onChange={(e) => handleChange("hired", e.target.value)}
              aria-invalid={!!errors.hired}
              aria-describedby="error-hired"
            />
            {errors.hired && (
              <p id="error-hired" className="text-red-600 text-sm mt-1">
                {errors.hired}
              </p>
            )}
          </div>

          <Button onClick={handleSave}>Сохранить</Button>
        </CardContent>
      </Card>
    </div>
  );
}
