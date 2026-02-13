import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';

const STORAGE_KEY = 'baby_dob';

const colors = {
  background: '#f8f8fc',
  primary: '#6c5ce7',
  primaryDisabled: '#B8B5E0',
  textPrimary: '#1a1a2e',
  textSecondary: '#888',
  white: '#fff',
  border: '#e8e0ff',
  ageBg: '#f0eaff',
};

function getAgeInMonths(dob: Date): number {
  const now = new Date();
  return (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
}

function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatAge(months: number): string {
  return `${months} ${months === 1 ? 'month' : 'months'} old`;
}

export default function App() {
  const [showPicker, setShowPicker] = useState(false);
  const [dob, setDob] = useState<DateType>(undefined);

  useEffect(() => {
    void AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored) setDob(stored);
    });
  }, []);

  const handleDateChange = ({ date }: { date: DateType }) => {
    if (!date) return;
    setDob(date);
    setShowPicker(false);
    void AsyncStorage.setItem(STORAGE_KEY, new Date(date.toString()).toISOString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <Text style={styles.illustrationEmoji}>👶</Text>
        </View>

        <Text role="heading" style={styles.welcomeLabel}>
          Welcome to Sleepy Baby
        </Text>
        <Text style={styles.heading}>When was your baby born?</Text>
        <Text style={styles.subtitle}>We use this to calculate age-appropriate sleep windows for your baby.</Text>

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
            <View>
              <Text style={styles.birthdateLabel}>Birthdate</Text>
              {dob && <Text style={styles.birthdateValue}>{formatDateLong(new Date(dob.toString()))}</Text>}
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}

        {dob && (
          <View style={styles.agePill}>
            <Text style={styles.ageIcon}>🎂</Text>
            <Text style={styles.ageText}>{formatAge(getAgeInMonths(new Date(dob.toString())))}</Text>
          </View>
        )}

        <View style={styles.spacer} />

        <Pressable
          role="button"
          accessibilityLabel="Get Started"
          disabled={!dob}
          style={[styles.getStartedButton, !dob && styles.getStartedButtonDisabled]}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 32,
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#dfe6fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  illustrationEmoji: {
    fontSize: 56,
  },
  welcomeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 40,
  },
  birthdateButton: {
    width: '100%',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  birthdateLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  birthdateValue: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 4,
  },
  chevron: {
    fontSize: 20,
    color: '#ccc',
  },
  pickerContainer: {
    width: '100%',
  },
  agePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.ageBg,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  ageIcon: {
    fontSize: 20,
  },
  ageText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  getStartedButton: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  getStartedButtonDisabled: {
    backgroundColor: colors.primaryDisabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  getStartedText: {
    fontSize: 17,
    fontWeight: '700',
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
