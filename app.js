import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import PushNotification from 'react-native-push-notification';

import DeviceInfo from 'react-native-device-info';

import Backendless from 'backendless';

const APP_ID = 'C764E188-485E-5A7F-FF8F-730CBB4B9A00';
const APP_KEY = '22EB2C3C-0669-BC24-FF55-EA44FA764F00';

Backendless.initApp(APP_ID, APP_KEY, 'v1');

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(deviceToken) {
        const options = {
            deviceToken: deviceToken.token,
            deviceId   : DeviceInfo.getUniqueID(),
            os         : deviceToken.os.toUpperCase(),
            osVersion  : DeviceInfo.getSystemVersion()
        };

        Backendless._ajax({
            method      : 'POST',
            url         : [Backendless.serverURL, 'v1', 'messaging', 'registrations'].join('/'),
            data        : JSON.stringify(options),
            isAsync     : true,
            asyncHandler: {
                success: function(){
                    alert("Registration done");
                },
                fault: function(error){
                    console.error(error);
                    alert("Error");
                }
            }
        });
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        alert( 'NOTIFICATION' );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "465312024051",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});