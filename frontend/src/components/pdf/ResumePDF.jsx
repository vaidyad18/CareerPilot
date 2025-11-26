import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";

const ResumePDF = ({ data, summary }) => {
  const theme = "#1e3a8a";

  const hasSkills = data.skills && String(data.skills).trim().length > 0;

  const hasExperience = data.experience?.some(
    (exp) => exp.title || exp.company || exp.description
  );

  const hasProjects = data.projects?.some(
    (proj) => proj.title || proj.desc || proj.link
  );

  const hasEducation = data.education?.some(
    (edu) => edu.school || edu.degree
  );

  const styles = StyleSheet.create({
    page: {
      padding: 24,
      fontSize: 10,
      fontFamily: "Helvetica",
      backgroundColor: "#FFFFFF"
    },
    header: {
      textAlign: "center",
      marginBottom: 10
    },
    name: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme,
      textTransform: "capitalize"
    },
    role: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 4,
      textTransform: "capitalize"
    },
    line: {
      borderBottomWidth: 2,
      borderColor: theme,
      marginVertical: 6
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 2,
      color: theme
    },
    text: {
      fontSize: 10,
      marginBottom: 3
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    bullet: {
      fontSize: 10,
      marginBottom: 2
    },
    link: {
      fontSize: 10,
      textDecoration: "underline",
      marginBottom: 2
    },
    grey: {
      color: "#444"
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header}>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.role}>{data.role}</Text>
          <Text style={styles.grey}>{data.address}</Text>

          <View style={styles.rowBetween}>
            <Text>{data.contact}</Text>
            <Text>{data.email || ""}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 4 }}>
            {data.links.linkedin && <Link src={data.links.linkedin} style={styles.link}>LinkedIn</Link>}
            {data.links.github && <Link src={data.links.github} style={styles.link}>GitHub</Link>}
            {data.links.portfolio && <Link src={data.links.portfolio} style={styles.link}>Portfolio</Link>}
          </View>
        </View>

        <View style={styles.line} />

        {summary && (
          <View>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.line} />
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

        {hasSkills && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.line} />

            {(Array.isArray(data.skills)
              ? data.skills.join(",").split(",")
              : data.skills.split(",")
            ).map((skill, i) => (
              <Text key={i} style={styles.bullet}>• {skill.trim()}</Text>
            ))}
          </View>
        )}

        {hasExperience && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            <View style={styles.line} />

            {data.experience.map(
              (exp, i) =>
                (exp.title || exp.company || exp.description) && (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ ...styles.text, color: theme, fontWeight: "bold" }}>{exp.title}</Text>
                    <View style={styles.rowBetween}>
                      <Text style={{ fontWeight: "bold" }}>{exp.company}</Text>
                      <Text>{exp.start} - {exp.end}</Text>
                    </View>
                    <Text style={styles.text}>{exp.description}</Text>
                  </View>
                )
            )}
          </View>
        )}

        {hasProjects && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.line} />

            {data.projects.map(
              (proj, i) =>
                (proj.title || proj.desc || proj.link) && (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ ...styles.text, color: theme, fontWeight: "bold" }}>{proj.title}</Text>
                    {proj.link && <Link src={proj.link} style={styles.link}>{proj.link}</Link>}
                    <Text style={styles.text}>{proj.desc}</Text>
                  </View>
                )
            )}
          </View>
        )}

        {hasEducation && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.line} />

            {data.education.map(
              (edu, i) =>
                (edu.school || edu.degree) && (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ ...styles.text, color: theme, fontWeight: "bold" }}>{edu.school}</Text>
                    <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
                    <Text>{edu.start} - {edu.end}</Text>
                  </View>
                )
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
