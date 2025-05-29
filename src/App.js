import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [smiles, setSmiles] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post('https://drug-design-backend-4.onrender.com/predict/vit', {
        SMILES: smiles,
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Drug Design ViT Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="smilesInput" className="block text-sm font-medium text-gray-700 mb-1">
              Enter SMILES:
            </label>
            <input
              type="text"
              id="smilesInput"
              value={smiles}
              onChange={(e) => setSmiles(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="e.g., CCO"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>

        {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}

        {result && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Prediction Result</h2>
            <p className="text-gray-700"><strong>SMILES:</strong> {result.smiles}</p>
            <p className="text-gray-700"><strong>Activity:</strong> {result.activity}</p>
            {result.image && (
              <div className="mt-3">
                <strong className="block mb-1 text-gray-700">Structure:</strong>
                <img
                  src={`data:image/png;base64,${result.image}`}
                  alt="Molecular Structure"
                  className="rounded-lg shadow-md max-w-xs"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
 
