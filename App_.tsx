/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import remoteConfig from '@react-native-firebase/remote-config';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [message, setMessage] = useState<string>('');
  const [hasModule, setHasModule] = useState<boolean>(false);
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        has_module_1: false,
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(async fetchedRemotely => {
        await remoteConfig().fetch(0);
        if (fetchedRemotely) {
          const awesomeNewFeature = remoteConfig().getValue('has_module_1');

          if (awesomeNewFeature.getSource() === 'remote') {
            console.log('Parameter value was from the Firebase servers.');
            if (awesomeNewFeature.asBoolean() === true) {
              console.log('Vou mostrar o modulo.');
              setHasModule(true);
            } else {
              console.log('Nao Vou mostrar o modulo.');
            }
          } else if (awesomeNewFeature.getSource() === 'default') {
            console.log('Parameter value was from a default value.');
          } else {
            console.log('Parameter value was from a locally cached value.');
          }

          // console.log('Configs were retrieved from the backend and activated.');
          // const hasModule = remoteConfig().getValue('has_module_1');
          // if (hasModule.getSource() === 'remote') {
          //   console.log(
          //     'Vou mostrar o modulo::: ' +
          //       JSON.stringify(hasModule.asBoolean()),
          //   );
          // }
          // if (hasModule.asBoolean() === true) {
          //   console.log('Vou mostrar o modulo');
          // }
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {hasModule && (
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
          )}
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
