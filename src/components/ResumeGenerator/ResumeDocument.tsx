import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #23ce6b',
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#212121',
  },
  title: {
    fontSize: 16,
    color: '#23ce6b',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#666',
    gap: 10,
  },
  section: {
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#016fb9',
    borderBottom: '1 solid #016fb9',
    paddingBottom: 5,
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 8,
    color: '#333',
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
  },
  company: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  period: {
    fontSize: 10,
    color: '#999',
  },
  location: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#444',
    marginTop: 5,
  },
  technologies: {
    fontSize: 9,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  educationItem: {
    marginBottom: 12,
  },
  educationTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#212121',
  },
  institution: {
    fontSize: 11,
    color: '#666',
  },
  headerWithPhoto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: '2 solid #23ce6b',
    paddingBottom: 15,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    objectFit: 'contain',
  },
});

interface ResumeDocumentProps {
  data: any;
  format?: 'standard' | 'european' | 'us';
  profileImageBase64?: string;
}

export const ResumeDocument = ({ data, format = 'standard', profileImageBase64 }: ResumeDocumentProps) => {
  const { personal, about, experience, education, softSkills, languages } = data;

  // Filter experiences based on format
  const getExperiences = () => {
    if (format === 'us') {
      // US Resume: Only engineering/full-time positions
      return experience.filter((exp: any) => exp.type === 'Full-time' || exp.type === 'Startup');
    }
    // Standard and European: All experiences
    return experience;
  };

  const filteredExperience = getExperiences();

  // Render header based on format
  const renderHeader = () => {
    if (format === 'european') {
      // European CV: More detailed personal information with photo
      return (
        <View style={styles.headerWithPhoto}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{personal.name}</Text>
            <Text style={styles.title}>{personal.title}</Text>
            <View style={[styles.contactInfo, { marginTop: 5 }]}>
              <Text>{personal.email}</Text>
              <Text>•</Text>
              <Text>{personal.phone}</Text>
              <Text>•</Text>
              <Text>{personal.location}</Text>
              {personal.nationality && (
                <>
                  <Text>•</Text>
                  <Text>Nationality: {personal.nationality}</Text>
                </>
              )}
              {personal.status && (
                <>
                  <Text>•</Text>
                  <Text>{personal.status}</Text>
                </>
              )}
            </View>
            <View style={[styles.contactInfo, { marginTop: 5 }]}>
              {personal.social.linkedin && (
                <>
                  <Text>LinkedIn: {personal.social.linkedin}</Text>
                  <Text>•</Text>
                </>
              )}
              {personal.social.github && (
                <Text>GitHub: {personal.social.github}</Text>
              )}
            </View>
          </View>
          {profileImageBase64 && (
            <Image
              src={profileImageBase64}
              style={styles.profileImage}
            />
          )}
        </View>
      );
    } else if (format === 'us') {
      // US Resume: Compact header
      return (
        <View style={[styles.header, { marginBottom: 15 }]}>
          <Text style={styles.name}>{personal.name}</Text>
          <Text style={styles.title}>{personal.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{personal.email}</Text>
            <Text>•</Text>
            <Text>{personal.phone}</Text>
            <Text>•</Text>
            <Text>{personal.location}</Text>
            {personal.social.linkedin && (
              <>
                <Text>•</Text>
                <Text>LinkedIn</Text>
              </>
            )}
            {personal.social.github && (
              <>
                <Text>•</Text>
                <Text>GitHub</Text>
              </>
            )}
          </View>
        </View>
      );
    } else {
      // Standard format
      return (
        <View style={styles.header}>
          <Text style={styles.name}>{personal.name}</Text>
          <Text style={styles.title}>{personal.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{personal.email}</Text>
            <Text>•</Text>
            <Text>{personal.phone}</Text>
            <Text>•</Text>
            <Text>{personal.location}</Text>
            {personal.social.linkedin && (
              <>
                <Text>•</Text>
                <Text>LinkedIn: {personal.social.linkedin}</Text>
              </>
            )}
            {personal.social.github && (
              <>
                <Text>•</Text>
                <Text>GitHub: {personal.social.github}</Text>
              </>
            )}
          </View>
        </View>
      );
    }
  };

  // Render About/Summary based on format
  const renderAbout = () => {
    if (format === 'us') {
      // US Resume: Short summary instead of full about
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.paragraph}>{personal.summary}</Text>
        </View>
      );
    } else if (format === 'european') {
      // European CV: Full about section
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{about.title}</Text>
          {about.paragraphs.map((paragraph: string, index: number) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      );
    } else {
      // Standard: Full about section
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{about.title}</Text>
          {about.paragraphs.map((paragraph: string, index: number) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      );
    }
  };

  // Render a single experience item
  const renderExperienceItem = (exp: any, index: number) => {
    return (
      <View key={index} style={styles.experienceItem}>
        <View style={styles.experienceHeader}>
          <View>
            <Text style={styles.jobTitle}>{exp.title}</Text>
            <Text style={styles.company}>{exp.company}</Text>
          </View>
          <Text style={styles.period}>{exp.period}</Text>
        </View>
        <Text style={styles.location}>{exp.location}</Text>
        {format === 'us' && exp.achievements && exp.achievements.length > 0 ? (
          // US Resume: Focus on achievements
          <View style={{ marginTop: 5 }}>
            {exp.achievements.map((achievement: string, idx: number) => (
              <Text key={idx} style={[styles.description, { marginTop: 3 }]}>
                • {achievement}
              </Text>
            ))}
          </View>
        ) : (
          // Standard and European: Description
          exp.description && (
            <Text style={styles.description}>{exp.description}</Text>
          )
        )}
        {format === 'european' && exp.achievements && exp.achievements.length > 0 && (
          <View style={{ marginTop: 5 }}>
            {exp.achievements.slice(0, 3).map((achievement: string, idx: number) => (
              <Text key={idx} style={[styles.description, { fontSize: 9, marginTop: 2 }]}>
                • {achievement}
              </Text>
            ))}
          </View>
        )}
        {exp.technologies && exp.technologies.length > 0 && (
          <Text style={styles.technologies}>
            Technologies: {exp.technologies.join(', ')}
          </Text>
        )}
      </View>
    );
  };

  // Render experience with different detail levels
  const renderExperience = () => {
    // Separate work experience (Full-time, Startup) from teaching experience (Teaching, Education)
    const workExperience = filteredExperience.filter((exp: any) => 
      exp.type === 'Full-time' || exp.type === 'Startup'
    );
    const teachingExperience = filteredExperience.filter((exp: any) => 
      exp.type === 'Teaching' || exp.type === 'Education'
    );

    // For US format, only show work experience
    if (format === 'us') {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {workExperience.map((exp: any, index: number) => renderExperienceItem(exp, index))}
        </View>
      );
    }

    // For Standard and European, show both sections
    return (
      <>
        {workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workExperience.map((exp: any, index: number) => renderExperienceItem(exp, index))}
          </View>
        )}
        {teachingExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Teaching Experience</Text>
            {teachingExperience.map((exp: any, index: number) => renderExperienceItem(exp, index))}
          </View>
        )}
      </>
    );
  };

  // Render education
  const renderEducation = () => {
    if (format === 'us') {
      // US Resume: Brief education
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.slice(0, 2).map((edu: any, index: number) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.educationTitle}>{edu.title}</Text>
              <Text style={styles.institution}>
                {edu.institution} - {edu.location} ({edu.period})
              </Text>
            </View>
          ))}
        </View>
      );
    } else {
      // Standard and European: Full education
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu: any, index: number) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.educationTitle}>{edu.title}</Text>
              <Text style={styles.institution}>
                {edu.institution} - {edu.location} ({edu.period})
              </Text>
            </View>
          ))}
        </View>
      );
    }
  };

  // Render additional sections for European CV
  const renderAdditionalSections = () => {
    if (format === 'european') {
      return (
        <>
          {languages && languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {languages.map((lang: any, index: number) => (
                <View key={index} style={{ marginBottom: 5 }}>
                  <Text style={styles.paragraph}>
                    {lang.name}: {lang.proficiency}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {renderAbout()}
        {renderExperience()}
        {renderEducation()}
        {renderAdditionalSections()}
      </Page>
    </Document>
  );
};
