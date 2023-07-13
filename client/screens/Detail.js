import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Chip } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { GET_POST_DETAIL } from "../config/queries";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
const Detail = () => {
  const route = useRoute();
  const { loading, data, error } = useQuery(GET_POST_DETAIL, {
    variables: {
      getPostId: route.params.id,
    },
  });
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setPost(data?.getPost?.data || {});
    setTags(data?.getPost?.data?.Tags || []);
    console.log(data);
  }, [data]);
  if (loading) return <ActivityIndicator size={"large"} />;
  if (error)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Image
          style={styles.image}
          source={{
            uri: post.imgUrl,
          }}
        />
        <Text style={styles.author}>Author: {post?.User?.username}</Text>
        <Text style={styles.content}>{post?.content}</Text>
        <Text style={{ marginTop: 20 }}>Category: {post?.Category?.name}</Text>
        <View style={styles.tagView}>
          <Text>Tags:</Text>
          {tags.map((tag) => {
            return (
              <Chip key={tag?.id} style={{ backgroundColor: "grey" }}>
                <Text style={{ color: "white" }}>{tag?.name}</Text>
              </Chip>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    resizeMode: "cover",
    borderRadius: 8,
  },
  content: {
    fontSize: 16,
  },
  author: {
    fontSize: 16,
    fontWeight: 600,
  },
  tagView: {
    flexDirection: "row",
    marginVertical: 4,
    gap: 5,
    alignItems: "center",
  },
  tagBorder: {
    borderColor: "red",
    borderStyle: "solid",
  },
});

export default Detail;
