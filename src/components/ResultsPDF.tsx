import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ParentingStyle } from '../types/assessment';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface ResultsPDFProps {
  predominantStyle: ParentingStyle;
  blendedStyles: ParentingStyle[];
  scores: Record<string, number>;
}

const ResultsPDF: React.FC<ResultsPDFProps> = ({
  predominantStyle,
  blendedStyles,
  scores,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Parenting Style Assessment Results</Text>
        
        <Text style={styles.subtitle}>Primary Parenting Style</Text>
        <Text style={styles.text}>{predominantStyle.title}</Text>
        <Text style={styles.text}>{predominantStyle.description}</Text>

        <Text style={styles.subtitle}>Key Characteristics</Text>
        <View style={styles.list}>
          {predominantStyle.characteristics.map((trait: string, index: number) => (
            <Text key={index} style={styles.listItem}>• {trait}</Text>
          ))}
        </View>

        <Text style={styles.subtitle}>Recommendations</Text>
        <View style={styles.list}>
          {predominantStyle.recommendations.map((rec: string, index: number) => (
            <Text key={index} style={styles.listItem}>• {rec}</Text>
          ))}
        </View>

        {blendedStyles.length > 0 && (
          <>
            <Text style={styles.subtitle}>Secondary Styles</Text>
            <View style={styles.list}>
              {blendedStyles.map((style: ParentingStyle, index: number) => (
                <Text key={index} style={styles.listItem}>• {style.title}</Text>
              ))}
            </View>
          </>
        )}

        <Text style={styles.subtitle}>Style Breakdown</Text>
        <View style={styles.list}>
          {Object.entries(scores).map(([style, score]: [string, number]) => (
            <Text key={style} style={styles.listItem}>
              • {style}: {Math.round(score)}%
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ResultsPDF;
