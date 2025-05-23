import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Logo from "../../../assets/images/ulogo.png";
import { toast } from "react-hot-toast";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  text: {
    padding: "20px",
    fontSize: "20px",
  },
  title: {
    padding: "20px",
    fontSize: "50px",
    fontWeight: "bold",
  },
  name: {
    marginTop: "100px",
    padding: "20px",
    fontSize: "40px",
    fontWeight: "bold",
  },
});

// Create Document Component
// eslint-disable-next-line react/prop-types
function PDF({ userName, courseName }) {
  return (
    <Document>
      <Page size="A3" wrap>
        <View>
          <Image src={Logo} style={{ width: "400px", alignSelf: "center" }} />
          <Text style={styles.text}>Fake Certificate of Completion</Text>
        </View>
        <View>
          <Text style={styles.title}>{courseName}</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
      </Page>
    </Document>
  );
}

// eslint-disable-next-line react/prop-types
export default function ClaimCertificate({ courseName, userName }) {
  const showToast = () => toast.success("Certificate downloaded successfully!");

  return (
    <div className="flex justify-center">
      <PDFDownloadLink
        document={<PDF userName={userName} courseName={courseName} />}
        fileName="certificate.pdf"
        className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg text-center text-lg transition-all duration-200 w-full max-w-md"
      >
        {({ blob, url, loading, error }) => {
          if (error) {
            toast.error("Failed to generate certificate.");
          }
          if (!loading && !error) {
            showToast();
          }
          return loading ? "Loading Certificate..." : "Claim Certificate!";
        }}
      </PDFDownloadLink>
    </div>
  );
}
