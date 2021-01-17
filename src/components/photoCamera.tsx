import React, { useState, useEffect, FC } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

interface Props {
  setCameraView: Function;
  setPhotoUri: Function;
}

const PhotoCamera: FC<Props> = ({ setCameraView, setPhotoUri }: Props) => {
  const navigation = useNavigation();
  const [cameraRef, setCameraRef] = useState<Camera>();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      status && setHasPermission(true);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref: Camera) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity onPress={() => setCameraView(false)}>
            <Icon style={styles.icon} fill="#fff" name="close-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (cameraRef) {
                await cameraRef.takePictureAsync().then(async (result) => {
                  setPhotoUri(result.uri);
                  setCameraView(false);
                });
              }
            }}
          >
            <View style={styles.exCircle}>
              <View style={styles.inCircle}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Icon style={styles.icon} fill="#fff" name="flip-outline" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default PhotoCamera;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  camera: {
    display: "flex",
    flex: 1,
  },
  cameraButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: 40,
  },
  exCircle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inCircle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
