import { Platform } from 'react-native';
import { io } from "socket.io-client";


export const baseURl = Platform.OS === 'android' ? 'http://10.0.2.2:3000': 'http://localhost:3000';


export const socket = io.connect('http://localhost:3000')