import { format } from 'date-fns';

export const formatDate = (dateString) => {
  // console.log(dateString,'datos');
  return format(new Date(dateString), "yyyy-MM-dd ");
};

export const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000);
    return `${timestamp}${random}`;
  };

 export const generarNumeroAleatorio=(min, max)=> {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min; 
    return randomNumber;
  }
