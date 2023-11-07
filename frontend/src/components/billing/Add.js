import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DOCTOR_FEE, ADMISSION_FEE } from '../../commons/constants';
import { convertDate } from '../../commons/functions';

const Add = () => {
  const today = new Date();
  const [patient, setPatient] = useState('');
  const [ehrVisit, setEhrVisit] = useState('');
  const [administrativeStaff, setAdministrativeStaff] = useState('');
  const [medication, setMedication] = useState('');
  const [insurance, setInsurance] = useState('');
  const [lab, setLab] = useState('');
  const [billingDate, setBillingDate] = useState(moment(today).format('LL'));
  const [totalAmount, setTotalAmount] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [patientInsurance, setPatientInsurance] = useState([]);
  const [adminStaffList, setAdminStaffList] = useState([]);
  const [ehrVisitList, setEhrVisitList] = useState([]);
  const [labFeeList, setLabFeeList] = useState([]);
  const [medicationFeeList, setMedicationFeeList] = useState([]);
  const [insuranceChecked, setInsuranceChecked] = useState(false);
  const navigate = useNavigate();

  const handleInsurance = () => {
    setInsuranceChecked(!insuranceChecked);
  };

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    const getAdminStaff = async () => {
      const res = await axios.get('http://localhost:5005/api/adminStaffs');
      setAdminStaffList(res.data);
    };

    getPatientList();
    getAdminStaff();
  }, []);

  const handlePatient = async (e) => {
    const patientId = e.target.value;
    setPatient(patientId);

    const res = await axios.get(
      `http://localhost:5005/api/ehrVisits/patient/${patientId}`
    );

    const patientInsurance = await axios.get(
      `http://localhost:5005/api/insurance/patient/${patientId}`
    );

    console.log('PATIENTINSUANCE', patientInsurance.data);
    setEhrVisitList(res.data);
    setPatientInsurance(patientInsurance.data);
  };

  const handleEHRVisit = async (e) => {
    const ehrVisitId = e.target.value;
    setEhrVisit(ehrVisitId);
    console.log('EHRVISIT ID is', ehrVisitId);
    const res = await axios.get(
      `http://localhost:5005/api/patientLabTest/ehrVisit/${ehrVisitId}`
    );

    setLabFeeList(res.data);

    const medicationList = await axios.get(
      `http://localhost:5005/api/medication/ehrVisit/${ehrVisitId}`
    );

    setMedicationFeeList(medicationList.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/billings', {
        patient: patient,
        ehrVisit: ehrVisit,
        administrativeStaff: administrativeStaff,
        medication: totalMedicationFee(),
        lab: totalLabFee().toString(),
        billingDate: billingDate,
        insurance: patientInsurance[0]?._id,
        totalAmount: getTotalCalculatedAmount(),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Billing ADDED');
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const totalLabFee = () => {
    let sum = labFeeList.reduce(function (prev, current) {
      return prev + +current?.labFee;
    }, 0);
    return sum;
  };

  const totalMedicationFee = () => {
    let sum = medicationFeeList.reduce(function (prev, current) {
      return prev + +current?.medicineCost;
    }, 0);
    return sum;
  };

  const getTotalCalculatedAmount = () => {
    let totalAmount = 0;
    if (
      patientInsurance[0]?.coverageAmount <
      DOCTOR_FEE + totalLabFee() + totalMedicationFee()
    ) {
      console.log('IN IF');
      totalAmount +=
        DOCTOR_FEE +
        totalLabFee() +
        totalMedicationFee() +
        patientInsurance[0]?.deductible -
        patientInsurance[0]?.coverageAmount;
    } else if (
      patientInsurance[0]?.deductible >
      DOCTOR_FEE + totalLabFee() + totalMedicationFee()
    ) {
      console.log('IN ELSE IF');
      totalAmount += DOCTOR_FEE + totalLabFee() + totalMedicationFee();
    } else {
      console.log('IN ELSE ');
      totalAmount = patientInsurance[0]?.deductible;
    }

    return totalAmount;
  };

  return (
    <div className='bg-background'>
      <div className='container mx-auto p-large'>
        <form
          className='create p-large gradient rounded-3xl '
          onSubmit={handleSubmit}
        >
          <h3> Add a Billing</h3>
          <div className='mb-3'>
            <label htmlFor=''>Select Patient: </label>
            <select
              name=''
              id='patient'
              value={patient}
              onChange={(e) => handlePatient(e)}
            >
              <option selected value=''>
                Select Patient
              </option>
              {patientList.map((patient, idx) => {
                return (
                  <option key={patient._id} value={patient._id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Select EHRVisit: </label>
            <select
              name=''
              id='ehrVisit'
              value={ehrVisit}
              onChange={(e) => handleEHRVisit(e)}
              // onChange={(e) => setEhrVisit(e.target.value)}
            >
              <option selected value=''>
                Select EHRVisit
              </option>
              {ehrVisitList.map((ehrVisit, idx) => {
                return (
                  <option key={ehrVisit._id} value={ehrVisit._id}>
                    {ehrVisit.patient?.firstName} {ehrVisit.patient?.lastName}{' '}
                    || {convertDate(ehrVisit.visitDate)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Select Admin Staff: </label>
            <select
              name=''
              id='room'
              value={administrativeStaff}
              onChange={(e) => setAdministrativeStaff(e.target.value)}
            >
              <option selected value=''>
                Select Admin Staff
              </option>
              {adminStaffList.map((adminStaff, idx) => {
                return (
                  <option key={adminStaff._id} value={adminStaff._id}>
                    {adminStaff.firstName} {adminStaff.lastName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Total Lab Fee: </label>$
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              readonly='readonly'
              // onChange={setLab(totalLabFee())}
              value={totalLabFee()}
            />
          </div>
          <div>Doctor Fee: ${DOCTOR_FEE}</div>
          <div className='mb-3'>
            <label htmlFor=''>Total Medication Fee: </label>$
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              readonly='readonly'
              // onChange={setMedication(totalMedicationFee())}
              value={totalMedicationFee()}
            />
          </div>
          <div className='mb-3'>
            <label>
              Subtotal: ${totalLabFee()} + ${totalMedicationFee()} + $
              {DOCTOR_FEE}=
            </label>
            ${totalLabFee() + totalMedicationFee() + DOCTOR_FEE}
          </div>
          <div className='mb-3'>
            <label htmlFor=''> Coverage Amount: </label>
            {patientInsurance[0]?.coverageAmount
              ? '$' + patientInsurance[0]?.coverageAmount
              : '$' + 0}

            <label htmlFor=''> Deductible Amount: </label>
            {patientInsurance[0]?.deductible
              ? '$' + patientInsurance[0]?.deductible
              : '$' + 0}
          </div>
          {patientInsurance[0]?.deductible >
          DOCTOR_FEE + totalLabFee() + totalMedicationFee()
            ? 'Since Deductible amount is greater than subtotal amount,  Subtotal amount is applied.'
            : // <div className='mb-3'>
              //   <label
              //     htmlFor='inputVacationPercentage'
              //     className='switch switch-default'
              //   >
              //     Want to use Insurance?
              //   </label>
              //   &nbsp;
              //   <input
              //     id='insuranceChecked'
              //     type='checkbox'
              //     checked={insuranceChecked}
              //     onChange={handleInsurance}
              //   />
              // </div>
              ''}
          {/* 
          {insuranceChecked && (
            <>
              <div class='mb-3'>
                <label class='mb-2 text-sm font-medium block' htmlFor=''>
                  Total Amount $
                </label>
                <input
                  class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  onChange={(e) => setTotalAmount(e.target.value)}
                  readonly='readonly'
                  value={
                    DOCTOR_FEE +
                    totalMedicationFee() +
                    totalLabFee() +
                    patientInsurance[0]?.deductible -
                    patientInsurance[0]?.coverageAmount
                  }
                />
              </div>
            </>
          )} */}
          {!insuranceChecked && (
            <div class='mb-3'>
              <label class='mb-2 text-sm font-medium block' htmlFor=''>
                Total Amount $
              </label>
              <input
                readonly='readonly'
                class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                onChange={(e) => setTotalAmount(e.target.value)}
                defaultValue={getTotalCalculatedAmount()}
                value={getTotalCalculatedAmount()}
              />
            </div>
          )}

          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
            Add Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
