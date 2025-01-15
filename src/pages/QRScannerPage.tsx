import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import {ExitEntry} from "../services/LogsService";


const QRScannerPage = () => {
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [qrData, setQrData] = useState<QRData | null>(null);
  const handleClose = () => {
    navigate(-1);
  };

  interface QRData {
    vehicleType: string;
    totalHours: number;
    additionalHours: number;
    fixedCost: number;
    additionalCost: number;
    totalCost: number;
  }

  function BtPrint(prn:any) {
    var S = "#Intent;scheme=rawbt;";
    var P = "package=ru.a402d.rawbtprinter;end;";
    var textEncoded = encodeURI(prn);
    window.location.href = "intent:" + textEncoded + S + P;
  }

  const handleScan = (data: string) => {
    console.log("Scanned QR:", data);
    try {
      ExitEntry(data).then((result: QRData) => {
        setQrData(result);
        const prePrintElement = document.getElementById('pre_print');
        if (prePrintElement) {
          BtPrint(prePrintElement.innerText);
        }
        alert(`Scanned QR Code: ${JSON.stringify(result)}`);
      }).catch((error) => {
        alert("Invalid QR Code");
      });
    } catch (error) {
      alert("Invalid QR Code");
    }
    navigate(-1);
  };

  const generateReceiptContent = () => `
    Keppetipola Economic Centre
    --------------------------------------
    Vehicle Type:               ${qrData?.vehicleType}
    Total Hours:                ${qrData?.totalHours}
    Additional Hours:           ${qrData?.additionalHours}
    Fixed Cost:                 ${qrData?.fixedCost.toFixed(2)}
    Additional Cost:            ${qrData?.additionalCost.toFixed(2)}
    **************************************
    TOTAL COST:                 ${qrData?.totalCost.toFixed(2)}
    **************************************
                  Thank you!
      `;

  useEffect(() => {
    // Initialize scanner only once
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");

      // Start scanning
      scannerRef.current
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (scannerRef.current) {
              scannerRef.current.stop().then(() => {
              handleScan(decodedText);
              });
            }
          },
          undefined
        )
        .catch((err) => {
          console.error("Scanner error:", err);
        });
    }

    // Cleanup
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [navigate]);


  return (
    <><div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <button
            onClick={handleClose}
            className="text-sm px-3 py-2 w-20 flex justify-center text-center ml-auto bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
          >
            Back
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-center">
            Scan QR Code
          </h1>
        </div>

        {/* Scanner */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <div className="relative">
            <div
              id="reader"
              className="w-full rounded-lg overflow-hidden"
              style={{ minHeight: "300px" }}
            ></div>
          </div>
        </div>
      </div>
    </div><div>
    <pre id="pre_print" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", paddingLeft: "20px" }}>
        {generateReceiptContent()}
      </pre></div></>
  );
};

export default QRScannerPage;
