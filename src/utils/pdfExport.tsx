import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { PAGE_SIZES, type ResumeData } from '@types';

Font.register({
  family: 'Outfit',
  fonts: [{ src: '/fonts/Outfit-VariableFont_wght.ttf' }],
});


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 36,
    fontFamily: 'Outfit',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#17181b',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #deddd5',
    paddingBottom: 14,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  role: {
    fontSize: 13,
    color: '#6c58ed',
    fontWeight: 500,
    marginBottom: 10,
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    fontSize: 9,
    color: '#777977',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 24,
  },
  leftColumn: {
    width: '35%',
  },
  rightColumn: {
    width: '65%',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6c58ed',
    borderBottom: '1px solid #deddd5',
    paddingBottom: 3,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#444',
  },
  entry: {
    marginBottom: 14,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 600,
  },
  entryDate: {
    fontSize: 9,
    color: '#777977',
  },
  entryCompany: {
    fontSize: 10,
    color: '#6c58ed',
    fontWeight: 500,
    marginBottom: 3,
  },
  entryDescription: {
    fontSize: 9,
    color: '#444',
    lineHeight: 1.5,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillLabel: {
    width: 80,
    fontSize: 9,
  },
  skillBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#ebe9e1',
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  skillFill: {
    height: '100%',
    backgroundColor: '#6c58ed',
  },
  skillValue: {
    width: 26,
    fontSize: 9,
    textAlign: 'right',
    color: '#777977',
  },
  achievementItem: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  achievementTitle: {
    fontWeight: 600,
    fontSize: 9,
    marginBottom: 2,
  },
  achievementValue: {
    fontSize: 9,
    color: '#444',
    lineHeight: 1.4,
  },
  hobbyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  hobbyTag: {
    fontSize: 9,
    padding: '3px 6px',
    backgroundColor: '#ebe9e1',
    borderRadius: 3,
  },
});

function formatDates(dates: { start: string; end: string } | string | undefined): string {
  if (!dates) return '';
  if (typeof dates === 'string') return dates;
  return `${dates.start || ''} — ${dates.end || ''}`.trim();
}

function ContactItem({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={styles.contactItem}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillLabel}>{label}</Text>
      <View style={styles.skillBar}>
        <View style={{ ...styles.skillFill, width: `${value}%` }} />
      </View>
      <Text style={styles.skillValue}>{value}%</Text>
    </View>
  );
}

export function ResumePDFDocument({ resume }: { resume: ResumeData }) {
  const pageSize = PAGE_SIZES[resume.pageSize] || PAGE_SIZES.A4;

  return (
    <Document>
      <Page size={pageSize.pdf} style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resume.fullName}</Text>
          <Text style={styles.role}>{resume.role}</Text>
          <View style={styles.contact}>
            <ContactItem label="✉" value={resume.email} />
            <ContactItem label="☎" value={resume.phone} />
            <ContactItem label="📍" value={resume.location} />
            <ContactItem label="🌐" value={resume.website} />
          </View>
        </View>

        <View style={styles.twoColumn}>
          <View style={styles.leftColumn}>
            {resume.sections.summary && resume.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.summaryText}>{resume.summary}</Text>
              </View>
            )}

            {resume.sections.skills && resume.skills && resume.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {resume.skills.map(skill => (
                  <SkillBar key={skill.id} label={skill.label} value={skill.initialValue} />
                ))}
              </View>
            )}

            {resume.sections.achievements && resume.achievements && resume.achievements.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                {resume.achievements.map(achievement => (
                  <View key={achievement.id} style={styles.achievementItem}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementValue}>{achievement.value}</Text>
                  </View>
                ))}
              </View>
            )}

            {resume.sections.hobbies && resume.hobbies && resume.hobbies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <View style={styles.hobbyContainer}>
                  {resume.hobbies.map(hobby => (
                    <Text key={hobby.id} style={styles.hobbyTag}>{hobby.value}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View style={styles.rightColumn}>
            {resume.sections.experience && resume.experience && resume.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {resume.experience.map(entry => (
                  <View key={entry.id} style={styles.entry}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{entry.role}</Text>
                      <Text style={styles.entryDate}>{formatDates(entry.dates)}</Text>
                    </View>
                    <Text style={styles.entryCompany}>{entry.company}</Text>
                    <Text style={styles.entryDescription}>{entry.description}</Text>
                  </View>
                ))}
              </View>
            )}

            {resume.sections.education && resume.education && resume.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map(entry => (
                  <View key={entry.id} style={styles.entry}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryTitle}>{entry.role}</Text>
                      <Text style={styles.entryDate}>{formatDates(entry.dates)}</Text>
                    </View>
                    <Text style={styles.entryCompany}>{entry.company}</Text>
                    <Text style={styles.entryDescription}>{entry.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function generatePDFBlob(resume: ResumeData): Promise<Blob> {
  const { pdf } = await import('@react-pdf/renderer');
  const blob = await pdf(<ResumePDFDocument resume={resume} />).toBlob();
  return blob;
}

export async function downloadPDF(resume: ResumeData, filename = 'resume.pdf') {
  const blob = await generatePDFBlob(resume);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
