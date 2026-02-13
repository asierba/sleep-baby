import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';

const colors = {
  background: '#fff',
  primary: '#6C63FF',
  primaryDisabled: '#B8B5E0',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  white: '#fff',
  border: '#E5E7EB',
};

function getAgeInMonths(dob: Date): number {
  const now = new Date();
  return (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
}

export default function App() {
  const [showPicker, setShowPicker] = useState(false);
  const [dob, setDob] = useState<DateType>(undefined);

  const handleDateChange = ({ date }: { date: DateType }) => {
    setDob(date);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text role="heading" style={styles.heading}>
        Welcome to Sleepy Baby
      </Text>
      <Text style={styles.subtitle}>When was your baby born?</Text>
      {showPicker ? (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            mode="single"
            date={dob}
            maxDate={new Date()}
            onChange={handleDateChange}
            navigationPosition="around"
            components={{
              IconPrev: <Text style={styles.navArrow}>{'<'}</Text>,
              IconNext: <Text style={styles.navArrow}>{'>'}</Text>,
            }}
            styles={{
              disabled: styles.disabledDay,
            }}
          />
        </View>
      ) : (
        <Pressable
          role="button"
          accessibilityLabel="Birthdate"
          style={styles.birthdateButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.birthdateLabel}>Birthdate</Text>
        </Pressable>
      )}
      {dob && <Text style={styles.age}>{getAgeInMonths(new Date(dob.toString()))} months old</Text>}
      <Pressable
        role="button"
        accessibilityLabel="Get Started"
        disabled={!dob}
        style={[styles.getStartedButton, !dob && styles.getStartedButtonDisabled]}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  birthdateButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 320,
  },
  birthdateLabel: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    maxWidth: 320,
  },
  age: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  getStartedButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 320,
  },
  getStartedButtonDisabled: {
    backgroundColor: colors.primaryDisabled,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  disabledDay: {
    opacity: 0.3,
  },
  navArrow: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
