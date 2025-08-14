import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';
import { Message } from '../../types';

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    chatRoomId: 'general',
    userId: '1',
    userDisplayName: 'Alice Johnson',
    userEmail: 'alice@student.noroff.no',
    content: 'Hey everyone! How are you preparing for the upcoming exam?',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    type: 'text',
  },
  {
    id: '2',
    chatRoomId: 'general',
    userId: '2',
    userDisplayName: 'Bob Smith',
    userEmail: 'bob@student.noroff.no',
    content: "I've been going through the lecture notes. The cybersecurity module is quite challenging!",
    timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
    type: 'text',
  },
  {
    id: '3',
    chatRoomId: 'general',
    userId: '3',
    userDisplayName: 'Carol Davis',
    userEmail: 'carol@student.noroff.no',
    content: 'Would anyone be interested in forming a study group this weekend?',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    type: 'text',
  },
  {
    id: '4',
    chatRoomId: 'general',
    userId: '1',
    userDisplayName: 'Alice Johnson',
    userEmail: 'alice@student.noroff.no',
    content: 'That sounds great, Carol! Count me in.',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    type: 'text',
  },
  {
    id: '5',
    chatRoomId: 'general',
    userId: 'current',
    userDisplayName: 'You',
    userEmail: 'current@student.noroff.no',
    content: 'I\'d love to join the study group! What time works for everyone?',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    type: 'text',
  },
];

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        chatRoomId: 'general',
        userId: 'current',
        userDisplayName: 'You',
        userEmail: 'current@student.noroff.no',
        content: newMessage.trim(),
        timestamp: new Date(),
        type: 'text',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isCurrentUser = item.userId === 'current';
    const showHeader = index === 0 || messages[index - 1].userId !== item.userId;

    return (
      <View style={[styles.messageContainer, isCurrentUser && styles.currentUserMessage]}>
        {showHeader && (
          <View style={styles.messageHeader}>
            <Text style={styles.userName}>{item.userDisplayName}</Text>
            <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
          </View>
        )}
        <View style={[styles.messageBubble, isCurrentUser && styles.currentUserBubble]}>
          <Text style={[styles.messageText, isCurrentUser && styles.currentUserText]}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Ionicons name="chatbubbles" size={24} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.headerTitle}>General Chat</Text>
              <Text style={styles.headerSubtitle}>5 participants</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.headerAction}>
            <Ionicons name="information-circle-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Messages */}
      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Input */}
      <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, SPACING.md) }]}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.textSecondary}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]} 
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newMessage.trim() ? COLORS.white : COLORS.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerAction: {
    padding: SPACING.xs,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.md,
  },
  messageContainer: {
    marginBottom: SPACING.md,
  },
  currentUserMessage: {
    alignItems: 'flex-end',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  userName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  messageBubble: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 18,
    maxWidth: '80%',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currentUserBubble: {
    backgroundColor: '#667eea',
  },
  messageText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: FONT_SIZES.md * 1.3,
  },
  currentUserText: {
    color: COLORS.white,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    maxHeight: 100,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.surface,
  },
});

export default ChatScreen;