import { useResume } from '@context';
import { TEMPLATES, ICONS, PAGE_SIZES, isResumePageSize } from '@types';
import { Icon } from '@components/common/Icon';

interface FontOption {
  category: string;
  fonts: { label: string; value: string }[];
}

const FONT_GROUPS: FontOption[] = [
  {
    category: 'Google Fonts (Modern & Clean)',
    fonts: [
      { label: 'Outfit (Modern Geometric)', value: 'Outfit' },
      { label: 'Inter (Popular & Crisp)', value: 'Inter' },
      { label: 'Plus Jakarta Sans (Contemporary)', value: 'Plus Jakarta Sans' },
      { label: 'Roboto (Neutral & Clean)', value: 'Roboto' },
    ],
  },
  {
    category: 'Google Fonts (Serif & Editorial)',
    fonts: [
      { label: 'Lora (Contemporary Serif)', value: 'Lora' },
      { label: 'Merriweather (Classic Editorial)', value: 'Merriweather' },
      { label: 'Playfair Display (Executive Headline)', value: 'Playfair Display' },
    ],
  },
  {
    category: 'Monospace & Developer',
    fonts: [
      { label: 'Fira Code (Developer Monospace)', value: 'Fira Code' },
      { label: 'System Monospace', value: "ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace" },
    ],
  },
  {
    category: 'System Installed Fonts',
    fonts: [
      { label: 'System Sans-Serif (Native UI)', value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
      { label: 'Georgia (Native Serif)', value: 'Georgia, serif' },
      { label: 'Garamond (Classic Serif)', value: 'Garamond, serif' },
      { label: 'Arial (Clean Standard)', value: 'Arial, sans-serif' },
      { label: 'Verdana (Legible Standard)', value: 'Verdana, sans-serif' },
    ],
  },
];

export function StyleTab() {
  const { resume, updateField, resetResume } = useResume();
  const selectedTemplate = TEMPLATES.find(item => item.id === resume.template) || TEMPLATES[0];

  const handleAccentChange = (val: string) => {
    updateField('accentColor', val);
  };

  const handlePageSizeChange = (value: string) => {
    if (isResumePageSize(value)) updateField('pageSize', value);
  };

  return (
    <div className="style-panel">
      <p className="panel-caption">Choose a visual style</p>
      <div className="style-templates">
        {TEMPLATES.map(item => (
          <button
            key={item.id}
            type="button"
            className={resume.template === item.id ? 'selected' : ''}
            aria-pressed={resume.template === item.id}
            onClick={() => updateField('template', item.id)}
          >
            <span className={`style-swatch ${item.className}`} />
            {item.name}
            <small>{item.type}</small>
          </button>
        ))}
      </div>
      <p className="theme-description">{selectedTemplate.description}</p>

      <label className="font-field">
        <span>Resume typography</span>
        <select
          value={resume.fontFamily || 'Outfit'}
          onChange={e => updateField('fontFamily', e.target.value)}
        >
          {FONT_GROUPS.map(group => (
            <optgroup key={group.category} label={group.category}>
              {group.fonts.map(font => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <label className="font-field">
        <span>Page size</span>
        <select
          value={resume.pageSize}
          onChange={e => handlePageSizeChange(e.target.value)}
        >
          {Object.entries(PAGE_SIZES).map(([value, pageSize]) => (
            <option key={value} value={value}>
              {pageSize.label}
            </option>
          ))}
        </select>
      </label>

      <p className="panel-caption">Personalize this style</p>
      <p className="panel-caption">Accent color</p>
      <div className="color-picker-row">
        <input
          aria-label="Choose any accent color"
          type="color"
          value={resume.accentColor || '#6c58ed'}
          onChange={e => handleAccentChange(e.target.value)}
        />
        <input
          aria-label="Accent hex value"
          value={resume.accentColor || '#6c58ed'}
          onChange={e => handleAccentChange(e.target.value)}
          placeholder="#6c58ed"
        />
      </div>

      <p className="panel-caption icon-caption">Choose your icon language</p>
      <div className="icon-picker">
        {ICONS.map(iconItem => (
          <button
            key={iconItem.name}
            type="button"
            aria-label={`Use ${iconItem.name} icon`}
            className={resume.icon === iconItem.name ? 'selected' : ''}
            onClick={() => updateField('icon', iconItem.name)}
          >
            <Icon name={iconItem.name} size={18} />
          </button>
        ))}
      </div>

      <label className="range-field">
        <span>
          Type scale <b>{resume.scale || 100}%</b>
        </span>
        <input
          type="range"
          min="90"
          max="110"
          value={resume.scale || 100}
          onChange={e => updateField('scale', Number(e.target.value))}
        />
      </label>

      <label className="range-field">
        <span>
          Section spacing <b>{resume.spacing || 100}%</b>
        </span>
        <input
          type="range"
          min="80"
          max="120"
          value={resume.spacing || 100}
          onChange={e => updateField('spacing', Number(e.target.value))}
        />
      </label>

      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--app-border)' }}>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all resume data to default sample values?')) {
              resetResume();
            }
          }}
          style={{
            background: 'none',
            border: '1px solid var(--app-border)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            color: 'var(--app-muted)',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Reset to default content
        </button>
      </div>
    </div>
  );
}
