import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useResume } from '@context';
import { TEMPLATES, PAGE_METADATA, PAGE_SIZES, isResumePageSize } from '@types';
import { ContentTab, StyleTab } from '@components/editor';
import { ResumePreview } from '@components/preview';
import { downloadPDF } from '@utils/pdfExport';
import { useEditorShortcuts } from '@hooks/useKeyboardShortcuts';
import { useTheme } from '@context';

export function Editor() {
  const navigate = useNavigate();
  const { resume } = useResume();
  const { toggleTheme } = useTheme();

  const [tab, setTab] = useState<'content' | 'style'>('content');
  const [saved, setSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const pageSize = isResumePageSize(resume.pageSize) ? PAGE_SIZES[resume.pageSize] : PAGE_SIZES.A4;

  const selectedTemplate = useMemo(() => {
    return TEMPLATES.find(item => item.id === resume.template) || TEMPLATES[0];
  }, [resume.template]);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const handlePrint = () => {
    window.focus();
    window.print();
  };

  useEffect(() => {
    const printPageRule = document.createElement('style');
    printPageRule.textContent = `@page { size: ${pageSize.css}; margin: 0; }`;
    document.head.appendChild(printPageRule);
    return () => printPageRule.remove();
  }, [pageSize.css]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const filename = `${resume.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
      await downloadPDF(resume, filename);
    } catch (err) {
      console.error('Error exporting PDF:', err);
      // Fallback to print dialog if react-pdf has issues
      handlePrint();
    } finally {
      setIsExporting(false);
    }
  };

  // Keyboard shortcuts: Ctrl+S (Save), Ctrl+E (Export), Ctrl+P (Print), Ctrl+T (Theme)
  useEditorShortcuts(
    save,
    handleExportPDF,
    handlePrint,
    toggleTheme
  );

  const metadata = PAGE_METADATA.editor;

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div
        className="editor-shell"
        style={{
          ['--accent' as string]: resume.accentColor || '#6c58ed',
          ['--resume-scale' as string]: `${(resume.scale || 100) / 100}`,
          ['--resume-spacing' as string]: `${(resume.spacing || 100) / 100}`,
        }}
      >
        <div className="editor-layout">
          {/* Left panel: Form & Style Controls */}
          <aside className="editor-panel">
            <div className="editor-title">
              <div>
                <p className="eyebrow">Resume builder</p>
                <h2>
                  Shape your
                  <br />
                  <em>next move.</em>
                </h2>
              </div>
              <button
                type="button"
                className="close-editor"
                aria-label="Close editor"
                onClick={() => navigate('/')}
              >
                ×
              </button>
            </div>

            <div className="editor-tabs">
              <button
                type="button"
                className={tab === 'content' ? 'active' : ''}
                onClick={() => setTab('content')}
              >
                Content
              </button>
              <button
                type="button"
                className={tab === 'style' ? 'active' : ''}
                onClick={() => setTab('style')}
              >
                Style
              </button>
            </div>

            {tab === 'content' ? <ContentTab /> : <StyleTab />}

            <div className="editor-footer">
              <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button
                  type="button"
                  className="save-button"
                  onClick={save}
                  style={{ flex: 1 }}
                >
                  {saved ? 'Saved ✓' : 'Save progress'}
                </button>
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  style={{ fontSize: '13px', padding: '10px 16px' }}
                  title="Export direct PDF file"
                >
                  {isExporting ? 'Exporting...' : 'PDF ↗'}
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handlePrint}
                  style={{ fontSize: '13px', padding: '10px 14px' }}
                  title="Print to printer or browser PDF"
                >
                  Print
                </button>
              </div>
              <span>Saved privately in this browser • Ctrl+S</span>
            </div>
          </aside>

          {/* Right Area: Live Resume Preview */}
          <main className="preview-area">
            <div className="preview-toolbar">
              <span>
                <i className="status-dot" /> Live preview
              </span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span>{selectedTemplate.name} template</span>
                <button
                  type="button"
                  className="text-button"
                  onClick={handlePrint}
                  style={{ fontSize: '12px' }}
                >
                  Print resume ↗
                </button>
              </div>
            </div>

            <ResumePreview resume={resume} />
          </main>
        </div>

        {/* Print-only resume; the browser paginates it without scaling content. */}
        <div
          className="print-root"
          style={{
            ['--print-page-width' as string]: pageSize.width,
            ['--print-page-height' as string]: pageSize.height,
          }}
          aria-hidden="true"
        >
          <ResumePreview resume={resume} />
        </div>
      </div>
    </>
  );
}
