'use client';
import React from 'react';

export default function PeopleInfoSection({ person, property, title }) {
  // Grab the array from person
  const items = person[property];
  // If it's not an array or is empty, render nothing
  if (!Array.isArray(items) || items.length === 0) return null;

  // Default heading: capitalize the property name
  const heading =
    title || property.charAt(0).toUpperCase() + property.slice(1);

  return (
    <>
      <h4 className="text-xl text-left font-semibold mt-4">{heading}</h4>
      <ul className="list-disc list-inside text-gray-600 text-left mt-1.5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );
}
