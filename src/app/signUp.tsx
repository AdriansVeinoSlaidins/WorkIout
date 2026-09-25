import { colors, globalStyles } from "@/styles/global";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./hooks/useAuth";

export default function Signup() {

  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {

    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    try {

      const data = await signUp(email, password);

      // If email confirmation is enabled in Supabase
      if (!data.session) {
        Alert.alert(
          "Check your email",
          "We sent you a confirmation email."
        );

        router.replace("/account");
        return;
      }

      // If email confirmation isn't required
      router.replace("/(tabs)");

    } catch (error: any) {
      Alert.alert("Signup failed", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>
        Sign up to get started
      </Text>

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Confirm password</Text>

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={globalStyles.buttonMainBlue}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>

        <Text style={styles.dontHave}>
          Already have an account?{" "}
        </Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 32,
    color: colors.text,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: colors.text,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: colors.outline,
    color: colors.text,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  dontHave: {
    fontWeight: "bold",
    color: colors.text,
  },

  login: {
    fontWeight: "bold",
    color: "blue",
  },
});