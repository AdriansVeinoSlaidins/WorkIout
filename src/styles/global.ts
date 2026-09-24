import { StyleSheet } from 'react-native';

export const colors = {
  background: '#1a1a2e',
  header: '#1a1a2e',
  surface: '#2a2a4a',
  outline: "#ebecec",
  primary: '#4fc3f7',
  text: '#ffffff',
  textSecondary: '#a0a0b0',
  alert: '#ff5252',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },

  buttonMainBlue: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
    
  },

  scrollviewcontainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },

  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});