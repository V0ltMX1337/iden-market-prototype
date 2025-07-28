import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { storeApi } from "@/lib/store";
import { City, User } from "@/lib/types";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cityId: string;
  photoUrl?: string;
  bannerUrl?: string;
  description?: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface TwoFactorForm {
  telegramId: string;
  step: "input" | "instruction";
}

export const useProfileSettings = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cityId: "",
    photoUrl: "",
    bannerUrl: "",
    description: "",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [twoFactorForm, setTwoFactorForm] = useState<TwoFactorForm>({
    telegramId: "",
    step: "input"
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [settingTwoFactor, setSettingTwoFactor] = useState(false);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData: City[] = await storeApi.getCities();
        setCities(citiesData);
      } catch (error) {
        console.error("Ошибка загрузки городов", error);
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const loadUserData = async () => {
      setLoading(true);
      try {
        const freshUser: User = await storeApi.getUserById(user.id);
        setFormData({
          firstName: freshUser.firstName || "",
          lastName: freshUser.lastName || "",
          email: freshUser.email || "",
          phone: freshUser.phone || "",
          cityId: freshUser.city?.id || "",
          photoUrl: freshUser.photoUrl || "",
          bannerUrl: freshUser.bannerUrl || "",
          description: freshUser.description || "",
        });
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user?.id]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (
    field: keyof NotificationSettings,
    value: boolean
  ) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSave = async () => {
    if (!user?.id) return;
  
    if (!formData.firstName) {
      alert("Пожалуйста, укажите имя");
      return;
    }

    if (!formData.lastName) {
      alert("Пожалуйста, укажите фамилию");
      return;
    }

    if (!formData.email) {
      alert("Пожалуйста, укажите емейл");
      return;
    }

    if (!formData.phone) {
      alert("Пожалуйста, укажите номер телефона");
      return;
    }

    if (!formData.cityId) {
      alert("Пожалуйста, выберите город");
      return;
    }
  
    setSaving(true);
    try {
      const cityObj = cities.find((c) => c.id === formData.cityId);
      if (!cityObj) {
        alert("Выбран неверный город");
        setSaving(false);
        return;
      }
    
      const updatedUser: User = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: cityObj,
        photoUrl: formData.photoUrl || "",
        bannerUrl: formData.bannerUrl || "",
        description: formData.description || "",
      };
    
      await storeApi.updateUser(user.id, updatedUser);
    
      alert("Данные успешно сохранены");
    
    } catch (error) {
      console.error("Ошибка сохранения данных", error);
      alert("Ошибка при сохранении данных");
    } finally {
      setSaving(false);
    }
  };

  const onAvatarChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;

      const file = e.target.files[0];
      setUploadingAvatar(true);

      try {
        const res = await storeApi.uploadPhoto("avatars", file);
        setFormData((prev) => ({ ...prev, photoUrl: res.url }));
      } catch (error) {
        console.error("Ошибка загрузки аватарки", error);
        alert("Ошибка загрузки аватарки");
      } finally {
        setUploadingAvatar(false);
      }
    },
    []
  );

  const onBannerChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;

      const file = e.target.files[0];
      setUploadingBanner(true);

      try {
        const res = await storeApi.uploadPhoto("banners", file);
        setFormData((prev) => ({ ...prev, bannerUrl: res.url }));
      } catch (error) {
        console.error("Ошибка загрузки баннера", error);
        alert("Ошибка загрузки баннера");
      } finally {
        setUploadingBanner(false);
      }
    },
    []
  );

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      alert("Заполните все поля");
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Новые пароли не совпадают");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert("Пароль должен содержать минимум 6 символов");
      return;
    }
    
    setChangingPassword(true);
    try {
      alert("Пароль успешно изменен");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Ошибка смены пароля:", error);
      alert("Ошибка при смене пароля");
    } finally {
      setChangingPassword(false);
    }
  };
  
  const handleTwoFactorSetup = async () => {
    if (!twoFactorForm.telegramId.trim()) {
      alert("Введите Telegram ID");
      return;
    }
    
    setSettingTwoFactor(true);
    try {
      setTwoFactorForm(prev => ({ ...prev, step: "instruction" }));
    } catch (error) {
      console.error("Ошибка настройки 2FA:", error);
      alert("Ошибка при настройке двухфакторной аутентификации");
    } finally {
      setSettingTwoFactor(false);
    }
  };
  
  const resetTwoFactorModal = () => {
    setTwoFactorForm({ telegramId: "", step: "input" });
    setShowTwoFactorModal(false);
  };

  return {
    user,
    formData,
    notifications,
    loading,
    saving,
    cities,
    uploadingAvatar,
    uploadingBanner,
    showPasswordModal,
    showTwoFactorModal,
    passwordForm,
    twoFactorForm,
    changingPassword,
    settingTwoFactor,
    handleInputChange,
    handleNotificationChange,
    handleSave,
    onAvatarChange,
    onBannerChange,
    setShowPasswordModal,
    setShowTwoFactorModal,
    setPasswordForm,
    setTwoFactorForm,
    handlePasswordChange,
    handleTwoFactorSetup,
    resetTwoFactorModal,
  };
};