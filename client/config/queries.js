import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Query {
    getAllPosts {
      id
      title
      slug
      content
      imgUrl
      categoryId
      authorId
      createdAt
      updatedAt
      Category {
        id
        name
        createdAt
        updatedAt
      }
      Tags {
        id
        name
        postId
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_POST_DETAIL = gql`
  query Query($getPostId: Int!) {
  getPost(id: $getPostId) {
    message
    data {
      id
      title
      slug
      content
      imgUrl
      categoryId
      authorId
      createdAt
      updatedAt
      User {
        _id
        username
        email
        password
        role
        phoneNumber
        address
      }
      Tags {
        id
        name
        postId
        createdAt
        updatedAt
      }
      Category {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
}
`;