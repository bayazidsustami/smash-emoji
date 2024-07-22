import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';

import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAppOptions, setShowAppOptions] = useState(false)

  const imagePickerAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      quality:1,
    })

    if(!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert("you didn't select any image")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContiner}>
        <ImageViewer 
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (<View/>) : (
        <View style={styles.footerContiner}>
          <Button theme="primary" label={"Choose a photo"} onPress={imagePickerAsync}/>
          <Button label={"Use this photo"} onPress={setShowAppOptions(true)}/>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContiner: {
    flex: 1,
    paddingTop:58
  },
  footerContiner: {
    flex: 1/3,
    alignItems: 'center',
  }
});
