import { useCallback, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function useRecipePdf() {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPdf = useCallback(async (elementRef, filename = 'recipe') => {
    if (!elementRef?.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(elementRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save(`${filename}.pdf`);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { downloadPdf, isGenerating };
}
