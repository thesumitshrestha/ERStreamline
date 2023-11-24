import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { doctorSchedules } from "../healthStaffSchedule/schedules";
import moment from "moment";
import { convertDate } from "../../commons/functions";

import {
  ScheduleComponent,
  Day,
  Week,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

const AdminStaff = () => {
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [roomBed, setRoomBed] = useState([]);
  const [patients, setPatients] = useState([]);
  const [ehrVisits, setEhrVisits] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const eventSettings = { dataSource: doctorSchedules };

  if (location?.state?.email) {
    window.localStorage.setItem("email", location?.state?.email);
  }

  const email = window.localStorage.getItem("email");

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/adminStaffs/detail/${email}`
      );
      setUserData(res.data);
    };

    const getRoomBed = async () => {
      const res = await axios.get(`http://localhost:5005/api/roombeds`);
      setRoomBed(res.data);
    };

    const getPatients = async () => {
      const res = await axios.get(`http://localhost:5005/api/patients`);
      setPatients(res.data);
    };

    const getEhrVisits = async () => {
      const res = await axios.get(`http://localhost:5005/api/ehrVisits`);
      setEhrVisits(res.data);
    };
    const getAdmission = async () => {
      const res = await axios.get(`http://localhost:5005/api/admissions`);
      console.log("ADMISSIONS", res.data);
      setAdmissions(res.data);
    };

    getUserData();
    getRoomBed();
    getEhrVisits();
    getAdmission();
    getPatients();
  }, []);
  return (
    <>
      <Dashboard
        name={userData?.firstName + " " + userData?.lastName}
        userId={userData?._id}
        role={window.localStorage.getItem("role")}
      />
      <div className="bg-background w-3/4 content">
        <div className="container mx-auto p-small">
          <br />
          <br />
          <Link
            to="/patient/add"
            className="inline-block px-4 py-2 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors"
          >
            {" "}
            Add Patient{" "}
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            to="/admission/add"
            className="inline-block px-4 py-2 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors"
          >
            {" "}
            Add Admission{" "}
          </Link>
          {/* Patient Details */}
          <div className="p-medium gradient rounded-3xl mt-10">
            <div className="block">
              <div className="card-body">
                <div className="user-details-block">
                  Today's Date:{" "}
                  <span className="text-secondary font-bold">
                    {moment(Date.now()).format("MMMM D, YYYY")}{" "}
                  </span>
                  <div className="flex justify-between mt-5">
                    <div className="text-center">
                      <b> TOTAL EHR VISITS </b>
                      <span
                        className="mt-5 block"
                        style={{
                          color: "teal",
                          fontSize: "44px",
                          marginTop: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {ehrVisits.length}
                      </span>
                    </div>
                    <div className="text-center">
                      <b> TOTAL ADMISSIONS </b>
                      <span
                        className="mt-5 block"
                        style={{
                          color: "teal",
                          fontSize: "44px",
                          marginTop: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {admissions.length}
                      </span>
                    </div>
                    <div className="text-center">
                      <b> TOTAL ROOMS OCCUPIED </b>
                      <span
                        className="mt-5 block"
                        style={{
                          color: "teal",
                          fontSize: "44px",
                          marginTop: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {
                          roomBed.filter((room) => {
                            return room.isAvailable === false ? roomBed : "";
                          }).length
                        }
                      </span>
                    </div>
                    <div className="text-center">
                      <b> TOTAL PATIENTS </b>
                      <span
                        className="mt-5 block"
                        style={{
                          color: "teal",
                          fontSize: "44px",
                          marginTop: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {patients.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-medium bg-white rounded-3xl mt-10">
            <div className="flex">
              <div className="user-details-block mr-10">
                <h2
                  style={{
                    fontSize: "18px",
                    color: "teal",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    padding: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {" "}
                  Available Room and Bed{" "}
                </h2>
                <div
                  className="bg-white rounded-1xl shadow-lg pl-5 pr-5 text-sm"
                  style={{
                    width: "300px",
                    maxHeight: "550px",
                    overflow: "scroll",
                  }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th className="p-4"> S.N.</th>
                        <th className="p-4">Room Bed Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomBed
                        .filter((room) => {
                          return room.isAvailable === true ? roomBed : "";
                        })
                        .map((room, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="p-4">{idx + 1}</td>
                              <td className="p-4">
                                {room?.roomNumber?.roomNumber}{" "}
                                {room?.bedNumber?.bedNumber}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="calender">
                <h2
                  style={{
                    fontSize: "18px",
                    color: "teal",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    padding: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {" "}
                  Today's Schedule
                </h2>

                <ScheduleComponent
                  width="100%"
                  height="550px"
                  selectedDate={new Date(2023, 10, 27)}
                  // selectedDate={new Date(2018, 1, 15)}
                  eventSettings={eventSettings}
                >
                  <ViewsDirective>
                    <ViewDirective
                      option="Day"
                      interval={1}
                      displayName="2 Weeks"
                      showWeekend={true}
                      isSelected={true}
                    />
                  </ViewsDirective>
                  <Inject services={[Day]} />
                </ScheduleComponent>
              </div>
            </div>
          </div>
          <div className="p-medium bg-white rounded-3xl mt-10">
            <div className="user-details-block text-center">
              <h2
                style={{
                  fontSize: "18px",
                  color: "teal",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  padding: "20px",
                }}
              >
                Latest EHR Visits
              </h2>
              <table>
                <thead>
                  <tr>
                    <th className="p-4"> S.N.</th>
                    <th className="p-4">Patient Name</th>
                    <th className="p-4">Health Staff</th>
                    <th className="p-4">Visit Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ehrVisits &&
                    ehrVisits.slice(0, 5).map((ehrvisit, index) => {
                      return (
                        <tr key={ehrvisit._id}>
                          <td className="p-4"> {index + 1}</td>
                          <td className="p-4">
                            <Link
                              style={{ color: "teal" }}
                              to={`/patient/${ehrvisit?.patient?._id}`}
                            >
                              {ehrvisit?.patient?.firstName}{" "}
                              {ehrvisit?.patient?.lastName}
                            </Link>
                          </td>
                          <td className="p-4">
                            {ehrvisit?.healthStaff?.firstName}{" "}
                            {ehrvisit?.healthStaff?.lastName}
                          </td>
                          <td className="p-4">
                            <Link
                              style={{ color: "teal" }}
                              to={`/ehr-visit/${ehrvisit?._id}`}
                            >
                              {convertDate(ehrvisit.visitDate)}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-medium bg-white rounded-3xl mt-10">
            <div className="user-details-block text-center">
              <h2
                style={{
                  fontSize: "18px",
                  color: "teal",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  padding: "20px",
                }}
              >
                Latest Admissions
              </h2>
              <table>
                <thead>
                  <tr>
                    <th className="p-4"> S.N.</th>
                    <th className="p-4">Patient Name</th>
                    <th className="p-4">EHR Visit Date</th>
                    <th className="p-4">Room Number</th>
                    <th className="p-4">Admitted Date</th>
                    <th className="p-4">Discharge Date</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions &&
                    admissions.slice(0, 5).map((admission, index) => {
                      return (
                        <tr key={admission._id}>
                          <td className="p-4"> {index + 1}</td>
                          <td className="p-4">
                            {admission.patient?.firstName}{" "}
                            {admission.patient?.lastName}
                          </td>
                          <td className="p-4">
                            {convertDate(admission.ehrVisit?.visitDate)}
                          </td>
                          <td className="p-4">
                            {admission.bedNumber?.roomNumber?.roomNumber}
                            {admission.bedNumber?.bedNumber?.bedNumber}
                          </td>
                          <td className="p-4">
                            {convertDate(admission.admissionDate)}{" "}
                          </td>
                          <td className="p-4">
                            {admission.dischargeDate &&
                            admission.dischargeDate ? (
                              convertDate(admission.dischargeDate)
                            ) : (
                              <Link to={`/admission/update/${admission?._id}`}>
                                Not Discharged Yet --- Update
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminStaff;
