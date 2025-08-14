import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';
import { StudyResource, StudyResourceCategory } from '../../types';

const MOCK_RESOURCES: StudyResource[] = [
  {
    id: '1',
    title: 'Python Programming for Beginners',
    url: 'https://python.org/tutorial',
    category: 'python',
    description: 'Comprehensive guide to Python programming fundamentals',
    tags: ['programming', 'basics', 'tutorial'],
  },
  {
    id: '2',
    title: 'Advanced Python Data Structures',
    url: 'https://docs.python.org/3/tutorial/datastructures.html',
    category: 'python',
    description: 'Deep dive into Python data structures and algorithms',
    tags: ['advanced', 'data-structures', 'algorithms'],
  },
  {
    id: '3',
    title: 'SQL Fundamentals and Database Design',
    url: 'https://sqlbolt.com',
    category: 'sql',
    description: 'Interactive SQL tutorial covering database fundamentals',
    tags: ['database', 'sql', 'design'],
  },
  {
    id: '4',
    title: 'Advanced SQL Queries and Optimization',
    url: 'https://use-the-index-luke.com',
    category: 'sql',
    description: 'Learn advanced SQL techniques and performance optimization',
    tags: ['advanced', 'performance', 'optimization'],
  },
  {
    id: '5',
    title: 'Cybersecurity Best Practices',
    url: 'https://owasp.org/www-project-top-ten/',
    category: 'general',
    description: 'OWASP Top 10 security risks and mitigation strategies',
    tags: ['security', 'owasp', 'best-practices'],
  },
  {
    id: '6',
    title: 'Machine Learning with Python',
    url: 'https://scikit-learn.org/stable/tutorial/',
    category: 'python',
    description: 'Scikit-learn tutorial for machine learning applications',
    tags: ['machine-learning', 'scikit-learn', 'data-science'],
  },
  {
    id: '7',
    title: 'Database Normalization Guide',
    url: 'https://www.studytonight.com/dbms/database-normalization.php',
    category: 'sql',
    description: 'Complete guide to database normalization principles',
    tags: ['normalization', 'database-design', 'theory'],
  },
  {
    id: '8',
    title: 'Git Version Control Handbook',
    url: 'https://git-scm.com/book',
    category: 'general',
    description: 'Comprehensive guide to Git version control system',
    tags: ['git', 'version-control', 'collaboration'],
  },
  {
    id: '9',
    title: 'Network Security Fundamentals',
    url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
    category: 'general',
    description: 'CISCO networking and security fundamentals',
    tags: ['networking', 'security', 'cisco'],
  },
  {
    id: '10',
    title: 'Data Analysis with Pandas',
    url: 'https://pandas.pydata.org/docs/user_guide/index.html',
    category: 'python',
    description: 'Complete guide to data manipulation with pandas',
    tags: ['pandas', 'data-analysis', 'python'],
  },
];

const CATEGORY_FILTERS: { label: string; value: StudyResourceCategory | 'all' }[] = [
  { label: 'All Resources', value: 'all' },
  { label: 'Python', value: 'python' },
  { label: 'SQL', value: 'sql' },
  { label: 'General', value: 'general' },
];

const LibraryScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<StudyResourceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleResourcePress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Cannot Open Link', 'Unable to open this resource in a browser.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open the resource.');
    }
  };

  const getCategoryColor = (category: StudyResourceCategory) => {
    switch (category) {
      case 'python':
        return '#43e97b';
      case 'sql':
        return '#4facfe';
      case 'general':
        return '#f093fb';
      default:
        return COLORS.primary;
    }
  };

  const getCategoryIcon = (category: StudyResourceCategory) => {
    switch (category) {
      case 'python':
        return 'logo-python';
      case 'sql':
        return 'server';
      case 'general':
        return 'book';
      default:
        return 'document';
    }
  };

  const renderFilterButton = ({ item }: { item: typeof CATEGORY_FILTERS[0] }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedCategory === item.value && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedCategory(item.value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedCategory === item.value && styles.filterButtonTextActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderResourceCard = ({ item }: { item: StudyResource }) => (
    <TouchableOpacity
      style={styles.resourceCard}
      onPress={() => handleResourcePress(item.url)}
      activeOpacity={0.8}
    >
      <View style={styles.resourceHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(item.category) }]}>
          <Ionicons name={getCategoryIcon(item.category) as any} size={24} color={COLORS.white} />
        </View>
        <View style={styles.resourceTitle}>
          <Text style={styles.resourceName}>{item.title}</Text>
          <Text style={styles.resourceCategory}>{item.category.toUpperCase()}</Text>
        </View>
        <Ionicons name="open-outline" size={20} color={COLORS.textSecondary} />
      </View>
      
      {item.description && (
        <Text style={styles.resourceDescription}>{item.description}</Text>
      )}
      
      <View style={styles.tagsContainer}>
        {item.tags.map((tag) => (
          <View key={tag} style={[styles.tag, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
            <Text style={[styles.tagText, { color: getCategoryColor(item.category) }]}>
              {tag}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4facfe" />
      
      {/* Header */}
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="library" size={28} color={COLORS.white} />
            <Text style={styles.headerTitle}>Study Library</Text>
          </View>
          <Text style={styles.headerSubtitle}>Curated learning resources</Text>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources, tags, or topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={CATEGORY_FILTERS}
          renderItem={renderFilterButton}
          keyExtractor={(item) => item.value}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        />
      </View>

      {/* Resources List */}
      <View style={styles.listContainer}>
        {filteredResources.length > 0 ? (
          <FlatList
            data={filteredResources}
            renderItem={renderResourceCard}
            keyExtractor={(item) => item.id}
            style={styles.resourcesList}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="library-outline" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyStateText}>No resources found</Text>
            <Text style={styles.emptyStateSubtext}>
              {searchQuery ? 'Try adjusting your search terms' : 'Check back later for new resources'}
            </Text>
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
  searchContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    marginRight: SPACING.sm,
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
    backgroundColor: '#4facfe',
    borderColor: '#4facfe',
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
  resourcesList: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.lg,
  },
  resourceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  resourceTitle: {
    flex: 1,
  },
  resourceName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  resourceCategory: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  resourceDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.md * 1.4,
    marginBottom: SPACING.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
  },
  tag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  tagText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
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

export default LibraryScreen;