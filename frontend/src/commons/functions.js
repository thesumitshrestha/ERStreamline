import moment from 'moment';

export const convertDate = (date) => {
  // return moment(date).format('ll');
  const formattedDate = moment(date).isSameOrAfter(moment().subtract(3, 'days'))
    ? moment(date).fromNow()
    : moment(date).format('MMMM D, YYYY');

  return <div>{formattedDate}</div>;
};

export const calculateAge = (date) => {
  // return Math.floor(
  //   (new Date() - new Date(date)) / 1000 / 60 / 60 / 24 / 365.25
  // );
  var today = new Date();
  var birthDate = new Date(date); // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  console.log(age_now);
  return age_now;
};
