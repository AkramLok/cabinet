import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PatientService from "../../../services/patient.service";
import icon1 from "../../../assets/icon1.png";

const PatientIdentity = () => {
  const location = useLocation();
  const patient = location.state?.patient;
  const color = location.state?.color;

  const [formData, setFormData] = useState({
    nom: patient?.nom || "",
    prenom: patient?.prenom || "",
    age: patient?.age || "",
    ville: patient?.ville || "",
    profession: patient?.profession || "",
    assurance: patient?.assurance || "",
    referenceID: patient?.referenceID || "",
    id: patient?.id || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await PatientService.updatePatient(patient.id, formData);
      setSuccess("Patient details updated successfully");
      setError(null);
    } catch (err) {
      setError("Failed to update patient details");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex items-center mb-6 w-full">
        <div className="flex items-center w-full relative">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow p-2 border border-gray-400 rounded-lg pr-10"
          />
          <button className="absolute right-0 top-0 mr-2 p-2 rounded-lg">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button className="p-2 ml-4 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className={`mb-6 text-${color} font-bold`}>
        Mr Patient {formData.prenom} {formData.nom}
      </div>
      <div className="bg-white border border-black rounded-3xl shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-black justify-center w-full">
          <div className="text-center text-xl font-bold flex items-center justify-center">
            <img src={icon1} alt="Identité" className="mr-2 align-center w-8" />
            Identité
          </div>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="ville"
            placeholder="Ville"
            value={formData.ville}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="assurance"
            placeholder="Assurance"
            value={formData.assurance}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="referenceID"
            placeholder="Reference ID"
            value={formData.referenceID}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded-lg bg-gray-400"
            readOnly
          />
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mt-2">{success}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientIdentity;