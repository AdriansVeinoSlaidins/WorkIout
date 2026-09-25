import { colors, globalStyles } from "@/styles/global";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";


export default function Account() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");

  const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.replace("/");
    }
  };
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

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

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.buttonMainBlue}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>

        <Text style={styles.dontHave}>
          Don't have an account?{" "}
        </Text>

        <TouchableOpacity onPress={() => router.push("/signUp")}>
          <Text style={styles.signup}>Sign up</Text>
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
    backgroundColor: colors.background
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
    color: colors.text
    
  },

  forgot: {
    textAlign: "right",
    marginBottom: 24,
    color: colors.text,
  },

  button: {
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  dontHave: {
    fontWeight: "bold",
    color: colors.text,
  },
  signup: {
    fontWeight: "bold",
    color: "blue",
  },
});