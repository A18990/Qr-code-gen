import React, { useState, useRef } from 'react';
import { BulkRowItem, QRStylingConfig } from '../types';
import { parseCsvFile, buildBulkRowItems, SAMPLE_CSV_CONTENT } from '../utils/csvParser';
import { exportBulkZip, triggerDownload } from '../utils/zipExporter';
import { generatePngBlob, generateSvgBlob } from '../utils/qrRenderer';
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  FileArchive,
  RefreshCw,
  X,
  FileText,
  Sliders,
  Sparkles,
  Shield,
  Layers,
} from 'lucide-react';

interface BulkGeneratorProps {
  config: QRStylingConfig;
}

export const BulkGenerator: React.FC<BulkGeneratorProps> = ({ config }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<Record<string, string>[]>([]);
  const [contentColumn, setContentColumn] = useState<string>('');
  const [filenameColumn, setFilenameColumn] = useState<string>('');
  const [items, setItems] = useState<BulkRowItem[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'svg'>('png');
  const [progress, setProgress] = useState<{
    current: number;
    total: number;
    percent: number;
    name: string;
  }>({ current: 0, total: 0, percent: 0, name: '' });
  const [cancelRequested, setCancelRequested] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      alert('Please upload a valid CSV file.');
      return;
    }

    setIsParsing(true);
    setStatusMessage(null);
    setCsvFile(file);

    const result = await parseCsvFile(file);
    setIsParsing(false);

    if (result.errors.length > 0 && result.rows.length === 0) {
      alert(`CSV parsing error: ${result.errors[0]}`);
      return;
    }

    setHeaders(result.headers);
    setRawRows(result.rows);

    // Auto-detect best candidate column for content (URL, link, content, etc.)
    const autoContent =
      result.headers.find((h) =>
        /url|link|qr|content|text|destination/i.test(h)
      ) || result.headers[0] || '';

    // Auto-detect filename column (name, title, id, label)
    const autoFilename =
      result.headers.find(
        (h) => h !== autoContent && /name|title|id|label|item|slug/i.test(h)
      ) || '';

    setContentColumn(autoContent);
    setFilenameColumn(autoFilename);

    if (autoContent) {
      const built = buildBulkRowItems(result.rows, autoContent, autoFilename);
      setItems(built);
    }
  };

  const handleColumnChange = (newContentCol: string, newFilenameCol: string) => {
    setContentColumn(newContentCol);
    setFilenameColumn(newFilenameCol);
    if (newContentCol && rawRows.length > 0) {
      const built = buildBulkRowItems(rawRows, newContentCol, newFilenameCol);
      setItems(built);
    }
  };

  const handleToggleRow = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = (select: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.isValid ? { ...item, selected: select } : item))
    );
  };

  const handleDownloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    triggerDownload(blob, 'codemitra-bulk-sample.csv');
  };

  const handleExportZip = async () => {
    const selectedItems = items.filter((i) => i.selected && i.isValid);
    if (selectedItems.length === 0) {
      alert('Please select at least one valid row to export.');
      return;
    }

    setIsExporting(true);
    setCancelRequested(false);
    setStatusMessage('Generating batch QR codes locally...');

    try {
      const { zipBlob, totalExported } = await exportBulkZip(
        selectedItems,
        config,
        exportFormat,
        (current, total, percent, name) => {
          setProgress({ current, total, percent, name });
        },
        () => cancelRequested
      );

      triggerDownload(
        zipBlob,
        `codemitra-batch-${totalExported}-qr-${exportFormat}.zip`
      );
      setStatusMessage(`Successfully created ZIP with ${totalExported} QR codes!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Export failed';
      setStatusMessage(msg);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSingle = async (item: BulkRowItem) => {
    try {
      if (exportFormat === 'svg') {
        const { blob } = await generateSvgBlob(item.content, config, config.outputSize);
        triggerDownload(blob, `${item.filename}.svg`);
      } else {
        const { blob } = await generatePngBlob(item.content, config, config.outputSize);
        triggerDownload(blob, `${item.filename}.png`);
      }
    } catch (err) {
      alert(`Export failed for row ${item.rowIndex}`);
    }
  };

  const validCount = items.filter((i) => i.isValid).length;
  const selectedCount = items.filter((i) => i.selected && i.isValid).length;

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Bulk CSV QR Generator
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Import a CSV spreadsheet of links, Wi-Fi credentials, or product codes. Every QR code is rendered in your browser and packaged into a neat ZIP archive.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadSampleCsv}
              className="px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Download Sample CSV
            </button>
          </div>
        </div>

        {/* Upload Dropzone */}
        {!csvFile ? (
          <div className="mt-6">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
              }}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/20 rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer group"
            >
              <Upload className="w-10 h-10 mx-auto text-slate-400 group-hover:text-indigo-600 mb-3 transition-colors" />
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-900">
                Click to upload or drag & drop your CSV file
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Supports UTF-8, commas inside quoted fields, and custom column mappings.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-600 shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                100% Client-Side: Your spreadsheet is never transmitted to any server.
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
          </div>
        ) : (
          /* Active File Configuration */
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {csvFile.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {rawRows.length} rows detected • {(csvFile.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCsvFile(null);
                  setHeaders([]);
                  setRawRows([]);
                  setItems([]);
                }}
                className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
                Change File
              </button>
            </div>

            {/* Column Mapping Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Content / Payload Column <span className="text-rose-500">*</span>
                </label>
                <select
                  value={contentColumn}
                  onChange={(e) => handleColumnChange(e.target.value, filenameColumn)}
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                >
                  <option value="">Select column containing URL or text...</option>
                  {headers.map((h) => (
                    <option key={h} value={h}>
                      {h} (e.g. "{rawRows[0]?.[h]?.slice(0, 25) || ''}")
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Filename Column (Optional)
                </label>
                <select
                  value={filenameColumn}
                  onChange={(e) => handleColumnChange(contentColumn, e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                >
                  <option value="">Auto-number filenames (qr-1, qr-2...)</option>
                  {headers.map((h) => (
                    <option key={h} value={h}>
                      {h} (e.g. "{rawRows[0]?.[h]?.slice(0, 25) || ''}")
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Batch Export Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900 text-white rounded-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-emerald-400 font-bold">{selectedCount}</span> of {items.length} items selected for export
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectAll(true)}
                    className="hover:text-white underline cursor-pointer"
                  >
                    Select All Valid
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleSelectAll(false)}
                    className="hover:text-white underline cursor-pointer"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Format selection */}
                <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setExportFormat('png')}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                      exportFormat === 'png'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat('svg')}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                      exportFormat === 'svg'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    SVG
                  </button>
                </div>

                {/* Export button */}
                <button
                  type="button"
                  disabled={isExporting || selectedCount === 0}
                  onClick={handleExportZip}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isExporting || selectedCount === 0
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white active:scale-98'
                  }`}
                >
                  <FileArchive className="w-4 h-4" />
                  {isExporting ? 'Generating ZIP...' : `Export ZIP (${selectedCount})`}
                </button>
              </div>
            </div>

            {/* Progress Bar (if generating) */}
            {isExporting && (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-indigo-950">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
                    Generating {progress.name}... ({progress.current}/{progress.total})
                  </span>
                  <span>{progress.percent}%</span>
                </div>
                <div className="w-full h-2.5 bg-indigo-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-150 rounded-full"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCancelRequested(true)}
                    className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                  >
                    Cancel Export
                  </button>
                </div>
              </div>
            )}

            {statusMessage && !isExporting && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                {statusMessage}
              </div>
            )}

            {/* Data Preview Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 z-10 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={selectedCount === validCount && validCount > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-indigo-600"
                        />
                      </th>
                      <th className="py-2.5 px-3 w-12">#</th>
                      <th className="py-2.5 px-3">Filename</th>
                      <th className="py-2.5 px-3">Encoded Content</th>
                      <th className="py-2.5 px-3 w-24">Status</th>
                      <th className="py-2.5 px-3 w-20 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50 transition-colors ${
                          !item.isValid ? 'bg-rose-50/30' : ''
                        }`}
                      >
                        <td className="py-2 px-3 text-center">
                          <input
                            type="checkbox"
                            disabled={!item.isValid}
                            checked={item.selected}
                            onChange={() => handleToggleRow(item.id)}
                            className="w-3.5 h-3.5 rounded text-indigo-600 disabled:opacity-40"
                          />
                        </td>
                        <td className="py-2 px-3 text-slate-400 font-mono">
                          {item.rowIndex}
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-800 font-mono truncate max-w-[140px]">
                          {item.filename}.{exportFormat}
                        </td>
                        <td className="py-2 px-3 text-slate-600 truncate max-w-[240px] font-mono">
                          {item.content || <em className="text-rose-400">Empty</em>}
                        </td>
                        <td className="py-2 px-3">
                          {item.isValid ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700">
                              <AlertCircle className="w-3 h-3 text-rose-500" />
                              Empty
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            type="button"
                            disabled={!item.isValid}
                            onClick={() => handleDownloadSingle(item)}
                            title="Download this code directly"
                            className="p-1 rounded text-slate-500 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
