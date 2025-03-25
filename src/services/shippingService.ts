import { ShippingOrder, CreateShipmentDTO } from "@/types/shipping";
import { API_CONFIG, buildUrl, getAuthHeader } from "@/config/api";

export const getShippingOrders = async () => {
  try {
    const response = await fetch(buildUrl('/shipments/'), {
      headers: {
        ...API_CONFIG.headers,
        'Authorization': getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shipping orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching shipping orders:', error);
    throw error;
  }
};

export const getShipmentLocations = async (shipmentId: string | number) => {
  try {
    const response = await fetch(buildUrl(`/shipment_locations/${shipmentId}`), {
      headers: {
        ...API_CONFIG.headers,
        'Authorization': getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shipment locations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching shipment locations:', error);
    throw error;
  }
};

export const createShipmentLocation = async (data: {
  shipment_id: number;
  location: string;
  date: string;
  status: string;
}) => {
  try {
    const response = await fetch(buildUrl('/shipment_locations/'), {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Authorization': getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create shipment location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating shipment location:', error);
    throw error;
  }
};

export const createShippingOrder = async (data: CreateShipmentDTO): Promise<ShippingOrder> => {
  try {
    const response = await fetch(buildUrl('/shipments/'), {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Authorization': getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create shipping order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating shipping order:', error);
    throw error;
  }
};