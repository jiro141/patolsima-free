import { format } from 'date-fns';

export const formatDate = (dateString) => {
  return format(new Date(dateString), "yyyy-MM-dd ");
};

export const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000);
    return `${timestamp}${random}`;
  };