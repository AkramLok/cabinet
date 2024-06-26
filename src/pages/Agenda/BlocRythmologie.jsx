import React, { useState, useEffect, useCallback } from "react";
import patientService from "../../services/patient.service";
import doctorService from "../../services/doctor.service";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/fr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderAgenda from "../../components/HeaderAgenda";

dayjs.extend(isBetween);
dayjs.extend(localizedFormat);
dayjs.locale("fr");

const BlocRythmologie = () => {
  const [startDate, setStartDate] = useState(
    dayjs().format("YYYY-MM-DDT00:00")
  );
  const [endDate, setEndDate] = useState(
    dayjs().add(6, "day").format("YYYY-MM-DDT23:59")
  );
  const [assignments, setAssignments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [assignmentDate, setAssignmentDate] = useState(
    dayjs().format("YYYY-MM-DDTHH:mm")
  );
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await patientService.getAllPatients();
      const filteredAssignments = response.data.flatMap((patient) =>
        patient.roomAssignments
          .filter(
            (assignment) =>
              assignment.roomType === "BLOC_RYTHMOLOGIE" &&
              dayjs(assignment.assignmentDateTime).isBetween(startDate, endDate)
          )
          .map((assignment) => ({ ...assignment, patient }))
      );
      setAssignments(filteredAssignments);
    } catch (error) {
      console.error("Erreur lors de la récupération des affectations", error);
    }
  }, [startDate, endDate]);

  const fetchDoctorsAndPatients = useCallback(async () => {
    try {
      const doctorsResponse = await doctorService.getAllDoctors();
      setDoctors(doctorsResponse.data);
      const patientsResponse = await patientService.getAllPatients();
      setPatients(patientsResponse.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des médecins ou des patients",
        error
      );
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
    fetchDoctorsAndPatients();
  }, [fetchAssignments, fetchDoctorsAndPatients]);

  const addAssignment = async () => {
    try {
      const assignmentData = {
        roomType: "BLOC_RYTHMOLOGIE",
        assignmentDateTime: assignmentDate,
      };
      await patientService.addAssignment(doctorId, patientId, assignmentData);
      toast.success("Affectation ajoutée avec succès !");
      fetchAssignments();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'affectation", error);
      toast.error("L'ajout de l'affectation a échoué");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <HeaderAgenda />
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold mt-4">Bloc Rythmologie</span>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 ml-32 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700"
        >
          Ajouter Patient
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mt-4 flex flex-col space-y-4">
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Choisir un Médecin
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.prenom} {doctor.nom} - {doctor.specialty}
              </option>
            ))}
          </select>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Choisir un Patient{" "}
            </option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.prenom} {patient.nom} {patient.referenceID}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            placeholder="Assignment Date"
            value={assignmentDate}
            onChange={(e) => setAssignmentDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <button
            onClick={addAssignment}
            className="bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Ajouter une Affectation{" "}
          </button>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg  p-6 w-full max-w-5xl mt-4 flex flex-col space-y-4">
        <div className="flex space-x-4 justify-around">
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        {assignments.length > 0 && (
          <div className="mt-4 w-full">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200">Date</th>
                  {/*<th className="py-2 px-4 bg-gray-200">Type</th>*/}
                  <th className="py-2 px-4 bg-gray-200">Médecin</th>
                  <th className="py-2 px-4 bg-gray-200">Patient</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-t border-gray-300">
                    <td className="py-2 px-4">
                      {dayjs(assignment.assignmentDateTime)
                        .format("dddd DD MMMM YYYY HH:mm")
                        .replace(/^\w/, (c) => c.toUpperCase()) + "H"}
                    </td>
                    {/*<td className="py-2 px-4">{assignment.roomType}</td>*/}
                    <td className="py-2 px-4">
                      {assignment.doctor.nom} {assignment.doctor.prenom} <br />
                      Spécialité: {assignment.doctor.specialty} <br />
                      Téléphone: {assignment.doctor.phoneNumber}
                    </td>
                    <td className="py-2 px-4">
                      {assignment.patient.nom} {assignment.patient.prenom}{" "}
                      <br />
                      Âge: {assignment.patient.age} <br />
                      Ville: {assignment.patient.ville} <br />
                      Profession: {assignment.patient.profession}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer
        draggable
        closeOnClick
        position="bottom-right"
        autoClose={5000}
      />
    </div>
  );
};

export default BlocRythmologie;
