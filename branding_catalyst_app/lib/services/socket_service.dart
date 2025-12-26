import 'package:socket_io_client/socket_io_client.dart' as io;
import '../config/api_config.dart';
import '../models/models.dart';

/// Socket service for real-time communication
class SocketService {
  static final SocketService _instance = SocketService._internal();
  factory SocketService() => _instance;
  SocketService._internal();

  io.Socket? _socket;
  String? _userId;
  
  // Event callbacks
  Function(Message)? onNewMessage;
  Function(Message)? onNewDM;
  Function(String, String)? onUserStatus;
  Function(String, List<String>)? onTypingUpdate;
  Function(Map<String, dynamic>)? onNotification;
  Function(String, String, String, String)? onReaction;
  Function(String, String)? onMessageEdited;
  Function(String)? onMessageDeleted;

  bool get isConnected => _socket?.connected ?? false;

  /// Connect to socket server
  void connect(String userId) {
    if (_socket != null && _socket!.connected) {
      return;
    }

    _userId = userId;
    
    _socket = io.io(
      ApiConfig.socketUrl,
      io.OptionBuilder()
          .setTransports(['polling']) // Match server config
          .enableAutoConnect()
          .enableReconnection()
          .setReconnectionAttempts(5)
          .setReconnectionDelay(1000)
          .build(),
    );

    _setupListeners();
    _socket!.connect();
  }

  /// Setup socket event listeners
  void _setupListeners() {
    _socket!.onConnect((_) {
      print('🔌 Socket connected');
      if (_userId != null) {
        _socket!.emit('user:online', _userId);
      }
    });

    _socket!.onDisconnect((_) {
      print('🔌 Socket disconnected');
    });

    _socket!.onConnectError((error) {
      print('❌ Socket connection error: $error');
    });

    // User status updates
    _socket!.on('user:status', (data) {
      if (onUserStatus != null) {
        onUserStatus!(data['userId'], data['status']);
      }
    });

    // New channel message
    _socket!.on('message:new', (data) {
      if (onNewMessage != null) {
        onNewMessage!(Message.fromJson(data));
      }
    });

    // New DM message
    _socket!.on('dm:new', (data) {
      if (onNewDM != null) {
        onNewDM!(Message.fromJson(data));
      }
    });

    // Typing updates for channels
    _socket!.on('channel:typingUpdate', (data) {
      if (onTypingUpdate != null) {
        onTypingUpdate!(
          data['channelId'],
          List<String>.from(data['typingUsers']),
        );
      }
    });

    // Typing updates for conversations
    _socket!.on('conversation:typingUpdate', (data) {
      if (onTypingUpdate != null) {
        onTypingUpdate!(
          data['conversationId'],
          List<String>.from(data['typingUsers']),
        );
      }
    });

    // Message reactions
    _socket!.on('message:reactionUpdate', (data) {
      if (onReaction != null) {
        onReaction!(
          data['messageId'],
          data['reaction'],
          data['userId'],
          data['action'],
        );
      }
    });

    // Message edited
    _socket!.on('message:edited', (data) {
      if (onMessageEdited != null) {
        onMessageEdited!(data['messageId'], data['content']);
      }
    });

    // Message deleted
    _socket!.on('message:deleted', (data) {
      if (onMessageDeleted != null) {
        onMessageDeleted!(data['messageId']);
      }
    });

    // Notifications
    _socket!.on('notification:new', (data) {
      if (onNotification != null) {
        onNotification!(Map<String, dynamic>.from(data));
      }
    });
  }

  /// Join a channel room
  void joinChannel(String channelId) {
    _socket?.emit('channel:join', channelId);
  }

  /// Leave a channel room
  void leaveChannel(String channelId) {
    _socket?.emit('channel:leave', channelId);
  }

  /// Join a conversation room (DM)
  void joinConversation(String conversationId) {
    _socket?.emit('conversation:join', conversationId);
  }

  /// Leave a conversation room
  void leaveConversation(String conversationId) {
    _socket?.emit('conversation:leave', conversationId);
  }

  /// Send message to channel
  void sendChannelMessage(String channelId, Message message) {
    _socket?.emit('message:send', {
      'channelId': channelId,
      'message': message.toJson(),
    });
  }

  /// Send DM message
  void sendDM(String conversationId, Message message) {
    _socket?.emit('dm:send', {
      'conversationId': conversationId,
      'message': message.toJson(),
    });
  }

  /// Send typing indicator for channel
  void sendChannelTyping(String channelId, bool isTyping) {
    _socket?.emit('channel:typing', {
      'channelId': channelId,
      'userId': _userId,
      'isTyping': isTyping,
    });
  }

  /// Send typing indicator for conversation
  void sendConversationTyping(String conversationId, bool isTyping) {
    _socket?.emit('conversation:typing', {
      'conversationId': conversationId,
      'userId': _userId,
      'isTyping': isTyping,
    });
  }

  /// Add reaction to message
  void addReaction(String messageId, String emoji, {String? channelId, String? conversationId}) {
    _socket?.emit('message:react', {
      'messageId': messageId,
      'reaction': emoji,
      'userId': _userId,
      'action': 'add',
      'channelId': channelId,
      'conversationId': conversationId,
    });
  }

  /// Remove reaction from message
  void removeReaction(String messageId, String emoji, {String? channelId, String? conversationId}) {
    _socket?.emit('message:react', {
      'messageId': messageId,
      'reaction': emoji,
      'userId': _userId,
      'action': 'remove',
      'channelId': channelId,
      'conversationId': conversationId,
    });
  }

  /// Set user status
  void setStatus(String status) {
    _socket?.emit('user:setStatus', {
      'userId': _userId,
      'status': status,
    });
  }

  /// Disconnect socket
  void disconnect() {
    _socket?.disconnect();
    _socket = null;
    _userId = null;
  }

  /// Dispose resources
  void dispose() {
    disconnect();
    onNewMessage = null;
    onNewDM = null;
    onUserStatus = null;
    onTypingUpdate = null;
    onNotification = null;
    onReaction = null;
    onMessageEdited = null;
    onMessageDeleted = null;
  }
}
