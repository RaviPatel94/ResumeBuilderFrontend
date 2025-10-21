import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, StyleProps } from '@/types';

interface CreativePDFTemplateProps {
  resume: ResumeData;
  styles: StyleProps;
}

const CreativePDFTemplate: React.FC<CreativePDFTemplateProps> = ({ resume, styles }) => {
  // Convert pixel sizes to points for PDF - adjusted ratio for better matching
  const toPoints = (px: number) => px * 0.72;

  const pdfStyles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: 'Helvetica',
    },
    header: {
      background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 50%, #fb923c 100%)',
      backgroundColor: '#9333ea', // Fallback
      padding: toPoints(32),
      textAlign: 'center',
      color: '#ffffff',
    },
    name: {
      fontSize: toPoints(styles.nameSize || 36),
      color: styles.nameColor || '#ffffff',
      fontWeight: styles.nameBold ? 'bold' : 'normal',
      letterSpacing: 1.5,
      marginBottom: toPoints(8),
    },
    divider: {
      width: toPoints(96),
      height: toPoints(4),
      backgroundColor: '#ffffff',
      opacity: 0.8,
      marginHorizontal: 'auto',
      marginVertical: toPoints(12),
    },
    title: {
      fontSize: toPoints(styles.titleSize || 16),
      color: styles.titleColor || '#ffffff',
      fontWeight: styles.titleBold ? 'bold' : 'normal',
      letterSpacing: 1.125,
      opacity: 0.95,
    },
    content: {
      padding: toPoints(32),
    },
    contactContainer: {
      marginBottom: toPoints(32),
      paddingBottom: toPoints(24),
      borderBottom: '1.5pt solid #e5e7eb',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: toPoints(16),
    },
    contactItemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: toPoints(8),
    },
    contactDot: {
      width: toPoints(8),
      height: toPoints(8),
      borderRadius: toPoints(4),
      backgroundColor: '#9333ea',
    },
    contactDotPink: {
      backgroundColor: '#ec4899',
    },
    contactDotOrange: {
      backgroundColor: '#fb923c',
    },
    contactText: {
      fontSize: toPoints(styles.contactSize || 12),
      color: styles.contactColor || '#000000',
      fontWeight: styles.contactBold ? 'bold' : 'normal',
    },
    section: {
      marginBottom: toPoints(32),
    },
    sectionHeader: {
      fontSize: toPoints(styles.headerSize || 18),
      color: styles.headerColor || '#000000',
      fontWeight: styles.headerBold ? 'bold' : 'normal',
      marginBottom: toPoints(16),
      paddingBottom: toPoints(8),
      borderBottom: '1.5pt solid #f9a8d4',
    },
    sectionContent: {
      fontSize: toPoints(styles.bodySize || 14),
      color: styles.bodyColor || '#000000',
      fontWeight: styles.bodyBold ? 'bold' : 'normal',
      lineHeight: 1.6,
      paddingLeft: toPoints(16),
      borderLeft: '3pt solid #c084fc',
    },
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Gradient Header */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{resume.name}</Text>
          <View style={pdfStyles.divider} />
          <Text style={pdfStyles.title}>{resume.title}</Text>
        </View>

        {/* Content */}
        <View style={pdfStyles.content}>
          {/* Contact Info with colored dots */}
          {resume.contact && (
            <View style={pdfStyles.contactContainer}>
              {resume.contact.email && (
                <View style={pdfStyles.contactItemWrapper}>
                  <View style={pdfStyles.contactDot} />
                  <Text style={pdfStyles.contactText}>{resume.contact.email}</Text>
                </View>
              )}
              {resume.contact.phone && (
                <View style={pdfStyles.contactItemWrapper}>
                  <View style={[pdfStyles.contactDot, pdfStyles.contactDotPink]} />
                  <Text style={pdfStyles.contactText}>{resume.contact.phone}</Text>
                </View>
              )}
              {resume.contact.location && (
                <View style={pdfStyles.contactItemWrapper}>
                  <View style={[pdfStyles.contactDot, pdfStyles.contactDotOrange]} />
                  <Text style={pdfStyles.contactText}>{resume.contact.location}</Text>
                </View>
              )}
              {resume.contact.linkedin && (
                <View style={pdfStyles.contactItemWrapper}>
                  <View style={pdfStyles.contactDot} />
                  <Text style={pdfStyles.contactText}>{resume.contact.linkedin}</Text>
                </View>
              )}
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

export default CreativePDFTemplate;