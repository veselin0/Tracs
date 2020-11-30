import '../_mockLocation';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { requestPermissionsAsync } from 'expo-location';
import Map from '../components/Map';

const TrackCreateScreen = () => {
  const err = useWatchingEffect();

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please, enable location services</Text> : null}
    </SafeAreaView>
  );
};

const useWatchingEffect = () => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
      } catch (e) {
        setErr(e);
      }
    };

    startWatching().catch(console.error);
  }, []);

  return err;
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
