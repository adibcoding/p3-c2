import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Button, IconButton, Avatar } from "react-native-paper";
import NewsCard from "../components/NewsCard";
import { GET_POSTS } from "../config/queries";
import { gql, useQuery } from "@apollo/client";

const Home = () => {
  const { loading, error, data, client } = useQuery(GET_POSTS);
  const renderItem = ({ item }) => (
    <NewsCard title={item?.title} image={item?.imgUrl} id={item?.id} />
  );

  if (loading) return <ActivityIndicator size="large" />;
  if (error)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={data?.getAllPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default Home;
