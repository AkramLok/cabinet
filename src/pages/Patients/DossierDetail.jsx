import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";
import icon8 from "../../assets/icon8.png";
import icon9 from "../../assets/icon9.png";
import icon10 from "../../assets/icon10.png";
import icon11 from "../../assets/icon11.png";

const DossierDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const patient = location.state?.patient;
  const color = location.state?.color;
  console.log(color);
  return (
    <div className="p-4 flex">
      <div className="w-full p-6">
        <div className="flex items-center mb-4">
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow p-2 border rounded-lg"
            />
            <button className="ml-2 p-2 bg-white border rounded-lg">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button className="ml-4 p-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        <h2 className={`text-xl font-bold py-2 text-${color}`}>
          Mr Patient &nbsp;
          <span className="text-gray-500">
            {patient.prenom} {patient.nom}
          </span>
          &nbsp;
          <span className="text-sm text-gray-500">ID : {patient.id}</span>
          <span className="text-sm text-gray-500">
            , Ref : {patient.referenceID}
          </span>
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Link
            to={{
              pathname: `/patient-identity`,
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon1} alt="Identité" className="mr-2 w-8" /> Identité
          </Link>
          <Link
            to={{
              pathname: "/motif-hospitalisation",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img
              src={icon2}
              alt="Motif d’hospitalisation"
              className="mr-2 w-8"
            />{" "}
            Motif d’hospitalisation
          </Link>
          <Link
            to={{
              pathname: "/antecedents",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon3} alt="Antécédents" className="mr-2 w-8" />{" "}
            Antécédents
          </Link>
          <Link
            to={{
              pathname: "/histoire-maladie",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img
              src={icon4}
              alt="Histoire de la maladie"
              className="mr-2 w-8"
            />{" "}
            Histoire de la maladie
          </Link>
          <Link
            to={{
              pathname: "/conclusion-primaire",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon5} alt="Conclusion primaire" className="mr-2 w-8" />{" "}
            Conclusion primaire
          </Link>
          <Link
            to={{
              pathname: "/examen-clinique",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon6} alt="Examen clinique" className="mr-2 w-8" />{" "}
            Examen clinique
          </Link>
          <Link
            to={{
              pathname: "/ecg",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon7} alt="ECG" className="mr-2 w-8" /> ECG
          </Link>
          <Link
            to={{
              pathname: "/conclusion",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon8} alt="Conclusion" className="mr-2 w-8" /> Conclusion
          </Link>
          <Link
            to={{
              pathname: "/diagnostic",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon9} alt="Diagnostic" className="mr-2 w-8" /> Diagnostic
          </Link>
          <Link
            to={{
              pathname: "/exploration",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon10} alt="Exploration" className="mr-2 w-8" />{" "}
            Exploration
          </Link>
          <Link
            to={{
              pathname: "/biologie",
            }}
            state={{ patient, color }}
            className="bg-white border rounded-lg p-4 flex items-center"
          >
            <img src={icon11} alt="Biologie" className="mr-2 w-8" /> Biologie
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DossierDetail;