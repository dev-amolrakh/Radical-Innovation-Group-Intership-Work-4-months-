import React from 'react';

function ResumeTemplate1({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      <h2>Summary</h2>
      <p>{data.summary}</p>
      <h2>Experience</h2>
      <p>{data.experience}</p>
      <h2>Education</h2>
      <p>{data.education}</p>
    </div>
  );
}

export default ResumeTemplate1;
