import { Image, StyleSheet,Text, Platform } from 'react-native';
import {Redirect} from "expo-router";



export default function HomeScreen() {
  return <Redirect href={"/login"} />;
}


