import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';
import { FacultyMember, AcademicProgram } from '../../types';

const MOCK_FACULTY: FacultyMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    title: 'Professor of Cybersecurity',
    email: 'sarah.mitchell@noroff.no',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    program: 'cyber-security',
    department: 'Information Security',
  },
  {
    id: '2',
    name: 'Prof. James Anderson',
    title: 'Head of Data Science Department',
    email: 'james.anderson@noroff.no',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    program: 'data-science',
    department: 'Data Analytics',
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    title: 'Associate Professor',
    email: 'maria.rodriguez@noroff.no',
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    program: 'both',
    department: 'Computer Science',
  },
  {
    id: '4',
    name: 'Dr. Michael Johnson',
    title: 'Senior Lecturer in Network Security',
    email: 'michael.johnson@noroff.no',
    imageUrl: 'https://randomuser.me/api/portraits/men/56.jpg',
    program: 'cyber-security',
    department: 'Information Security',
  },
  {
    id: '5',
    name: 'Prof. Emma Thompson',
    title: 'Director of Research',
    email: 'emma.thompson@noroff.no',
    imageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
    program: 'data-science',
    department: 'Research & Development',
  },
  {
    id: '6',
    name: 'Dr. David Wilson',
    title: 'Assistant Professor',
    email: 'david.wilson@noroff.no',
    imageUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
    program: 'cyber-security',
    department: 'Ethical Hacking',
  },
];

const PROGRAM_FILTERS: { label: string; value: AcademicProgram | 'all' }[] = [
  { label: 'All Faculty', value: 'all' },
  { label: 'Cybersecurity', value: 'cyber-security' },
  { label: 'Data Science', value: 'data-science' },
];

const FacultyScreen: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgram | 'all'>('all');
  const insets = useSafeAreaInsets();

  const filteredFaculty = MOCK_FACULTY.filter(faculty => 
    selectedProgram === 'all' || 
    faculty.program === selectedProgram || 
    faculty.program === 'both'
  );

  const handleEmailPress = async (email: string) => {
    try {
      const supported = await Linking.canOpenURL(`mailto:${email}`);
      if (supported) {
        await Linking.openURL(`mailto:${email}`);
      } else {
        Alert.alert('Email Not Available', 'No email client is configured on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open email client.');
    }
  };

  const renderFilterButton = ({ item }: { item: typeof PROGRAM_FILTERS[0] }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedProgram === item.value && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedProgram(item.value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedProgram === item.value && styles.filterButtonTextActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderFacultyMember = ({ item }: { item: FacultyMember }) => (
    <View style={styles.facultyCard}>
      <View style={styles.facultyInfo}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
          <View style={[styles.programBadge, getProgramBadgeColor(item.program)]}>
            <Text style={styles.programBadgeText}>
              {item.program === 'cyber-security' ? 'CS' : 
               item.program === 'data-science' ? 'DS' : 'BOTH'}
            </Text>
          </View>
        </View>
        
        <View style={styles.facultyDetails}>
          <Text style={styles.facultyName}>{item.name}</Text>
          <Text style={styles.facultyTitle}>{item.title}</Text>
          {item.department && (
            <Text style={styles.facultyDepartment}>{item.department}</Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => handleEmailPress(item.email)}
      >
        <Ionicons name="mail" size={20} color={COLORS.primary} />
        <Text style={styles.emailButtonText}>Email</Text>
      </TouchableOpacity>
    </View>
  );

  const getProgramBadgeColor = (program: AcademicProgram) => {
    switch (program) {
      case 'cyber-security':
        return { backgroundColor: '#f093fb' };
      case 'data-science':
        return { backgroundColor: '#4facfe' };
      case 'both':
        return { backgroundColor: '#43e97b' };
      default:
        return { backgroundColor: COLORS.primary };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f093fb" />
      
      {/* Header */}
      <LinearGradient
        colors={['#f093fb', '#f5576c']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="people" size={28} color={COLORS.white} />
            <Text style={styles.headerTitle}>Faculty Directory</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Filter Buttons */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={PROGRAM_FILTERS}
          renderItem={renderFilterButton}
          keyExtractor={(item) => item.value}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        />
      </View>

      {/* Faculty List */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredFaculty}
          renderItem={renderFacultyMember}
          keyExtractor={(item) => item.id}
          style={styles.facultyList}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      
      {filteredFaculty.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyStateText}>No faculty members found</Text>
        </View>
      )}
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
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  filtersContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  filtersContent: {
    paddingHorizontal: SPACING.lg,
  },
  filterButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  filterButtonActive: {
    backgroundColor: '#f093fb',
    borderColor: '#f093fb',
  },
  filterButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  facultyList: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.lg,
  },
  facultyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  facultyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surface,
  },
  programBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  programBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: COLORS.white,
  },
  facultyDetails: {
    flex: 1,
  },
  facultyName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  facultyTitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  facultyDepartment: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  emailButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  separator: {
    height: SPACING.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyStateText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});

export default FacultyScreen;