// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import emailjs from '@emailjs/browser';
import { questions } from './Data';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('nameEntry');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showCheatingWarning, setShowCheatingWarning] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const formRef = useRef();

  

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("zOIJ5t3ARufM9jmiN"); 
  }, []);

  // Handle full screen
  const enterFullScreen = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } catch (error) {
      console.log('Fullscreen error:', error);
    }
  };

  
  const exitFullScreen = async () => {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
      setIsFullScreen(false);
    } catch (error) {
      console.log('Exit fullscreen error:', error);
      setIsFullScreen(false);
    }
  };

  // Handle full screen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
      
      if (!isCurrentlyFullScreen && isFullScreen && currentScreen === 'exam' && !examFinished) {
        setShowCheatingWarning(true);
        handleExamFinish('fullscreen_exit');
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, [isFullScreen, currentScreen, examFinished]);

  // Timer effect
  useEffect(() => {
    if (currentScreen === 'exam' && timeLeft > 0 && !examFinished) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleExamFinish('time_up');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentScreen, timeLeft, examFinished]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Calculate results
  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      } else if (answers[index] !== undefined) {
        wrong++;
      } else {
        unattempted++;
      }
    });
    
    return { correct, wrong, unattempted };
  };

  // Send email with results
  const sendEmailResults = async (results, finishReason) => {
    const templateParams = {
      student_name: studentName,
      student_email: studentEmail,
      correct_answers: results.correct,
      wrong_answers: results.wrong,
      unattempted_questions: results.unattempted,
      total_questions: questions.length,
      finish_reason: finishReason,
      percentage: ((results.correct / questions.length) * 100).toFixed(2),
      timestamp: new Date().toLocaleString(),
      exam_details: `
        Student Name: ${studentName}
        Student Email: ${studentEmail}
        Correct Answers: ${results.correct}
        Wrong Answers: ${results.wrong}
        Unattempted Questions: ${results.unattempted}
        Total Questions: ${questions.length}
        Score Percentage: ${((results.correct / questions.length) * 100).toFixed(2)}%
        Exam Finished: ${finishReason}
        Completed At: ${new Date().toLocaleString()}
        
        Question-wise Analysis:
        ${questions.map((q, index) => `
        Q${index + 1}: ${q.question}
        Student Answer: ${answers[index] !== undefined ? q.options[answers[index]] : 'Not attempted'}
        Correct Answer: ${q.options[q.correctAnswer]}
        Status: ${answers[index] === q.correctAnswer ? 'CORRECT' : answers[index] !== undefined ? 'WRONG' : 'UNATTEMPTED'}
        `).join('')}
      `
    };

    try {
      await emailjs.send(
        'service_3iob5r9', // Replace with your EmailJS service ID
        'template_9ru1ar2', // Replace with your EmailJS template ID
        templateParams
      );
      setEmailSent(true);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
      setEmailSent(false);
    }
  };

  // Finish exam
  const handleExamFinish = async (finishReason = 'manual') => {
    setExamFinished(true);
    const results = calculateResults();
    
    // Send email with results
    await sendEmailResults(results, finishReason);
    
    // Exit full screen safely
    await exitFullScreen();
    
    setCurrentScreen('results');
  };

  // Start exam
  const startExam = async () => {
    setCurrentScreen('exam');
    setExamFinished(false);
    await enterFullScreen();
  };

  // Reset exam
  const resetExam = () => {
    setCurrentScreen('nameEntry');
    setStudentName('');
    setStudentEmail('');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(3600);
    setShowCheatingWarning(false);
    setExamFinished(false);
    setEmailSent(false);
  };

  // Close cheating warning
  const closeCheatingWarning = () => {
    setShowCheatingWarning(false);
  };

  return (
    <div className="app">
      {/* Cheating Warning Modal */}
      {showCheatingWarning && (
        <div className="modal-overlay">
          <div className="modal-content cheating-warning">
            <div className="warning-icon">⚠️</div>
            <h2>Exam Terminated</h2>
            <p>Thank you for giving the exam. Unfortunately, you were caught attempting to exit full screen mode.</p>
            <p>Your exam has been submitted automatically. Results will be sent to your email.</p>
            <button onClick={closeCheatingWarning} className="btn btn-primary">
              View Results
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'nameEntry' && (
        <div className="screen name-entry">
          <div className="container">
            <div className="header">
              <h1>📝 Exam Portal</h1>
              <p>Welcome to the Online Examination System</p>
            </div>
            <div className="form-container">
              <h2>Enter Your Details</h2>
              <div className="input-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <label>Email Address:</label>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="form-input"
                />
              </div>
              <button 
                onClick={() => setCurrentScreen('rules')} 
                disabled={!studentName.trim() || !studentEmail.trim()}
                className="btn btn-primary btn-large"
              >
                Continue to Rules
              </button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'rules' && (
        <div className="screen rules">
          <div className="container">
            <div className="header">
              <h1>📋 Exam Rules & Regulations</h1>
              <p>Please read the instructions carefully before starting</p>
            </div>
            <div className="rules-container">
              <div className="rules-list">
                <div className="rule-item">
                  <div className="rule-icon">⏱️</div>
                  <div className="rule-content">
                    <h3>Time Limit</h3>
                    <p>You have 1 Hour to complete the exam</p>
                  </div>
                </div>
                <div className="rule-item">
                  <div className="rule-icon">🖥️</div>
                  <div className="rule-content">
                    <h3>Full Screen Mode</h3>
                    <p>The exam will automatically start in full screen mode</p>
                  </div>
                </div>
                <div className="rule-item">
                  <div className="rule-icon">🚫</div>
                  <div className="rule-content">
                    <h3>Strict Proctoring</h3>
                    <p>DO NOT exit full screen mode - it will terminate your exam</p>
                  </div>
                </div>
                <div className="rule-item">
                  <div className="rule-icon">🔍</div>
                  <div className="rule-content">
                    <h3>Navigation</h3>
                    <p>Use Next and Previous buttons to navigate between questions</p>
                  </div>
                </div>
                <div className="rule-item">
                  <div className="rule-icon">📧</div>
                  <div className="rule-content">
                    <h3>Results</h3>
                    <p>Results will be automatically sent to your email</p>
                  </div>
                </div>
              </div>
              
              <div className="student-info-card">
                <h3>Student Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{studentName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{studentEmail}</span>
                  </div>
                </div>
              </div>
              
              <div className="button-group">
                <button onClick={() => setCurrentScreen('nameEntry')} className="btn btn-secondary">
                  ← Back
                </button>
                <button onClick={startExam} className="btn btn-primary">
                  Start Exam Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'exam' && (
        <div className="screen exam">
          <div className="exam-header">
            <div className="exam-student-info">
              <div className="student-badge">
                <span className="student-icon">👤</span>
                <span>{studentName}</span>
              </div>
              <div className="email-badge">
                <span className="email-icon">📧</span>
                <span>{studentEmail}</span>
              </div>
            </div>
            <div className="timer-container">
              <div className="timer-circle">
                <span className="timer-text">{formatTime(timeLeft)}</span>
              </div>
              <div className="timer-label">Time Remaining</div>
            </div>
            <div className="question-progress">
              <span className="progress-text">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>

          <div className="question-container">
            <div className="question-header">
              <h2>Question {currentQuestionIndex + 1}</h2>
              <div className={`question-status ${answers[currentQuestionIndex] !== undefined ? 'answered' : 'unanswered'}`}>
                {answers[currentQuestionIndex] !== undefined ? '✓ Answered' : '✗ Unanswered'}
              </div>
            </div>
            
            <div className="question-text">
              {questions[currentQuestionIndex].question}
            </div>
            
            <div className="options-grid">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div 
                  key={index}
                  className={`option-card ${answers[currentQuestionIndex] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="option-header">
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="option-text">{option}</span>
                  </div>
                  {answers[currentQuestionIndex] === index && (
                    <div className="selected-indicator">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="exam-navigation">
            <button 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="btn btn-navigation btn-prev"
            >
              ← Previous
            </button>
            
            <div className="navigation-center">
              <button 
                onClick={() => handleExamFinish('manual')}
                className="btn btn-warning"
              >
                🏁 Finish Exam
              </button>
            </div>
            
            <button 
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="btn btn-navigation btn-next"
            >
              Next →
            </button>
          </div>

          <div className="exam-footer">
            <div className="warning-banner">
              <span className="warning-icon">⚠️</span>
              <span className="warning-text">
                WARNING: Do not exit full screen - Your exam will be terminated immediately
              </span>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'results' && (
        <div className="screen results">
          <div className="container">
            <div className="header">
              <h1>🎉 Exam Results</h1>
              <p>Your performance summary</p>
            </div>
            <div className="results-container">
              <div className="results-header">
                <div className="student-summary">
                  <h2>Student Details</h2>
                  <div className="student-details">
                    <div className="detail-item">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{studentName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{studentEmail}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Results:</span>
                      <span className="detail-value">
                        {emailSent ? '✅ Sent to your email' : '❌ Failed to send - Please contact admin'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="score-cards">
                <div className="score-card correct-card">
                  <div className="score-icon">✅</div>
                  <div className="score-content">
                    <h3>Correct Answers</h3>
                    <div className="score-number">{calculateResults().correct}</div>
                    <div className="score-label">Well done!</div>
                  </div>
                </div>
                
                <div className="score-card wrong-card">
                  <div className="score-icon">❌</div>
                  <div className="score-content">
                    <h3>Wrong Answers</h3>
                    <div className="score-number">{calculateResults().wrong}</div>
                    <div className="score-label">Needs improvement</div>
                  </div>
                </div>
                
                <div className="score-card unattempted-card">
                  <div className="score-icon">❓</div>
                  <div className="score-content">
                    <h3>Unattempted</h3>
                    <div className="score-number">{calculateResults().unattempted}</div>
                    <div className="score-label">Missed questions</div>
                  </div>
                </div>
                
                <div className="score-card total-card">
                  <div className="score-icon">📊</div>
                  <div className="score-content">
                    <h3>Total Questions</h3>
                    <div className="score-number">{questions.length}</div>
                    <div className="score-label">Exam length</div>
                  </div>
                </div>
              </div>

              <div className="performance-summary">
                <div className="performance-chart">
                  <div className="chart-container">
                    <div 
                      className="chart-fill correct-fill"
                      style={{width: `${(calculateResults().correct / questions.length) * 100}%`}}
                    ></div>
                    <div 
                      className="chart-fill wrong-fill"
                      style={{width: `${(calculateResults().wrong / questions.length) * 100}%`}}
                    ></div>
                    <div 
                      className="chart-fill unattempted-fill"
                      style={{width: `${(calculateResults().unattempted / questions.length) * 100}%`}}
                    ></div>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color correct-color"></span>
                      <span>Correct ({calculateResults().correct})</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color wrong-color"></span>
                      <span>Wrong ({calculateResults().wrong})</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color unattempted-color"></span>
                      <span>Unattempted ({calculateResults().unattempted})</span>
                    </div>
                  </div>
                </div>
                
                <div className="percentage-score">
                  <div className="percentage-circle">
                    <span className="percentage-text">
                      {((calculateResults().correct / questions.length) * 100).toFixed(1)}%
                    </span>
                    <div className="percentage-label">Overall Score</div>
                  </div>
                </div>
              </div>

              <div className="results-actions">
                <button onClick={resetExam} className="btn btn-primary btn-large">
                  📝 Take Another Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;