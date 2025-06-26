import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Editor() {
  const [code, setCode] = useState('// Start coding here');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [saving, setSaving] = useState(false);
  const { user, logout } = useAuth();

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleRunCode = async () => {
    try {
      const res = await axios.post('/api/code/run', { code, language });
      setOutput(res.data.output);
    } catch (err) {
      setOutput(err.response?.data?.error || 'Error executing code');
    }
  };

  const handleSaveCode = async () => {
    try {
      setSaving(true);
      await axios.post('/api/code/save', { code, language });
    } catch (err) {
      console.error('Error saving code:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>Welcome, {user?.username}</h2>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
      
      <div className="editor-controls">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        
        <button onClick={handleRunCode} className="run-button">
          Run Code
        </button>
        
        <button 
          onClick={handleSaveCode} 
          disabled={saving}
          className="save-button"
        >
          {saving ? 'Saving...' : 'Save Code'}
        </button>
      </div>
      
      <div className="editor-wrapper">
        <MonacoEditor
          height="60vh"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true
          }}
        />
      </div>
      
      <div className="output-container">
        <h3>Output</h3>
        <pre className="output-content">{output}</pre>
      </div>
    </div>
  );
}