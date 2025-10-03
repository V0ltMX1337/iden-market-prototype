export interface VPNSubscription {
  success: boolean;
  client_name?: string;
  subscription_end?: string;
  qr_code?: string;
  subscription_url?: string;
  server: string;
  error?: string;
}

class VPNApi {
  private baseUrl: string = import.meta.env.VITE_VPN_API_URL || 'https://api.migvpn.com';

  async getSubscription(token: string, server: string): Promise<VPNSubscription> {
    try {
      const response = await fetch(`${this.baseUrl}/sub/${token}?server=${server}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            server,
            error: 'Подписка не найдена. Проверьте правильность токена.'
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        ...data,
        server
      };
    } catch (error) {
      console.error('VPN API Error:', error);
      return {
        success: false,
        server,
        error: 'Ошибка подключения к серверу. Попробуйте позже.'
      };
    }
  }

  getMockSubscription(token: string, server: string): VPNSubscription {
    if (token === 'demo' || token.length > 10) {
      return {
        success: true,
        client_name: 'Иван Иванов',
        subscription_end: '2025-12-31T23:59:59Z',
        qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=vless://demo-${server}@vpn.migvpn.com:443`,
        subscription_url: `vless://demo-${server}@vpn.migvpn.com:443?encryption=none&security=tls&sni=vpn.migvpn.com&type=ws&host=vpn.migvpn.com&path=%2F#MIGVPN-${server}`,
        server
      };
    }

    return {
      success: false,
      server,
      error: 'Токен не найден или истёк срок действия'
    };
  }
}

export const vpnApi = new VPNApi();