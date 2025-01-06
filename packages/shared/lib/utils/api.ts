import axios, { AxiosInstance } from 'axios';
import type { CouponAPI } from '@extension/schema';

export const getAxiosInstance = (baseURL: string) => {
  const TIMEOUT = 5000; // 5 seconds timeout

  return axios.create({
    baseURL: `${baseURL}/api/v1`,
    timeout: TIMEOUT,
  });
};

export const getCoupons = async (api: AxiosInstance, url: string) => {
  try {
    const response = await api.get<CouponAPI['getCoupons']['response']>('/coupon', { params: { url } });
    return response.data.coupons;
  } catch (error) {
    console.error('Error fetching coupons:', error);
    throw error;
  }
};

export const voteCoupon = async (api: AxiosInstance, code: string, vote: 'up' | 'down') => {
  try {
    await api.post<CouponAPI['voteCoupon']['response']>('/coupon/vote', { code, vote });
  } catch (error) {
    console.error('Error voting for coupon:', error);
    throw error;
  }
};

export const submitCoupon = async (api: AxiosInstance, url: string, code: string, description: string) => {
  try {
    await api.post<CouponAPI['submitCoupon']['response']>('/coupon/submit', { url, code, description });
  } catch (error) {
    console.error('Error submitting coupon:', error);
    throw error;
  }
};
