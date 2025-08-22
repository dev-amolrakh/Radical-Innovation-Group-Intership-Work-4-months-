import React, { useState } from 'react';
import axios from 'axios';
import ResumeTemplate1 from './components/ResumeTemplate1';
import ResumeTemplate2 from './components/ResumeTemplate2';

function App() {
  const [resumeData, setResumeData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState(<ResumeTemplate1 data={resumeData} />);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/resume', resumeData);
    // Continue with other logic after the API call
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for name, email, summary, etc. */}
        <input type="text" name="name" onChange={handleInputChange} />
        <input type="text" name="email" onChange={handleInputChange} />
        {/* More fields as necessary */}
        <button type="submit">Create Resume</button>
      </form>
      <div>
        <h2>Choose Template</h2>
        <button onClick={() => handleTemplateChange(<ResumeTemplate1 data={resumeData} />)}>Template 1</button>
        <button onClick={() => handleTemplateChange(<ResumeTemplate2 data={resumeData} />)}>Template 2</button>
        {/* More template buttons */}
      </div>
      <div>
        {selectedTemplate}
      </div>
    </div>
  );
}

export default App;
