import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Icon from "@/components/ui/icon";

interface City {
  id: string;
  name: string;
}

interface LocationStepProps {
  cities: City[];
  selectedCityId: string;
  onCityChange: (value: string) => void;
  addressInputRef: React.RefObject<HTMLInputElement>;
  addressInput: string;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressBlur: () => void;
  latitude: number;
  longitude: number;
  onMapLoad: () => void;
  onPlacemarkDragEnd: (e: any) => void;
  mapRef: React.MutableRefObject<any>;
}

export const LocationStep = ({
  cities,
  selectedCityId,
  onCityChange,
  addressInputRef,
  addressInput,
  onAddressChange,
  onAddressBlur,
  latitude,
  longitude,
  onMapLoad,
  onPlacemarkDragEnd,
  mapRef,
}: LocationStepProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="text-base md:text-lg flex items-center space-x-2">
          <Icon name="MapPin" className="w-4 h-4 md:w-5 md:h-5" />
          <span>Укажите местоположение</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
        <div className="space-y-2">
          <Label htmlFor="cityId" className="text-sm md:text-base font-medium">
            Город *
          </Label>
          <Select value={selectedCityId} onValueChange={onCityChange} required>
            <SelectTrigger className="text-sm md:text-base h-10 md:h-11">
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm md:text-base font-medium">
            Адрес
          </Label>
          <Input
            ref={addressInputRef}
            id="address"
            value={addressInput}
            onChange={onAddressChange}
            onBlur={onAddressBlur}
            placeholder="Улица, дом, квартира"
            className="text-sm md:text-base h-10 md:h-11"
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm md:text-base font-medium">
            Место на карте
          </Label>
          <div
            className="rounded-lg border border-gray-300 overflow-hidden"
            style={{ height: window.innerWidth < 768 ? 250 : 400 }}
          >
            <YMaps
              query={{
                lang: "ru_RU",
                apikey: "254a1844-cf4b-49db-836c-c5aa61915d75",
                load: "package.full",
              }}
            >
              <Map
                state={{
                  center: [latitude, longitude],
                  zoom: 10,
                  controls: ["zoomControl"],
                }}
                instanceRef={(ref) => {
                  mapRef.current = ref;
                }}
                onLoad={onMapLoad}
                width="100%"
                height="100%"
              >
                <Placemark
                  geometry={[latitude, longitude]}
                  options={{ draggable: true, preset: "islands#redIcon" }}
                  onDragEnd={onPlacemarkDragEnd}
                />
              </Map>
            </YMaps>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};