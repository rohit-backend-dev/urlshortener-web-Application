import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";

const QRGenerator = ({ url, size = 160, color = "#000000", open, setOpen }) => {
  const canvasRef = useRef();

  const convertToImage = async () => {
    const svg = canvasRef.current.querySelector("svg");
    if (!svg) return null;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    return new Promise(resolve => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    });
  };

  const downloadQR = async () => {
    const png = await convertToImage();
    if (!png) return;
    const a = document.createElement("a");
    a.href = png;
    a.download = "qr-code.png";
    a.click();
  };

  const printQR = async () => {
    const png = await convertToImage();
    const win = window.open("");
    win.document.write(`<img src="${png}" onload="window.print();window.close()" />`);
  };

  const downloadPDF = async () => {
    const png = await convertToImage();
    const pdf = new jsPDF();
    pdf.text("QR Code", 10, 10);
    pdf.addImage(png, "PNG", 50, 30, 100, 100);
    pdf.save("QR-Code.pdf");
  };

  const shareQR = async () => {
    const png = await convertToImage();
    if (navigator.share) {
      const blob = await (await fetch(png)).blob();
      const file = new File([blob], "qr-code.png", { type: "image/png" });
      try {
        await navigator.share({
          title: "QR Code",
          text: url,
          files: [file]
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);
      alert("Sharing not supported on desktop. Link copied.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-[320px] text-center animate-slideUp">

        <h2 className="text-lg font-semibold mb-3">QR Code</h2>

        <div ref={canvasRef} className="p-3 border rounded-lg flex justify-center">
          <QRCode value={url} size={size} fgColor={color} />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button onClick={downloadQR} className="btn bg-green-600 hover:bg-green-700 text-white">Download PNG</button>
          <button onClick={downloadPDF} className="btn bg-orange-600 hover:bg-orange-700 text-white">Download PDF</button>
          <button onClick={printQR} className="btn bg-gray-700 hover:bg-gray-800 text-white">Print QR</button>
          <button onClick={shareQR} className="btn bg-blue-600 hover:bg-blue-700 text-white">Share QR</button>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="mt-4 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>

      <style>{`
        .animate-fadeIn { animation: fadeIn .3s ease forwards; }
        .animate-slideUp { animation: slideUp .3s ease forwards; }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0;} to{transform:translateY(0);opacity:1;} }
      `}</style>
    </div>
  );
};

export default QRGenerator;
