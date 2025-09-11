import { Image } from 'expo-image';
import { useEffect } from 'react';
import { Platform, StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabTwoScreen() {

  useEffect(() => {
    
  })
  
  return (
    <SafeAreaView style={styles.safe}>
      <View className='items-center justify-center h-full w-full gap-8 px-10'>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
});

