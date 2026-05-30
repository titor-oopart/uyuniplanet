import React from 'react';

export const response = await fetch('http://localhost:3000/api/places')
export const responseFetch = await response.json()
const header = ["id", "name", "description", "location", "image", "date"]

export default async function places(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {header.map((title, idx) => (
              <td key={idx}>{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {responseFetch.map((row, idx) => (
            <tr key={idx}>{
              Object.entries(row).map(([key, data], value) => (
                <td key={value}>{data}</td>
              ))
            }</tr>
          ))}</tbody>
      </table>
    </div>
  );
};

