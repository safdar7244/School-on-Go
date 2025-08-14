import { firestoreService, FirestoreDocument } from './firestoreService';
import { authService } from './authService';

export interface ChatRoom extends FirestoreDocument {
  name: string;
  description?: string;
  createdAt: Date;
  participantCount: number;
  lastMessage?: {
    content: string;
    timestamp: Date;
    userDisplayName: string;
  };
}

export interface Message extends FirestoreDocument {
  chatRoomId: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

class ChatService {
  /**
   * Get all available chat rooms
   */
  async getChatRooms(): Promise<{ success: boolean; data?: ChatRoom[]; error?: string }> {
    return await firestoreService.getDocuments<ChatRoom>('chatRooms', {
      orderBy: [{ field: 'createdAt', direction: 'desc' }],
    });
  }

  /**
   * Subscribe to real-time chat room updates
   */
  subscribeToChatRooms(callback: (rooms: ChatRoom[], error?: string) => void): () => void {
    return firestoreService.subscribeToCollection<ChatRoom>(
      'chatRooms',
      callback,
      {
        orderBy: [{ field: 'createdAt', direction: 'desc' }],
      }
    );
  }

  /**
   * Get messages for a specific chat room
   */
  async getMessages(
    chatRoomId: string,
    limitCount = 50
  ): Promise<{ success: boolean; data?: Message[]; error?: string }> {
    return await firestoreService.getDocuments<Message>('messages', {
      where: [{ field: 'chatRoomId', operator: '==', value: chatRoomId }],
      orderBy: [{ field: 'timestamp', direction: 'asc' }],
      limit: limitCount,
    });
  }

  /**
   * Subscribe to real-time messages for a chat room
   */
  subscribeToMessages(
    chatRoomId: string,
    callback: (messages: Message[], error?: string) => void,
    limitCount = 50
  ): () => void {
    return firestoreService.subscribeToCollection<Message>(
      'messages',
      callback,
      {
        where: [{ field: 'chatRoomId', operator: '==', value: chatRoomId }],
        orderBy: [{ field: 'timestamp', direction: 'asc' }],
        limit: limitCount,
      }
    );
  }

  /**
   * Send a message to a chat room
   */
  async sendMessage(
    chatRoomId: string,
    content: string,
    type: 'text' | 'image' | 'file' = 'text'
  ): Promise<{ success: boolean; error?: string }> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'User not authenticated' };
    }

    const userProfile = await authService.getCurrentUserProfile();
    if (!userProfile) {
      return { success: false, error: 'User profile not found' };
    }

    const messageData: Omit<Message, 'id'> = {
      chatRoomId,
      userId: currentUser.uid,
      userDisplayName: userProfile.displayName,
      userEmail: userProfile.email,
      content,
      timestamp: new Date(),
      type,
    };

    const result = await firestoreService.addDocument('messages', messageData);
    
    if (result.success) {
      // Update chat room's last message
      await this.updateChatRoomLastMessage(chatRoomId, {
        content,
        timestamp: new Date(),
        userDisplayName: userProfile.displayName,
      });
    }

    return result;
  }

  /**
   * Create a new chat room
   */
  async createChatRoom(
    name: string,
    description?: string
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'User not authenticated' };
    }

    const chatRoomData: Omit<ChatRoom, 'id'> = {
      name,
      description,
      createdAt: new Date(),
      participantCount: 0,
    };

    return await firestoreService.addDocument('chatRooms', chatRoomData);
  }

  /**
   * Get a specific chat room
   */
  async getChatRoom(chatRoomId: string): Promise<{ success: boolean; data?: ChatRoom; error?: string }> {
    return await firestoreService.getDocument<ChatRoom>('chatRooms', chatRoomId);
  }

  /**
   * Update chat room's last message
   */
  private async updateChatRoomLastMessage(
    chatRoomId: string,
    lastMessage: ChatRoom['lastMessage']
  ): Promise<void> {
    try {
      await firestoreService.updateDocument('chatRooms', chatRoomId, {
        lastMessage,
      });
    } catch (error) {
      console.error('Error updating chat room last message:', error);
    }
  }

  /**
   * Delete a message (only by the sender)
   */
  async deleteMessage(messageId: string): Promise<{ success: boolean; error?: string }> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'User not authenticated' };
    }

    // First, get the message to verify ownership
    const messageResult = await firestoreService.getDocument<Message>('messages', messageId);
    if (!messageResult.success || !messageResult.data) {
      return { success: false, error: 'Message not found' };
    }

    if (messageResult.data.userId !== currentUser.uid) {
      return { success: false, error: 'You can only delete your own messages' };
    }

    return await firestoreService.deleteDocument('messages', messageId);
  }

  /**
   * Update participant count for a chat room
   */
  async updateParticipantCount(
    chatRoomId: string,
    increment: boolean
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const chatRoomResult = await firestoreService.getDocument<ChatRoom>('chatRooms', chatRoomId);
      if (!chatRoomResult.success || !chatRoomResult.data) {
        return { success: false, error: 'Chat room not found' };
      }

      const currentCount = chatRoomResult.data.participantCount || 0;
      const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);

      return await firestoreService.updateDocument('chatRooms', chatRoomId, {
        participantCount: newCount,
      });
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}

export const chatService = new ChatService();
export default chatService;