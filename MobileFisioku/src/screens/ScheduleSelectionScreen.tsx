import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, SPACING, FONTS, SHADOWS } from '../constants/theme';
import Button from '../components/Button';

const ScheduleSelectionScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const therapist = route.params?.therapist;
  const bookingData = route.params?.bookingData;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
  ];

  const dates = generateDates();

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return {
      dayName: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      fullDate: date.toISOString().split('T')[0],
    };
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Incomplete Selection', 'Please select both date and time');
      return;
    }

    // Navigate to confirmation screen
    navigation.navigate('BookingConfirmation', {
      therapist,
      bookingData: {
        ...bookingData,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Therapist Info */}
        <View style={styles.therapistCard}>
          <Text style={styles.therapistName}>{therapist?.name}</Text>
          <Text style={styles.therapistInfo}>Select your preferred schedule</Text>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesContainer}>
            {dates.map((date, index) => {
              const { dayName, date: day, month, fullDate } = formatDate(date);
              const isSelected = selectedDate === fullDate;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateCard,
                    isSelected && styles.dateCardSelected,
                  ]}
                  onPress={() => setSelectedDate(fullDate)}>
                  <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
                    {dayName}
                  </Text>
                  <Text style={[styles.dateNumber, isSelected && styles.dateNumberSelected]}>
                    {day}
                  </Text>
                  <Text style={[styles.monthName, isSelected && styles.monthNameSelected]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map((time, index) => {
              const isSelected = selectedTime === time;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlot,
                    isSelected && styles.timeSlotSelected,
                  ]}
                  onPress={() => setSelectedTime(time)}>
                  <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Summary */}
        {selectedDate && selectedTime && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Selected Schedule</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time:</Text>
              <Text style={styles.summaryValue}>{selectedTime}</Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="Confirm Schedule"
          onPress={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          size="large"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  therapistCard: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  therapistName: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  therapistInfo: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.9,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  datesContainer: {
    paddingRight: SPACING.lg,
    gap: SPACING.sm,
  },
  dateCard: {
    width: 70,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundSecondary,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  dateCardSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayName: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  dayNameSelected: {
    color: COLORS.white,
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  dateNumberSelected: {
    color: COLORS.white,
  },
  monthName: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  monthNameSelected: {
    color: COLORS.white,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  timeSlot: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 2,
    borderColor: COLORS.border,
    minWidth: 80,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  timeTextSelected: {
    color: COLORS.white,
  },
  summaryCard: {
    backgroundColor: COLORS.secondaryLight,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  summaryTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    width: 60,
  },
  summaryValue: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default ScheduleSelectionScreen;
