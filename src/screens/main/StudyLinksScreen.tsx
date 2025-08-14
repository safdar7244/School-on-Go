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
import { AcademicLink, AcademicLinkCategory } from '../../types';

const MOCK_LINKS: AcademicLink[] = [
  {
    id: '1',
    title: 'IEEE Computer Society Digital Library',
    url: 'https://www.computer.org/csdl/',
    category: 'research',
    description: 'Premier collection of computer science research papers and publications',
  },
  {
    id: '2',
    title: 'ACM Digital Library',
    url: 'https://dl.acm.org/',
    category: 'research',
    description: 'Computing and information technology research database',
  },
  {
    id: '3',
    title: 'arXiv Computer Science',
    url: 'https://arxiv.org/list/cs/recent',
    category: 'research',
    description: 'Open-access archive for computer science preprints',
  },
  {
    id: '4',
    title: 'Google Scholar',
    url: 'https://scholar.google.com/',
    category: 'research',
    description: 'Comprehensive academic search engine for scholarly literature',
  },
  {
    id: '5',
    title: 'LinkedIn Learning - Tech Skills',
    url: 'https://www.linkedin.com/learning/topics/technology',
    category: 'career',
    description: 'Professional development courses for technology careers',
  },
  {
    id: '6',
    title: 'Stack Overflow Jobs',
    url: 'https://stackoverflow.com/jobs',
    category: 'career',
    description: 'Tech job board with developer-focused positions',
  },
  {
    id: '7',
    title: 'GitHub Student Developer Pack',
    url: 'https://education.github.com/pack',
    category: 'career',
    description: 'Free developer tools and resources for students',
  },
  {
    id: '8',
    title: 'TED Talks Technology',
    url: 'https://www.ted.com/topics/technology',
    category: 'video',
    description: 'Inspiring talks about technology and innovation',
  },
  {
    id: '9',
    title: 'MIT OpenCourseWare - Computer Science',
    url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/',
    category: 'video',
    description: 'Free MIT computer science course materials and lectures',
  },
  {
    id: '10',
    title: 'Coursera Computer Science Courses',
    url: 'https://www.coursera.org/browse/computer-science',
    category: 'video',
    description: 'Online computer science courses from top universities',
  },
  {
    id: '11',
    title: 'Clean Code by Robert Martin',
    url: 'https://www.goodreads.com/book/show/3735293-clean-code',
    category: 'books',
    description: 'Essential book on writing maintainable and readable code',
  },
  {
    id: '12',
    title: 'Design Patterns: Elements of Reusable Software',
    url: 'https://www.goodreads.com/book/show/85009.Design_Patterns',
    category: 'books',
    description: 'Classic book on software design patterns (Gang of Four)',
  },
  {
    id: '13',
    title: 'The Pragmatic Programmer',
    url: 'https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer',
    category: 'books',
    description: 'Timeless tips for becoming a better programmer',
  },
  {
    id: '14',
    title: 'Cracking the Coding Interview',
    url: 'https://www.goodreads.com/book/show/12544648-cracking-the-coding-interview',
    category: 'books',
    description: 'Essential guide for technical interview preparation',
  },
];

const CATEGORY_FILTERS: { label: string; value: AcademicLinkCategory | 'all' }[] = [
  { label: 'All Links', value: 'all' },
  { label: 'Research', value: 'research' },
  { label: 'Career', value: 'career' },
  { label: 'Videos', value: 'video' },
  { label: 'Books', value: 'books' },
];

const StudyLinksScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AcademicLinkCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const filteredLinks = MOCK_LINKS.filter(link => {
    const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleLinkPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Cannot Open Link', 'Unable to open this link in a browser.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open the link.');
    }
  };

  const getCategoryColor = (category: AcademicLinkCategory) => {
    switch (category) {
      case 'research':
        return '#4facfe';
      case 'career':
        return '#43e97b';
      case 'video':
        return '#f093fb';
      case 'books':
        return '#fa709a';
      default:
        return COLORS.primary;
    }
  };

  const getCategoryIcon = (category: AcademicLinkCategory) => {
    switch (category) {
      case 'research':
        return 'flask';
      case 'career':
        return 'briefcase';
      case 'video':
        return 'play-circle';
      case 'books':
        return 'book';
      default:
        return 'link';
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

  const renderLinkCard = ({ item }: { item: AcademicLink }) => (
    <TouchableOpacity
      style={styles.linkCard}
      onPress={() => handleLinkPress(item.url)}
      activeOpacity={0.8}
    >
      <View style={styles.linkHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(item.category) }]}>
          <Ionicons name={getCategoryIcon(item.category) as any} size={24} color={COLORS.white} />
        </View>
        <View style={styles.linkTitle}>
          <Text style={styles.linkName} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.linkCategory}>{item.category.toUpperCase()}</Text>
        </View>
        <Ionicons name="open-outline" size={20} color={COLORS.textSecondary} />
      </View>
      
      {item.description && (
        <Text style={styles.linkDescription} numberOfLines={3}>{item.description}</Text>
      )}
      
      <View style={styles.linkFooter}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
          <Ionicons 
            name={getCategoryIcon(item.category) as any} 
            size={12} 
            color={getCategoryColor(item.category)} 
          />
          <Text style={[styles.categoryBadgeText, { color: getCategoryColor(item.category) }]}>
            {item.category}
          </Text>
        </View>
        <Ionicons name="arrow-forward" size={16} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#43e97b" />
      
      {/* Header */}
      <LinearGradient
        colors={['#43e97b', '#38f9d7']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="link" size={28} color={COLORS.white} />
            <Text style={styles.headerTitle}>Study Links</Text>
          </View>
          <Text style={styles.headerSubtitle}>Academic and career resources</Text>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search links and resources..."
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

      {/* Links List */}
      <View style={styles.listContainer}>
        {filteredLinks.length > 0 ? (
          <FlatList
            data={filteredLinks}
            renderItem={renderLinkCard}
            keyExtractor={(item) => item.id}
            style={styles.linksList}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="link-outline" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyStateText}>No links found</Text>
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
    backgroundColor: '#43e97b',
    borderColor: '#43e97b',
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
  linksList: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
  linkCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flex: 0.48,
  },
  linkHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  linkTitle: {
    flex: 1,
    marginRight: SPACING.xs,
  },
  linkName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    lineHeight: FONT_SIZES.md * 1.2,
  },
  linkCategory: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  linkDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.sm * 1.3,
    marginBottom: SPACING.md,
  },
  linkFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    marginLeft: SPACING.xs,
    textTransform: 'capitalize',
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

export default StudyLinksScreen;