import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  // Voting data
  const votingData = {
    labels: ['Best Hackathon Project', 'Best Design', 'Best Innovation'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 7], // Replace with real voting data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const totalVotes = votingData.datasets[0].data.reduce((a, b) => a + b, 0); // Total votes calculation

  const [walletConnected, setWalletConnected] = useState(false);
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [darkMode] = useState(false);
  const setDarkMode = true;
  const [helpModal, setHelpModal] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  const handleVote = (option) => {
    setSelectedOption(option);
    setVoted(true);
    // Add logic for submitting the vote (e.g., calling smart contract)
  };

  const toggleHelpModal = () => {
    setHelpModal(!helpModal);
  };

  const showTooltip = () => {
    setTooltipVisible(true); // Show tooltip
  };

  const hideTooltip = () => {
    setTooltipVisible(false); // Hide tooltip
  };
  

  const funFacts = [
    "Did you know? Blockchain was invented in 2008 by a person (or group) using the name Satoshi Nakamoto.",
    "Fun fact: Hackathons are typically 24-48 hours long, bringing developers together to build creative solutions!",
    "Voting dApps can revolutionize transparent elections by ensuring data integrity with blockchain.",
  ];
  
  const [currentFact, setCurrentFact] = useState('');
  
  const showRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    setCurrentFact(funFacts[randomIndex]);
  };
  

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="App-header">
        <h1>Decentralized Voting Platform</h1>
        {!walletConnected ? (
          <button onClick={handleConnectWallet} className="connect-button">
            Connect Wallet
          </button>
        ) : (
          <>
            <p>Wallet Connected!</p>
            <button onClick={toggleHelpModal} className="help-button">
              How to use?
            </button>
            
          </>
        )}
      </header>
      <div className="help-button-container">
        <button className="help-button" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>HELP</button>
        {tooltipVisible && <div className="tooltip">Click on "Connect Wallet" to connect your wallet. This allows you to participate in the voting.</div>}
      </div>

      <div className="fun-fact-container">
        <button onClick={showRandomFact} className="fun-fact-button">
          Show Fun Fact
        </button>
        {currentFact && <p className="fun-fact">{currentFact}</p>}
      </div>


      {walletConnected && (
        <div className="voting-section">
          <h2>Vote for Your Favorite Category</h2>
          {['Best Hackathon Project', 'Best Design', 'Best Innovation'].map((category, index) => (
            <button
              key={index}
              onClick={() => handleVote(category)}
              className="vote-button"
            >
              {category}
            </button>
          ))}

          {voted && (
            <div className="vote-confirmation">
              <p>You voted for: {selectedOption}</p>
              <div className="vote-animation">🎉 Thank you for voting! 🎉</div>
            </div>
          )}

          {/* Live Voting Stats */}
          <div className="live-stats">
            <h4>Live Voting Stats</h4>
            <p>Total Votes Cast: {totalVotes}</p>
            <p>Best Hackathon Project: {((votingData.datasets[0].data[0] / totalVotes) * 100).toFixed(2)}%</p>
            <p>Best Design: {((votingData.datasets[0].data[1] / totalVotes) * 100).toFixed(2)}%</p>
            <p>Best Innovation: {((votingData.datasets[0].data[2] / totalVotes) * 100).toFixed(2)}%</p>
          </div>

          {/* Pie Chart */}
          <div className="chart-section">
            <h3>Voting Results</h3>
            <div className="chart-container">
              <Pie data={votingData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      )}
      {walletConnected && (
        <div>
          <button onClick={toggleHelpModal} className="help-button">
            How to use?
          </button>
        </div>
      )}

      {helpModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleHelpModal}>
              &times;
            </span>
            <h2>How to Use the Platform</h2>
            <p>1. Connect your wallet to participate in voting.</p>
            <p>2. Select the category you'd like to vote in.</p>
            <p>3. View the live voting results after casting your vote.</p>
          </div>
        </div>
)}

      

      {/* About Section */}
      <footer>
        <div className="about-section">
          <h2>About the Voting Platform</h2>
          <p>
            This platform allows hackathon participants to vote on different
            categories such as Best Hackathon Project, Best Design, and Best
            Innovation. Connect your wallet to participate in the voting process and view real-time results.
          </p>
        </div>
      </footer>

      

      <footer className="footer">
        <p>Built with caffeine and code by Anjali Sharma</p>
        <a href="https://github.com/anjaliisharmaa/decentralised-voting-platform" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </footer>

      <div className="App">
        <div className="animated-shape animated-shape-1"></div>
        <div className="animated-shape animated-shape-2"></div>
        <div className="animated-shape animated-shape-3"></div>

        {/* Rest of the content */}
      </div>

      

    </div>



  );
}



export default App;
