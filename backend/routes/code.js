const express = require('express');
const Code = require('../models/Code');
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

const router = express.Router();

// Get default code
router.get('/mine', async (req, res) => {
  try {
    res.json({
      code: '// Start coding in JavaScript!\nconsole.log("Hello World!");',
      language: 'javascript'
    });
  } catch (err) {
    console.error('Error fetching code:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save code
router.post('/save', async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }
    
    const supportedLanguages = [
      'javascript', 'python', 'java', 'cpp',
      'csharp', 'go', 'rust', 'php', 'ruby'
    ];
    
    if (language && !supportedLanguages.includes(language)) {
      return res.status(400).json({ message: 'Unsupported language' });
    }

    res.json({ message: 'Code saved!', code: { code, language: language || 'javascript' } });
  } catch (err) {
    console.error('Error saving code:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Execute code
router.post('/execute', async (req, res) => {
  const { code, language, fileName, runCommand } = req.body;
  if (!code || !language || !fileName || !runCommand) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  const tempDir = path.join(__dirname, '../temp');
  const filePath = path.join(tempDir, fileName);
  let compiledFilePath;

  try {
    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(filePath, code);

    let output = '';
    let error = null;

    const runProcess = (command, args) => {
      return new Promise((resolve, reject) => {
        const child = spawn(command, args, { shell: false });
        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
          stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        child.on('error', (err) => {
          reject(err);
        });

        child.on('close', (code) => {
          if (code === 0) {
            resolve({ stdout, stderr });
          } else {
            reject(new Error(`Process exited with code ${code}: ${stderr}`));
          }
        });
      });
    };

    try {
      switch (language) {
        case 'javascript':
        case 'python':
          ({ stdout: output, stderr: error } = await runProcess(runCommand, [filePath]));
          break;

        case 'java':
          await runProcess('javac', [filePath]);
          const className = 'Main';
          ({ stdout: output, stderr: error } = await runProcess('java', ['-cp', tempDir, className]));
          break;

        case 'cpp':
          compiledFilePath = path.join(tempDir, 'program.exe');
          await runProcess(runCommand, [filePath, '-o', compiledFilePath]);
          ({ stdout: output, stderr: error } = await runProcess(compiledFilePath, []));
          break;

        case 'csharp':
          await runProcess(runCommand, ['build', filePath]);
          ({ stdout: output, stderr: error } = await runProcess(runCommand, ['run', filePath]));
          break;

        case 'go':
          ({ stdout: output, stderr: error } = await runProcess(runCommand, ['run', filePath]));
          break;

        case 'rust':
          compiledFilePath = path.join(tempDir, 'program.exe');
          await runProcess(runCommand, [filePath, '-o', compiledFilePath]);
          ({ stdout: output, stderr: error } = await runProcess(compiledFilePath, []));
          break;

        case 'php':
        case 'ruby':
          ({ stdout: output, stderr: error } = await runProcess(runCommand, [filePath]));
          break;

        default:
          throw new Error('Unsupported language');
      }

      res.json({ output: output || '', error: error || null });
    } catch (execError) {
      console.error('Execution error:', execError);
      res.json({ output: '', error: execError.message || 'Error executing code' });
    }
  } catch (err) {
    console.error('System error:', err);
    res.status(500).json({ message: 'System error', error: err.message || 'Unknown error' });
  } finally {
    try {
      await fs.unlink(filePath);
      if (compiledFilePath) {
        await fs.unlink(compiledFilePath);
      }
    } catch (cleanupErr) {
      console.error('Cleanup error:', cleanupErr);
    }
  }
});

module.exports = router;