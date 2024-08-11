'use client'
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is Lorem Ipsum?',
    answer:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
  {
    question: 'Why do we use it?',
    answer:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    question: 'Where does it come from?',
    answer:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className=" mx-auto py-10 bg-gray-900">
      <div className=" container mx-auto py-10">
      <h2 className="text-3xl text-center font-bold mb-6">FREQUENTLY ASKED QUESTIONS</h2>
      <div className="space-y-6">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-red-700">
            <button
              onClick={() => toggleAccordion(index)}
              className={`flex justify-between items-center w-full p-4 focus:outline-none ${
                activeIndex === index ? 'text-red-700' : 'text-red'
              }`}
            >
              <span className="font-semibold">{item.question}</span>
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {activeIndex === index && (
              <div className="px-4 py-2 text-white">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQ;
