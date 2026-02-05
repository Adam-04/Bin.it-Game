import Constants from "expo-constants";
import { Platform } from "react-native";

export const getDevServerHost = (): string => {
  // Expo Go / physical device
  const debuggerHost =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri

  if (debuggerHost) {
    // e.g. "192.168.1.42:8081"
    return debuggerHost.split(":")[0];
  }

  // Emulator fallbacks
  if (Platform.OS === "android") {
    return "10.0.2.2";
  }

  return "localhost";
};
