import * as ImagePicker from 'expo-image-picker';


export default async function pickImage() {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!result.canceled) {
        console.log('ere')
        return result.assets[0].uri
    }
    else{
        console.log('problem')
    }

}


