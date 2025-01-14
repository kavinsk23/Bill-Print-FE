import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

interface QRData {
  qrString: string;
  vehicleType: string;
  timestamp: string;
}

const VehicleTypePage = () => {
  const navigate = useNavigate();
  const [qrData, setQRData] = useState<QRData | null>(null);

  const handleVehicleSelect = (type: string) => {
    // Get current date in Sri Lanka time zone
    const now = new Date();
    const sriLankaTime = now.toLocaleString("en-US", {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Generate a unique ID
    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Format the date string
    const formattedDate = sriLankaTime
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2")
      .replace(",", "")
      .replace(/\s+/g, "T");

    const qrString = `${type}_${formattedDate}_${uniqueId}`;

    setQRData({
      qrString,
      vehicleType: type,
      timestamp: formattedDate,
    });

    // Delay printing slightly to ensure QR code is rendered
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-4 print:hidden">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-4 sm:mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-sm px-3 py-2 w-20 flex justify-center text-center ml-auto bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
            >
              Back
            </button>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-center">
              Select Vehicle Type
            </h1>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Light Vehicle Card */}
            <div
              onClick={() => handleVehicleSelect("LIGHT")}
              className="bg-gradient-to-br from-red-300 to-red-400 rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center justify-center h-32 sm:h-48">
                <svg
                  className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <h2 className="text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                  Light Vehicle
                </h2>
                <p className="text-xs sm:text-sm text-white mb-1">Rate:</p>
                <p className="text-sm sm:text-lg font-semibold text-white">
                  20 LKR/hr
                </p>
              </div>
            </div>

            {/* Heavy Vehicle Card */}
            <div
              onClick={() => handleVehicleSelect("HEAVY")}
              className="bg-gradient-to-br from-stone-700 to-stone-900 rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center justify-center h-32 sm:h-48">
                <svg
                  className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <h2 className="text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                  Heavy Vehicle
                </h2>
                <p className="text-xs sm:text-sm text-white mb-1">Rate:</p>
                <p className="text-sm sm:text-lg font-semibold text-white">
                  50 LKR/hr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {qrData && (
        <div
          className="hidden print:block"
          style={{
            width: "80mm",
            padding: "8px",
            pageBreakAfter: "always",
            pageBreakBefore: "always",
          }}
        >
          <style type="text/css" media="print">
            {`
        @page {
          size: 80mm auto;  /* Set page size to 80mm width */
          margin: 0;        /* Remove default margins */
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `}
          </style>
          <div className="flex flex-col items-center">
            <QRCodeSVG
              value={qrData.qrString}
              size={160}
              level="H"
              includeMargin={false}
            />
            <p className="text-center mt-2 text-sm font-semibold">
              {qrData.vehicleType === "HEAVY"
                ? "Heavy Vehicle"
                : "Light Vehicle"}
            </p>
            <p className="text-center mt-1 text-xs">
              {new Date(qrData.timestamp).toLocaleString("en-US", {
                timeZone: "Asia/Colombo",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleTypePage;
