import moment from 'moment';

export const convertDate = (date) => {
  return moment(date).format('ll');
};

export const calculateAge = (date) => {
  return Math.floor(
    (new Date() - new Date(date)) / 1000 / 60 / 60 / 24 / 365.25
  );
};
