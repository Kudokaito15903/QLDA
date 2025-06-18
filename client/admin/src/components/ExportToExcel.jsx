// components/ExportData.jsx
import React from 'react';
import * as XLSX from 'xlsx';
import { PiExport } from "react-icons/pi";

const ExportToExcel = ({ data, columns, fileName = 'exported_data.xlsx', sheetName = 'Sheet1' }) => {
    const exportToExcel = () => {
        try {
            // Chuyển đổi dữ liệu sang định dạng phù hợp theo cột đã cho
            const exportData = data.map(item => {
                const exportItem = {};
                columns.forEach((col) => {
                    exportItem[col.header] = item[col.accessor] || 'Not Available';
                });
                return exportItem;
            });

            // Tạo worksheet
            const ws = XLSX.utils.json_to_sheet(exportData);

            // Tạo workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, sheetName);

            // Xuất file
            XLSX.writeFile(wb, fileName);
        } catch (error) {
            console.error("Export error:", error);
        }
    };

    return (
        <div
            className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700"
            onClick={exportToExcel}
        >
            <PiExport />
            <h2>Export</h2>
        </div>
    );
};

export default ExportToExcel;
