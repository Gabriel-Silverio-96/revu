import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { LinkFlashcard } from "@/components/LinkFlashcard";
import { ButtonLink } from "@/components/ButtonLink";

interface IFlashcards {
  id: string;
  question: string;
  answer: string;
}

interface ICollections {
  id: string;
  name: string;
  flashcards: Array<IFlashcards>;
}

export default function TabTwoScreen() {
  const [collections, setCollections] = useState<Array<ICollections>>([
    {
      id: "1",
      name: "JavaScript Basics",
      flashcards: [
        {
          id: "1",
          question: "What is a closure in JavaScript?",
          answer:
            "A closure is a function that remembers variables from its outer scope even after the outer function has closed.",
        },
        {
          id: "2",
          question: "What does 'this' refer to in JavaScript?",
          answer:
            "'this' refers to the object that is executing the current function.",
        },
      ],
    },
    {
      id: "2",
      name: "React Fundamentals",
      flashcards: [
        {
          id: "1",
          question: "What is JSX?",
          answer:
            "JSX is a syntax extension for JavaScript that looks similar to HTML and is used with React to describe UI structure.",
        },
        {
          id: "2",
          question: "What are hooks in React?",
          answer:
            "Hooks are functions that let you use React state and lifecycle features in functional components.",
        },
      ],
    },
    {
      id: "3",
      name: "HTML Basics",
      flashcards: [
        {
          id: "1",
          question: "What is HTML?",
          answer: "HyperText Markup Language.",
        },
        {
          id: "2",
          question: "What is a semantic tag?",
          answer: "Tags that have meaningful names.",
        },
      ],
    },
    {
      id: "4",
      name: "CSS Fundamentals",
      flashcards: [
        {
          id: "1",
          question: "What is Flexbox?",
          answer: "A layout model for arranging items in rows or columns.",
        },
        {
          id: "2",
          question: "What is specificity?",
          answer:
            "A hierarchy of rules used by the browser to determine which style to apply.",
        },
      ],
    },
    {
      id: "5",
      name: "TypeScript Basics",
      flashcards: [
        {
          id: "1",
          question: "What is TypeScript?",
          answer: "A superset of JavaScript that adds static typing.",
        },
        {
          id: "2",
          question: "What is an interface?",
          answer: "A way to define the shape of an object.",
        },
      ],
    },
    {
      id: "6",
      name: "Node.js Basics",
      flashcards: [
        {
          id: "1",
          question: "What is Node.js?",
          answer: "A runtime for running JavaScript outside the browser.",
        },
        { id: "2", question: "What is npm?", answer: "Node Package Manager." },
      ],
    },
    {
      id: "7",
      name: "Git Commands",
      flashcards: [
        {
          id: "1",
          question: "What does git clone do?",
          answer: "Copies a repo from a remote source.",
        },
        {
          id: "2",
          question: "What is git commit?",
          answer: "Saves changes to the local repository.",
        },
      ],
    },
    {
      id: "8",
      name: "REST API",
      flashcards: [
        {
          id: "1",
          question: "What is a REST API?",
          answer:
            "An architectural style for designing networked applications.",
        },
        {
          id: "2",
          question: "What does GET do?",
          answer: "Retrieves data from the server.",
        },
      ],
    },
    {
      id: "9",
      name: "HTTP Basics",
      flashcards: [
        {
          id: "1",
          question: "What is HTTP?",
          answer: "Hypertext Transfer Protocol.",
        },
        {
          id: "2",
          question: "What is a status code 404?",
          answer: "Not Found.",
        },
      ],
    },
    {
      id: "10",
      name: "Python Intro",
      flashcards: [
        {
          id: "1",
          question: "What is Python?",
          answer: "A high-level, interpreted programming language.",
        },
        { id: "2", question: "What is PEP8?", answer: "Python's style guide." },
      ],
    },
  ]);

  const isShowMessageEmptyCollection = collections?.length === 0;
  const breakLine = "\n";

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Collections</Text>
        <Text style={styles.description}>
          Start building your knowledge library. Add a question, write the
          answer, and organize your flashcards by topic. The more you create,
          the more you'll retain!
        </Text>

        {isShowMessageEmptyCollection && (
          <View>
            <Image
              style={styles.backgroundImage}
              source={require("@/assets/images/empty-collection.png")}
            />
            <Text style={[styles.description, styles.textCenter]}>
              Looks like your collection is empty.{breakLine}Start by creating
              your first one!
            </Text>
          </View>
        )}

        {collections?.map(({ id, name }) => (
          <LinkFlashcard key={id} id={id}>
            {name}
          </LinkFlashcard>
        ))}
      </ScrollView>

      <View style={styles.buttonBackground}>
        <View style={styles.fixedButtonContainer}>
          <ButtonLink href="/">Create</ButtonLink>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
  },
  container: {
    paddingTop: 50,
    paddingBottom: 100,
    paddingHorizontal: 24,
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: "#A1A1A1",
    fontSize: 13,
    marginTop: 15,
  },
  backgroundImage: {
    height: 346,
    width: 346,
    alignSelf: "center",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 24,
    right: 24,
  },
  buttonBackground: {
    backgroundColor: "#FFF",
    height: 100,
  },
});
