import React from "react";

const DataTable = ({ columns, data, rowClassName, emptyMessage }) => {
    return (
        <div className="overflow-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`px-4 py-2 text-left text-sm font-semibold text-gray-700 ${col.headerClassName || ""
                                    }`}
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
                            <td
                                colSpan={columns.length}
                                className="text-center py-4 text-gray-500"
                            >
                                {emptyMessage || "No data available."}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
