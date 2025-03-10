import React from "react";
import { MobileOrderCard } from "./MobileOrderCard";

const DataTable = ({ columns, data, rowClassName, emptyMessage, mobileRender, onRowClick, ...props }) => { // Añade onRowClick
    return (
        <div>
            <div className="md:hidden space-y-3">
                {data?.map((item, index) => (
                    mobileRender ? mobileRender(item) : (
                        <MobileOrderCard key={index} order={item} />
                    )
                ))}
            </div>
            <div className="hidden md:block">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-4 py-2 text-left text-sm font-semibold text-gray-700 ${col.headerClassName || ""}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`border-b hover:bg-gray-50 ${rowClassName || ""}`}
                                    onClick={() => onRowClick(row)} // ← Agrega esto
                                >
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`px-4 py-2 text-sm ${col.cellClassName || ""}`}
                                        >
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                                    {emptyMessage || "No data available."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default DataTable;
