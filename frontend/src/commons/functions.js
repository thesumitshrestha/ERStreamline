import moment from 'moment';

export const convertDate = (date) => {
  // return moment(date).format('ll');
  const formattedDate = moment(date).isSameOrAfter(moment().subtract(3, 'days'))
    ? moment(date).fromNow()
    : moment(date).format('MMMM D, YYYY');

  return <div>{formattedDate}</div>;
};

export const calculateAge = (date) => {
  return Math.floor(
    (new Date() - new Date(date)) / 1000 / 60 / 60 / 24 / 365.25
  ).fr;
};
