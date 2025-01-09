import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, Globe } from 'lucide-react';

type BettingPlatform = 
  | 'sportybet' | 'bet9ja' | 'betking' | '1xbet' | 'nairabet' 
  | 'betano' | 'stake' | 'bet365' | 'william_hill' | 'unibet' 
  | 'betway' | 'pinnacle' | 'draftkings';

function App() {
  const [input, setInput] = useState('');
  const [fromPlatform, setFromPlatform] = useState<BettingPlatform>('sportybet');
  const [toPlatform, setToPlatform] = useState<BettingPlatform>('bet9ja');
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState('');

  const platforms = {
    // African Platforms
    sportybet: { name: 'SportyBet', prefix: 'B', region: 'africa' },
    bet9ja: { name: 'Bet9ja', prefix: '~', region: 'africa' },
    betking: { name: 'BetKing', prefix: 'K', region: 'africa' },
    '1xbet': { name: '1xBet', prefix: 'X', region: 'international' },
    nairabet: { name: 'NairaBet', prefix: 'N', region: 'africa' },
    // European Platforms
    betano: { name: 'Betano', prefix: 'BT', region: 'europe' },
    bet365: { name: 'Bet365', prefix: '365', region: 'international' },
    william_hill: { name: 'William Hill', prefix: 'WH', region: 'europe' },
    unibet: { name: 'Unibet', prefix: 'UB', region: 'europe' },
    // International Platforms
    stake: { name: 'Stake', prefix: 'ST', region: 'international' },
    betway: { name: 'Betway', prefix: 'BW', region: 'international' },
    pinnacle: { name: 'Pinnacle', prefix: 'PIN', region: 'international' },
    draftkings: { name: 'DraftKings', prefix: 'DK', region: 'america' }
  };

  const convertCode = (code: string, from: BettingPlatform, to: BettingPlatform) => {
    // Remove platform-specific prefixes and clean the code
    const fromPrefix = platforms[from].prefix;
    const cleanCode = code.replace(new RegExp(`^${fromPrefix}`), '')
                          .replace(/[^0-9A-Z]/g, '');
    
    if (!cleanCode) return '';

    // Add the appropriate prefix based on target platform
    return `${platforms[to].prefix}${cleanCode}`;
  };

  const handleConvert = () => {
    const converted = convertCode(input, fromPlatform, toPlatform);
    setResult(converted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPlatformOptions = (region?: string) => {
    return Object.entries(platforms)
      .filter(([_, info]) => !region || info.region === region)
      .map(([key, info]) => (
        <option key={key} value={key}>{info.name}</option>
      ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <Globe className="w-8 h-8" />
            SteezeLab
          </h1>
          <p className="text-xl text-blue-300">Global Betting Code Converter</p>
        </header>

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From Platform</label>
                <select
                  value={fromPlatform}
                  onChange={(e) => setFromPlatform(e.target.value as BettingPlatform)}
                  className="w-full bg-white/5 rounded-lg border border-blue-500/30 p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <optgroup label="African Platforms">
                    {renderPlatformOptions('africa')}
                  </optgroup>
                  <optgroup label="European Platforms">
                    {renderPlatformOptions('europe')}
                  </optgroup>
                  <optgroup label="International Platforms">
                    {renderPlatformOptions('international')}
                  </optgroup>
                  <optgroup label="American Platforms">
                    {renderPlatformOptions('america')}
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To Platform</label>
                <select
                  value={toPlatform}
                  onChange={(e) => setToPlatform(e.target.value as BettingPlatform)}
                  className="w-full bg-white/5 rounded-lg border border-blue-500/30 p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <optgroup label="African Platforms">
                    {renderPlatformOptions('africa')}
                  </optgroup>
                  <optgroup label="European Platforms">
                    {renderPlatformOptions('europe')}
                  </optgroup>
                  <optgroup label="International Platforms">
                    {renderPlatformOptions('international')}
                  </optgroup>
                  <optgroup label="American Platforms">
                    {renderPlatformOptions('america')}
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Enter Betting Code</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Enter code to convert... (e.g., ${platforms[fromPlatform].prefix}12345678)`}
                className="w-full bg-white/5 rounded-lg border border-blue-500/30 p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              />
            </div>

            <button
              onClick={handleConvert}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowRightLeft size={20} />
              Convert Code
            </button>

            {result && (
              <div className="bg-white/5 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-300">Converted Code:</p>
                    <p className="text-2xl font-bold font-mono">{result}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center mt-12 text-sm text-blue-300">
          <p>© 2024 SteezeLab. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;