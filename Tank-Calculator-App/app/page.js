'use client'
export default function ATFTankCalculator() {
  const calibrationTable = [
    { dip: 135.2, volume: 10500 },
    { dip: 142.6, volume: 11000 },
    { dip: 150.0, volume: 11500 },
    { dip: 157.4, volume: 12000 },
    { dip: 164.8, volume: 12500 },
    { dip: 172.2, volume: 13000 },
  ];

  const [dip, setDip] = React.useState("");
  const [result, setResult] = React.useState(null);
  const [history, setHistory] = React.useState([]);

  const calculateVolume = () => {
    const measuredDip = parseFloat(dip);

    if (isNaN(measuredDip)) {
      alert("Please enter a valid dip value");
      return;
    }

    let lower = null;
    let upper = null;

    for (let i = 0; i < calibrationTable.length - 1; i++) {
      if (
        measuredDip >= calibrationTable[i].dip &&
        measuredDip <= calibrationTable[i + 1].dip
      ) {
        lower = calibrationTable[i];
        upper = calibrationTable[i + 1];
        break;
      }
    }

    if (!lower || !upper) {
      alert("Dip value is outside calibration range");
      return;
    }

    const volume =
      lower.volume +
      ((measuredDip - lower.dip) / (upper.dip - lower.dip)) *
        (upper.volume - lower.volume);

    const finalVolume = volume.toFixed(2);

    setResult(finalVolume);

    const entry = {
      dip: measuredDip,
      volume: finalVolume,
      time: new Date().toLocaleString(),
    };

    setHistory([entry, ...history]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-center mb-2">
            ATF Tank Volume Calculator
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Dip-based Aviation Turbine Fuel Volume Interpolation System
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Enter Tank Dip (cm)
                </label>

                <input
                  type="number"
                  step="0.01"
                  placeholder="Example: 136.4"
                  value={dip}
                  onChange={(e) => setDip(e.target.value)}
                  className="w-full border rounded-2xl p-4 text-lg"
                />
              </div>

              <button
                onClick={calculateVolume}
                className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition"
              >
                Calculate Volume
              </button>

              {result && (
                <div className="bg-green-100 border border-green-300 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Calculated ATF Volume
                  </h2>

                  <p className="text-5xl font-bold text-green-700">
                    {result} L
                  </p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Calibration Table
              </h2>

              <div className="overflow-auto rounded-2xl border">
                <table className="w-full text-left">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-4">Dip (cm)</th>
                      <th className="p-4">Volume (L)</th>
                    </tr>
                  </thead>

                  <tbody>
                    {calibrationTable.map((row, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-4">{row.dip}</td>
                        <td className="p-4">{row.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Calculation History</h2>

          {history.length === 0 ? (
            <p className="text-gray-500">No calculations yet.</p>
          ) : (
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-4">Time</th>
                    <th className="p-4">Dip</th>
                    <th className="p-4">Volume</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4">{item.time}</td>
                      <td className="p-4">{item.dip} cm</td>
                      <td className="p-4">{item.volume} L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
