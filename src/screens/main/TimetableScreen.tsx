import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';

interface ClassSession {
  id: string;
  subject: string;
  instructor: string;
  room: string;
  startTime: string;
  endTime: string;
  type: 'lecture' | 'lab' | 'seminar' | 'workshop';
  program: 'cyber-security' | 'data-science';
}

interface DaySchedule {
  day: string;
  date: string;
  classes: ClassSession[];
}

const MOCK_SCHEDULE: DaySchedule[] = [
  {
    day: 'Monday',
    date: '2024-03-18',
    classes: [
      {
        id: '1',
        subject: 'Network Security Fundamentals',
        instructor: 'Dr. Sarah Mitchell',
        room: 'CS-201',
        startTime: '09:00',
        endTime: '10:30',
        type: 'lecture',
        program: 'cyber-security',
      },
      {
        id: '2',
        subject: 'Data Structures & Algorithms',
        instructor: 'Prof. James Anderson',
        room: 'DS-101',
        startTime: '11:00',
        endTime: '12:30',
        type: 'lecture',
        program: 'data-science',
      },
      {
        id: '3',
        subject: 'Ethical Hacking Workshop',
        instructor: 'Dr. David Wilson',
        room: 'LAB-A',
        startTime: '14:00',
        endTime: '16:00',
        type: 'workshop',
        program: 'cyber-security',
      },
    ],
  },
  {
    day: 'Tuesday',
    date: '2024-03-19',
    classes: [
      {
        id: '4',
        subject: 'Machine Learning Basics',
        instructor: 'Prof. Emma Thompson',
        room: 'DS-202',
        startTime: '10:00',
        endTime: '11:30',
        type: 'lecture',
        program: 'data-science',
      },
      {
        id: '5',
        subject: 'Cryptography Lab',
        instructor: 'Dr. Michael Johnson',
        room: 'LAB-B',
        startTime: '13:00',
        endTime: '15:00',
        type: 'lab',
        program: 'cyber-security',
      },
    ],
  },
  {
    day: 'Wednesday',
    date: '2024-03-20',
    classes: [
      {
        id: '6',
        subject: 'Data Visualization',
        instructor: 'Dr. Maria Rodriguez',
        room: 'DS-103',
        startTime: '09:30',
        endTime: '11:00',
        type: 'lecture',
        program: 'data-science',
      },
      {
        id: '7',
        subject: 'Incident Response Seminar',
        instructor: 'Dr. Sarah Mitchell',
        room: 'CS-301',
        startTime: '15:00',
        endTime: '16:30',
        type: 'seminar',
        program: 'cyber-security',
      },
    ],
  },
  {
    day: 'Thursday',
    date: '2024-03-21',
    classes: [
      {
        id: '8',
        subject: 'Python for Data Science',
        instructor: 'Prof. James Anderson',
        room: 'LAB-C',
        startTime: '10:00',
        endTime: '12:00',
        type: 'lab',
        program: 'data-science',
      },
      {
        id: '9',
        subject: 'Digital Forensics',
        instructor: 'Dr. David Wilson',
        room: 'CS-202',
        startTime: '13:30',
        endTime: '15:00',
        type: 'lecture',
        program: 'cyber-security',
      },
    ],
  },
  {
    day: 'Friday',
    date: '2024-03-22',
    classes: [
      {
        id: '10',
        subject: 'Research Methods',
        instructor: 'Prof. Emma Thompson',
        room: 'DS-201',
        startTime: '09:00',
        endTime: '10:30',
        type: 'lecture',
        program: 'data-science',
      },
    ],
  },
];

const TimetableScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const insets = useSafeAreaInsets();

  const selectedSchedule = MOCK_SCHEDULE.find(schedule => schedule.day === selectedDay);
  const currentTime = new Date().toTimeString().slice(0, 5);

  const getTypeColor = (type: ClassSession['type']) => {
    switch (type) {
      case 'lecture':
        return '#4facfe';
      case 'lab':
        return '#43e97b';
      case 'seminar':
        return '#f093fb';
      case 'workshop':
        return '#fa709a';
      default:
        return COLORS.primary;
    }
  };

  const getProgramColor = (program: ClassSession['program']) => {
    return program === 'cyber-security' ? '#f093fb' : '#4facfe';
  };

  const isCurrentClass = (startTime: string, endTime: string) => {
    return currentTime >= startTime && currentTime <= endTime;
  };

  const renderDayTab = ({ item }: { item: DaySchedule }) => (
    <TouchableOpacity
      style={[
        styles.dayTab,
        selectedDay === item.day && styles.dayTabActive,
      ]}
      onPress={() => setSelectedDay(item.day)}
    >
      <Text
        style={[
          styles.dayTabText,
          selectedDay === item.day && styles.dayTabTextActive,
        ]}
      >
        {item.day.slice(0, 3)}
      </Text>
      <Text
        style={[
          styles.dayTabDate,
          selectedDay === item.day && styles.dayTabDateActive,
        ]}
      >
        {item.date.slice(-2)}
      </Text>
    </TouchableOpacity>
  );

  const renderClassCard = ({ item }: { item: ClassSession }) => (
    <View style={[styles.classCard, isCurrentClass(item.startTime, item.endTime) && styles.currentClassCard]}>
      <View style={styles.timeContainer}>
        <Text style={styles.startTime}>{item.startTime}</Text>
        <View style={styles.timeLine} />
        <Text style={styles.endTime}>{item.endTime}</Text>
      </View>
      
      <View style={styles.classDetails}>
        <View style={styles.classHeader}>
          <Text style={styles.subjectName}>{item.subject}</Text>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
            <Text style={styles.typeBadgeText}>{item.type.toUpperCase()}</Text>
          </View>
        </View>
        
        <View style={styles.classInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={16} color={COLORS.textSecondary} />
            <Text style={styles.instructorName}>{item.instructor}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={16} color={COLORS.textSecondary} />
            <Text style={styles.roomName}>Room {item.room}</Text>
          </View>
        </View>
        
        <View style={[styles.programStrip, { backgroundColor: getProgramColor(item.program) }]}>
          <Text style={styles.programText}>
            {item.program === 'cyber-security' ? 'Cybersecurity' : 'Data Science'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#fa709a" />
      
      {/* Header */}
      <LinearGradient
        colors={['#fa709a', '#fee140']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="calendar" size={28} color={COLORS.white} />
            <Text style={styles.headerTitle}>Class Timetable</Text>
          </View>
          <Text style={styles.headerSubtitle}>Week of March 18-22, 2024</Text>
        </View>
      </LinearGradient>

      {/* Day Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          data={MOCK_SCHEDULE}
          renderItem={renderDayTab}
          keyExtractor={(item) => item.day}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        />
      </View>

      {/* Schedule Content */}
      <View style={styles.scheduleContainer}>
        {selectedSchedule && selectedSchedule.classes.length > 0 ? (
          <FlatList
            data={selectedSchedule.classes}
            renderItem={renderClassCard}
            keyExtractor={(item) => item.id}
            style={styles.scheduleList}
            contentContainerStyle={styles.scheduleContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyStateText}>No classes scheduled</Text>
            <Text style={styles.emptyStateSubtext}>Enjoy your free day!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tabsContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  tabsContent: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  dayTab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  dayTabActive: {
    backgroundColor: '#fa709a',
  },
  dayTabText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  dayTabTextActive: {
    color: COLORS.white,
  },
  dayTabDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  dayTabDateActive: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scheduleContainer: {
    flex: 1,
  },
  scheduleList: {
    flex: 1,
  },
  scheduleContent: {
    padding: SPACING.lg,
  },
  classCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currentClassCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#fa709a',
    backgroundColor: '#fff8f0',
  },
  timeContainer: {
    alignItems: 'center',
    marginRight: SPACING.lg,
    minWidth: 60,
  },
  startTime: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  timeLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.surface,
    marginVertical: SPACING.xs,
  },
  endTime: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  classDetails: {
    flex: 1,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  subjectName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  typeBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.white,
  },
  classInfo: {
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  instructorName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  roomName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  programStrip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  programText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.white,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyStateText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  emptyStateSubtext: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default TimetableScreen;