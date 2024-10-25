import React,{useEffect,useState} from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text,Dimensions  } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const { width } = Dimensions.get('window');


const SplashScreen = () => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 1) {
            return prevProgress + 0.01; // Increase gradually
          }
          clearInterval(timer); // Stop once complete
          return prevProgress;
        });
      }, 10); // Adjust interval speed
  
      return () => clearInterval(timer); // Cleanup on component unmount
    }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>DevGuides</Text>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/DevGuide.png')}
            style={styles.image}
            resizeMode="contain" // Adjust to maintain aspect ratio
          />
        </View>
      </View>
      <View style={{justifyContent:'center',alignItems:'center',paddingTop:70}}>
      <ProgressBar 
      progress={progress} 
      width={width*0.8} 
      height={20} 
      color='#7ed957'/>
      </View>
      <View style={styles.footer}>
        <Image 
          source={require('../assets/People.png')}
          style={styles.footerImage}
          resizeMode='contain'// Adjust to maintain aspect ratio
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  headingContainer: {
    paddingTop: 90,
    alignItems: 'center', // Center the content horizontally
  },
  heading: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Helvetica-light',
    fontSize: 20,
  },
  image: {
    width: 170,
    height: 170,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  footerImage: {
    height: 470, // 80% of screen width
    width: 470,  // 80% of screen width
  },
  
});

export default SplashScreen;

