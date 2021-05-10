import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions : null,
            scanned : false,
            scannedData : '',
            buttonState : 'normal'
        }
    }

    getCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState: 'clicked'
        })
    }

    handleBarCodeScanner = async({type, data}) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if(buttonState === 'clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
                    style={StyleSheet.absoluteFillObject}
                />
            );
        }
        else if(buttonState === 'normal') {
            return(
                <View style={styles.container}>
                    <Image source={require('./assets/scanner.jpg')}/>
                    <Text style={styles.displayText}>
                        {hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"}
                    </Text>
                    <TouchableOpacity
                        onPress={this.getCameraPermission()}
                        style={styles.scanButton}>
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center'
    },
    buttonText : {
        fontSize: 15
    },
    scanButton : {
        backgroundColor : '#E32929',
        padding: 10,
        margin: 10
    },
    displayText: {
        fontSize : 15,
        textDecorationLine: 'underline'
    }
})