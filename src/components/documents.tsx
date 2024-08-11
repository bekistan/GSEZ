'use client';
import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

interface Document {
  title: string;
  link: string;
}

const documents: Document[] = [
  {
    title: 'GSEZ PROCLAMATION',
    link: '/pdf/Proclamation-226-2020.pdf',
  },
  {
    title: 'GSEZ DIRECTIVES',
    link: '/pdf/22_2015_QajeelfamaNaamusaa_Hojjattoota_Mootummaa_Naannoo_Oromiyaq2015.pdf',
  },
  {
    title: 'GSEZ REGULATION',
    link: '/pdf/Regulation-no.228-2022.pdf',
  },
];

const DocumentList: React.FC = () => {
  return (
    <div className="pt-14 min-h-screen  bg-gray-800">
      <div className='container'>

      <h2 style={{ fontFamily: 'var(--font-merriweather)'}}  className="mt-5 text-3xl text-center font-bold text-gray-300 mb-6">USEFUL DOCUMENTS</h2>
      <div  className="space-y-4 ">
        {documents.map((document, index) => (
          <div
          key={index}
            className="flex items-center bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <FaFilePdf className="text-red-500 text-2xl mr-4" />
            <div className="flex-1">
              <h3 style={{ fontFamily: 'var(--font-merriweather)'}}  className="text-xl font-semibold text-gray-300">{document.title}</h3>
              <a
              style={{ fontFamily: 'var(--font-poppins)'}} 
              href={document.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-300 transition duration-300"
              >
                Download Document
              </a>
            </div>
          </div>
        ))}
      </div>
        </div>
    </div>
  );
};

export default DocumentList;
