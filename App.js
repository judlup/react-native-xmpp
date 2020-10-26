/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

var XMPP = require('react-native-xmpp');


import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Habilitar conexión remota en /etc/ejabberd/ejarbberd.yml reemplazando localhost por la ip
// Tambien en la sección de control del puerto 5222 se debe deshabilitar starttls_required definiendoles el valor de false
// Luego creando el registro de los usuario en la consola para el dominio de la ip 

//---
var XMPP = require('react-native-xmpp');
// optional callbacks
XMPP.on('message', (message) =>
  console.log('MESSAGE:' + JSON.stringify(message)),
);

XMPP.on('iq', (message) => console.log('IQ:' + JSON.stringify(message)));
XMPP.on('presence', (message) =>
  console.log('PRESENCE:' + JSON.stringify(message)),
);

XMPP.on('error', (message) => console.log('ERROR:' + message));
XMPP.on('loginError', (message) => console.log('LOGIN ERROR:' + message));
XMPP.on('login', (message) => console.log('LOGGED!'));
XMPP.on('connect', (message) => {
  console.log('CONNECTED!');
});
XMPP.on('disconnect', (message) => console.log('DISCONNECTED!'));

var xmpp = XMPP.on('message', (message) =>
  console.log('MESSAGE:' + JSON.stringify(message)),
);

// trustHosts (ignore self-signed SSL issues)
// Warning: Do not use this in production (security will be compromised).
XMPP.trustHosts(['xmpp.jp']);

// connect
XMPP.connect('juanhx@xmpp.jp', 'dasa5684');
//PARA HACER UNA COEXION LOCAL HAY QUE DESABILITAR EL METODO DE CONEXION SSL EN:
//node-modules/react-native-xmpp/android/src/main/java/rnxmpp/service/XmppServiceSmacklmopl.java --> Line 76
//.setSecurityMode(ConnectionConfiguration.SecurityMode.required); ---->  .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled);

// send message
function afterwait() {
  XMPP.message('Hola', 'judlup@xmpp.jp');
  console.log('Aqui se manda el mansaje');
}
console.log('Waiting...');
setTimeout(afterwait, 10000);
//---

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits .
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
