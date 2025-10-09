interface CustomerPassBase {
  customerId: string;
  passId: string;
  device: string;
  registrationMethod: string;
  stamps: number;
  rewards: number;
}

interface GoogleWalletFields {
  google_id_class?: string;
  google_id_object?: string;
  google_wallet_url?: string;
}

interface AppleWalletFields {
  apple_serial_number?: string;
  apple_authentication_token?: string;
  apple_device_library_id?: string;
  apple_push_token?: string;
}

export type CreateCustomerPassRequest = CustomerPassBase & GoogleWalletFields & AppleWalletFields;

export type CustomerPassResponse = CreateCustomerPassRequest & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
