'use client'
import axios from 'axios';

interface ApiRequestProps {
  url: string;
  method?: string;
  data?: any;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}


export async function apiRequest<T>({
  url,
  method = "GET",
  data,
  headers = {},
}: ApiRequestProps): Promise<ApiResponse<T>> {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    return {
      statusCode: response.status, // Return the status code
      message: 'Request successful', // You can customize the message as needed
      data: response.data,
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500, // Default to 500 if no status is available
      message: error.response?.data?.message || error.message || 'An error occurred',
      data: error.response?.data || error.message,
    };
  }
}


export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  
  if (localPart.length <= 6) {
    // If local part is too short, show only the first letter and mask the rest
    return `${localPart.charAt(0)}*****@${domain}`;
  }

  return `${localPart.slice(0, 3)}*****${localPart.slice(-3)}@${domain}`;
};




