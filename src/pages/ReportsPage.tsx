import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getParkingStatistics } from "../services/LogsService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();

  // State to hold vehicle data and earnings
  const [vehicleData, setVehicleData] = useState({
    exitedLightVehicles: 0,
    exitedHeavyVehicles: 0,
    totalEntered: 0,
    totalExited: 0,
    vehiclesInside: 0,
  });

  const [earningsData, setEarningsData] = useState({
    totalFixedCost: 0,
    totalAdditionalCost: 0,
    totalEarning: 0,
  });

  function BtPrint(prn: any) {
    var S = "#Intent;scheme=rawbt;";
    var P = "package=ru.a402d.rawbtprinter;end;";
    var textEncoded = encodeURIComponent(prn);
    window.location.href = "intent:" + textEncoded + S + P;
  }


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const data = await getParkingStatistics();
        setVehicleData({
          exitedLightVehicles: data.exitedLightVehicles || 0,
          exitedHeavyVehicles: data.exitedHeavyVehicles || 0,
          totalEntered: data.totalEntered || 0,
          totalExited: data.totalExited || 0,
          vehiclesInside: data.vehiclesInside || 0,
        });

        setEarningsData({
          totalFixedCost: data.totalFixedCost || 0,
          totalAdditionalCost: data.totalAdditionalCost || 0,
          totalEarning: data.totalCost || 0,
        });
        generateReceiptContent();
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to generate PDF
  const generatePDF = async () => {
    const element = document.getElementById("reportContent");
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("report.pdf");
    }
  };

  const generateReceiptContent = () =>
    `Keppetipola Economic Centre
       Vehicle Parking Report
--------------------------------------
Excited Light Vehicles    : ${vehicleData?.exitedLightVehicles}
Excited Heavy Vehicles    : ${vehicleData?.exitedHeavyVehicles}
Total Vehicles Entered    : ${vehicleData?.totalEntered}
Total Vehicles Exited     : ${vehicleData?.totalExited}
Remaining Vehicles Inside : ${vehicleData?.vehiclesInside}
**************************************
Total Fixed Earning       :  ${earningsData?.totalFixedCost.toFixed(2)}
Total Additional Earning  :  ${earningsData?.totalAdditionalCost.toFixed(2)}
TOTAL EARNING             :  ${earningsData?.totalEarning.toFixed(2)}
**************************************
            Thank you!`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-2">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-indigo-800">Reports</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-3 py-2 w-20 flex justify-center text-center ml-auto bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
          >
            Back
          </button>
        </div>

        {/* Loading and Error Handling */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            {/* Content to export */}
            <div id="reportContent">
              {/* Vehicle Count */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h2 className="text-sm font-bold text-blue-800 mb-2">Daily Vehicle Count</h2>
                <table className="w-full text-xs">
                  <thead className="border-b border-blue-200">
                    <tr>
                      <th className="text-left pb-1 text-blue-700">Metric</th>
                      <th className="text-right pb-1 text-blue-700">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-blue-100">
                      <td className="py-1 text-blue-900">Exited Light Vehicles</td>
                      <td className="text-right text-blue-900">{vehicleData.exitedLightVehicles}</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="py-1 text-blue-900">Exited Heavy Vehicles</td>
                      <td className="text-right text-blue-900">{vehicleData.exitedHeavyVehicles}</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="py-1 text-blue-900">Total Entered</td>
                      <td className="text-right text-blue-900">{vehicleData.totalEntered}</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="py-1 text-blue-900">Total Exited</td>
                      <td className="text-right text-blue-900">{vehicleData.totalExited}</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="py-1 text-blue-900">Vehicles Inside</td>
                      <td className="text-right text-blue-900">{vehicleData.vehiclesInside}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Earnings */}
              <div className="bg-green-50 rounded-lg p-4">
                <h2 className="text-sm font-bold text-green-800 mb-2">Earnings</h2>
                <table className="w-full text-xs">
                  <thead className="border-b border-green-200">
                    <tr>
                      <th className="text-left pb-1 text-green-700">Metric</th>
                      <th className="text-right pb-1 text-green-700">Earnings (LKR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-green-100">
                      <td className="py-1 text-green-900">Total Fixed Earning</td>
                      <td className="text-right text-green-900">{earningsData.totalFixedCost}</td>
                    </tr>
                    <tr className="border-b border-green-100">
                      <td className="py-1 text-green-900">Total Additional Earning</td>
                      <td className="text-right text-green-900">{earningsData.totalAdditionalCost}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold text-purple-900">Total Earnings</td>
                      <td className="text-right font-semibold text-purple-900">{earningsData.totalEarning}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Generate PDF Button */}
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={generatePDF}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Generate PDF
              </button>
              <button
                  onClick={() => {
                    const prePrintElement = document.getElementById("pre_print");
                    if (prePrintElement) {
                      BtPrint(prePrintElement.innerText);
                    }
                  }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Generate PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
