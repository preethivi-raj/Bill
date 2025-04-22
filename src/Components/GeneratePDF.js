import React from "react";
import { jsPDF } from "jspdf";

const GeneratePDF = ({
  customerName,
  customerAge,
  customerPhone,
  date,
  products,
  totalAmount,
  amountPaid,
  balance,
}) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Shop Header - Centered
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 0, 0);
    doc.text("KONDAL REDDY EYE CARE & OPTICALS", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Opp: Old Municipality, Main Road, TOOPRAN, Dist. Medak", pageWidth / 2, 28, { align: "center" });
    doc.text("Optometrist: CH KONDAL REDDY", pageWidth / 2, 33, { align: "center" });
    doc.text("Contact No.: 9441679040", pageWidth / 2, 38, { align: "center" });
    doc.text("D. Opto (S.D.E.H), ICLEAP (L.V.P.E.H)", pageWidth / 2, 43, { align: "center" });
    doc.text("(Regd. No. 969/Opthal/TGPMB)", pageWidth / 2, 48, { align: "center" });
    doc.text("Refraction & Contact Lens Specialist", pageWidth / 2, 53, { align: "center" });

    // Customer Info
    doc.setFontSize(12);
    let yPosition = 65;
    doc.text(`Name: ${customerName || "-"}`, 14, yPosition);
    doc.text(`Age: ${customerAge || "-"}`, pageWidth / 2, yPosition);
    doc.text(`Phone: ${customerPhone || "-"}`, 150, yPosition);
    yPosition += 8;
    doc.text(`Date: ${date}`, 14, yPosition);

    // Separator Line
    yPosition += 8;
    doc.setLineWidth(0.5);
    doc.line(14, yPosition, 195, yPosition);
    yPosition += 10;

    // Products Header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Product", 20, yPosition);
    doc.text("Rate", 140, yPosition);
    yPosition += 8;

    // Product List Table
    doc.setFontSize(12);
    products.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name}`, 20, yPosition);
      doc.text(`${item.price.toFixed(2)}`, 140, yPosition);
      yPosition += 8;
    });

    yPosition += 8;
    doc.setLineWidth(0.5);
    doc.line(14, yPosition, 195, yPosition);
    yPosition += 10;

    // Amount Summary - Bolder for emphasis
    doc.setFontSize(14);
    doc.text("Total:", 20, yPosition);
    doc.text(`${totalAmount.toFixed(2)}`, 140, yPosition);
    yPosition += 8;

    doc.text("Paid:", 20, yPosition);
    doc.text(`${amountPaid.toFixed(2)}`, 140, yPosition);
    yPosition += 8;

    doc.text("Balance:", 20, yPosition);
    doc.text(`${balance.toFixed(2)}`, 140, yPosition);

    // Footer message at the bottom of the page
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for shopping with KR OPTICALS!", pageWidth / 2, pageHeight - 20, { align: "center" });
    doc.text("Visit us again!", pageWidth / 2, pageHeight - 15, { align: "center" });

    // Save the PDF
    doc.save(`${customerName || "bill"}-${date}.pdf`);
  };

  return (
    <button className="btn btn-accent w-full" onClick={generatePDF}>
      📄 Generate Bill (PDF)
    </button>
  );
};

export default GeneratePDF;
