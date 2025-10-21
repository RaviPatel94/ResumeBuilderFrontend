import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, StyleProps } from '@/types';

interface ModernPDFTemplateProps {
  resume: ResumeData;
  styles: StyleProps;
}

const ModernPDFTemplate: React.FC<ModernPDFTemplateProps> = ({ resume, styles }) => {
  // Convert pixel sizes to points for PDF - adjusted ratio for better matching
  const toPoints = (px: number) => px * 0.72;

  const pdfStyles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: 'Helvetica',
    },
    header: {
      backgroundColor: '#6b7280',
      padding: toPoints(24),
      color: '#ffffff',
    },
    name: {
      fontSize: toPoints(styles.nameSize || 36),
      color: styles.nameColor || '#ffffff',
      fontWeight: styles.nameBold ? 'bold' : 100,
      letterSpacing: 1.5,
      marginBottom: toPoints(8),
      textTransform: 'uppercase',
    },
    divider: {
      width: toPoints(60),
      height: toPoints(1),
      backgroundColor: '#000000',
      marginVertical: toPoints(8),
    },
    title: {
      fontSize: toPoints(styles.titleSize || 16),
      color: styles.titleColor || '#ffffff',
      fontWeight: styles.titleBold ? 'bold' : 300,
      letterSpacing: 1.125,
    },
    content: {
      padding: toPoints(24),
    },
    contactContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: toPoints(8),
      marginBottom: toPoints(24),
      paddingBottom: toPoints(16),
      borderBottom: '0.75pt solid #e5e7eb',
    },
    contactItem: {
      fontSize: toPoints(styles.contactSize || 12),
      color: styles.contactColor || '#000000',
      fontWeight: styles.contactBold ? 'bold' : 'normal',
      border: '0.75pt solid #d1d5db',
      borderRadius: toPoints(20),
      paddingHorizontal: toPoints(12),
      paddingVertical: toPoints(4),
    },
    section: {
      marginBottom: toPoints(24),
    },
    sectionHeader: {
      fontSize: toPoints(styles.headerSize || 18),
      color: styles.headerColor || '#000000',
      fontWeight: styles.headerBold ? 'bold' : 'normal',
      textTransform: 'uppercase',
      letterSpacing: 1.125,
      marginBottom: toPoints(12),
      paddingBottom: toPoints(8),
      borderBottom: '1.5pt solid #000000',
    },
    sectionContent: {
      fontSize: toPoints(styles.bodySize || 14),
      color: styles.bodyColor || '#000000',
      fontWeight: styles.bodyBold ? 'bold' : 'normal',
      lineHeight: 1.6,
    },
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{resume.name?.toUpperCase()}</Text>
          <View style={pdfStyles.divider} />
          <Text style={pdfStyles.title}>{resume.title}</Text>
        </View>

        {/* Content */}
        <View style={pdfStyles.content}>
          {/* Contact Info */}
          {resume.contact && (
            <View style={pdfStyles.contactContainer}>
              <Text style={pdfStyles.contactItem}>{resume.contact.email}</Text>
              <Text style={pdfStyles.contactItem}>{resume.contact.phone}</Text>
              <Text style={pdfStyles.contactItem}>{resume.contact.location}</Text>
              <Text style={pdfStyles.contactItem}>{resume.contact.linkedin}</Text>
            </View>
          )}

          {/* Sections */}
          {resume.sections.map((section) => (
            <View key={section.id} style={pdfStyles.section}>
              <Text style={pdfStyles.sectionHeader}>{section.title}</Text>
              <Text style={pdfStyles.sectionContent}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ModernPDFTemplate;