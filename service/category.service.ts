import { ApiPath } from '@/enum';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { CategoryField } from '@/modules/categories/categories.enum';
import { ICategoryFormData } from '@/modules/categories/categories.type';

export const categoryService = {
  getCategories: async (searchParams: URLSearchParams = new URLSearchParams()) => {
    const params = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
    });
    const response = await axiosInstance.get(ApiPath.CATEGORIES, {
      params,
    });
    return response.data;
  },

  create: async (data: ICategoryFormData) => {
    const formData = new FormData();

    formData.append(CategoryField.NAME, data[CategoryField.NAME]);
    formData.append(CategoryField.DESCRIPTION, data[CategoryField.DESCRIPTION]);

    if (data[CategoryField.ICON] instanceof File) {
      formData.append(CategoryField.ICON, data[CategoryField.ICON]);
    } else if (data[CategoryField.ICON]) {
      formData.append(CategoryField.ICON, data[CategoryField.ICON]);
    }

    const response = await axiosInstance.post(ApiPath.CATEGORIES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  update: async (id: string, data: ICategoryFormData) => {
    const formData = new FormData();

    formData.append(CategoryField.NAME, data[CategoryField.NAME]);
    formData.append(CategoryField.DESCRIPTION, data[CategoryField.DESCRIPTION]);

    if (data[CategoryField.ICON] instanceof File) {
      formData.append(CategoryField.ICON, data[CategoryField.ICON]);
    } else if (data[CategoryField.ICON]) {
      formData.append(CategoryField.ICON, data[CategoryField.ICON]);
    }

    const response = await axiosInstance.put(`${ApiPath.CATEGORIES}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`${ApiPath.CATEGORIES}/${id}`);
    return response.data;
  },
};
