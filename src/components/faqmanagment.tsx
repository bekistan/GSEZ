import React, { useState } from 'react';

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const initialFAQ: FAQ[] = [
  { id: '1', question: 'What is FAQ?', answer: 'FAQ stands for Frequently Asked Questions.' },
  { id: '2', question: 'How to use FAQ?', answer: 'To use FAQ, simply...' },
  // Add more initial data if needed
];

const FAQManagement: React.FC = () => {
  const [faq, setFAQ] = useState<FAQ[]>(initialFAQ);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

  // Function to handle adding a new FAQ entry
  const addFAQEntry = () => {
    const newId = (Math.max(...faq.map(item => parseInt(item.id))) + 1).toString();
    const newEntry = { id: newId, ...formData };
    setFAQ([...faq, newEntry]);
    setFormData({ question: '', answer: '' });
  };

  // Function to handle updating an existing FAQ entry
  const updateFAQEntry = () => {
    if (selectedFAQ) {
      setFAQ(faq.map(item => (item.id === selectedFAQ.id ? { ...selectedFAQ, ...formData } : item)));
      setFormData({ question: '', answer: '' });
      setSelectedFAQ(null);
    }
  };

  // Function to handle editing a FAQ entry
  const editFAQEntry = (id: string) => {
    const entry = faq.find(item => item.id === id);
    if (entry) {
      setSelectedFAQ(entry);
      setFormData({ question: entry.question, answer: entry.answer });
    }
  };

  // Function to handle deleting a FAQ entry
  const deleteFAQEntry = (id: string) => {
    setFAQ(faq.filter(item => item.id !== id));
    setSelectedFAQ(null);
    setFormData({ question: '', answer: '' });
  };

  // Function to handle searching FAQ entries
  const searchFAQEntries = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  // Filter FAQ based on search term
  const filteredFAQ = faq.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">FAQ Management</h2>
      <div className="flex items-center justify-between mb-4">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search FAQ..."
          value={searchTerm}
          onChange={e => searchFAQEntries(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mr-4 focus:outline-none focus:border-indigo-500"
        />
        {/* Add button */}
        <button
          onClick={() => setSelectedFAQ({ id: '', question: '', answer: '' })}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          Add FAQ
        </button>
      </div>
      {/* FAQ list */}
      <div className="grid grid-cols-1 gap-4">
        {filteredFAQ.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg text-gray-600 font-semibold mb-2">{item.question}</h3>
            <p className="text-gray-600">{item.answer}</p>
            <div className="flex mt-2">
              {/* Edit button */}
              <button
                onClick={() => editFAQEntry(item.id)}
                className="bg-blue-500 text-white font-bold py-1 px-2 rounded mr-2 hover:bg-blue-700"
              >
                Edit
              </button>
              {/* Delete button */}
              <button
                onClick={() => deleteFAQEntry(item.id)}
                className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Edit FAQ form */}
      {selectedFAQ && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">{selectedFAQ.id ? 'Edit FAQ' : 'Add FAQ'}</h2>
          <input
            type="text"
            placeholder="Question"
            value={formData.question}
            onChange={e => setFormData({ ...formData, question: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-indigo-500"
          />
          <textarea
            placeholder="Answer"
            value={formData.answer}
            onChange={e => setFormData({ ...formData, answer: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-indigo-500"
            rows={4}
          ></textarea>
          {/* Save button */}
          <button
            onClick={() => {
              selectedFAQ.id ? updateFAQEntry() : addFAQEntry();
              setSelectedFAQ(null);
            }}
            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
          >
            {selectedFAQ.id ? 'Update FAQ' : 'Add FAQ'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;
