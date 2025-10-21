import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, StyleProps } from '@/types';

interface ClassicPDFTemplateProps {
  resume: ResumeData;
  styles: StyleProps;
}

const ClassicPDFTemplate: React.FC<ClassicPDFTemplateProps> = ({ resume, styles }) => {
  // Convert pixel sizes to points for PDF - adjusted ratio for better matching
  const toPoints = (px: number) => px * 0.72;

  const pdfStyles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: 'Times-Roman',
    },
    headerSection: {
      textAlign: 'center',
      paddingTop: toPoints(32),
      paddingBottom: toPoints(24),
      paddingHorizontal: toPoints(32),
      borderBottom: '3pt solid #000000',
    },
    name: {
      fontSize: toPoints(styles.nameSize || 36),
      color: styles.nameColor || '#000000',
      fontFamily: styles.nameBold ? 'Times-Bold' : 'Times-Roman',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginBottom: toPoints(8),
    },
    title: {
      fontSize: toPoints(styles.titleSize || 16),
      color: styles.titleColor || '#000000',
      fontFamily: styles.titleBold ? 'Times-Bold' : 'Times-Roman',
      textTransform: 'uppercase',
      letterSpacing: 2.25,
      marginTop: toPoints(8),
    },
    contactContainer: {
      marginTop: toPoints(12),
      fontSize: toPoints(styles.contactSize || 12),
      color: styles.contactColor || '#000000',
      fontFamily: styles.contactBold ? 'Courier-Bold' : 'Courier',
    },
    contactLine: {
      marginBottom: toPoints(4),
    },
    contentSection: {
      paddingHorizontal: toPoints(32),
      paddingTop: toPoints(32),
      paddingBottom: toPoints(32),
    },
    section: {
      marginBottom: toPoints(24),
    },
    sectionHeader: {
      fontSize: toPoints(styles.headerSize || 18),
      color: styles.headerColor || '#000000',
      fontFamily: styles.headerBold ? 'Times-Bold' : 'Times-Roman',
      textTransform: 'uppercase',
      letterSpacing: 1.125,
      textAlign: 'center',
      marginBottom: toPoints(12),
    },
    sectionDivider: {
      borderBottom: '0.75pt solid #000000',
      marginBottom: toPoints(12),
    },
    sectionContent: {
      fontSize: toPoints(styles.bodySize || 14),
      color: styles.bodyColor || '#000000',
      fontFamily: styles.bodyBold ? 'Times-Bold' : 'Times-Roman',
      lineHeight: 1.75,
      textAlign: 'justify',
      paddingHorizontal: toPoints(16),
    },
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header with border */}
        <View style={pdfStyles.headerSection}>
          <Text style={pdfStyles.name}>{resume.name}</Text>
          <Text style={pdfStyles.title}>{resume.title}</Text>
          
          {/* Contact Info - Two lines with pipe separators */}
          {resume.contact && (
            <View style={pdfStyles.contactContainer}>
              <Text style={pdfStyles.contactLine}>
                {resume.contact.email} | {resume.contact.phone}
              </Text>
              <Text style={pdfStyles.contactLine}>
                {resume.contact.location} | {resume.contact.linkedin}
              </Text>
            </View>
          )}
        </View>

        {/* Content Sections */}
        <View style={pdfStyles.contentSection}>
          {resume.sections.map((section) => (
            <View key={section.id} style={pdfStyles.section}>
              <Text style={pdfStyles.sectionHeader}>{section.title}</Text>
              <View style={pdfStyles.sectionDivider} />
              <Text style={pdfStyles.sectionContent}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ClassicPDFTemplate;