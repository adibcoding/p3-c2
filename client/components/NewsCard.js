import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const NewsCard = ({ title, image, id }) => {
  const navigate = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigate.navigate("Detail", { id });
        }}
      >
        <View style={styles.card}>
          <Image style={styles.cardImage} source={{ uri: image }} />
          <View style={styles.cardContent}>
            <Text style={styles.title}>
              {title.length > 30 ? title.slice(0, 30) + "..." : title}
            </Text>
          </View>
          <View style={styles.cardIcon}>
            <IconButton
              icon="chevron-right"
              onPress={() => {
                navigate.navigate("Detail", { id });
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 70,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    width: "25%",
    aspectRatio: 1,
  },
  cardContent: {
    flex: 5,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  cardIcon: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NewsCard;
